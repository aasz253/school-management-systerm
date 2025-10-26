const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');

// Load env vars
dotenv.config({ path: './src/config/config.env' });

// Route files
const auth = require('./src/routes/auth');
const quota = require('./src/routes/quota');
const students = require('./src/routes/students');
const teachers = require('./src/routes/teachers');
const academic = require('./src/routes/academic');
const attendance = require('./src/routes/attendance');
const grades = require('./src/routes/grades');
const timetables = require('./src/routes/timetables');
const communications = require('./src/routes/communications');
const reports = require('./src/routes/reports');

// Error handler
const errorHandler = require('./src/middleware/error');

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Set security headers
app.use(helmet());

// Mount routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/quota', quota);
app.use('/api/v1/students', students);
app.use('/api/v1/teachers', teachers);
app.use('/api/v1/academic', academic);
app.use('/api/v1/attendance', attendance);
app.use('/api/v1/grades', grades);
app.use('/api/v1/timetables', timetables);
app.use('/api/v1/communications', communications);
app.use('/api/v1/reports', reports);

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => {
    process.exit(1);
  });
});