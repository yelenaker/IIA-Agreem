# STU Inter-Institutional Agreement Management System

Version: 1.0

Author: AI Software Architect

---

# 1. Project Overview

## Project Name

STU Inter-Institutional Agreement Management System

## Client

International Office

Slovak University of Technology in Bratislava (STU)

## Purpose

The purpose of this project is to replace the current manual workflow based on Google Forms, Google Sheets and email communication with a centralized modern web application.

The application must allow the International Office to manage Inter-Institutional Agreement (IIA) applications between STU and universities around the world.

The system must always display live information from Google Sheets without maintaining its own database.

---

# 2. Main Goals

The application should:

• eliminate manual work

• simplify application processing

• automate email communication

• visualize signed agreements on an interactive map

• provide analytical statistics

• provide fast searching

• support administrator authentication

• remain simple for public users

---

# 3. System Architecture

Google Forms

↓

Google Sheets

↓

Google Apps Script REST API

↓

Frontend (SPA)

↓

Administrator / Public User

Google Sheets is the only database.

No SQL.

No Firebase.

No MongoDB.

No MySQL.

No PostgreSQL.

No Supabase.

No backend except Google Apps Script.

---

# 4. Existing Backend

Backend is already implemented.

DO NOT redesign backend.

DO NOT replace backend.

Frontend MUST use the existing API.

API Base URL

https://script.google.com/a/macros/stuba.sk/s/AKfycbzMUcYDQloY1QYcEcOtzIGlT1YAQJNdDu0Fc5IHLINb-Sr3OGd9ZPMgbXb-DKR3WE_A/exec

---

# 5. API Endpoints

GET

?action=applications

Returns all applications.

---------------------------------

GET

?action=application&id=

Returns single application.

---------------------------------

GET

?action=dashboard

Returns dashboard summary.

---------------------------------

GET

?action=statistics

Returns statistical data.

---------------------------------

GET

?action=map

Returns signed agreements.

---------------------------------

GET

?action=search&q=

Searches applications.

---------------------------------

GET

?action=buildEmail&id=

Builds email template.

---------------------------------

POST / GET

?action=sendEmail

Sends email.

---

# 6. User Roles

## Public User

No authentication.

Can access:

World Map

Statistics

Cannot access:

Applications

Dashboard

Email Module

Administrator pages

Google OAuth

---

## Administrator

Login using STU Google Account.

Only predefined STU accounts may access administrator pages.

Examples

michal.dudak@stuba.sk

xmykhailovska@stuba.sk

Administrator permissions

View applications

Search applications

Filter applications

Open application

Generate emails

Send emails

Dashboard

Statistics

World Map

Future settings

---

# 7. Technology Stack

Frontend

HTML5

CSS3

Vanilla JavaScript ES Modules

Backend

Google Apps Script

Database

Google Sheets

Charts

Chart.js

Maps

Leaflet.js

Icons

Lucide Icons

Authentication

Google OAuth

Deployment

GitHub Pages

---

# 8. General Rules

Never use Bootstrap.

Never use Tailwind.

Never use React.

Never use Vue.

Never use Angular.

Never use jQuery.

Never use TypeScript.

Use only modern Vanilla JavaScript.

---

# 9. Application Type

Single Page Application (SPA)

Only one HTML page.

index.html

Every page loads dynamically.

---

# 10. Folder Structure

STU-IIA-Management-System/

index.html

README.md

PROJECT_SPEC.md

assets/

css/

variables.css

base.css

layout.css

components.css

pages.css

themes.css

responsive.css

js/

app.js

config.js

api.js

router.js

ui.js

theme.js

utils.js

dashboard.js

applications.js

application.js

statistics.js

map.js

email.js

auth.js

views/

dashboard.html

applications.html

application.html

statistics.html

map.html

login.html

images/

icons/

---

# 11. Design Philosophy

The application must look like enterprise software.

Inspired by

Linear

GitHub

Stripe Dashboard

Notion

Vercel

Supabase

The design should be

minimal

professional

clean

fast

modern

simple

consistent

---

# 12. Color Palette

Primary

Blue

Background

White

Secondary Background

Light Gray

Success

Green

Warning

Orange

Danger

Red

Dark Theme

Near Black

Cards

White

Borders

Light Gray

---

# 13. Typography

Font

Inter

Weights

