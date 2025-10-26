# Database Schema Documentation

## Overview

EduManage Pro uses MongoDB as its primary database with a document-based schema design. This document provides detailed information about each collection and their relationships.

## Collections

### Users
Stores all system users with role-based access control.

**Fields:**
- `_id`: ObjectId (Primary Key)
- `username`: String (Unique)
- `email`: String (Unique)
- `password`: String (Hashed)
- `role`: String (Enum: super_admin, admin, teacher, student, parent)
- `profile`: Object
  - `firstName`: String
  - `lastName`: String
  - `dateOfBirth`: Date
  - `gender`: String (Enum: male, female, other)
  - `phone`: String
  - `address`: Object
    - `street`: String
    - `city`: String
    - `state`: String
    - `zipCode`: String
    - `country`: String
- `isActive`: Boolean
- `createdAt`: Date
- `updatedAt`: Date

### Students
Extended student information beyond basic user profile.

**Fields:**
- `_id`: ObjectId (Primary Key)
- `userId`: ObjectId (Reference to Users, Unique)
- `schoolId`: ObjectId (Reference to Schools)
- `studentId`: String (Unique)
- `admissionDate`: Date
- `enrollmentStatus`: String (Enum: enrolled, graduated, transferred, suspended, expelled)
- `guardianInfo`: Object
  - `fatherName`: String
  - `motherName`: String
  - `guardianPhone`: String
  - `guardianEmail`: String
  - `relationship`: String
- `emergencyContact`: Object
  - `name`: String
  - `phone`: String
  - `relationship`: String
- `medicalInfo`: Object
  - `bloodGroup`: String (Enum: A+, A-, B+, B-, AB+, AB-, O+, O-)
  - `allergies`: Array of Strings
  - `medicalConditions`: Array of Strings
  - `medications`: Array of Strings
- `previousSchool`: String
- `notes`: String
- `createdAt`: Date
- `updatedAt`: Date

### Teachers
Extended teacher information beyond basic user profile.

**Fields:**
- `_id`: ObjectId (Primary Key)
- `userId`: ObjectId (Reference to Users, Unique)
- `schoolId`: ObjectId (Reference to Schools)
- `employeeId`: String (Unique)
- `hireDate`: Date
- `department`: String
- `qualification`: String
- `specialization`: String
- `experience`: Number (Years)
- `employmentStatus`: String (Enum: full_time, part_time, contract, temporary)
- `subjects`: Array of ObjectIds (References to Subjects)
- `maxWorkload`: Number (Maximum teaching hours per week)
- `currentWorkload`: Number (Current assigned teaching hours)
- `createdAt`: Date
- `updatedAt`: Date

### Schools
Stores school information and global settings.

**Fields:**
- `_id`: ObjectId (Primary Key)
- `name`: String
- `code`: String (Unique)
- `address`: Object
  - `street`: String
  - `city`: String
  - `state`: String
  - `zipCode`: String
  - `country`: String
- `contact`: Object
  - `phone`: String
  - `email`: String
  - `website`: String
- `establishedDate`: Date
- `principal`: String
- `accreditation`: String
- `settings`: Object
  - `academicYearStart`: Date
  - `academicYearEnd`: Date
  - `maxClassSize`: Number
  - `defaultLanguage`: String
- `createdAt`: Date
- `updatedAt`: Date

### AcademicYears
Manages academic years and terms.

**Fields:**
- `_id`: ObjectId (Primary Key)
- `schoolId`: ObjectId (Reference to Schools)
- `name`: String (e.g., "2025-2026")
- `startDate`: Date
- `endDate`: Date
- `terms`: Array of Objects
  - `name`: String (e.g., "Fall Term", "Spring Term")
  - `startDate`: Date
  - `endDate`: Date
  - `isActive`: Boolean
- `isActive`: Boolean
- `createdAt`: Date
- `updatedAt`: Date

### Classes
Represents class sections with quota management.

