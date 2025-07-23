# 🛠️ Bynry Backend Case Study Submission

This repository contains my submission for the Backend Engineering Intern case study at **Bynry Inc**. The goal of this case study is to demonstrate my backend skills through debugging, database design, and implementing a low-stock alert API.

---

## 📚 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Directory Structure](#directory-structure)
- [How to Run](#how-to-run)
- [API Endpoint](#api-endpoint)
- [Assumptions](#assumptions)
- [Notes](#notes)

---

## 📌 Overview

This project consists of:

1. **Code Review & Fix** for a broken product creation API
2. **Database Design** for an inventory management system
3. **Low Stock Alert API** built with Node.js and MySQL

---

## 💻 Tech Stack

- Node.js
- Express.js
- MySQL
- MySQL2 (DB driver)
- dotenv (for environment variables)
- REST API

---

## 📁 Directory Structure

```
Case_Study/
│
├── part_1/                      # Part 1: Debugging and Code Review
│   ├── Issues_and_Impact.txt    # List of issues and their impact
│   └── part1.py                 # Fixed code for product creation API
│
├── part_2/                      # Part 2: Database Design
│   ├── part2.sql                # MySQL schema for inventory system
│   └── Questions_Choices.txt    # Design decisions and missing questions
│
├── part_3/                      # Part 3: Low-Stock Alert API
│   ├── index.js                 # Express API implementation (Node.js + MySQL)
│   └── Info.txt                 # Assumptions and logic explanation
├── package-lock.json            
├── package.json                 
└── Readme.md                    

```
---

## 🚀 How to Run

### 1. Clone the repo
```bash
git clone https://github.com/your-username/bynry-backend-case-study.git
cd bynry-backend-case-study
```

## Install Dependencies
```bash
npm install
```

## Set up your MySQL database
Create a database named inventory_system
Import the schema:
```bash
mysql -u root -p inventory_system < schema.sql
```

## Add a .env file
Create a .env file in the root directory:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=inventory_system
DB_PORT=3306
```

## Start the server
```bash
node index.js
Server runs at: http://localhost:3000
```

---
## 📡 API Endpoint
GET /api/companies/:company_id/alerts/low-stock
Returns a list of products that are low in stock, have had recent sales, and includes supplier info for reordering.

✅ Example Response:
```json
{
  "alerts": [
    {
      "product_id": 101,
      "product_name": "USB Cable",
      "sku": "USB-C-001",
      "warehouse_id": 3,
      "warehouse_name": "Pune Warehouse",
      "current_stock": 5,
      "threshold": 20,
      "days_until_stockout": 7,
      "supplier": {
        "id": 15,
        "name": "TechVendor Inc",
        "contact_email": "orders@techvendor.com"
      }
    }
  ],
  "total_alerts": 1
}
```
---

## 🧠 Assumptions
- product_thresholds table holds stock threshold per product
- sales table has product_id and sale_date
- Only one supplier shown per product for now
- Sales activity is considered "recent" if it occurred within the last 30 days
- days_until_stockout is hardcoded to 7 (could be improved with actual sales rate)

---
## 📝 Notes
- I kept the API logic simple and step-by-step to match my current junior-level experience.
.env is excluded from GitHub for security.

- This project is beginner-friendly but can be optimized for better performance and scalability later.

---
## 🙌 Thank You!
- Thanks for reviewing my submission. I look forward to discussing this further in the live session.