300

400

500

600

700

800

---

# 14. Responsive Design

Desktop

1440+

Laptop

1200

Tablet

768

Mobile

480

Everything must remain usable.

---

# 15. Layout

Sidebar

Header

Content Area

Notification Area

Modal Area

Loading Screen

No page reloads.

---

# 16. Sidebar

Must contain

Dashboard

Applications

Statistics

World Map

Settings

Logout

Collapse on mobile.

---

# 17. Header

Contains

Breadcrumbs

Search

Theme Switch

Refresh

Administrator Profile

---

# 18. Theme System

Light Theme

Dark Theme

Save preference.

Remember theme after refresh.

---

# 19. Performance

Lazy load pages.

Lazy initialize charts.

Lazy initialize maps.

Avoid unnecessary API requests.

Avoid duplicated rendering.

---

# 20. Error Handling

Every API request must support

Loading State

Success State

Error State

Empty State

Retry

No crashes.

---

# 21. Code Quality

Use ES Modules.

Use reusable functions.

Avoid duplicate code.

Small functions.

Meaningful variable names.

Meaningful file names.

No inline CSS.

No inline JavaScript.

No global variables unless required.

Follow consistent formatting.

---

# 22. Development Workflow

Implement one module at a time.

Each module must be complete before starting the next.

Do not leave TODO comments.

Do not leave placeholder content.

Every generated file must be production-ready.

# 23. Dashboard Module

The Dashboard is the first page visible after administrator login.

Purpose:

Provide a quick overview of the entire system.

The page must request

?action=dashboard

and display live information.

Cards:

• Total Applications

• New Applications

• Agreements In Progress

• Signed Agreements

• Rejected Applications

Every card should contain

• icon

• title

• value

• optional percentage

• hover animation

Below the cards display

Recent Applications

The table must contain

Applicant

University

Country

Status

Submission Date

Clicking a row opens the Application Details page.

The dashboard must automatically refresh when the Refresh button is clicked.

--------------------------------------------------------

# 24. Applications Module

The Applications page is the core of the system.

Data source

?action=applications

Display data in a professional responsive table.

Columns

Application ID

Submission Date

Applicant

University

Country

Faculty

Mobility

Study Level

Status

Actions

Features

Global Search

Sorting

Pagination

Filtering

Sticky Header

Responsive layout

Hover effects

Status colors

Status badges

Each row opens Application Details.

--------------------------------------------------------

# 25. Application Details Module

Data source

?action=application&id=

The page displays every available field.

Sections

Applicant Information

Full Name

Email

Phone

Position

Institution Information

University

Country

Contact Person

Contact Email

Agreement Information

Faculty

Mobility

Study Level

Current Status

Buttons

Back

Generate Email

Refresh

Print

Cards should be grouped logically.

--------------------------------------------------------

# 26. Email Module

Purpose

Simplify communication.

The frontend never creates email templates manually.

Instead

?action=buildEmail&id=

returns

Subject

Body

Recipients

Frontend displays

Recipients

Editable Subject

Editable Body

Preview

Buttons

Cancel

Send Email

When clicking Send

call

?action=sendEmail

Show

Loading

Success Toast

Error Toast

Never hardcode email templates.

Templates always come from Google Sheets.

--------------------------------------------------------

# 27. Statistics Module

Endpoint

?action=statistics

Charts

Applications by Status

Applications by Country

Applications by Faculty

Applications by Mobility

Applications by Study Level

Use Chart.js.

Charts must animate.

Support Light Theme.

Support Dark Theme.

Display summary cards above charts.

--------------------------------------------------------

# 28. World Map Module

Endpoint

?action=map

Use Leaflet.js.

Display only signed agreements.

Each marker displays

University

Country

Faculty

Mobility

Study Level

Contact Person

Popup

Filters

Country

Faculty

Mobility

Study Level

University Search

Multiple filters can work simultaneously.

Add Reset Filters button.

Automatically update visible markers.

--------------------------------------------------------

# 29. Search

Global Search is always available in the Header.

Search must request

?action=search&q=

Search by

Applicant

University

Country

Faculty

Email

Results appear instantly.

--------------------------------------------------------

# 30. Authentication

Public users

Dashboard unavailable

Applications unavailable

Email unavailable

Statistics available

Map available

Administrators

Google OAuth

Only approved STU accounts

