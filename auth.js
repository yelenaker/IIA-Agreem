/* ============================================================
   STUAuth — shared Google Sign-In / role module
   ------------------------------------------------------------
   Loaded identically by communication.html, map.html and
   statistics.html. Responsible for:
     - Rendering the "Admin sign in" control / signed-in profile
       chip in the shared topbar (#authArea).
     - Running Google Identity Services sign-in.
     - Asking the Apps Script backend whether the signed-in email
       is an authorized Admin (checkAuthorization action).
     - Persisting the session in localStorage so a refresh (or a
       jump to another page on this site) restores it instantly.
     - Exposing window.STUAuth so each page's own script can gate
       its admin-only controls. Two roles only: 'Admin' / 'Viewer'.

   NOTE: this is the FRONTEND half of authorization only. It makes
   the UI honest, it is not a security boundary — every state-
   changing Apps Script endpoint must independently re-check the
   idToken server-side (see Auth.gs / requireAdmin()). Never trust
   this file's isAdmin() for anything the backend does.
   ============================================================ */
(function(){
'use strict';

/* ------------------------------------------------------------
   CONFIG — fill in the OAuth Client ID from Google Cloud Console
   (APIs & Services → Credentials → OAuth client ID → Web
   application). It must be the SAME client ID used in Auth.gs.
   ------------------------------------------------------------ */
var GOOGLE_CLIENT_ID = "YOUR_GOOGLE_OAUTH_CLIENT_ID.apps.googleusercontent.com";

/* Same Apps Script web app URL every page already talks to. */
var API_BASE = "https://script.google.com/macros/s/AKfycbwrgoPNlVEGtdGamlAQDv8dsRWjH3u56cR7v9jiGEV1stJhH4mq_SmNLraV0fKE6VRU/exec";

var STORAGE_KEY = "stuAuthSession";

var session = { email:null, name:null, picture:null, idToken:null, role:'Viewer', authorized:false };
var listeners = [];
var gsiReady = false;

/* ------------------------------------------------------------
   Persistence
   ------------------------------------------------------------ */
function loadSession(){
  try {
    var raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch(e){ return null; }
}
function persistSession(){
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(session)); } catch(e){}
}
function clearSession(){
  try { localStorage.removeItem(STORAGE_KEY); } catch(e){}
  session = { email:null, name:null, picture:null, idToken:null, role:'Viewer', authorized:false };
}

/* ------------------------------------------------------------
   Small helpers
   ------------------------------------------------------------ */
function escapeHtml(str){
  return String(str == null ? '' : str).replace(/[&<>"']/g, function(c){
    return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c];
  });
}
function decodeJwt(token){
  try {
    var payload = token.split('.')[1];
    var json = decodeURIComponent(atob(payload.replace(/-/g,'+').replace(/_/g,'/')).split('').map(function(c){
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(json);
  } catch(e){ return null; }
}
function notify(){
  listeners.forEach(function(cb){ try { cb(getUser()); } catch(e){ console.error(e); } });
  document.dispatchEvent(new CustomEvent('stuauth:change', { detail: getUser() }));
}
function getUser(){
  return {
    signedIn: !!session.email,
    email: session.email,
    name: session.name,
    picture: session.picture,
    role: session.role,
    authorized: session.authorized
  };
}

/* ------------------------------------------------------------
   Backend authorization check
   (POST as text/plain, same trick apiPost() already uses
   elsewhere in this app, to avoid a CORS preflight.)
   ------------------------------------------------------------ */
function verifyWithBackend(idToken){
  return fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ action: 'checkAuthorization', idToken: idToken })
  })
    .then(function(res){ return res.text(); })
    .then(function(text){
      var json; try { json = JSON.parse(text); } catch(e){ json = {}; }
      var data = json && json.data ? json.data : json;
      return {
        authorized: !!(data && data.authorized),
        role: data && data.role === 'Admin' ? 'Admin' : 'Viewer',
        email: (data && data.email) || undefined,
        name: (data && data.name) || undefined,
        picture: (data && data.picture) || undefined
      };
    });
}

/* ------------------------------------------------------------
   Rendering the topbar auth area
   ------------------------------------------------------------ */
