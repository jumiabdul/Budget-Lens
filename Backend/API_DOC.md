# 🔌 API Endpoints
 
**Base URL:** `http://localhost:4000/api`  
**Auth Header:** `Authorization: Bearer <token>`
 
---

## 🔐 Auth
```
POST  /user/register-user
POST  /user/login-user
GET   /user/get-user
POST  /user/logout-user
PUT   /user/change-password
```
 
## 💳 Transactions
```
GET       /transactions/get-all-transactions
POST      /transactions/add-transaction
PUT       /transactions/edit-transaction/:id
DELETE    /transactions/delete-transaction/:id
DELETE    /transactions/delete-all
```
 
## 💰 Budgets
```
GET    /budgets/get-all-budgets
POST   /budgets/add-budget
PUT    /budgets/edit-budget/:id
DELETE /budgets/delete-budget/:id
DELETE  /budgets/delete-all
```

## 🔢 Status Codes
 
| Code | Meaning |
|------|---------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Server Error |
 
---
