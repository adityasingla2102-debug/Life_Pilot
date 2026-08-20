# 🧭 LifePilot — Personal Life Management System

LifePilot is a personal life-management web application designed to help users organize and manage the small but important administrative responsibilities of everyday life.

People often need to remember many things such as paying bills, renewing documents, servicing vehicles, managing subscriptions, attending appointments, and checking product warranties. These responsibilities are usually scattered across notes, messages, calendars, and reminders.

LifePilot brings these activities together into one simple dashboard so users can track important tasks, deadlines, expenses, documents, appointments, and recurring responsibilities from a single place.

---

## 🎯 Problem Statement

Managing personal administrative responsibilities can become difficult because:

* Important deadlines are easy to forget.
* Bills have different due dates.
* Documents and insurance policies expire.
* Vehicle servicing requires regular attention.
* Subscriptions renew automatically.
* Appointments and warranties are difficult to track separately.
* Users may not know which task should be completed first.

### Our Solution

**LifePilot** provides a centralized platform where users can:

* Manage tasks and reminders.
* Track deadlines and appointments.
* Manage bills and subscriptions.
* Store important document information.
* Track vehicle servicing and insurance dates.
* Manage product warranties.
* View upcoming responsibilities from one dashboard.
* Get smart priority suggestions.
* Receive personalized recommendations.
* View monthly life-management analytics.

---

# ✨ Features

## E1 — Core Management

### ✅ Tasks

Users can:

* Create tasks.
* Edit tasks.
* Delete tasks.
* Mark tasks as completed.
* Set due dates.
* Select task categories.
* Assign task priority.

Example:

```text
Renew Driving Licence
Category: Documents
Due: 20 September
Priority: High
Status: Pending
```

---

### 📄 Documents

Users can store information about important documents such as:

* Driving Licence
* Passport
* Aadhaar
* PAN Card
* Insurance Documents
* Other Documents

The system tracks document issue and expiry dates.

---

### 🔔 Reminders

LifePilot identifies:

* Upcoming deadlines.
* Overdue tasks.
* Important renewals.
* Upcoming appointments.

Important items are highlighted so users know what needs attention.

---

### 📅 Calendar

The calendar provides a date-based view of:

* Tasks.
* Appointments.
* Deadlines.
* Renewals.

This gives users a simple overview of their upcoming responsibilities.

---

# 📦 E2 — Life Management Modules

## 💳 Bills

Users can manage recurring and one-time bills such as:

* Electricity
* Internet
* Mobile
* Water
* Rent
* Other bills

The application can calculate total bill amounts and display pending payments.

---

## 🚗 Vehicles

Users can store vehicle information including:

* Vehicle name.
* Registration number.
* Insurance expiry date.
* Service date.
* Notes.

Example:

```text
Honda Activa

Insurance Expiry:
10 January 2027

Next Service:
5 September 2026
```

---

## 🔁 Subscriptions

Users can track recurring subscriptions such as:

* Streaming services.
* Gym memberships.
* Software subscriptions.
* Cloud storage.
* Other memberships.

The system displays subscription renewal dates and recurring costs.

---

## 📅 Appointments

Users can create appointments with:

* Title.
* Date.
* Time.
* Location.
* Notes.

Examples include:

```text
Dentist Appointment
Vehicle Service
Bank Appointment
Doctor Appointment
College Meeting
```

---

## 🛡️ Warranties

Users can track product warranties using information such as:

* Product name.
* Purchase date.
* Warranty provider.
* Warranty expiry date.
* Notes.

The system helps users identify warranties that are approaching expiry.

---

# 🤖 E3 — Smart Features

## 🧠 Priority Prediction

LifePilot uses simple JavaScript rules to determine how urgent a task is.

Example:

```text
Overdue        → Critical
0–7 days       → High
8–30 days      → Medium
30+ days       → Low
```

This helps users focus on important responsibilities first.

---

## 📝 Automatic Deadline Extraction

Users can enter natural-looking text such as:

```text
Renew bike insurance before 15 September
```

LifePilot can identify the task and deadline:

```text
Task:
Renew bike insurance

Deadline:
15 September
```

The prototype uses JavaScript string processing and date detection.

---

## 🎯 Personalized Recommendations

LifePilot analyzes stored information and provides useful suggestions.

Example:

```text
⚠ You have 2 overdue bills.

🚗 Your vehicle insurance expires soon.

📄 Your driving licence needs attention.

💰 Your recurring subscriptions cost ₹1,850/month.
```

The recommendations are generated using simple, explainable rules based on the user's data.

---

## 📊 Monthly LifePilot Dashboard

The dashboard provides a summary of important activities.

