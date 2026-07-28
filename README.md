# STU Inter-Institutional Agreement Management System

A modern web application developed for the **International Office of the Slovak University of Technology (STU)** to automate the management of Erasmus+ Inter-Institutional Agreement (IIA) applications.

The system replaces manual work with Google Sheets and email communication by providing a centralized dashboard, interactive statistics, communication tools, and partner visualization.

---

# Features

## Dashboard

Displays real-time statistics about all submitted applications.

Includes:

- Total applications
- New applications
- Agreements in progress
- Signed agreements
- Rejected applications

Statistics are generated automatically from Google Sheets.

---

## Interactive Charts

Visualizes application data using Chart.js.

Available charts:

- Applications by Country
- Monthly Applications
- Applications by Faculty
- Status Distribution
- Applications by Mobility Type
- Applications by Study Level
- Applications by Year

Charts are automatically rebuilt whenever new data is loaded.

---

## Partner Map

Interactive world map built with Leaflet.

Features:

- Displays partner universities
- Shows geographical distribution
- Interactive markers
- Popups with university information
- Country clustering

---

## Communication Center

Allows International Office staff to manage communication directly from the website.

Features:

- Search applications
- Filter by status
- Email preview
- AI-assisted email generation
- Copy email
- Save draft
- Restore generated draft
- Send email

---

## Search & Filters

Users can filter applications by:

- Search text
- Status
- Date

Filtering is performed instantly on the client side.

---

## AI Integration

The Communication Center includes AI-powered email assistance.

The AI can:

- Improve email wording
- Generate professional responses
- Rewrite drafts
- Create polite communication

The frontend communicates with Google Apps Script, which handles AI requests.

---

## Internationalization (i18n)

The website supports multiple languages.

Currently available:

- English
- Slovak

Language features:

- Dynamic translation without page reload
- Persistent language selection using Local Storage
- Automatic translation of:

  - Navigation
  - Buttons
  - Charts
  - Statistics
  - Error messages
  - Empty states
  - Dynamic UI text

---

# Technologies

Frontend

- HTML5
- CSS3
- Vanilla JavaScript (ES6)

Libraries

- Chart.js
- Leaflet.js

Backend

- Google Apps Script

Database

- Google Sheets

Deployment

- GitHub Pages
- Google Apps Script Web App

---

# Project Structure

```
/
│
├── index.html                # Dashboard
├── map.html                  # Partner map
├── communication.html        # Communication Center
│
├── css/
│   └── styles.css
│
├── js/
│   ├── translations.js
│   ├── api.js
│   └── helpers.js
│
└── assets/
```

---

# Data Flow

```
Google Form
      │
      ▼
Google Sheets
      │
      ▼
Google Apps Script API
      │
      ▼
Frontend
      │
      ├── Dashboard
      ├── Charts
      ├── Map
      └── Communication Center
```

---

# Main Functions

## Dashboard

Loads all application statistics from the backend and updates:

- statistic cards
- charts
- timestamps

---

## Charts

Responsible for:

- creating Chart.js instances
- rebuilding charts
- updating data
- handling empty states

---

## Map

Loads partner universities from the API and displays them on an interactive world map.

---

## Communication

Handles:

- application list
- email generation
- draft management
- AI requests
- sending emails

---

## Translation System

Main functions:

### `t(key)`

Returns translated text for the currently selected language.

---

### `setLanguage(language)`

Changes the active language.

Updates:

- Local Storage
- language buttons
- page translations

---

### `translatePage()`

Translates all HTML elements containing the `data-i18n` attribute.

---

### `updateLanguageButtons()`

Highlights the currently selected language.

---

# Google Apps Script API

The frontend communicates with a REST API implemented in Google Apps Script.

Example endpoints:

- `?action=dashboard`
- `?action=statistics`
- `?action=applications`
- `?action=application&id=...`
- `?action=map`
- `?action=search`
- `?action=sendEmail`
- `?action=buildEmail`
- `?action=buildPartnerEmail`
- `?action=sendPartnerEmail`
- `?action=saveDraft`
- `?action=emailTemplates`
- `?action=faculties`
- `?action=sender`
- `?action=ai`

---

# Responsive Design

The application is fully responsive and optimized for:

- Desktop
- Laptop
- Tablet
- Mobile devices

---

# Future Improvements

Possible future enhancements include:

- User authentication
- Role-based permissions
- Email history
- File attachments
- Advanced analytics
- Export to PDF/Excel
- Notification system

---

# Author

Developed as a Bachelor's project for the **International Office of the Slovak University of Technology (STU)** to automate the Erasmus+ Inter-Institutional Agreement management process.