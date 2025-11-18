# Research Tracker - Frontend

A modern, responsive React application for managing academic research projects, milestones, and documents. This frontend interacts with a Spring Boot JWT-secured backend to provide role-based access control for Admins, Principal Investigators (PIs), and Members.

## 🚀 Features

- **Authentication:** Secure Login and Registration with JWT storage.
- **Role-Based Access Control (RBAC):**
  - **Admins/PIs:** Can create projects, update status, and upload documents.
  - **Members:** Read-only access to projects; can view milestones and documents.
- **Dashboard:** Overview of active projects and quick links.
- **Project Management:**
  - Create new projects with tags and dates.
  - Update project status (Planning -> Active -> Completed).
  - View detailed project summaries.
- **Milestones:** Track critical deadlines and mark them as complete.
- **Documents:** Link external resources (Google Drive/OneDrive) to specific projects.
- **Responsive Design:** Built with React Bootstrap for mobile and desktop compatibility.

## 🛠️ Tech Stack

- **Framework:** React (v18)
- **Language:** TypeScript
- **Routing:** React Router DOM (v6)
- **State Management:** React Context API (for Auth)
- **HTTP Client:** Axios (with Interceptors for JWT injection)
- **Styling:** React Bootstrap & Bootstrap 5
- **Animations:** Framer Motion

## ⚙️ Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone <https://github.com/SachiraJayadewa/ResearchTrackerFrontEnd.git>
   cd research-tracker-frontend
````

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

3.  **Configure Backend:**
    Ensure your Spring Boot backend is running on port `8080`.
    If your backend runs on a different port, update `src/api/axiosConfig.ts`.

4.  **Run the Application:**

    ```bash
    npm start
    ```

    The app will launch at `http://localhost:3000`.

## 🔑 User Roles & Credentials

To test the application, use the following role capabilities:

| Role   | Capabilities |
| :--- | :--- |
| **ADMIN** | Full access: Create/Delete Projects, Manage Users, Update Status. |
| **PI** | Manage own projects, Create Milestones, Upload Documents. |
| **MEMBER** | View Projects, View Milestones, View Documents. |

## 📡 API Endpoints Summary

The frontend communicates with the following backend endpoints:

  - **Auth:** `POST /api/auth/login`, `POST /api/auth/signup`
  - **Projects:** `GET /api/projects`, `POST /api/projects`, `PUT /api/projects/{id}/status`
  - **Milestones:** `GET /api/milestones`, `POST /api/milestones/{projectId}/create/{userId}`
  - **Documents:** `GET /api/documents`, `POST /api/documents/{projectId}/upload/{userId}`

## 📸 Screenshots
View the screenshots folder  research-tracker-frontend\screenshots

----

*Built for CMJD 111 Coursework - Research Management System*

```
```