**Fields:**
- `_id`: ObjectId (Primary Key)
- `schoolId`: ObjectId (Reference to Schools)
- `academicYearId`: ObjectId (Reference to AcademicYears)
- `name`: String (e.g., "Grade 10-A")
- `code`: String (Unique)
- `description`: String
- `gradeLevel`: String
- `section`: String
- `classTeacherId`: ObjectId (Reference to Users/Teachers)
- `subjectId`: ObjectId (Reference to Subjects)
- `roomId`: ObjectId (Reference to Rooms)
- `schedule`: Object
  - `days`: Array of Strings (Enum: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday)
  - `startTime`: String (Format: "HH:MM")
  - `endTime`: String (Format: "HH:MM")
  - `duration`: Number (In minutes)
- `quota`: Object
  - `maxStudents`: Number (Maximum students allowed)
  - `currentStudents`: Number (Current enrollment count)
  - `isFull`: Boolean (Automatically calculated)
- `status`: String (Enum: active, inactive, archived)
- `createdAt`: Date
- `updatedAt`: Date

### Subjects
Academic subjects offered by the school.

**Fields:**
- `_id`: ObjectId (Primary Key)
- `schoolId`: ObjectId (Reference to Schools)
- `code`: String (Unique)
- `name`: String (e.g., "Mathematics", "Advanced Physics")
- `description`: String
- `department`: String
- `credits`: Number
- `quota`: Object
  - `maxStudents`: Number (Overall capacity for this subject)
  - `currentStudents`: Number (Current enrollment across all sections)
  - `isFull`: Boolean (Automatically calculated)
- `prerequisites`: Array of ObjectIds (References to other Subjects)
- `electiveGroup`: String (e.g., "Science", "Arts", "Languages")
- `isActive`: Boolean
- `syllabus`: String (URL or reference to syllabus document)
- `evaluationCriteria`: String
- `createdAt`: Date
- `updatedAt`: Date

### Rooms
Physical classroom rooms with capacity management.

**Fields:**
- `_id`: ObjectId (Primary Key)
- `schoolId`: ObjectId (Reference to Schools)
- `name`: String (e.g., "Room 101")
- `code`: String (Unique)
- `capacity`: Number (Maximum occupancy)
- `type`: String (Enum: classroom, lab, auditorium, gym, office, other)
- `facilities`: Array of Strings (e.g., "projector", "ac", "smart_board")
- `status`: String (Enum: available, occupied, maintenance)
- `createdAt`: Date
- `updatedAt`: Date

### Enrollments
Tracks student enrollments in classes with quota validation.

**Fields:**
- `_id`: ObjectId (Primary Key)
- `studentId`: ObjectId (Reference to Students)
- `classId`: ObjectId (Reference to Classes)
- `academicYearId`: ObjectId (Reference to AcademicYears)
- `enrollmentDate`: Date
- `status`: String (Enum: enrolled, waitlisted, dropped, completed)
- `waitlistPosition`: Number (If waitlisted)
- `quotaCheckResult`: Object
  - `wasQuotaAvailable`: Boolean
  - `quotaType`: String (Enum: class, course, elective)
  - `quotaDetails`: Object
    - `maxAllowed`: Number
    - `currentCount`: Number
- `droppedDate`: Date (If dropped)
- `completionStatus`: String (Enum: in_progress, passed, failed)
- `createdAt`: Date
- `updatedAt`: Date

### Waitlists
Manages student waitlists for full classes/courses.

**Fields:**
- `_id`: ObjectId (Primary Key)
- `studentId`: ObjectId (Reference to Students)
- `targetId`: ObjectId (Reference to Classes or Subjects)
- `targetType`: String (Enum: class, course)
- `requestedAt`: Date
- `position`: Number (Position in waitlist)
- `status`: String (Enum: waiting, notified, enrolled, cancelled)
- `notifiedAt`: Date (When student was notified about availability)
- `expiresAt`: Date (When waitlist position expires)
- `createdAt`: Date
- `updatedAt`: Date

### Attendance
Daily attendance records.

