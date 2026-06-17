# Customer Relationship Management (CRM) System

A full-stack Customer Relationship Management (CRM) web application built using Django REST Framework, React.js, and PostgreSQL. The system provides role-based access control for Admin and Staff users, enabling efficient customer management, lead tracking, staff approval workflows, and interaction note management.

## 🚀 Live Demo

**Frontend:**
https://customer-relationship-management-ad.vercel.app

**Backend API:**
https://backend-ly1n.onrender.com

## 📂 GitHub Repository

https://github.com/rishanvc/Customer_Relationship_Management

---

## ✨ Features

### Authentication & Authorization

* Staff registration system
* Admin approval workflow for staff accounts
* Token-based authentication
* Role-based access control (Admin / Staff)
* Protected routes and API endpoints

### Customer Management

* Add customers
* View customer list
* Update customer details
* Delete customers
* Lead status tracking
* Customer assignment to staff

### Staff Management

* View registered staff
* Approve pending staff accounts
* Monitor staff activities

### Interaction Notes

* Add interaction notes for customers
* View customer interaction history
* Track communication records
* Staff-wise note management

### Dashboard Analytics

* Total Customers
* Pending Staff Approvals
* Total Interaction Notes

### User Interface

* Responsive design
* Sidebar navigation
* Dashboard layout
* Modern React component architecture

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Tailwind CSS
* JavaScript

### Backend

* Django
* Django REST Framework
* Token Authentication

### Database

* PostgreSQL

### Deployment

* Vercel (Frontend)
* Render (Backend)
* Render PostgreSQL Database

---

## 📁 Project Structure

```text
Customer_Relationship_Management/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── accounts/
│   ├── customers/
│   ├── interactions/
│   ├── crm_project/
│   ├── manage.py
│   └── requirements.txt
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/rishanvc/Customer_Relationship_Management.git
cd Customer_Relationship_Management
```

### Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
```

Backend runs at:

```text
http://127.0.0.1:8000
```

### Frontend Setup

```bash
cd frontend

npm install

npm start
```

Frontend runs at:

```text
http://localhost:3000
```

---

## 🔐 User Roles

### Admin

* Approve staff registrations
* Manage customers
* Manage staff
* View interaction notes
* Access dashboard analytics

### Staff

* Manage assigned customers
* Add interaction notes
* Track customer interactions


---

## 🎯 Future Enhancements

* Email notifications
* Customer search and filtering
* Advanced analytics dashboard
* Charts and reports
* Activity logs
* Export customer data
* Mobile optimization

---

## 👨‍💻 Developer

**Muhammed Rishan**





