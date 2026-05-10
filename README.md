# TravelLoop 🌍✈️

A modern AI-inspired travel planning and trip management platform designed to help users organize journeys, manage budgets, track itineraries, maintain travel journals, and explore destinations — all in one seamless experience.

Built for the **Odoo Hackathon 2026** using a modern full-stack architecture powered by **React** and **Supabase**.

---

## 📌 Table of Contents

- Features
- Tech Stack
- Architecture
- Project Structure
- Core Functionalities
- UI/UX Highlights
- Setup Instructions
- Database
- Deployment
- Future Enhancements
- Team
- Hackathon
- License

---

# 🚀 Features

## ✨ Smart Travel Dashboard

- Personalized travel overview
- Upcoming trips tracking
- Budget analytics
- Recent journeys section
- Premium responsive UI

---

## 🧳 Trip Management

- Create new trips
- View all journeys
- Edit trip details
- Delete trips
- Destination-based organization

---

## 💰 Budget Analytics

- Total travel budget tracking
- Expense overview
- Budget visualization
- Trip-wise financial planning

---

## 📝 Journal / Notes

- Maintain travel memories
- Personal travel diary
- Save important notes
- Organize experiences beautifully

---

## 🎒 Packing Checklist

- Smart packing management
- Checklist tracking
- Travel preparation assistant

---

## 🌎 Discover Section

- Explore destinations
- Travel inspiration
- Trending locations
- Premium visual travel cards

---

## 🔐 Authentication

- Secure login/signup
- Session management
- User-based trip storage
- Powered by Supabase Auth

---

# 🛠️ Tech Stack

## Frontend

- React
- Vite
- JavaScript
- CSS3

## Backend & Database

- Supabase
- PostgreSQL

## Authentication

- Supabase Auth

## Deployment Ready

- Vercel / Netlify compatible

---

# 🧠 Architecture

```bash
React Frontend
      ↓
Service Layer
      ↓
Supabase SDK
      ↓
Supabase Backend
      ↓
PostgreSQL Database
```

---

# 📁 Project Structure

```bash
client/
└── src/
    ├── assets/
    ├── components/
    ├── context/
    ├── hooks/
    ├── lib/
    ├── pages/
    ├── services/
    ├── App.jsx
    ├── main.jsx
    └── index.css
```

---

# ⚡ Core Functionalities

## CRUD Operations

TravelLoop supports full CRUD functionality:

- Create Trips
- Read Trips
- Update Trips
- Delete Trips

Integrated directly with Supabase.

---

# 🎨 UI/UX Highlights

- Premium dark travel theme
- Responsive layouts
- Modern SaaS-inspired dashboard
- Smooth interactions
- Elegant typography
- Glassmorphism-inspired cards
- Travel-focused visual storytelling

---

# 🔧 Setup Instructions

## 1. Clone Repository

```bash
git clone <repository-url>
```

---

## 2. Install Dependencies

```bash
cd client
npm install
```

---

## 3. Configure Environment Variables

Create `.env` inside `client/`

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 4. Start Development Server

```bash
npm run dev
```

---

# 🗄️ Database

The application uses:

- Supabase PostgreSQL Database
- Supabase Auth
- Row Level Security (RLS)

Database schema includes:

- trips
- activities
- packing_items
- stops
- journals

---

# 🚀 Deployment

The deployment phase will be completed in the later stages of development.

Planned deployment platforms:

- Frontend deployment using Vercel or Netlify
- Backend and database hosted using Supabase Cloud

The live production deployment will be completed after final testing and optimization.

---

# 📌 Future Enhancements

- AI itinerary recommendations
- Real-time collaboration
- Expense splitting
- Travel maps integration
- Weather forecasting
- Trip sharing
- Image uploads
- Notifications

---

# 👥 Team

## Team Members

### P. Chandrika
- Role: Backend Development
- Responsibilities:
  - Supabase integration
  - Database schema management
  - CRUD operations
  - Authentication flow
  - Backend services implementation

---

### O. V. N. S. S. Anusha
- Role: Frontend Development
- Responsibilities:
  - Dashboard UI
  - Responsive layouts
  - Component design
  - User experience improvements
  - Visual enhancements

---

### P. V. Madhuri
- Role: Integration & Testing
- Responsibilities:
  - Frontend-backend integration
  - Feature testing
  - Debugging
  - Workflow validation
  - System verification

---

## Mentor

### Ronak Bharadiya
- GitHub ID: rmbh-odoo

---

# 🏆 Hackathon

Developed for:

**Odoo Hackathon 2026**

---

# 📄 License

This project is developed for educational and hackathon purposes.