**Fields:**
- `_id`: ObjectId (Primary Key)
- `studentId`: ObjectId (Reference to Students)
- `classId`: ObjectId (Reference to Classes)
- `date`: Date
- `status`: String (Enum: present, absent, late, excused)
- `remarks`: String
- `recordedBy`: ObjectId (Reference to Users/Teachers)
- `recordedAt`: Date
- `createdAt`: Date
- `updatedAt`: Date

### Grades
Student grades and assessments.

**Fields:**
- `_id`: ObjectId (Primary Key)
- `studentId`: ObjectId (Reference to Students)
- `classId`: ObjectId (Reference to Classes)
- `subjectId`: ObjectId (Reference to Subjects)
- `academicYearId`: ObjectId (Reference to AcademicYears)
- `assessmentType`: String (Enum: assignment, quiz, exam, project, participation, other)
- `assessmentName`: String (e.g., "Midterm Exam")
- `date`: Date
- `maxMarks`: Number
- `obtainedMarks`: Number
- `grade`: String (e.g., "A+", "B", etc.)
- `weightage`: Number (Percentage weight in final grade)
- `remarks`: String
- `recordedBy`: ObjectId (Reference to Users/Teachers)
- `recordedAt`: Date
- `createdAt`: Date
- `updatedAt`: Date

### Timetables
Academic timetables/schedules.

**Fields:**
- `_id`: ObjectId (Primary Key)
- `schoolId`: ObjectId (Reference to Schools)
- `academicYearId`: ObjectId (Reference to AcademicYears)
- `name`: String (e.g., "Fall 2025 Schedule")
- `description`: String
- `startDate`: Date
- `endDate`: Date
- `isActive`: Boolean
- `createdBy`: ObjectId (Reference to Users)
- `createdAt`: Date
- `updatedAt`: Date

### TimetableSlots
Individual schedule entries within a timetable.

**Fields:**
- `_id`: ObjectId (Primary Key)
- `timetableId`: ObjectId (Reference to Timetables)
- `classId`: ObjectId (Reference to Classes)
- `teacherId`: ObjectId (Reference to Teachers)
- `subjectId`: ObjectId (Reference to Subjects)
- `roomId`: ObjectId (Reference to Rooms)
- `dayOfWeek`: String (Enum: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday)
- `startTime`: String (Format: "HH:MM")
- `endTime`: String (Format: "HH:MM")
- `duration`: Number (In minutes)
- `recurrence`: String (Enum: weekly, biweekly, monthly, once)
- `notes`: String
- `createdAt`: Date
- `updatedAt`: Date

### Notifications
System notifications and alerts.

**Fields:**
- `_id`: ObjectId (Primary Key)
- `recipientId`: ObjectId (Reference to Users)
- `senderId`: ObjectId (Reference to Users)
- `type`: String (Enum: quota_full, waitlist_available, grade_posted, attendance_alert, announcement, message, reminder, system_alert)
- `title`: String
- `message`: String
- `priority`: String (Enum: low, medium, high, urgent)
- `isRead`: Boolean
- `relatedEntity`: Object
  - `id`: ObjectId (Reference to related entity)
  - `type`: String (Enum: class, subject, grade, attendance, announcement, message)
- `readAt`: Date
- `createdAt`: Date
- `updatedAt`: Date

### Messages
Internal messaging system.

**Fields:**
- `_id`: ObjectId (Primary Key)
- `senderId`: ObjectId (Reference to Users)
- `recipientIds`: Array of ObjectIds (References to Users)
- `subject`: String
- `content`: String
- `messageType`: String (Enum: individual, group, broadcast)
- `isReadBy`: Array of ObjectIds (References to Users)
- `parentId`: ObjectId (Reference to Messages, for threaded conversations)
- `attachments`: Array of Objects
  - `fileName`: String
  - `fileUrl`: String
  - `fileType`: String
- `isDeleted`: Boolean
- `deletedBy`: Array of ObjectIds (References to Users)
- `createdAt`: Date
- `updatedAt`: Date

### Announcements
School-wide announcements and notices.