Example:

```text
Tasks                  12
Upcoming Deadlines      4
Overdue Tasks           2
Monthly Bills      ₹8,500
Subscriptions      ₹1,200
Expiring Documents     3
```

---

## 📈 Analytics

LifePilot can show:

* Task completion percentage.
* Completed tasks.
* Pending tasks.
* Overdue tasks.
* Paid and unpaid bills.
* Monthly recurring expenses.
* Expiring documents.
* Upcoming appointments.

Example:

```text
Task Completion: 80%

Completed Tasks: 16
Pending Tasks:    4

Monthly Admin Cost: ₹9,700
```

---

# 🛠️ Technology Stack

## Frontend

* React
* JavaScript
* HTML
* CSS

## Storage

* Browser `localStorage`

## Development Tools

* Visual Studio Code
* Git
* GitHub
* Node.js
* Vite

No complex backend is required for the initial prototype.

---

# 🏗️ Project Architecture

LifePilot is divided into four major modules so that four team members can work independently while still contributing to one application.

```text
                         LifePilot
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
      Person 1            Person 2            Person 3
        │                   │                   │
      Tasks              Bills               Records
    Reminders          Subscriptions        Documents
     Calendar                              Vehicles
                                           Warranties
                                          Appointments
        │                   │                   │
        └───────────────────┼───────────────────┘
                            │
                         Person 4
                            │
                    Smart Dashboard
                            │
           ┌────────────────┼────────────────┐
           │                │                │
      Priorities       Recommendations    Analytics
           │                │                │
           └────────────────┼────────────────┘
                            │
                       LifePilot UI
```

---

# 📁 Folder Structure

```text
LifePilot/
│
├── public/
│
├── src/
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   │
│   │   ├── TaskCard.jsx
│   │   ├── TaskForm.jsx
│   │   ├── CalendarView.jsx
│   │   │
│   │   ├── BillCard.jsx
│   │   ├── BillForm.jsx
│   │   ├── SubscriptionCard.jsx
│   │   │
│   │   ├── DocumentCard.jsx
│   │   ├── VehicleCard.jsx
│   │   ├── WarrantyCard.jsx
│   │   ├── AppointmentCard.jsx
│   │   │
│   │   ├── SummaryCard.jsx
│   │   ├── DeadlineList.jsx
│   │   └── RecommendationCard.jsx
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Tasks.jsx
│   │   ├── Calendar.jsx
│   │   ├── Bills.jsx
│   │   ├── Subscriptions.jsx
│   │   ├── Documents.jsx
│   │   ├── Vehicles.jsx
│   │   ├── Warranties.jsx
│   │   ├── Appointments.jsx
│   │   └── Analytics.jsx
│   │
│   ├── utils/
│   │   ├── storage.js
│   │   ├── dateUtils.js
│   │   ├── taskUtils.js
│   │   ├── financeUtils.js
│   │   ├── priorityLogic.js
│   │   ├── deadlineParser.js
│   │   └── recommendationLogic.js
│   │
│   ├── data/
│   │   └── defaultData.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── vite.config.js
└── README.md
```

---

# 💾 Data Storage

LifePilot uses the browser's `localStorage` for storing application data in the prototype.

For example:

```javascript
localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
);
```

To retrieve the stored data:

```javascript
const tasks =
    JSON.parse(localStorage.getItem("tasks")) || [];
```

A common utility file can be used so all modules follow the same storage pattern.

```text
src/utils/storage.js
```

---

# 🔄 Application Flow

The basic data flow of LifePilot is:

```text
User
 ↓
React Form
 ↓
Create / Update Data
 ↓
JavaScript Logic
 ↓
React State
 ↓
localStorage
 ↓
Dashboard / Module
```

### Example — Adding a Bill

```text
User enters bill details
        ↓
Bill Form
        ↓
Create bill object
        ↓
Add bill to bills array
        ↓
Save to localStorage
        ↓
Display Bill Card
        ↓
Update dashboard total
```

---

# 🧩 React Concepts Used

LifePilot demonstrates the following React and JavaScript concepts.

### Components

The interface is divided into reusable components such as:

```text
TaskCard
BillCard
DocumentCard
VehicleCard
AppointmentCard
```

### Props

Props are used to pass data from parent components to reusable child components.

### State

`useState()` is used to manage:

* Tasks.
* Bills.
* Documents.
* Appointments.
* Vehicles.
* Subscriptions.
* User input.

### Effects

`useEffect()` is used for operations such as loading saved information from localStorage.

### Array Methods

JavaScript methods such as:

```text
map()
filter()
reduce()
find()
```

are used for displaying, filtering, searching, and calculating data.

