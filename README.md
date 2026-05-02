# 📓 Student Notes Management System

A full-stack CRUD app built with **Flask + React + MySQL**.

---

## 🗂️ Project Structure

```
student_notes_project/
├── backend/
│   ├── app.py              ← Flask REST API
│   ├── requirements.txt    ← Python dependencies
│   ├── setup.sql           ← Database setup script
│   └── .env                ← DB config (edit this!)
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── api.js
    │   └── components/
    │       ├── NoteForm.jsx
    │       └── NoteCard.jsx
    └── package.json
```

---

## ⚙️ Setup Instructions

### 1. Database (XAMPP)
- Start **XAMPP** → Start **Apache** and **MySQL**
- Open `http://localhost/phpmyadmin`
- Run the contents of `backend/setup.sql` in the SQL tab

### 2. Backend (Flask)
```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Mac/Linux
pip install -r requirements.txt
python app.py
```
API runs at: `http://localhost:5000`

> Edit `.env` if your MySQL password is not empty.

### 3. Frontend (React)
```bash
cd frontend
npm install
npm run dev
```
App runs at: `http://localhost:5173`

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/notes` | Get all notes |
| POST | `/notes` | Create a note |
| PUT | `/notes/<id>` | Update a note |
| DELETE | `/notes/<id>` | Delete a note |

---

## ✨ Features
- Add, view, edit, delete notes
- Search notes by title or content
- Timestamps on each note
- Responsive UI with Tailwind CSS
- Error handling for connection issues