Future admin list stored in Apps Script.

Unauthorized users must see

Access Denied

--------------------------------------------------------

# 31. Notifications

Display Toast Notifications.

Types

Success

Warning

Error

Information

Toast position

Top Right

Auto hide

5 seconds

Pause on hover

--------------------------------------------------------

# 32. Loading States

Every request must display

Skeleton Loading

or

Loading Spinner

Never show empty white pages.

--------------------------------------------------------

# 33. Empty States

If API returns no data

Display illustration

Friendly message

Action button

Example

"No applications found."

--------------------------------------------------------

# 34. Status Badges

Statuses

Nová žiadosť

Blue

Pracuje sa na podpise

Orange

Mailová žiadosť poslaná na fakulty

Yellow

Podpísané

Green

Zamietnuté fakultami

Red

Every badge uses

Rounded pill design

--------------------------------------------------------

# 35. Cards

Cards use

White background

Rounded corners

Soft shadow

Hover elevation

Padding

Consistent spacing

--------------------------------------------------------

# 36. Tables

Professional data table.

Features

Sticky Header

Hover rows

Responsive

Pagination

Sorting

Filtering

Search

Column alignment

Status colors

--------------------------------------------------------

# 37. Forms

Modern inputs.

Floating labels preferred.

Validation

Required fields

Email validation

Clear error messages

--------------------------------------------------------

# 38. Buttons

Types

Primary

Secondary

Danger

Outline

Ghost

Disabled

Loading

Buttons always show hover animations.

--------------------------------------------------------

# 39. Modals

Reusable modal system.

Used for

Email Preview

Delete Confirmation

Application Details (optional)

Keyboard accessible

ESC closes modal.

--------------------------------------------------------

# 40. Theme

Light Theme

Dark Theme

Every component must support both.

No duplicated CSS.

Use CSS Variables.

--------------------------------------------------------

# 41. Responsive Behaviour

Desktop

Sidebar expanded

Laptop

Sidebar collapsible

Tablet

Sidebar overlay

Mobile

Hamburger menu

Cards stack vertically

Tables become horizontally scrollable

--------------------------------------------------------

# 42. Accessibility

Keyboard navigation

Visible focus

Proper heading hierarchy

ARIA labels where appropriate

Color contrast suitable for accessibility

--------------------------------------------------------

# 43. Future Extensions

The architecture should allow future implementation of

Settings

User Management

Agreement Archive

Notifications Center

Audit Log

Activity Timeline

Multiple Languages

Export to Excel

Export to PDF

Advanced Analytics

Without major refactoring.

# 44. JavaScript Architecture

The application must use modern ES Modules.

Each file must have a single responsibility.

Never create one huge JavaScript file.

Recommended architecture

app.js

Application bootstrap.

Loads the application.

Initializes theme.

Starts router.

Initializes event listeners.

----------------------------------------------------

config.js

Contains

API URL

Application Name

Version

Global constants

----------------------------------------------------

api.js

Contains only communication with Apps Script.

Responsible for

GET requests

POST requests

Error handling

JSON parsing

Request timeout

----------------------------------------------------

router.js

Controls navigation.

Supports browser history.

Loads page views dynamically.

Never reloads the page.

----------------------------------------------------

ui.js

Reusable UI helpers.

Loading

Toast

Modal

Badge

Cards

Table helpers

----------------------------------------------------

theme.js

Controls

Dark Mode

Light Mode

Auto Theme

Stores preference.

----------------------------------------------------

utils.js

Reusable helper functions.

Date formatting

Status colors

Debounce

Throttle

Sorting

Filtering

Searching

Validation

----------------------------------------------------

Every feature must have its own module.

dashboard.js

applications.js

application.js

statistics.js

map.js

email.js

auth.js

----------------------------------------------------

# 45. CSS Architecture

CSS must be modular.

Use CSS variables.

No inline styles.

Recommended files

variables.css

base.css

layout.css

components.css

pages.css

themes.css

responsive.css

Never duplicate styles.

Every component must be reusable.

----------------------------------------------------

# 46. HTML Rules

Use semantic HTML.

header

nav

aside

main

section

article

footer

Every page loaded into the SPA must contain only page content.

No duplicated layouts.

----------------------------------------------------

# 47. API Rules

The frontend never accesses Google Sheets directly.

