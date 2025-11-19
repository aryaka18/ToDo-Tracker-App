# Fullstack Take-Home Test
**Todo Tracker** 

This project is a **Todo Tracker Application** built as part of a take-home test for an Intern Software Engineer position. It includes a **Node.js + Express + Sequelize backend**, **Next.js (App Router) frontend** and **React.JS** for some icon with **Tailwind CSS**.

---

## Tech Stack

### Backend
- Node.js (ECMAScript)
- Express.js
- Sequelize ORM
- SQLite
- Sequelize CLI (models & migrations)

### Frontend
- Next.js (App Router)
- React.js (icon)
- Tailwind CSS

---

## 🔧 Backend API

### Todo Fields
- `id` — auto-increment
- `title` — string, required
- `description` — string, optional
- `completed` — boolean, default false

### REST Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/todos` | Get all todos |
| POST | `/todos` | Create new todo |
| PUT | `/todos/:id` | Update a todo |
| DELETE | `/todos/:id` | Delete a todo |

### Backend Features
- Sequelize models & migrations
- Validation & error handling
- Clean & structured REST API
- Comment included to understand what the code do: `// sequelize validation error `

---

## Frontend Features

The frontend built with Next.js provides:

- Display all todos
- Add a new todo
- Mark todo as completed
- Delete todo
- Filter Tabs (All, Active, Completed)
- Integration with the backend API

---
## ▶️ How to Run the Project

### Backend
```bash
    cd backend
    npm install
    npx sequelize-cli db:migrate
    npm run dev
```
### Frontend
```bash
    cd frontend
    npm install
    npm run dev
```
---
### 🧠 Design Decisions

**Sequelize + SQLite**

SQLite is lightweight and perfect for fast development. Sequelize supports structured migrations and clean ORM usage.

**RESTful API**

Follows standard REST patterns for clean integration between backend and frontend.

**Layered Architecture**

Organizing the backend into controllers, routes, and models creates maintainable and testable code.

---
## 📈 Possible Improvements
- Improve UI/UX with animations
- New features:
    - Authentication
    - Add attachments (pdf, docx, png, jpg, etc) to understand what needs to be done.
    - Add start date and due date
    - Notification if the task approaching the due date
    - Add dark mode toogle 
    
---
## Thank you

Best Regards

Muhamad Aryaka