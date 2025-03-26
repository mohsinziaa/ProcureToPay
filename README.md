# Procure to Pay (P2P) System

## Overview
The **Procure to Pay (P2P) System** helps manage the purchase order and payment process. It makes purchasing easier, improves tracking, and ensures smooth communication between departments like Procurement, Finance, Audit, and Accounts.

---

## Features
- **Purchase Requisition (PR):** Users create and submit PRs for approval.
- **Approval Process:** Directors and CFOs review and approve PRs and POs.
- **Purchase Order (PO):** Approved PRs turn into POs and are sent to vendors.
- **Material Receipt Note (MRN):** Tracks received goods from vendors.
- **Invoice Processing:** Vendors submit invoices for payment.
- **ERP Integration:** Automates invoicing and verification.
- **Audit & Compliance:** Ensures proper approvals and document verification.
- **Digital Signatures:** Secure approvals for documents and payments.

---

## Technology Stack
- **Frontend:** Next.js (React)
- **Backend:** Node.js & Express
- **Database:** Microsoft SQL Server (MSSQL)
- **Authentication:** JWT (JSON Web Token)
- **API Testing:** Postman

---

## Project Structure
```
ProcureToPay/
│── client/                # Frontend (Next.js)
│── server/                # Backend (Node.js & Express)
│   ├── API/               # Routes & controllers
│   ├── DAL/               # Database Access Layer (MSSQL)
│   ├── Middleware/        # Error handling & logging
|   │── .env                   # Environment variables (DO NOT SHARE)
|   │── package.json           # Dependencies & scripts
│── .gitignore             # Ignore files (node_modules, logs, .env)
│── README.md              # Project documentation
```

---

## Setup & Installation
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/mohsinziaa/ProcureToPay.git
cd ProcureToPay
```
### 2️⃣ Install Dependencies
```sh
cd server && npm install  # Install backend dependencies
cd client && npm install  # Install frontend dependencies
```
### 3️⃣ Configure Environment Variables
Create a `.env` file and add:
```
PORT=5000
JWT_SECRET=your_secret_key
MSSQL_USER=your_db_user
MSSQL_PASSWORD=your_db_password
MSSQL_SERVER=your_db_server
MSSQL_DATABASE=MATCOAX
```
### 4️⃣ Start the Server
```sh
npm run dev
```
The API will run on **http://localhost:5000**.

---

## 🛠 API Endpoints
### **Authentication**
| Method | Endpoint         | Description                  |
|--------|-----------------|------------------------------|
| POST   | `/api/auth/login` | Login and get JWT token      |

### **Purchase Order**
| Method | Endpoint         | Description                 |
|--------|-----------------|-----------------------------|
| GET    | `/api/viewOrders` | Get all purchase orders     |

---

## 📄 License
This project is licensed under the **MIT License**.
