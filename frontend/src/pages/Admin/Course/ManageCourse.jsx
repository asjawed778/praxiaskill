import React, { useState } from "react";
import CourseTable from "./CourseTable";
import { useGetAllPublishedCourseQuery } from "../../../services/course.api";

const COURSES = [
  { serialNo: 1, title: "React for Beginners", instructor: "John Doe", category: "Web Development" },
  { serialNo: 2, title: "Advanced Node.js", instructor: "Jane Smith", category: "Backend Development" },
  { serialNo: 3, title: "Machine Learning Basics", instructor: "Alice Johnson", category: "AI/ML" },
  { serialNo: 4, title: "Cybersecurity Fundamentals", instructor: "Bob Brown", category: "Cybersecurity" },
  { serialNo: 5, title: "Cloud Computing with AWS", instructor: "Charlie Davis", category: "Cloud Computing" },
  { serialNo: 6, title: "Python for Data Science", instructor: "David Wilson", category: "Data Science" },
  { serialNo: 7, title: "Full Stack JavaScript", instructor: "Eva Adams", category: "Web Development" },
  { serialNo: 8, title: "Deep Learning with TensorFlow", instructor: "Frank White", category: "AI/ML" },
  { serialNo: 9, title: "DevOps Essentials", instructor: "Grace Miller", category: "DevOps" },
  { serialNo: 10, title: "Django & REST API", instructor: "Hannah Lee", category: "Backend Development" },
  { serialNo: 11, title: "Linux Administration", instructor: "Ian Scott", category: "Cybersecurity" },
  { serialNo: 12, title: "Big Data with Hadoop", instructor: "Jack Turner", category: "Data Science" },
  { serialNo: 13, title: "Vue.js Crash Course", instructor: "Karen Evans", category: "Web Development" },
  { serialNo: 14, title: "Kubernetes for Beginners", instructor: "Liam Wright", category: "DevOps" },
  { serialNo: 15, title: "Ethical Hacking Basics", instructor: "Mia Carter", category: "Cybersecurity" },
  { serialNo: 16, title: "Java Spring Boot", instructor: "Nathan Bell", category: "Backend Development" },
  { serialNo: 17, title: "C++ for Competitive Programming", instructor: "Olivia Sanchez", category: "Programming" },
  { serialNo: 18, title: "Blockchain Development", instructor: "Paul Nelson", category: "Blockchain" },
  { serialNo: 19, title: "Flutter & Dart", instructor: "Quinn Baker", category: "Mobile Development" },
  { serialNo: 20, title: "PostgreSQL for Developers", instructor: "Rachel Green", category: "Databases" },
  { serialNo: 21, title: "Angular & TypeScript", instructor: "Samuel Perez", category: "Web Development" },
  { serialNo: 22, title: "Golang Microservices", instructor: "Tina Roberts", category: "Backend Development" },
  { serialNo: 23, title: "Unity Game Development", instructor: "Umar Patel", category: "Game Development" },
  { serialNo: 24, title: "Power BI for Business Analytics", instructor: "Victoria King", category: "Data Science" },
  { serialNo: 25, title: "Docker from Scratch", instructor: "William Ford", category: "DevOps" },
  { serialNo: 26, title: "Artificial Intelligence with Python", instructor: "Xander Lopez", category: "AI/ML" },
  { serialNo: 27, title: "Swift for iOS Development", instructor: "Yasmin Hill", category: "Mobile Development" },
  { serialNo: 28, title: "Web3 & Smart Contracts", instructor: "Zane Cooper", category: "Blockchain" },
  { serialNo: 29, title: "MongoDB & NoSQL Databases", instructor: "Aaron Fisher", category: "Databases" },
  { serialNo: 30, title: "ASP.NET Core for Beginners", instructor: "Bella Jenkins", category: "Backend Development" },
  { serialNo: 31, title: "R for Data Science", instructor: "Caleb Morris", category: "Data Science" },
  { serialNo: 32, title: "Ruby on Rails Fundamentals", instructor: "Diana Brooks", category: "Web Development" },
  { serialNo: 33, title: "CI/CD with Jenkins", instructor: "Ethan Barnes", category: "DevOps" },
  { serialNo: 34, title: "Android Development with Kotlin", instructor: "Fiona Hayes", category: "Mobile Development" },
  { serialNo: 35, title: "3D Game Design with Unreal Engine", instructor: "George Reed", category: "Game Development" },
  { serialNo: 36, title: "Penetration Testing", instructor: "Hailey Carter", category: "Cybersecurity" },
  { serialNo: 37, title: "Microsoft Azure Fundamentals", instructor: "Isaac Mitchell", category: "Cloud Computing" },
  { serialNo: 38, title: "GraphQL & Apollo", instructor: "Jennifer Clark", category: "Web Development" },
  { serialNo: 39, title: "Terraform Infrastructure as Code", instructor: "Kyle Anderson", category: "DevOps" },
  { serialNo: 40, title: "Elixir & Phoenix Framework", instructor: "Laura Scott", category: "Backend Development" },
  { serialNo: 41, title: "Cyber Threat Intelligence", instructor: "Mason Turner", category: "Cybersecurity" },
  { serialNo: 42, title: "Excel for Data Analysis", instructor: "Natalie Adams", category: "Data Science" },
  { serialNo: 43, title: "Rust for System Programming", instructor: "Oscar Johnson", category: "Programming" },
  { serialNo: 44, title: "Google Cloud Platform", instructor: "Penelope White", category: "Cloud Computing" },
  { serialNo: 45, title: "C# & Unity Game Development", instructor: "Quincy Harris", category: "Game Development" },
];

const ManageCourse = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { data: publishedCourses, isLoading } = useGetAllPublishedCourseQuery(currentPage);

  const [filter, setFilter] = useState(2)
  return (
    <div className="w-full px-4">
      <div className="w-[95%] border border-neutral-300 rounded-lg text-sm md:text-md flex justify-between items-center mx-auto mb-2">
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
        <CourseTable data={publishedCourses} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
};

export default ManageCourse;
