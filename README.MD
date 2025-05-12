# Resume Builder Application with AI Content Generation

This project implements a comprehensive resume builder application with AI-powered content generation. Built with **Node.js**, **Express.js**, **MongoDB**, **EJS templates**, and uses **Google's Gemini API** to create professional resume content.

---

## ✨ Features

- **User Authentication**: Secure signup and login functionality with session management
- **AI-Powered Content**: Generate polished professional summaries using Google's Gemini AI
- **Multiple Templates**: Choose from various resume templates that adapt to your content
- **Dynamic Template Selection**: Templates automatically adjust based on available sections
- **Export to DOCX**: Download your resume as a professional Word document
- **Save & Edit**: Save your resume data and update it whenever needed
- **Session Management**: Persistent sessions using MongoDB store
  
---

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Template Engine**: EJS
- **Session Management**: express-session, connect-mongo
- **Password Hashing**: bcrypt.js
- **Document Generation**: Docxtemplater, PizZip
- **AI Content**: Google Generative AI (Gemini API)
- **Environment Variables**: dotenv

---

## 🚀 Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (local setup or MongoDB Atlas)
- Google Generative AI API key

---

## 🛠 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Bhavinsachaniya/Resume-Gen
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Create a `.env` File

Create a `.env` file at the root of your project and add the following:

```env
MONGO_URI=mongodb://localhost:27017/resumedb
Gen_AI_Key=your_gemini_api_key
```

> **Note:**
> - **MONGO_URI** → MongoDB connection URI
> - **Gen_AI_Key** → Google Generative AI API key for Gemini model

---

### 4. MongoDB Setup

#### Local MongoDB:

Make sure MongoDB is installed and running locally.

```bash
mongod
```

#### MongoDB Atlas:

Use a connection string like this:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/resumedb
```

---

### 5. Start the Server

```bash
node index.js
```

The application will be available at:

```bash
http://localhost:3000
```

---

## 📡 API Endpoints

### 1. **User Sign Up**

- **Method**: POST
- **Endpoint**: `/api/Auth/signup`

**Request Body:**

```json
{
  "email": "john@example.com",
  "username": "johndoe",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "User Created Successfully",
  "data": {
    "_id": "<User_ID>",
    "email": "john@example.com",
    "username": "johndoe"
  },
  "redirectTO": "/resumeform"
}
```

---

### 2. **User Login**

- **Method**: POST
- **Endpoint**: `/api/Auth/login`

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login Successfully",
  "data": {
    "_id": "<User_ID>",
    "email": "john@example.com",
    "username": "johndoe"
  },
  "redirectTO": "/resumeupdate"
}
```

---

### 3. **Generate AI Content**

- **Method**: POST
- **Endpoint**: `/api/resumeform/genrateContent`

**Request Body:**

```json
{
  "question": "Developed a full-stack e-commerce platform using React, Node.js, and MongoDB. Implemented user authentication, product inventory, and payment processing.",
  "number": "1"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Answer Generated",
  "answer": "Innovative full-stack developer with expertise in React, Node.js, and MongoDB, specializing in e-commerce solutions with secure payment processing and authentication systems."
}
```

---

### 4. **Save Resume Data**

- **Method**: POST
- **Endpoint**: `/api/resumeform/datasave`

**Request Body:**

```json
{
  "contactfirstname": "John",
  "contactlastname": "Doe",
  "contactcity": "New York",
  "contactpostalcode": "10001",
  "contactphone": "123-456-7890",
  "contactemail": "john@example.com",
  "jobTitle": ["Full Stack Developer"],
  "companyName": ["Tech Company"],
  "expCity": ["New York"],
  "country": ["USA"],
  "startDate": ["2020-01"],
  "endDate": ["2023-05"],
  "descriptions": ["Developed full-stack applications using modern JavaScript frameworks"],
  "eduschool": ["University of Technology"],
  "edudegree": ["Bachelor of Computer Science"],
  "educity": ["Boston"],
  "educountry": ["USA"],
  "edustartdate": ["2016-09"],
  "eduenddate": ["2020-05"],
  "edugpa": ["3.8"],
  "Achievementstitle": ["Top Developer Award"],
  "projecttitle": ["E-commerce Platform"],
  "projectStartDate": ["2022-01"],
  "projectEndDate": ["2022-06"],
  "projectoverview": ["Built a fully functional e-commerce platform with MERN stack"],
  "skill": ["JavaScript", "React", "Node.js", "MongoDB"],
  "hobbies": ["Coding", "Hiking"],
  "abouttext": "Passionate full-stack developer with expertise in JavaScript frameworks"
}
```

**Response:**

