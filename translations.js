// =======================================================
// STU IIA Translation System
// =======================================================

const I18N = {

    language: localStorage.getItem("language") || "en",

    translations: {

        sk: {

            // Navigation
            "Statistics": "Štatistiky",
            "Partner Map": "Mapa partnerov",
            "Communication": "Komunikácia",
            "Admin sign in": "Prihlásenie administrátora",

            // Header
            "Live overview of Inter-Institutional Agreement applications":
                "Prehľad žiadostí o Inter-Institutional Agreement v reálnom čase",

            // Buttons
            "Refresh": "Obnoviť",

            "Total Applications": "Celkový počet žiadostí",
            "New Applications": "Nové žiadosti",
            "Signed Agreements": "Podpísané dohody",
            "Agreements in Progress": "Dohody v procese",
            "Rejected Applications": "Zamietnuté žiadosti",

            // Charts
            "Applications by Country": "Žiadosti podľa krajín",
            "top countries": "najčastejšie krajiny",

            "Monthly Applications": "Mesačné žiadosti",
            "over time": "v priebehu času",

            "Applications by Faculty": "Žiadosti podľa fakúlt",
            "STU faculties": "fakulty STU",

            "Status Distribution": "Rozdelenie podľa stavu",
            "current state": "aktuálny stav",

            "Applications by Mobility Type": "Žiadosti podľa typu mobility",
            "mobility": "mobilita",

            "Applications by Study Level": "Žiadosti podľa stupňa štúdia",
            "study level": "stupeň štúdia",

            "Applications by Year": "Žiadosti podľa roku",
            "yearly totals": "ročné súčty",

            // Empty states
            "No data yet": "Zatiaľ nie sú dostupné žiadne údaje",

            "No applications yet": "Zatiaľ nie sú žiadne žiadosti",

            "Once responses start coming in through the Google Form, statistics will appear here automatically — no action needed.":
                "Keď začnú prichádzať odpovede z formulára Google, štatistiky sa tu zobrazia automaticky – nie je potrebná žiadna akcia.",

            // Errors
            "Couldn't load statistics": "Nepodarilo sa načítať štatistiky",

            "Try again": "Skúsiť znova",

            "Updated": "Aktualizované",

            "The Apps Script API could not be reached. Check the deployment URL and access settings.":
                "Nepodarilo sa pripojiť k Apps Script API. Skontrolujte URL nasadenia a nastavenia prístupu.",

            "Something went wrong while loading data.":
                "Pri načítavaní údajov sa vyskytla chyba.",

            // Statuses
            "New": "Nová",
            "In Progress": "V procese",
            "Signed": "Podpísaná",
            "Rejected": "Zamietnutá",
            "Other": "Ostatné"

        }

    }

};

// =======================================================
// Translation
// =======================================================

function t(key) {

    if (I18N.language === "en") {
        return key;
    }

    return I18N.translations[I18N.language]?.[key] || key;

}

// =======================================================
// Language
// =======================================================

function getLanguage() {
    return I18N.language;
}

function setLanguage(language) {
    I18N.language = language;
    localStorage.setItem("language", language);

    updateLanguageButtons();
    translatePage();

}

// =======================================================
// Language buttons
// =======================================================

function updateLanguageButtons() {

    document.querySelectorAll(".lang-btn").forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.lang === I18N.language
        );

    });

}

// =======================================================
// Translate page
// =======================================================

function translatePage() {

    document
        .querySelectorAll("[data-i18n]")
        .forEach(element => {

            const key = element.dataset.i18n;

            element.textContent = t(key);

        });

}

// =======================================================
// Init
// =======================================================

document.addEventListener("DOMContentLoaded", () => {

    updateLanguageButtons();

    document.querySelectorAll(".lang-btn").forEach(button => {

        button.addEventListener("click", () => {

            setLanguage(button.dataset.lang);

        });

    });

    translatePage();

});