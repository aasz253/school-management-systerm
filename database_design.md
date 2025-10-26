# EduManage Pro - Database Design Document

## Overview
This document outlines the database schema for EduManage Pro, a comprehensive school management system with a focus on the Quota Management Engine (QME).

## Database Technology
- **Primary Database**: MongoDB (NoSQL) for flexibility and scalability
- **Secondary Storage**: Redis for caching quota data and session management

## Collections Schema

### 1. Users Collection
Stores all system users with role-based access control.

```javascript
{
  _id: ObjectId,
  username: String, // Unique
  email: String, // Unique
  password: String, // Hashed
  role: String, // "super_admin", "admin", "teacher", "student", "parent"
  profile: {
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    gender: String,
    phone: String,
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String
    }
  },
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 2. Schools Collection
Stores school information and global settings.

```javascript
{
  _id: ObjectId,
  name: String,
  code: String, // Unique identifier
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  contact: {
    phone: String,
    email: String,
    website: String
  },
  establishedDate: Date,
  principal: String,
  accreditation: String,
  settings: {
    academicYearStart: Date,
    academicYearEnd: Date,
    maxClassSize: Number,
    defaultLanguage: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

### 3. AcademicYears Collection
Manages academic years and terms.

```javascript
{
  _id: ObjectId,
  schoolId: ObjectId, // Reference to Schools
  name: String, // e.g., "2025-2026"
  startDate: Date,
  endDate: Date,
  terms: [
    {
      name: String, // e.g., "Fall Term", "Spring Term"
      startDate: Date,
      endDate: Date,
      isActive: Boolean
    }
  ],
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 4. Classes Collection
Represents class sections with quota management.

```javascript
{
  _id: ObjectId,
  schoolId: ObjectId, // Reference to Schools
  academicYearId: ObjectId, // Reference to AcademicYears
  name: String, // e.g., "Grade 10-A"
  code: String, // Unique identifier
  description: String,
  gradeLevel: String,
  section: String,
  classTeacherId: ObjectId, // Reference to Users (teacher)
  subjectId: ObjectId, // Reference to Subjects
  roomId: ObjectId, // Reference to Rooms
  schedule: {
    days: [String], // e.g., ["Monday", "Wednesday", "Friday"]
    startTime: String, // e.g., "09:00"
    endTime: String, // e.g., "10:00"
    duration: Number // in minutes
  },
  quota: {
    maxStudents: Number, // Maximum students allowed
    currentStudents: Number, // Current enrollment count
    isFull: Boolean // Automatically calculated
  },
  status: String, // "active", "inactive", "archived"
  createdAt: Date,
  updatedAt: Date
}
```

### 5. Students Collection
Extended student information beyond basic user profile.

```javascript
{
  _id: ObjectId,
  userId: ObjectId, // Reference to Users
  schoolId: ObjectId, // Reference to Schools
  studentId: String, // Unique student identifier
  admissionDate: Date,
  enrollmentStatus: String, // "enrolled", "graduated", "transferred", "suspended"
  guardianInfo: {
    fatherName: String,
    motherName: String,
    guardianPhone: String,
    guardianEmail: String,
    relationship: String
  },
  emergencyContact: {
    name: String,
    phone: String,
    relationship: String
  },
  medicalInfo: {
    bloodGroup: String,
    allergies: [String],
    medicalConditions: [String],
    medications: [String]
  },
  previousSchool: String,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 6. Enrollments Collection
Tracks student enrollments in classes with quota validation.

```javascript
{
  _id: ObjectId,
  studentId: ObjectId, // Reference to Students
  classId: ObjectId, // Reference to Classes
  academicYearId: ObjectId, // Reference to AcademicYears
  enrollmentDate: Date,
  status: String, // "enrolled", "waitlisted", "dropped", "completed"
  waitlistPosition: Number, // If waitlisted
  quotaCheckResult: {
    wasQuotaAvailable: Boolean,
    quotaType: String, // "class", "course", "elective"
    quotaDetails: {
      maxAllowed: Number,
      currentCount: Number
    }
  },
  droppedDate: Date, // If dropped
  completionStatus: String, // "in_progress", "passed", "failed"
  createdAt: Date,
  updatedAt: Date
}
```

### 7. Subjects Collection
Academic subjects offered by the school.

```javascript
{
  _id: ObjectId,
  schoolId: ObjectId, // Reference to Schools
  code: String, // Unique subject code
  name: String, // e.g., "Mathematics", "Advanced Physics"
  description: String,
  department: String,
  credits: Number,
  quota: {
    maxStudents: Number, // Overall capacity for this subject
    currentStudents: Number, // Current enrollment across all sections
    isFull: Boolean // Automatically calculated
  },
  prerequisites: [ObjectId], // References to other Subjects
  electiveGroup: String, // e.g., "Science", "Arts", "Languages"
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 8. Teachers Collection
Extended teacher information beyond basic user profile.

```javascript
{
  _id: ObjectId,
  userId: ObjectId, // Reference to Users
  schoolId: ObjectId, // Reference to Schools
  employeeId: String, // Unique employee identifier
  hireDate: Date,
  department: String,
  qualification: String,
  specialization: String,
  experience: Number, // Years
  employmentStatus: String, // "full_time", "part_time", "contract"
  subjects: [ObjectId], // References to Subjects that teacher can teach
  maxWorkload: Number, // Maximum hours per week
  currentWorkload: Number, // Current assigned hours
  createdAt: Date,
  updatedAt: Date
}
```

### 9. Attendance Collection
Daily attendance records.

```javascript
{
  _id: ObjectId,
  studentId: ObjectId, // Reference to Students
  classId: ObjectId, // Reference to Classes
  date: Date,
  status: String, // "present", "absent", "late", "excused"
  remarks: String,
  recordedBy: ObjectId, // Reference to Users (teacher)
  recordedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### 10. Grades Collection
Student grades and assessments.

```javascript
{
  _id: ObjectId,
  studentId: ObjectId, // Reference to Students
  classId: ObjectId, // Reference to Classes
  subjectId: ObjectId, // Reference to Subjects
  academicYearId: ObjectId, // Reference to AcademicYears
  assessmentType: String, // "assignment", "quiz", "exam", "project"
  assessmentName: String, // e.g., "Midterm Exam"
  date: Date,
  maxMarks: Number,
  obtainedMarks: Number,
  grade: String, // e.g., "A+", "B", etc.
  weightage: Number, // Percentage weight in final grade
  remarks: String,
  recordedBy: ObjectId, // Reference to Users (teacher)
  recordedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### 11. Rooms Collection
Physical classroom rooms with capacity management.

```javascript
{
  _id: ObjectId,
  schoolId: ObjectId, // Reference to Schools
  name: String, // e.g., "Room 101"
  code: String, // Unique identifier
  capacity: Number, // Maximum occupancy
  type: String, // "classroom", "lab", "auditorium", "gym"
  facilities: [String], // e.g., ["projector", "ac", "smart_board"]
  status: String, // "available", "occupied", "maintenance"
  createdAt: Date,
  updatedAt: Date
}
```

### 12. QuotaRules Collection
Centralized quota management rules.

```javascript
{
  _id: ObjectId,
  schoolId: ObjectId, // Reference to Schools
  name: String, // e.g., "Standard Class Size Rule"
  description: String,
  type: String, // "class", "course", "elective_group"
  targetId: ObjectId, // Reference to Classes, Subjects, or identifier for elective groups
  quotaType: String, // "fixed_number", "percentage"
  quotaValue: Number, // Actual number or percentage
  isActive: Boolean,
  createdBy: ObjectId, // Reference to Users (admin/super_admin)
  createdAt: Date,
  updatedAt: Date
}
```

### 13. Waitlists Collection
Manages student waitlists for full classes/courses.

```javascript
{
  _id: ObjectId,
  studentId: ObjectId, // Reference to Students
  targetId: ObjectId, // Reference to Classes or Subjects
  targetType: String, // "class", "course"
  requestedAt: Date,
  position: Number, // Position in waitlist
  status: String, // "waiting", "notified", "enrolled", "cancelled"
  notifiedAt: Date, // When student was notified about availability
  expiresAt: Date, // When waitlist position expires
  createdAt: Date,
  updatedAt: Date
}
```

### 14. Notifications Collection
System notifications and alerts.

```javascript
{
  _id: ObjectId,
  recipientId: ObjectId, // Reference to Users
  type: String, // "quota_full", "waitlist_available", "grade_posted", etc.
  title: String,
  message: String,
  priority: String, // "low", "medium", "high", "urgent"
  isRead: Boolean,
  relatedEntity: {
    id: ObjectId, // Reference to related entity
    type: String // "class", "subject", "grade", etc.
  },
  createdAt: Date,
  readAt: Date
}
```

## Indexes for Performance

To ensure optimal performance, especially for quota checks and enrollment operations, the following indexes should be created:

1. **Users Collection**:
   - `username` (unique)
   - `email` (unique)
   - `role`

2. **Classes Collection**:
   - `schoolId`
   - `academicYearId`
   - `subjectId`
   - `quota.isFull`

3. **Enrollments Collection**:
   - `studentId`
   - `classId`
   - `academicYearId`
   - `status`

4. **Subjects Collection**:
   - `schoolId`
   - `code` (unique)
   - `quota.isFull`
   - `electiveGroup`

5. **QuotaRules Collection**:
   - `schoolId`
   - `type`
   - `targetId`

## Quota Management Engine (QME) Implementation Details

The QME will utilize database-level constraints and application-level logic to ensure quota enforcement:

1. **Atomic Operations**: Enrollment operations will use atomic updates to prevent race conditions.

2. **Real-time Checks**: Before any enrollment, the system will perform these checks:
   - Class-level quota
   - Subject-level quota
   - Elective group quota (if applicable)

3. **Transaction Support**: Multi-step operations (like moving a student from waitlist to enrolled) will use database transactions.

4. **Caching Layer**: Frequently accessed quota data will be cached in Redis for faster retrieval.

5. **Background Jobs**: Automated processes will monitor quotas and send notifications when thresholds are reached.