function render(){
  var authArea = document.getElementById('authArea');
  if (!authArea) return;

  if (!session.email){
    authArea.innerHTML = '<button type="button" class="admin-link" id="adminSignInBtn">Admin sign in</button>';
    var btn = document.getElementById('adminSignInBtn');
    if (btn) btn.addEventListener('click', triggerSignIn);
    return;
  }

  var isAdmin = session.role === 'Admin' && session.authorized;
  var badgeClass = isAdmin ? 'role-badge role-admin' : 'role-badge role-viewer';
  var badgeText = isAdmin ? 'Admin' : 'Viewer mode';

  authArea.innerHTML =
    '<div class="user-chip" id="userChip">' +
      (session.picture
        ? '<img class="user-avatar" src="' + escapeHtml(session.picture) + '" alt="" referrerpolicy="no-referrer">'
        : '<div class="user-avatar user-avatar-fallback">' + escapeHtml((session.name || session.email || '?').charAt(0).toUpperCase()) + '</div>') +
      '<div class="user-text">' +
        '<span class="user-name">' + escapeHtml(session.name || session.email) + '</span>' +
        '<span class="user-email">' + escapeHtml(session.email) + '</span>' +
      '</div>' +
      '<span class="' + badgeClass + '">' + badgeText + '</span>' +
      '<button type="button" class="signout-btn" id="signOutBtn" title="Sign out">Sign out</button>' +
    '</div>';

  var signOutBtn = document.getElementById('signOutBtn');
  if (signOutBtn) signOutBtn.addEventListener('click', signOut);
}

/* ------------------------------------------------------------
   Google Identity Services wiring
   ------------------------------------------------------------ */
function handleCredentialResponse(response){
  var idToken = response && response.credential;
  if (!idToken) return;
  var claims = decodeJwt(idToken) || {};

  /* Show something immediately (optimistic UI) while the backend
     confirms the Admin role — avoids a flash of "Admin sign in". */
  session = {
    email: claims.email, name: claims.name, picture: claims.picture,
    idToken: idToken, role: 'Viewer', authorized: false
  };
  render(); persistSession();

  verifyWithBackend(idToken).then(function(result){
    session.authorized = result.authorized;
    session.role = result.role;
    session.email = result.email || session.email;
    session.name = result.name || session.name;
    session.picture = result.picture || session.picture;
    persistSession(); render(); notify();
  }).catch(function(err){
    console.error('checkAuthorization failed:', err);
    session.authorized = false; session.role = 'Viewer';
    persistSession(); render(); notify();
  });
}

function triggerSignIn(){
  if (!gsiReady){
    alert('Google Sign-In is still loading — please try again in a moment.');
    return;
  }
  var hiddenWrap = document.getElementById('gsiHiddenBtn');
  var hiddenBtn = hiddenWrap && hiddenWrap.querySelector('div[role="button"]');
  if (hiddenBtn){ hiddenBtn.click(); return; }
  google.accounts.id.prompt();
}

function signOut(){
  try { if (window.google && google.accounts && google.accounts.id) google.accounts.id.disableAutoSelect(); } catch(e){}
  clearSession();
  render();
  notify();
}

function setupGsi(){
  if (!window.google || !google.accounts || !google.accounts.id) return;
  google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback: handleCredentialResponse,
    auto_select: false,
    cancel_on_tap_outside: true
  });
  var hidden = document.getElementById('gsiHiddenBtn');
  if (hidden){
    google.accounts.id.renderButton(hidden, { theme:'outline', size:'large', type:'standard' });
  }
  gsiReady = true;

  /* Session-persistence-across-refresh: if we already have a cached
     signed-in user, try a silent One Tap so an expired ID token gets
     refreshed (and re-checked against the AuthorizedUsers sheet)
     without the person having to click anything. If Google has no
     active session anymore, this silently does nothing and the
     cached UI from localStorage just stays as-is. */
  if (session.email){
    try { google.accounts.id.prompt(); } catch(e){}
  }
}

/* ------------------------------------------------------------
   Boot
   ------------------------------------------------------------ */
function init(){
  var cached = loadSession();
  if (cached && cached.email) session = cached;
  render();
  notify();

  if (window.google && google.accounts && google.accounts.id){
    setupGsi();
  } else {
    var tries = 0;
    var poll = setInterval(function(){
      tries++;
      if (window.google && google.accounts && google.accounts.id){
        clearInterval(poll);
        setupGsi();
      } else if (tries > 100){
        clearInterval(poll); // gsi script blocked/offline — site still works as Viewer
      }
    }, 100);
  }
}

window.STUAuth = {
  isAdmin: function(){ return session.role === 'Admin' && session.authorized; },
  isSignedIn: function(){ return !!session.email; },
  getUser: getUser,
  getIdToken: function(){ return session.idToken; },
  onChange: function(cb){ if (typeof cb === 'function') listeners.push(cb); },
  signOut: signOut
};

if (document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

})();