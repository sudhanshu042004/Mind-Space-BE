# **Express Auth API** 🚀

A **Node.js** and **Express.js** backend API for user authentication, using **PostgreSQL (Drizzle ORM)**, **Zod for validation**, **JWT for authentication**, and **Bcrypt.js** for password hashing.

## **📌 Features**
✅ User Signup with secure password hashing  
✅ User Login with JWT-based authentication  
✅ Protected Routes with Middleware  
✅ User Profile Fetch & Update  
✅ Cookie-based authentication  

---

## **🚀 Installation & Setup**
### **1️⃣ Clone the Repository**
```sh
git clone <repo-url>
cd <project-folder>
```

### **2️⃣ Install Dependencies**
```sh
bun install
```

### **3️⃣ Set Up Environment Variables**
Create a `.env` file in the root directory and add:

```
DATABASE_URL=your_postgresql_database_url
JWT_PRIVATE_KEY_PATH=src/secret/private.key
JWT_PUBLIC_KEY_PATH=src/secret/public.key
```

### **4️⃣ Generate JWT Keys**
Run the following commands to generate private and public keys:
```sh
openssl genpkey -algorithm RSA -out src/secret/private.key
openssl rsa -pubout -in src/secret/private.key -out src/secret/public.key
```

### **5️⃣ Run the Server**
```sh
bun start
```
Server will start on **`http://localhost:3000`**.

---

## **📌 API Endpoints**
### **🔹 1. Home Route**
```http
GET /
```
**Response:**
```json
{
  "msg": "this is backend point"
}
```

---

### **🔹 2. User Signup**
```http
POST /signup
```
**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```
**Response:**
```json
{
  "message": "user successfully created"
}
```

---

### **🔹 3. User Login**
```http
POST /login
```
**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```
**Response:**
```json
{
  "message": "user successfully login"
}
```
🔹 A JWT token is set as a cookie named **`session`**.

---

### **🔹 4. Get User Profile (Protected)**
```http
GET /user
```
🔐 **Requires authentication** (JWT in cookies)  
**Response:**
```json
{
  "message": "successfully made req",
  "data": {
    "userId": 1,
    "name": "John Doe",
    "avatar": "avatar_url",
    "createdAt": "2024-02-05",
    "email": "john@example.com"
  }
}
```

---

### **🔹 5. Update User Profile (Protected)**
```http
PUT /user
```
**Request Body (Any of these fields):**
```json
{
  "name": "New Name",
  "avatar": "new_avatar_url"
}
```
**Response:**
```json
{
  "message": "user updated"
}
```

---

## **📌 Project Structure**
```
/project-root
│── /src
│   ├── /auth
│   │   ├── login.ts
│   │   ├── signup.ts
│   ├── /user
│   │   ├── getUser.ts
│   ├── /db
│   │   ├── schema.ts
│   ├── /middleware
│   │   ├── index.ts
│   ├── /types
│   │   ├── userTypes.ts
│   ├── /secret
│   │   ├── private.key
│   │   ├── public.key
│── .env
│── package.json
│── server.ts
```

---

## **📌 Technologies Used**
✅ **Node.js & Express.js** - Backend Framework  
✅ **PostgreSQL & Drizzle ORM** - Database & Query Builder  
✅ **Zod** - Input Validation  
✅ **Bcrypt.js** - Password Hashing  
✅ **JWT** - Authentication  

---

## **📌 Future Improvements**
- ✅ Email verification  
- ✅ Password reset functionality  
- ✅ Role-based access control  

---

## **📌 License**
This project is licensed under the **MIT License**.

---

🎉 **Now your API is up and running!** 🚀
