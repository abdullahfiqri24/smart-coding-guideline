# Smart Coding Guideline

## 📌 Overview

**Smart Coding Guideline** is a web-based application designed to help developers follow consistent coding standards, improve code quality, and generate structured development reports.

This application provides:

* 📊 Dashboard monitoring
* 📘 Smart Coding Guidelines documentation
* 📝 Reporting feature
* ⚙️ Settings management
* 🔐 Authentication & logout functionality

---

## 🚀 Tech Stack

### Frontend

* ReactJS
* React Router DOM
* Axios
* Tailwind CSS / CSS Modules *(adjust based on your implementation)*

### Backend *(if available)*

* Node.js / Express.js *(adjust if different)*
* PostgreSQL / MySQL *(adjust if different)*

---

## 📂 Project Structure

```bash
smart-coding-guideline/
│
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── layouts/
│   ├── hooks/
│   ├── utils/
│   ├── App.js
│   └── main.js
│
├── package.json
├── README.md
└── .env
```

---

## ⚙️ Installation Guide

### 1. Clone Repository

```bash
git clone https://github.com/abdullahfiqri24/smart-coding-guideline.git
```

### 2. Navigate to Project Directory

```bash
cd smart-coding-guideline
```

### 3. Install Dependencies

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

---

## ▶️ Running the Project

### Development Mode

```bash
npm run dev
```

or

```bash
npm start
```

The application will run on:

```bash
http://localhost:3000
```

or

```bash
http://localhost:5173
```

(depending on your configuration)

---

## 🏗️ Build for Production

```bash
npm run build
```

---

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:8000/api
```

or for React CRA:

```env
REACT_APP_API_URL=http://localhost:8000/api
```

Adjust based on your backend configuration.

---

## 🎨 Color Palette

| Type       | Color     |
| ---------- | --------- |
| Primary    | `#5b0202` |
| Secondary  | `#daa520` |
| Background | `#080808` |

---

## 📋 Features

* ✅ Dashboard Overview
* ✅ Smart Coding Guidelines Documentation
* ✅ Report Management
* ✅ User Settings
* ✅ Authentication System
* ✅ Responsive UI

---

## 🔐 Authentication

If authentication is enabled:

* Login required to access dashboard
* Session/token-based authentication
* Protected routes

---

## 🧪 Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Run development server   |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run linter               |

---

## 📸 Screenshots

Add screenshots here.

```md
![Dashboard](./screenshots/dashboard.png)
```

---

## 🤝 Contributing

Contributions are welcome.

### Steps:

1. Fork this repository
2. Create a new branch

```bash
git checkout -b feature/your-feature-name
```

3. Commit changes

```bash
git commit -m "Add new feature"
```

4. Push branch

```bash
git push origin feature/your-feature-name
```

5. Create Pull Request

---

## 🛡️ Coding Standards

Please follow these standards:

* Use clean and readable code
* Follow consistent naming conventions
* Separate business logic from UI components
* Avoid duplicated code
* Write reusable components

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Developed by **Abdullah Fiqri**

* GitHub: [https://github.com/abdullahfiqri24](https://github.com/abdullahfiqri24)

---

## ⭐ Support

If you find this project useful, please give it a ⭐ on GitHub.
