export const UserRole = Object.freeze({
  // SUPER_ADMIN: "SUPER_ADMIN",
  USER: "USER",
  INSTRUCTOR: "INSTRUCTOR",
});
export const Language = Object.freeze({
  ENGLISH: "English",
  HINDI: "Hindi",
  ENGLISH_HINDI: "English & Hindi",
});

export const CourseMode = Object.freeze({
  ONLINE: "Online",
  OFFLINE: "Offline",
  HYBRID: "Hybrid",
});

export const Status = Object.freeze({
  ACTIVE: "Active",
  COMPLETED: "Completed",
  EXPIRED: "Expired",
  CANCELLED: "Cancelled",
});

export const EnquiryStatus = Object.freeze({
  PENDING: "Pending",
  FIRST_CALL_ATTEMPTED: "First Call Attempted",
  INTERESTED: "Interested",
  INFORMATION_SENT: "Information Sent",
  NOT_ENGAGE: "Not Engage",
  COURSE_FEE_ISSUE: "Course Fee Issue",
  CLOSED: "Closed",
});

export const CourseStatus = Object.freeze({
  DRAFT: "DRAFT",
  PUBLISHED: "PUBLISHED",
  TERMINATED: "TERMINATED",
});

export const CourseValidity = Object.freeze({
  ONE_YEAR: "1 Year",
  TWO_YEAR: "2 Year",
  LIFETIME: "LifeTime",
});
