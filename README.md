# EduManage Pro - School Management System

A comprehensive web-based School Management System with Dynamic Quota Enforcement.

## Features

- **Authentication & Role-Based Access Control (RBAC)**
- **Student Information Management**
- **Staff & Teacher Management**
- **Quota Management Engine (QME)**
- **Academic & Course Management**
- **Attendance Tracking**
- **Gradebook & Assessment**
- **Timetable/Scheduling**
- **Communication Portal**
- **Reporting & Analytics Dashboard**

## Tech Stack

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication
- Bcrypt.js for password hashing

### Frontend
- React.js with Vite
- Modern JavaScript (ES6+)

### DevOps
- Docker for containerization
- Docker Compose for multi-container orchestration

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (v5.0 or higher)
- Docker (optional, for containerization)

## Installation

### Using Docker (Recommended)

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd edumanage-pro
   ```

2. Start the application using Docker Compose:
   ```bash
   docker-compose up -d
   ```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Manual Installation

#### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend/src/config/` directory with the following content:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/edumanagepro
   JWT_SECRET=your_jwt_secret_here
   JWT_EXPIRE=30d
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

#### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```

## API Documentation

The API documentation is available at `/api-docs` when the backend server is running.

## Project Structure

```
edumanage-pro/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── assets/
│   │   └── contexts/
│   └── package.json
├── docs/
├── docker-compose.yml
└── README.md
```

## Environment Variables

### Backend

| Variable | Description | Default |
|----------|-------------|---------|
| NODE_ENV | Environment (development/production) | development |
| PORT | Server port | 5000 |
| MONGO_URI | MongoDB connection string | mongodb://localhost:27017/edumanagepro |
| JWT_SECRET | Secret key for JWT | (required) |
| JWT_EXPIRE | JWT expiration time | 30d |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email [support@edumanagepro.com](mailto:support@edumanagepro.com) or create an issue on GitHub.