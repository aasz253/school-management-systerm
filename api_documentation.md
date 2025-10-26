# EduManage Pro API Documentation

## Authentication

All API endpoints (except authentication endpoints) require a valid JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

### Register a new user
```
POST /api/v1/auth/register
```

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "string",
  "profile": {
    "firstName": "string",
    "lastName": "string",
    "dateOfBirth": "date",
    "gender": "string",
    "phone": "string"
  }
}
```

### Login
```
POST /api/v1/auth/login
```

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

### Get current user
```
GET /api/v1/auth/me
```

### Update user details
```
PUT /api/v1/auth/updatedetails
```

### Update password
```
PUT /api/v1/auth/updatepassword
```

## Quota Management

### Check quota availability
```
POST /api/v1/quota/check
```

**Request Body:**
```json
{
  "studentId": "string",
  "classId": "string",
  "academicYearId": "string"
}
```

### Enroll student
```
POST /api/v1/quota/enroll
```

**Request Body:**
```json
{
  "studentId": "string",
  "classId": "string",
  "academicYearId": "string"
}
```

### Drop student
```
DELETE /api/v1/quota/enrollments/:id
```

### Get student waitlist status
```
GET /api/v1/quota/waitlist/:studentId
```

### Get quota statistics
```
GET /api/v1/quota/statistics/:schoolId
```

### Get class quota details
```
GET /api/v1/quota/classes/:id
```

### Get subject quota details
```
GET /api/v1/quota/subjects/:id
```

## Students

### Get all students
```
GET /api/v1/students
```

### Get single student
```
GET /api/v1/students/:id
```

### Create new student
```
POST /api/v1/students
```

### Update student
```
PUT /api/v1/students/:id
```

### Delete student
```
DELETE /api/v1/students/:id
```

## Teachers

### Get all teachers
```
GET /api/v1/teachers
```

### Get single teacher
```
GET /api/v1/teachers/:id
```

### Create new teacher
```
POST /api/v1/teachers
```

### Update teacher
```
PUT /api/v1/teachers/:id
```

### Delete teacher
```
DELETE /api/v1/teachers/:id
```

### Assign subject to teacher
```
PUT /api/v1/teachers/:id/assign-subject
```

### Remove subject from teacher
```
PUT /api/v1/teachers/:id/remove-subject
```

## Academic Management

### Academic Years

#### Get all academic years
```
GET /api/v1/academic/years
```

#### Get single academic year
```
GET /api/v1/academic/years/:id
```

#### Create new academic year
```
POST /api/v1/academic/years
```

#### Update academic year
```
PUT /api/v1/academic/years/:id
```

#### Delete academic year
```
DELETE /api/v1/academic/years/:id
```

### Subjects

#### Get all subjects
```
GET /api/v1/academic/subjects
```

#### Get single subject
```
GET /api/v1/academic/subjects/:id
```

#### Create new subject
```
POST /api/v1/academic/subjects
```

#### Update subject
```
PUT /api/v1/academic/subjects/:id
```

#### Delete subject
```
DELETE /api/v1/academic/subjects/:id
```

### Rooms

#### Get all rooms
```
GET /api/v1/academic/rooms
```

#### Get single room
```
GET /api/v1/academic/rooms/:id
```

#### Create new room
```
POST /api/v1/academic/rooms
```

#### Update room
```
PUT /api/v1/academic/rooms/:id
```

#### Delete room
```
DELETE /api/v1/academic/rooms/:id
```

## Attendance

### Get all attendance records
```
GET /api/v1/attendance
```

### Get single attendance record
```
GET /api/v1/attendance/:id
```

### Create new attendance record
```
POST /api/v1/attendance
```

### Update attendance record
```
PUT /api/v1/attendance/:id
```

### Delete attendance record
```
DELETE /api/v1/attendance/:id
```

### Get class attendance summary
```
GET /api/v1/attendance/class/:classId/summary
```

### Get student attendance summary
```
GET /api/v1/attendance/student/:studentId/summary
```

## Grades

### Get all grades
```
GET /api/v1/grades
```

### Get single grade record
```
GET /api/v1/grades/:id
```

### Create new grade record
```
POST /api/v1/grades
```

### Update grade record
```
PUT /api/v1/grades/:id
```

### Delete grade record
```
DELETE /api/v1/grades/:id
```

### Get student grade report
```
GET /api/v1/grades/student/:studentId/report
```

### Get class grade statistics
```
GET /api/v1/grades/class/:classId/statistics
```

## Timetables

### Get all timetables
```
GET /api/v1/timetables
```

### Get single timetable
```
GET /api/v1/timetables/:id
```

### Create new timetable
```
POST /api/v1/timetables
```

### Update timetable
```
PUT /api/v1/timetables/:id
```

### Delete timetable
```
DELETE /api/v1/timetables/:id
```

### Get all slots for a timetable
```
GET /api/v1/timetables/:id/slots
```

### Create new timetable slot
```
POST /api/v1/timetables/:id/slots
```

### Update timetable slot
```
PUT /api/v1/timetables/slots/:id
```

### Delete timetable slot
```
DELETE /api/v1/timetables/slots/:id
```

### Get student timetable
```
GET /api/v1/timetables/student/:studentId
```

### Get teacher timetable
```
GET /api/v1/timetables/teacher/:teacherId
```

## Communications

### Get user notifications
```
GET /api/v1/communications/notifications
```

### Mark notification as read
```
PUT /api/v1/communications/notifications/:id/read
```

### Mark all notifications as read
```
PUT /api/v1/communications/notifications/read-all
```

### Delete notification
```
DELETE /api/v1/communications/notifications/:id
```

### Get user messages
```
GET /api/v1/communications/messages
```

### Get single message
```
GET /api/v1/communications/messages/:id
```

### Send new message
```
POST /api/v1/communications/messages
```

### Reply to message
```
POST /api/v1/communications/messages/:id/reply
```

### Delete message
```
DELETE /api/v1/communications/messages/:id
```

### Get announcements
```
GET /api/v1/communications/announcements
```

### Get single announcement
```
GET /api/v1/communications/announcements/:id
```

### Create announcement
```
POST /api/v1/communications/announcements
```

### Update announcement
```
PUT /api/v1/communications/announcements/:id
```

### Delete announcement
```
DELETE /api/v1/communications/announcements/:id
```

## Reports & Analytics

### Get all reports
```
GET /api/v1/reports
```

### Get single report
```
GET /api/v1/reports/:id
```

### Create new report
```
POST /api/v1/reports
```

### Update report
```
PUT /api/v1/reports/:id
```

### Delete report
```
DELETE /api/v1/reports/:id
```

### Get quota utilization dashboard data
```
GET /api/v1/reports/analytics/quota-utilization
```

### Get performance analytics dashboard data
```
GET /api/v1/reports/analytics/performance
```

### Get attendance analytics dashboard data
```
GET /api/v1/reports/analytics/attendance
```

### Get enrollment trends dashboard data
```
GET /api/v1/reports/analytics/enrollment-trends
```

### Get demographic dashboard data
```
GET /api/v1/reports/analytics/demographics
```

### Generate student list report
```
POST /api/v1/reports/generate/student-list
```

### Generate grade report
```
POST /api/v1/reports/generate/grade-report
```

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "error": "Error message"
}
```

## Success Responses

All success responses follow this format:

```json
{
  "success": true,
  "data": {}
}
```

Or for paginated results:

```json
{
  "success": true,
  "count": 0,
  "pagination": {},
  "data": []
}
```