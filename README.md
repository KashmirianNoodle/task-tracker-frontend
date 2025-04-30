# 🖥️ Task Tracker Frontend

Frontend for the Task Tracker Application. This is a single-page React application where users can:

- Sign up / Log in
- View their dashboard with a list of projects
- Create new projects (up to 4 per user)
- Manage tasks within each project (Create, View, Update, Delete)
- Track progress with status updates

---

## 🚀 Features

- React with Hooks and Context API
- JWT-based authentication
- React Router for navigation
- Axios for API communication
- Global auth state handling
- Form validations

---

## 📦 Tech Stack

- **React.js**
- **React Router**
- **Axios**
- **JWT Auth**
- **Vite / Create React App**

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/task-tracker-frontend.git
cd task-tracker-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create a `.env` file in the root directory:

```
VITE_API_BASE_URL=http://localhost:3000
```

> Make sure the backend is running on the configured port.

### 4. Run the App

```bash
npm run dev  # or npm start if using Create React App
```

---

## 📁 Project Structure

```
src/
├── components/        # Reusable components (forms, nav, etc.)
├── pages/             # Page-level components (Login, Signup, Dashboard)
├── services/          # Axios instance and API functions
├── context/           # Global auth state management
├── App.jsx            # Main app with routes
└── main.jsx           # Entry point
```

---

## 🔐 Authentication Flow

- On login/signup, JWT is stored in `localStorage`
- Token is attached in every API request via Axios interceptor
- Protected routes (e.g., dashboard) redirect unauthenticated users to `/login`

---

## 📬 Routes

| Path         | Component    | Description                |
|--------------|--------------|----------------------------|
| `/signup`    | `Signup.jsx` | Register a new user        |
| `/login`     | `Login.jsx`  | Log in an existing user    |
| `/dashboard` | `Dashboard`  | View projects and tasks    |

---

## ✅ Enhancements / TODOs

- Styling with TailwindCSS or Bootstrap
- Task filtering/sorting by status/date
- Project and task pagination
- Dark mode toggle

---

## 🧪 Example Usage

1. Register a new user via `/signup`
2. Log in to receive a JWT token
3. View and manage your projects and tasks in the dashboard

---

## 📄 License

MIT © 2025 Mir Shafeeq