```json
{
  "resumeId": "<Resume_ID>",
  "data": {
    "_id": "<Resume_ID>",
    "user": "<User_ID>",
    "firstname": "John",
    "lastname": "Doe",
    "experience": [...],
    "education": [...],
    "skills": [...]
  }
}
```

---

### 5. **Get Resume Data**

- **Method**: GET
- **Endpoint**: `/api/resumeform/Show`

**Response:**

```json
{
  "message": "Success",
  "resume": {
    "_id": "<Resume_ID>",
    "user": "<User_ID>",
    "firstname": "John",
    "lastname": "Doe",
    "city": "New York",
    "postalcode": "10001",
    "phone": "123-456-7890",
    "email": "john@example.com",
    "experience": [...],
    "education": [...],
    "Achievement": [...],
    "Project": [...],
    "skills": [...],
    "hobbies": [...],
    "about": "Passionate full-stack developer with expertise in JavaScript frameworks"
  }
}
```

---

### 6. **Update Resume Data**

- **Method**: POST
- **Endpoint**: `/api/resumeform/update`

**Request Body:**
Same format as the `/datasave` endpoint

**Response:**

```json
{
  "message": "Resume updated successfully",
  "updatedResume": {
    "_id": "<Resume_ID>",
    "user": "<User_ID>",
    "firstname": "John",
    "lastname": "Doe",
    "experience": [...],
    "education": [...]
  }
}
```

---

### 7. **Generate Resume Document**

- **Method**: POST
- **Endpoint**: `/api/resumeform/generate/:resumeId/:templateNumber`

**Parameters:**
- `resumeId`: The ID of the resume to generate
- `templateNumber`: The template number to use (e.g., "1")

**Response:**
A downloadable DOCX file with headers:
- `Content-Disposition`: attachment; filename="generated_resume_John.docx"
- `Content-Type`: application/vnd.openxmlformats-officedocument.wordprocessingml.document
- `X-Message`: Resume generated successfully

---

## 🧪 Testing the API Using Postman

You can test the APIs with Postman:

1. **Sign Up**: `POST /api/Auth/signup`
2. **Login**: `POST /api/Auth/login`
3. **Generate AI Content**: `POST /api/resumeform/genrateContent`
4. **Save Resume**: `POST /api/resumeform/datasave`
5. **Get Resume Data**: `GET /api/resumeform/Show`
6. **Update Resume**: `POST /api/resumeform/update`
7. **Generate DOCX**: `POST /api/resumeform/generate/:resumeId/:templateNumber`

> ✅ Always set the body type to `raw` → `JSON` when sending requests!
> ✅ For testing routes that require authentication, make sure you're logged in first!

---

## 💾 Database Schema

### User Schema
```javascript
{
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true }
}
```

### Resume Schema
```javascript
{
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  city: { type: String, required: true },
  postalcode: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  experience: [{ 
    jobTitle: { type: String },
    companyName: { type: String },
    expCity: { type: String },
    country: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    description: { type: String }
  }],
  education: [{ 
    school: { type: String },
    degree: { type: String },
    city: { type: String },
    country: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    edugpa: { type: String } 
  }],
  Achievement: [{ atitle: { type: String } }],
  Project: [{
    ptitle: { type: String },
    pstartDate: { type: String },
    penddate: { type: String },
    poverview: { type: String }
  }],
  skills: [{ skill: { type: String } }],
  hobbies: [{ hobbies: { type: String } }],
  about: { type: String }
}
```

---

## 🧩 Project Structure

```
resume-builder/
├── css/                       # CSS styles
├── public/                    # Public assets
├── templates/                 # Resume templates (DOCX files)
├── src/
│   ├── Controllers/           # Route controllers
│   │   ├── Login.controller.js
│   │   ├── Signup.controller.js
│   │   ├── logout.controller.js
│   │   ├── resumeAIContentGenrate.controller.js
│   │   ├── resumeDataUpdate.Controller.js
│   │   ├── resumeGenrate.controller.js
│   │   └── resumedataShow.Controller.js
│   ├── Middleware/
│   │   └── isauthenticated.middleware.js
│   ├── Models/
│   │   ├── ResumeSchema.model.js
│   │   └── UserSchema.model.js
│   ├── Routes/
│   │   ├── Auth.Routes.js
│   │   ├── Session.Routes.js
│   │   └── resumeForm.Routes.js
│   └── Utils/
│       └── db.js              # Database connection
├── views/                     # EJS templates
├── .env                       # Environment variables
└── server.js                  # Main application file
```

---

## ⚡ Conclusion

This project offers a complete resume builder solution with AI-powered content generation and professional template options. It demonstrates full-stack development with Node.js, Express, MongoDB, and integration with AI services.

Perfect for job seekers, career changers, and anyone who wants to create a professional resume quickly! 🚀

---

## 🧡 If you find this useful, don't forget to leave a ⭐ on GitHub!

---
