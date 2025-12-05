SkillNest-Project-using-react-and-spring

SkillNest is a full-stack project that includes a React frontend and a Spring Boot backend. The system supports complete CRUD operations (Create, Read, Update, Delete) for managing skills, courses, blogs, users, and payments. The frontend communicates with the backend through REST APIs, providing a clean and user-friendly experience.

🌟 SkillNest Overview

Short Description:
SkillNest is a full-stack CRUD application built with React (frontend) and Spring Boot (backend). It allows users, admins, and learners to manage courses, blogs, skills, and user information efficiently.

🚀 Features

Full CRUD operations (courses, blogs, users)

User authentication (login/signup)

Admin dashboard for management

File/image upload support

REST API communication using Axios

Responsive frontend UI

🛠️ Tech Stack
Frontend

React (Vite)

JavaScript / JSX

CSS

Backend

Spring Boot

Spring MVC

Spring Data JPA

Java

Database

MySQL

Tools

Maven

Node.js + npm

Git

📌 Prerequisites

Make sure you have installed:

Java 17+

Node.js & npm

MySQL Server running

Git installed

⚙️ Frontend Configuration (if API URL is needed)

Open the file:

skillnest-project_new/src/services/api.js


Set:

API_BASE_URL = "http://localhost:8080";

✅ URLs to Verify

Frontend: http://localhost:5173

Backend: http://localhost:8080

Example endpoint:

http://localhost:8080/api/v1/courses

🐞 Troubleshooting

Database errors: Check MySQL credentials in application.properties.

CORS issues: Ensure backend CORS configuration is enabled.

Port already in use: Change server port in backend (application.properties) or frontend (vite.config.js).

Git authentication: Use GitHub Personal Access Token (PAT) instead of password.

👤 Author

Hrishikesh Tappe
GitHub: https://github.com/HrishikeshTappe
