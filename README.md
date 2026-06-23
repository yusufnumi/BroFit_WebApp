# BroFit - Fitness Center Web Application

![BroFit Logo](https://img.shields.io/badge/BroFit-Fitness%20Center-orange?style=for-the-badge)

## 📋 Project Overview

BroFit is a modern, single-page web application built with React.js that serves as a digital guide for a fitness center. The application provides a comprehensive solution for gym members to view information, book classes, manage memberships, and more - all with a few clicks.

### 👥 Group Information

| Name | Student ID | Role |
|------|------------|------|
| Yusuf Numan Soylu | 230408945 | UI/UX Designer, Component Developer |
| Kadir Gül | 230408053 | Lead Developer, Project Architecture |

## 🎯 Problem Solved

Many fitness centers lack a digital presence, forcing members to handle everything via phone calls or in-person visits. BroFit bridges this gap by providing:

- Easy online class booking
- Digital membership management
- Comprehensive facility information
- 24/7 access to gym resources

## 🚀 Features

### Core Features
- **🏠 Informational Hub**: Home page, About Us, Facilities, and FAQ sections
- **💳 Membership Simulation**: Select and "purchase" membership plans (3/6/12 months)
- **📅 Class Scheduling**: Browse and book fitness classes (Yoga, Cycling, Pilates, Zumba, HIIT, Strength)
- **👤 User Dashboard**: View bookings, membership status, and account information
- **🔐 Authentication**: Register/Login with LocalStorage persistence

### Technical Features
- Responsive design
- Client-side routing with React Router
- Global state management with Context API
- Data persistence with LocalStorage
- Mock payment flow simulation

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React.js 18+ | Core framework |
| React Router DOM v6 | Client-side routing |
| Tailwind CSS | Styling & responsive design |
| Lucide React | Icon library |
| Vite | Build tool & dev server |
| LocalStorage | Data persistence |

## 📁 Project Structure

```
brofitwebapp/
├── public/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx       # Navigation bar
│   │   ├── Footer.jsx       # Site footer
│   │   ├── ClassCard.jsx    # Class display card
│   │   ├── PricingCard.jsx  # Pricing plan card
│   │   └── CheckoutModal.jsx # Payment simulation modal
│   │
│   ├── context/             # React Context providers
│   │   ├── AuthContext.jsx  # Authentication state
│   │   └── BookingContext.jsx # Bookings & membership state
│   │
│   ├── data/               # JSON mock data
│   │   ├── classes.json    # Fitness class schedule
│   │   ├── pricing.json    # Membership plans
│   │   ├── instructors.json # Trainer information
│   │   ├── facilities.json # Gym facilities
│   │   └── faq.json        # FAQ content
│   │
│   ├── pages/              # Page components
│   │   ├── HomePage.jsx    # Landing page
│   │   ├── AboutPage.jsx   # About, facilities
│   │   ├── FAQPage.jsx     # FAQ
│   │   ├── PricingPage.jsx # Membership plans
│   │   ├── ClassesPage.jsx # Class booking
│   │   ├── DashboardPage.jsx # User dashboard
│   │   ├── LoginPage.jsx   # Login form
│   │   └── RegisterPage.jsx # Registration form
│   │
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
│
│
│
│
├── package.json
├── vite.config.js
└── README.md
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Navigate to project directory**
   ```bash
   cd brofitwebapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
```

## 📱 Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing page with features overview |
| `/about` | About | Company info, facilities, trainers, FAQ |
| `/pricing` | Pricing | Membership plans and checkout |
| `/classes` | Classes | Browse and book fitness classes |
| `/dashboard` | Dashboard | User's bookings and membership |
| `/login` | Login | User authentication |
| `/register` | Register | New user registration |

## 🔐 Authentication Flow

1. Users register with name, email, and password
2. Credentials stored in LocalStorage (simulated backend)
3. Login validates against stored credentials
4. Session persists across browser refreshes
5. Protected routes redirect to login if not authenticated

## 💳 Membership & Booking Logic

### Membership
- Three plans: Starter (3 mo), Popular (6 mo), Premium (12 mo)
- Mock checkout process with form validation
- Membership status stored in LocalStorage
- Automatic expiration checking

### Class Booking
- Classes filtered by day, type, and search
- Booking requires active membership
- Double-booking prevention
- Real-time availability display
- Cancel bookings from dashboard

## Github Repository Link
https://github.com/Kadirose05/brofitwebapp
