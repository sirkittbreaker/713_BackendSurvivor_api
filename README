# Student Mentor System API

A backend API for managing academic student-mentor relationships, built with Node.js, Prisma, and MySQL.

## Overview

This system allows for managing relationships between students and teachers in an academic environment, including:

- User authentication with role-based access (Admin, Teacher, Student)
- Department and academic position management
- Student-teacher assignment
- Commenting system with nested replies
- Announcement publishing by teachers

## Features

- 🔐 **User Management**: Role-based authentication and authorization
- 👩‍🏫 **Academic Profiles**: Manage teacher and student profiles
- 🏢 **Department Structure**: Organize users by department
- 💬 **Communication**: Comment system with threaded replies
- 📢 **Announcements**: Post important updates for students

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js (14.x or higher)
- npm or yarn

### Installation

1. Clone this repository:

   ```bash
   git clone <repository-url>
   cd 713_BackendSurvivor_api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the database containers:

   ```bash
   docker-compose up -d
   ```

4. Make sure your `.env` file is configured:

   ```
   DATABASE_URL="mysql://root:rootpassword@localhost:3306/student_mentor_db?schema=public"
   ```

5. Initialize the database with Prisma:

   ```bash
   npx prisma migrate dev --name init
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

### Database Access

- **MySQL**: Available at `localhost:3306`

  - Username: `root`
  - Password: `rootpassword`

- **phpMyAdmin**: Access at `http://localhost:9000`
  - Username: `root`
  - Password: `rootpassword`

## Project Structure

```
713_BackendSurvivor_api/
├── prisma/
│   └── schema.prisma    # Database schema definition
├── src/
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Authentication middleware
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   └── index.js         # Application entry point
├── .env                 # Environment variables
├── .gitignore           # Git ignore file
├── docker-compose.yml   # Docker configuration
├── package.json         # Node.js dependencies
└── README.md            # This file
```

## API Endpoints

### Authentication

### Users

### Teachers

### Students

### Departments

### Comments

### Announcements

## Development

### Useful Commands

- Generate Prisma client:

  ```bash
  npx prisma generate
  ```

- Create a migration:

  ```bash
  npx prisma migrate dev --name <migration-name>
  ```

- Reset database:

  ```bash
  npx prisma migrate reset
  ```

- Explore database with Prisma Studio:
  ```bash
  npx prisma studio
  ```

## License

[MIT License](LICENSE)

## Contributors

- [Your Name]
- [Other Contributors]
