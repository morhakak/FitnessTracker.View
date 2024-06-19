# Fitness Tracker Application

Welcome to the Fitness Tracker application! This project aims to help users manage their workouts, exercises, and sets, with features for user authentication and role management.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Features

- User Authentication (Sign Up, Login, Logout)
- Role Management (Admin and User roles)
- CRUD Operations for Workouts, Exercises, and Sets
- Real-time Like/Dislike feature for workouts
- Toast notifications for successful operations
- Protected routes based on user roles

## Technologies

- **Backend:**
  - ASP.NET Core Web API
  - Entity Framework Core
  - Microsoft Identity
- **Frontend:**
  - React (with hooks and context API)
  - Tailwind CSS for style
  - Sonner for toast notifications
- **Database:**
  - SQL Server

## Installation

### Prerequisites

- .NET 5 SDK or later
- Node.js and npm
- SQL Server

### Backend Setup

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-username/fitness-tracker.git
   cd fitness-tracker/FitnessTracker.WebAPI
   ```

2. **Set up the database connection string in appsettings.json:**

```sh
"ConnectionStrings": {
 "DefaultConnection": "Server=your_server;Database=FitnessTrackerDb;User Id=your_user;Password=your_password;"
}
```

_**Don't forget to add the Audience and the Issuer as the local host.**_

3. **Apply migrations and update the database:**

```sh
dotnet run
```

4. **Run the backend server:**

```sh
dotnet run
```

Frontend Setup

1. _Navigate to the frontend directory:_

```sh
cd ../FitnessTracker.Client
```

2. _Install dependencies:_

```sh
npm install
```

3. _Start the frontend server:_

```sh
npm run dev
```

Usage

**Register:**

- Open the application in your browser: http://localhost:3000
- Click on the "Sign Up" button and create a new account.

**Login**

- Click on the "Login" button and enter your credentials.
  If you are an admin, you will have additional privileges.

- Managing Workouts and Exercises
  After logging in, navigate to the "Workouts" section.
  Create, update, or delete workouts, exercises, and sets.
  Use the like/dislike feature to set favorite workouts.

Admin

Admin Credentials:
Username: _admin_
Password: _AdminPassword123!_

- When logged in as an Admin you can see all the users workouts, each work out with his username creator tag.
- You will have an Admin dashboard view so you can manage users, manage workouts and see app statistics.

**API Endpoints**

_Authentication_

- **POST** /api/auth/login - Login user
- **POST** /api/auth/register - Register user

_Workouts_

- **GET** /api/workouts - Get all workouts
- **GET** /api/workouts/{id} - Get workout by ID
- **POST** /api/workouts - Create a new workout
- **PUT** /api/workouts/{id} - Update a workout
- **DELETE** /api/workouts/{id} - Delete a workout

_Admin's Dashboard_

- **GET** /api/dashboard/users - Get all users
- **DELETE** /api/dashboard/{userId} - Delete a user

Thank you for using the Fitness Tracker application! I hope it helps you stay fit and healthy.
