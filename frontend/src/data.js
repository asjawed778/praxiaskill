export const cardData = [
    { title: 'Total Users', value: '12.5K' },
    { title: 'Active Courses', value: '1,200' },
    { title: 'Total Sales', value: '$3,480' },
    { title: 'Monthly Revenue', value: '$120' },
  ]

  export const revenueData = [
    { month: 'Jan', value: 200 },
    { month: 'Feb', value: 600 },
    { month: 'Mar', value: 1200 },
    { month: 'Apr', value: 1300 },
    { month: 'May', value: 2000 },
  ];
  
  export const userData = [
    { name: "New Users", value: 65 },
    { name: "Returning Users", value: 35 },
  ];
  
  export const enrollments = [
    { course: 'B', count: 300 },
    { course: 'C', count: 400 },
    { course: 'D', count: 550 },
    { course: 'E', count: 700 },
  ];
  export const topCourses = [
    { name: 'Course B', popularity: 95 },
    { name: 'Course D', popularity: 90 },
    { name: 'Course A', popularity: 85 },
    { name: 'Course C', popularity: 80 },
  ];


  // export const users = [
  //   { id: 1, name: "Alice Johnson", email: "alice.johnson@example.com", role: "admin", status: "active", joinedAt: "2024-06-12", coursesEnrolled: 5 },
  //   { id: 2, name: "Bob Smith", email: "bob.smith@example.com", role: "teacher", status: "inactive", joinedAt: "2023-11-04", coursesEnrolled: 2 },
  //   { id: 3, name: "Charlie Williams", email: "charlie.williams@example.com", role: "student", status: "active", joinedAt: "2024-01-21", coursesEnrolled: 8 },
  //   { id: 4, name: "Daisy Adams", email: "daisy.adams@example.com", role: "student", status: "active", joinedAt: "2024-03-18", coursesEnrolled: 6 },
  //   { id: 5, name: "Ethan Brown", email: "ethan.brown@example.com", role: "teacher", status: "active", joinedAt: "2023-12-30", coursesEnrolled: 3 },
  //   { id: 6, name: "Fiona Davis", email: "fiona.davis@example.com", role: "student", status: "active", joinedAt: "2024-02-10", coursesEnrolled: 7 },
  //   { id: 7, name: "George Lee", email: "george.lee@example.com", role: "admin", status: "inactive", joinedAt: "2023-08-05", coursesEnrolled: 0 },
  //   { id: 8, name: "Hannah Moore", email: "hannah.moore@example.com", role: "teacher", status: "active", joinedAt: "2024-01-15", coursesEnrolled: 4 },
  //   { id: 9, name: "Isaac Scott", email: "isaac.scott@example.com", role: "student", status: "active", joinedAt: "2024-03-01", coursesEnrolled: 9 },
  //   { id: 10, name: "Julia White", email: "julia.white@example.com", role: "student", status: "active", joinedAt: "2024-03-28", coursesEnrolled: 6 },
  //   { id: 11, name: "Kevin Harris", email: "kevin.harris@example.com", role: "admin", status: "active", joinedAt: "2023-09-10", coursesEnrolled: 1 },
  //   { id: 12, name: "Laura Martin", email: "laura.martin@example.com", role: "teacher", status: "inactive", joinedAt: "2023-10-22", coursesEnrolled: 2 },
  //   { id: 13, name: "Michael Thompson", email: "michael.thompson@example.com", role: "student", status: "active", joinedAt: "2024-02-20", coursesEnrolled: 4 },
  //   { id: 14, name: "Natalie Clark", email: "natalie.clark@example.com", role: "teacher", status: "active", joinedAt: "2024-01-11", coursesEnrolled: 3 },
  //   { id: 15, name: "Oliver Hall", email: "oliver.hall@example.com", role: "student", status: "active", joinedAt: "2024-04-02", coursesEnrolled: 5 },
  //   { id: 16, name: "Penelope Young", email: "penelope.young@example.com", role: "student", status: "inactive", joinedAt: "2024-03-15", coursesEnrolled: 2 },
  //   { id: 17, name: "Quentin Turner", email: "quentin.turner@example.com", role: "admin", status: "active", joinedAt: "2023-11-19", coursesEnrolled: 0 },
  //   { id: 18, name: "Rachel King", email: "rachel.king@example.com", role: "teacher", status: "active", joinedAt: "2024-02-01", coursesEnrolled: 4 },
  //   { id: 19, name: "Samuel Green", email: "samuel.green@example.com", role: "student", status: "active", joinedAt: "2024-04-01", coursesEnrolled: 6 },
  //   { id: 20, name: "Tina Hill", email: "tina.hill@example.com", role: "teacher", status: "inactive", joinedAt: "2023-10-10", coursesEnrolled: 1 },
  //   { id: 21, name: "Umar Perez", email: "umar.perez@example.com", role: "admin", status: "active", joinedAt: "2023-12-01", coursesEnrolled: 0 },
  //   { id: 22, name: "Violet Rivera", email: "violet.rivera@example.com", role: "student", status: "active", joinedAt: "2024-03-05", coursesEnrolled: 7 },
  //   { id: 23, name: "William Reed", email: "william.reed@example.com", role: "teacher", status: "active", joinedAt: "2023-09-25", coursesEnrolled: 3 },
  //   { id: 24, name: "Xena Bailey", email: "xena.bailey@example.com", role: "student", status: "active", joinedAt: "2024-03-22", coursesEnrolled: 4 },
  //   { id: 25, name: "Yusuf Carter", email: "yusuf.carter@example.com", role: "teacher", status: "active", joinedAt: "2024-04-10", coursesEnrolled: 2 },
  // ];
  


  // mockApi.js


  export const fetchMockUsers = ({ page = 1, limit = 10, query = "" }) => {
    const allUsers = Array.from({ length: 25 }).map((_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      coursesEnrolled: Math.floor(Math.random() * 5) + 1,
      role: Math.random() > 0.5 ? "user" : "instructor", // Randomly assign role
    }));
  
    // Filter based on the search query
    const filtered = allUsers.filter(
      (u) =>
        u.name.toLowerCase().includes(query.toLowerCase()) ||
        u.email.toLowerCase().includes(query.toLowerCase())
    );
  
    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);
  
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ users: paginated, total: filtered.length });
      }, 500); // Simulate API call delay
    });
  };
  