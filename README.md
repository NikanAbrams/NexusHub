# 🌌 NexusHub | Full-Stack Affiliate Management System

![NexusHub Banner](https://img.shields.io/badge/NexusHub-FullStack--Management-38bdf8?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-3.0.0-blue?style=for-the-badge)

NexusHub is a professional-grade, full-stack affiliate management platform. Built for Senior Affiliate Managers, it leverages a modern Node.js backend and a PostgreSQL database to provide a secure, data-driven environment for managing Global Affiliate Networks.

---

## 🚀 Key Features

### 🏛️ Full-Stack Architecture
- **Backend:** Node.js + Express with Prisma ORM.
- **Database:** PostgreSQL for persistent, relational data storage.
- **Authentication:** Secure Login and Registration with password hashing (bcrypt).
- **CRUD Operations:** Full Create, Read, Update, and Delete capabilities for Affiliate partners.

### 📊 Real-Time Analytics
- **Dynamic Data:** Real-time data flowing from PostgreSQL through a RESTful API to the Glassmorphism UI.
- **Performance Tracking:** Detailed metrics on equity, accounts, and growth trends.

### 📣 Communication & Marketing
- **Connection History:** Log and update calls with outcomes and summaries.
- **Marketing Hub:** Track social media engagement metrics.

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, Vanilla CSS3, Vanilla JavaScript (ES6)
- **Backend:** Node.js, Express
- **ORM & Migrations:** Prisma
- **Database:** PostgreSQL
- **Security:** bcrypt

---

## 📂 Project Structure

```text
NexusHub/
├── frontend/               # UI Layer
│   ├── index.html          # Auth Gateway (Login/Register)
│   ├── dashboard.html      # Manager Dashboard
│   ├── assets/             # CSS, JS, Images
│   └── ...                 # Affiliate Detail Views
├── backend/                # API Layer
│   ├── prisma/             # Schema & Migrations
│   ├── routes/             # API Endpoints
│   ├── controllers/        # Business Logic
│   ├── index.js            # Server Entry Point
│   └── .env.example        # Environment Template
├── .gitignore              # Dependency & Secret exclusion
└── README.md
```

---

## 📥 Local Setup

### 1. Database Setup
1. Install **PostgreSQL**.
2. Create a database called `dashboard_db`.
3. Create a user `dashboard_user` with a password.

### 2. Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your `.env` file:
   - Copy `.env.example` to `.env`.
   - Update `DATABASE_URL` with your PostgreSQL credentials.
4. Run migrations:
   ```bash
   npx prisma migrate dev --name init
   ```
5. Start the server:
   ```bash
   npm start
   ```

### 3. Frontend Setup
1. Simply open `frontend/index.html` in your browser.
2. Note: The frontend expects the backend to be running on `http://localhost:3000`.

---

## 📄 License
Distributed under the MIT License.

---

**Developed for the AI Tools Training Program (Week 2)**
*"Bridging the gap between static design and real-world data."*
