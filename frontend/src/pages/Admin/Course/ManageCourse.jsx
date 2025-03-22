import React, { useState } from "react";
import CourseTable from "./CourseTable";

const COURSES = [
  { serialNo: 1, courseTitle: "React for Beginners", instructorName: "John Doe", category: "Web Development" },
  { serialNo: 2, courseTitle: "Advanced Node.js", instructorName: "Jane Smith", category: "Backend Development" },
  { serialNo: 3, courseTitle: "Machine Learning Basics", instructorName: "Alice Johnson", category: "AI/ML" },
  { serialNo: 4, courseTitle: "Cybersecurity Fundamentals", instructorName: "Bob Brown", category: "Cybersecurity" },
  { serialNo: 5, courseTitle: "Cloud Computing with AWS", instructorName: "Charlie Davis", category: "Cloud Computing" },
  { serialNo: 6, courseTitle: "Python for Data Science", instructorName: "David Wilson", category: "Data Science" },
  { serialNo: 7, courseTitle: "Full Stack JavaScript", instructorName: "Eva Adams", category: "Web Development" },
  { serialNo: 8, courseTitle: "Deep Learning with TensorFlow", instructorName: "Frank White", category: "AI/ML" },
  { serialNo: 9, courseTitle: "DevOps Essentials", instructorName: "Grace Miller", category: "DevOps" },
  { serialNo: 10, courseTitle: "Django & REST API", instructorName: "Hannah Lee", category: "Backend Development" },
  { serialNo: 11, courseTitle: "Linux Administration", instructorName: "Ian Scott", category: "Cybersecurity" },
  { serialNo: 12, courseTitle: "Big Data with Hadoop", instructorName: "Jack Turner", category: "Data Science" },
  { serialNo: 13, courseTitle: "Vue.js Crash Course", instructorName: "Karen Evans", category: "Web Development" },
  { serialNo: 14, courseTitle: "Kubernetes for Beginners", instructorName: "Liam Wright", category: "DevOps" },
  { serialNo: 15, courseTitle: "Ethical Hacking Basics", instructorName: "Mia Carter", category: "Cybersecurity" },
  { serialNo: 16, courseTitle: "Java Spring Boot", instructorName: "Nathan Bell", category: "Backend Development" },
  { serialNo: 17, courseTitle: "C++ for Competitive Programming", instructorName: "Olivia Sanchez", category: "Programming" },
  { serialNo: 18, courseTitle: "Blockchain Development", instructorName: "Paul Nelson", category: "Blockchain" },
  { serialNo: 19, courseTitle: "Flutter & Dart", instructorName: "Quinn Baker", category: "Mobile Development" },
  { serialNo: 20, courseTitle: "PostgreSQL for Developers", instructorName: "Rachel Green", category: "Databases" },
  { serialNo: 21, courseTitle: "Angular & TypeScript", instructorName: "Samuel Perez", category: "Web Development" },
  { serialNo: 22, courseTitle: "Golang Microservices", instructorName: "Tina Roberts", category: "Backend Development" },
  { serialNo: 23, courseTitle: "Unity Game Development", instructorName: "Umar Patel", category: "Game Development" },
  { serialNo: 24, courseTitle: "Power BI for Business Analytics", instructorName: "Victoria King", category: "Data Science" },
  { serialNo: 25, courseTitle: "Docker from Scratch", instructorName: "William Ford", category: "DevOps" },
  { serialNo: 26, courseTitle: "Artificial Intelligence with Python", instructorName: "Xander Lopez", category: "AI/ML" },
  { serialNo: 27, courseTitle: "Swift for iOS Development", instructorName: "Yasmin Hill", category: "Mobile Development" },
  { serialNo: 28, courseTitle: "Web3 & Smart Contracts", instructorName: "Zane Cooper", category: "Blockchain" },
  { serialNo: 29, courseTitle: "MongoDB & NoSQL Databases", instructorName: "Aaron Fisher", category: "Databases" },
  { serialNo: 30, courseTitle: "ASP.NET Core for Beginners", instructorName: "Bella Jenkins", category: "Backend Development" },
  { serialNo: 31, courseTitle: "R for Data Science", instructorName: "Caleb Morris", category: "Data Science" },
  { serialNo: 32, courseTitle: "Ruby on Rails Fundamentals", instructorName: "Diana Brooks", category: "Web Development" },
  { serialNo: 33, courseTitle: "CI/CD with Jenkins", instructorName: "Ethan Barnes", category: "DevOps" },
  { serialNo: 34, courseTitle: "Android Development with Kotlin", instructorName: "Fiona Hayes", category: "Mobile Development" },
  { serialNo: 35, courseTitle: "3D Game Design with Unreal Engine", instructorName: "George Reed", category: "Game Development" },
  { serialNo: 36, courseTitle: "Penetration Testing", instructorName: "Hailey Carter", category: "Cybersecurity" },
  { serialNo: 37, courseTitle: "Microsoft Azure Fundamentals", instructorName: "Isaac Mitchell", category: "Cloud Computing" },
  { serialNo: 38, courseTitle: "GraphQL & Apollo", instructorName: "Jennifer Clark", category: "Web Development" },
  { serialNo: 39, courseTitle: "Terraform Infrastructure as Code", instructorName: "Kyle Anderson", category: "DevOps" },
  { serialNo: 40, courseTitle: "Elixir & Phoenix Framework", instructorName: "Laura Scott", category: "Backend Development" },
  { serialNo: 41, courseTitle: "Cyber Threat Intelligence", instructorName: "Mason Turner", category: "Cybersecurity" },
  { serialNo: 42, courseTitle: "Excel for Data Analysis", instructorName: "Natalie Adams", category: "Data Science" },
  { serialNo: 43, courseTitle: "Rust for System Programming", instructorName: "Oscar Johnson", category: "Programming" },
  { serialNo: 44, courseTitle: "Google Cloud Platform", instructorName: "Penelope White", category: "Cloud Computing" },
  { serialNo: 45, courseTitle: "C# & Unity Game Development", instructorName: "Quincy Harris", category: "Game Development" },
];

const ManageCourse = () => {
  const [filter, setFilter] = useState(1)
  return (
    <div className="w-full px-4">
      <div className="w-[95%] border border-neutral-300 rounded-lg text-md flex justify-between items-center mx-auto mb-2">
        <div
          onClick={() => setFilter(1)}
          className={`${
            filter == 1 &&
            "bg-[var(--color-primary)] text-white rounded-lg"
          } px-4 py-2 cursor-pointer`}
        >
          All Courses
        </div>
        <div
          onClick={() => setFilter(2)}
          className={`${
            filter == 2 &&
            "bg-[var(--color-primary)] text-white rounded-lg"
          } px-4 py-2 cursor-pointer`}
        >
          Published course
        </div>
        <div
        onClick={() => setFilter(3)}
          className={`${
            filter == 3 &&
            "bg-[var(--color-primary)] text-white rounded-lg"
          } px-4 py-2 cursor-pointer`}
        >
          Unpublished Course
        </div>
        <div
        onClick={() => setFilter(4)}
          className={`${
            filter == 4 &&
            "bg-[var(--color-primary)] text-white rounded-lg"
          } px-4 py-2 cursor-pointer`}
        >
          Draft Course
        </div>
      </div>
      <div className="w-[95%] mx-auto">
        <CourseTable data={COURSES} />
      </div>
    </div>
  );
};

export default ManageCourse;