Only Apps Script API.

Every request must include

Loading State

Success State

Error State

Retry option

Never assume data exists.

Always validate API responses.

----------------------------------------------------

# 48. Error Handling

Every API request must be wrapped in try/catch.

Unexpected errors should display a friendly message.

Console errors may remain for debugging.

Never expose internal errors to users.

----------------------------------------------------

# 49. Security

Never expose administrator emails in frontend source code.

Never hardcode credentials.

Never store passwords.

Only Google OAuth authentication.

Future authorization should be verified by Apps Script.

----------------------------------------------------

# 50. Performance

Minimize API requests.

Reuse already loaded data where appropriate.

Lazy initialize

Charts

Maps

Large tables

Debounce search input.

Optimize rendering.

----------------------------------------------------

# 51. Animations

Use subtle animations only.

Fade

Slide

Scale

Hover

Card elevation

Button ripple (optional)

Avoid excessive animations.

----------------------------------------------------

# 52. Accessibility

Keyboard navigation.

Visible focus indicators.

Accessible labels.

Proper heading hierarchy.

Good color contrast.

Responsive font sizes.

----------------------------------------------------

# 53. Git Workflow

Use Git from the beginning.

Suggested commits

Initial Project

Design System

Application Layout

Dashboard

Applications

Application Details

Email Module

Statistics

World Map

Authentication

Responsive Design

Testing

Final Release

----------------------------------------------------

# 54. Branch Strategy

main

Production-ready code.

develop

Daily development.

Feature branches

feature/dashboard

feature/applications

feature/email

feature/map

feature/statistics

Merge through Pull Requests when working in teams.

----------------------------------------------------

# 55. Testing

Every feature should be tested.

Dashboard

Applications

Search

Filters

Email Generation

Email Sending

Statistics

Map

Responsive Layout

Theme Switching

API Errors

Empty States

Loading States

----------------------------------------------------

# 56. Browser Support

Latest Chrome

Latest Edge

Latest Firefox

Latest Safari

Responsive support

Desktop

Tablet

Mobile

----------------------------------------------------

# 57. Deployment

Frontend

GitHub Pages

Backend

Google Apps Script

Database

Google Sheets

Deployment should require no backend server.

----------------------------------------------------

# 58. Documentation

The repository must contain

README.md

PROJECT_SPEC.md

Folder structure

Installation guide

Deployment guide

API documentation

Screenshots

Future roadmap

----------------------------------------------------

# 59. Coding Standards

Meaningful names.

Short functions.

Reusable code.

Consistent formatting.

No duplicated logic.

Prefer composition over repetition.

Comment only when necessary.

Write self-explanatory code.

----------------------------------------------------

# 60. Future Improvements

The architecture must support future implementation of

Multiple administrator roles

User management

Advanced permissions

Email history

Agreement archive

Export to PDF

Export to Excel

Audit logs

Notifications

Calendar integration

Partner university profiles

Faculty management

Dashboard widgets

Multi-language support

Analytics

----------------------------------------------------

# 61. Definition of Done

The project is considered complete when:

✓ Google OAuth works.

✓ Public users can access the World Map and Statistics.

✓ Administrators can access the Dashboard.

✓ Applications are loaded from Google Sheets through the Apps Script API.

✓ Application Details display all available information.

✓ Email templates are generated from Google Sheets.

✓ Faculty emails are sent successfully.

✓ Partner emails can be generated.

✓ Statistics are displayed using Chart.js.

✓ Signed agreements are displayed on the Leaflet map.

✓ Search works across applications.

✓ Filters work correctly.

✓ Light Theme and Dark Theme are implemented.

✓ Responsive layout works on desktop, tablet and mobile.

✓ Error handling is implemented.

✓ Loading states are implemented.

✓ Empty states are implemented.

✓ The application contains no placeholder content.

✓ Code is modular, maintainable and production-ready.

----------------------------------------------------

# 62. Final Objective

The STU Inter-Institutional Agreement Management System must become the official internal web application for the International Office of the Slovak University of Technology.

The application must replace manual work with Google Sheets and repetitive email communication by providing a single, modern, fast and user-friendly interface.

All information displayed by the application must always reflect the latest data stored in Google Sheets through the Google Apps Script API.

The final product should be comparable in quality, usability and maintainability to modern enterprise SaaS applications.