---

# 🗃️ Example Data Structures

## Task

```javascript
{
    id: 1,
    title: "Renew Driving Licence",
    category: "Documents",
    dueDate: "2026-09-20",
    priority: "High",
    completed: false
}
```

## Bill

```javascript
{
    id: 1,
    name: "Electricity",
    amount: 2400,
    dueDate: "2026-08-25",
    status: "Unpaid"
}
```

## Vehicle

```javascript
{
    id: 1,
    name: "Honda Activa",
    registration: "PBXX1234",
    insuranceExpiry: "2027-01-10",
    serviceDate: "2026-09-05"
}
```

## Subscription

```javascript
{
    id: 1,
    name: "Spotify",
    amount: 119,
    cycle: "Monthly",
    renewalDate: "2026-09-03"
}
```

---

# 👥 Team Contribution

## 👤 Member 1 — Tasks, Reminders & Calendar

Responsible for:

* Task CRUD operations.
* Task categories.
* Due dates.
* Reminders.
* Calendar functionality.
* Upcoming and overdue task detection.

---

## 👤 Member 2 — Bills & Subscriptions

Responsible for:

* Bill management.
* Payment status.
* Subscription management.
* Recurring payment calculations.
* Monthly financial summaries.

---

## 👤 Member 3 — Documents, Vehicles, Warranties & Appointments

Responsible for:

* Document management.
* Vehicle information.
* Insurance and service dates.
* Warranty tracking.
* Appointment management.

---

## 👤 Member 4 — Smart Dashboard & Analytics

Responsible for:

* Dashboard.
* Priority prediction.
* Deadline extraction.
* Personalized recommendations.
* Monthly analytics.
* Deadline and notification summaries.

### Shared Team Responsibilities

All four members contribute to:

* UI design.
* Integration.
* Testing.
* Bug fixing.
* Git/GitHub management.
* Final presentation and viva preparation.

---

# 🗓️ Development Roadmap

## E1 — Basic LifePilot

Build:

```text
Dashboard
Tasks
Documents
Reminders
Calendar
```

Focus on:

* React components.
* Forms.
* `useState`.
* Basic navigation.
* CSS.
* Basic data display.

---

## E2 — Complete Life Management

Add:

```text
Bills
Vehicles
Subscriptions
Appointments
Warranties
localStorage
CRUD operations
```

At the end of E2, the main LifePilot modules should be functional.

---

## E3 — Smart LifePilot

Add:

```text
Priority Prediction
Automatic Deadline Extraction
Personalized Recommendations
Monthly Dashboard
Analytics
Notifications
```

The goal of E3 is to transform LifePilot from a simple CRUD application into a smarter personal management system.

---

# 🧪 Testing

The application should be tested for:

* Creating a task.
* Editing a task.
* Deleting a task.
* Completing a task.
* Correct date calculations.
* Detecting overdue tasks.
* Correct bill calculations.
* Correct subscription totals.
* Detecting expiring documents.
* Vehicle service reminders.
* Appointment display.
* Warranty expiry.
* localStorage persistence.
* Dashboard calculations.
* Recommendation conditions.
* Empty states and invalid input.

---

# 🚀 Getting Started

## 1. Clone the repository

```bash
git clone <repository-url>
```

## 2. Open the project

```bash
cd LifePilot
```

## 3. Install dependencies

```bash
npm install
```

## 4. Start the development server

```bash
npm run dev
```

The Vite development server will display the local URL in the terminal.

---

# 🔮 Future Enhancements

Possible future versions of LifePilot can include:

* User authentication.
* Cloud database.
* Multi-device synchronization.
* Email reminders.
* SMS notifications.
* Push notifications.
* Secure document uploads.
* Google Calendar integration.
* Mobile application.
* Real AI assistant.
* Natural-language processing.
* Automatic document scanning.
* Cloud backup.

---

# 🎓 Project Objective

The objective of LifePilot is to create a simple and practical application that helps users manage their everyday administrative responsibilities from one place.

The project combines:

```text
Real-world Problem
        ↓
React Interface
        ↓
JavaScript Logic
        ↓
Data Management
        ↓
Smart Rules
        ↓
Dashboard & Analytics
```

LifePilot demonstrates how basic web technologies can be combined to build a useful productivity application.

---

# 📌 Project Information

**Project Name:** LifePilot
**Project Type:** Personal Productivity / Life Management
**Difficulty:** 5/10
**Frontend:** React
**Languages:** JavaScript, HTML, CSS
**Storage:** Browser localStorage
**Development Tool:** Vite
**Version Control:** Git & GitHub

---

# 📄 License

This project is developed for educational and academic purposes.