**Fields:**
- `_id`: ObjectId (Primary Key)
- `title`: String
- `content`: String
- `authorId`: ObjectId (Reference to Users)
- `audience`: String (Enum: all, students, teachers, parents, admins, custom)
- `customAudience`: Array of ObjectIds (References to Users)
- `priority`: String (Enum: low, medium, high, urgent)
- `startDate`: Date
- `endDate`: Date
- `attachments`: Array of Objects
  - `fileName`: String
  - `fileUrl`: String
  - `fileType`: String
- `isActive`: Boolean
- `createdAt`: Date
- `updatedAt`: Date

### Reports
Generated reports and analytics.

**Fields:**
- `_id`: ObjectId (Primary Key)
- `title`: String
- `description`: String
- `type`: String (Enum: student_list, grade_report, attendance_summary, quota_utilization, financial_summary, performance_analysis, custom)
- `parameters`: Object
  - `academicYearId`: ObjectId (Reference to AcademicYears)
  - `classId`: ObjectId (Reference to Classes)
  - `subjectId`: ObjectId (Reference to Subjects)
  - `teacherId`: ObjectId (Reference to Teachers)
  - `startDate`: Date
  - `endDate`: Date
  - `filters`: Object (Additional filters)
- `generatedBy`: ObjectId (Reference to Users)
- `generatedAt`: Date
- `data`: Object (The actual report data)
- `format`: String (Enum: json, csv, pdf, xlsx)
- `fileUrl`: String (URL to downloadable file if generated)
- `isPublic`: Boolean
- `createdAt`: Date
- `updatedAt`: Date

### QuotaRules
Centralized quota management rules.

**Fields:**
- `_id`: ObjectId (Primary Key)
- `schoolId`: ObjectId (Reference to Schools)
- `name`: String (e.g., "Standard Class Size Rule")
- `description`: String
- `type`: String (Enum: class, course, elective_group)
- `targetId`: ObjectId (Reference to Classes, Subjects, or identifier for elective groups)
- `quotaType`: String (Enum: fixed_number, percentage)
- `quotaValue`: Number (Actual number or percentage)
- `isActive`: Boolean
- `createdBy`: ObjectId (Reference to Users/Admins)
- `createdAt`: Date
- `updatedAt`: Date

## Indexes

### Users
- `username` (unique)
- `email` (unique)
- `role`

### Students
- `userId` (unique)
- `studentId` (unique)
- `schoolId`

### Teachers
- `userId` (unique)
- `employeeId` (unique)
- `schoolId`

### Classes
- `schoolId`
- `academicYearId`
- `subjectId`
- `quota.isFull`

### Subjects
- `schoolId`
- `code` (unique)
- `quota.isFull`
- `electiveGroup`

### Enrollments
- `studentId`
- `classId`
- `academicYearId`
- `status`

### Waitlists
- `targetId`
- `targetType`
- `position`
- `studentId`
- `status`

### Attendance
- `studentId`
- `classId`
- `date`

### Grades
- `studentId`
- `subjectId`
- `academicYearId`

### TimetableSlots
- `timetableId`
- `dayOfWeek`
- `teacherId`
- `classId`
- `roomId`

### Notifications
- `recipientId`
- `isRead`
- `type`

## Relationships

### One-to-One
- Users ↔ Students (via userId)
- Users ↔ Teachers (via userId)

### One-to-Many
- Schools → Classes
- Schools → Subjects
- Schools → Rooms
- Schools → AcademicYears
- Schools → Timetables
- AcademicYears → Classes
- Classes → Enrollments
- Classes → TimetableSlots
- Subjects → Classes
- Subjects → Grades
- Teachers → TimetableSlots
- Students → Enrollments
- Students → Attendance
- Students → Grades
- Users → Notifications
- Users → Messages
- Users → Announcements
- Users → Reports

### Many-to-Many
- Teachers ↔ Subjects (via subjects array in Teachers)
- Users ↔ Messages (via recipientIds array in Messages)
- Users ↔ Announcements (via customAudience array in Announcements)