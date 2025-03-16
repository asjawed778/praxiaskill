export const NAVS = ["about", "outcomes", "courses"];
export const ABOUT = [
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa numquam quas, dolorum pariatur libero tenetur recusandae illo deleniti rerum facere.",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa numquam quas, dolorum pariatur libero tenetur recusandae illo deleniti rerum facere.",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa numquam quas, dolorum pariatur libero tenetur recusandae illo deleniti rerum facere.",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa numquam quas, dolorum pariatur libero tenetur recusandae illo deleniti rerum facere.",
];
export const SKILLS = [
  "full-stack development",
  "UI/UX Design",
  "Mern Stack",
  "Visual Studio",
  "React",
];
export const specificCourse = {
  thumbnail:
    "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fgg5tymarry58vxhsqugh.png",
  title: "Full Stack Web Development Bootcamp",
  keypoints: [
    "Learn HTML, CSS, and JavaScript from scratch",
    "Master front-end frameworks like React and Next.js",
    "Build dynamic backend applications with Node.js and Express.js",
    "Work with databases like MongoDB and PostgreSQL",
    "Understand authentication and security best practices",
    "Deploy full-stack applications on cloud platforms",
    "Hands-on projects and real-world applications",
    "Learn DevOps basics including Docker and CI/CD",
  ],
  description: `
  <p>
  The <strong>Full Stack Web Development Bootcamp</strong> is a comprehensive program designed to help you become a skilled developer, mastering both front-end and back-end technologies. 
  You'll start with the fundamentals of <strong>HTML, CSS, and JavaScript</strong>, learning how to build beautiful and interactive web pages. 
  As you progress, you'll dive into modern front-end frameworks like <strong>React.js and Next.js</strong>, understanding how to create dynamic and efficient user interfaces. 
  Beyond just designing, you'll explore <strong>state management</strong>, optimizing application performance, and building reusable UI components. 
  This course also covers <em>responsive design principles</em>, ensuring that your applications look stunning across all devices.
</p>

<p>
  On the back-end, you will learn to create robust and scalable applications using <strong>Node.js and Express.js</strong>. 
  You'll discover how to design and implement RESTful APIs, work with <strong>databases like MongoDB and PostgreSQL</strong>, and handle authentication with JWT and OAuth. 
  Security is a major focus, as you’ll learn best practices to protect user data and prevent vulnerabilities. 
  The course also introduces <em>DevOps concepts</em>, including <strong>Docker, CI/CD pipelines, and cloud deployment</strong> to make your applications production-ready. 
  With hands-on projects, real-world case studies, and a strong community, this bootcamp will equip you with the skills required to launch a successful career in web development.
</p>
  `,
  sections: [
    {
      title: "Introduction to Full Stack Development",
      description: "An overview of the course and what you'll learn.",
      subSections: [
        {
          title: "What is Full Stack Development?",
          duration: "3:45",
          completed: true,
          locked: false,
        },
        {
          title: "Setting Up Your Development Environment",
          duration: "4:30",
          completed: false,
          locked: true,
        },
      ],
    },
    {
      title: "Frontend Development with React",
      description: "Learn the fundamentals of frontend development.",
      subSections: [
        {
          title: "Introduction to React",
          duration: "5:20",
          completed: true,
          locked: false,
        },
        {
          title: "Component-Based Architecture",
          duration: "6:15",
          completed: true,
          locked: false,
        },
        {
          title: "State Management with Redux",
          duration: "7:10",
          completed: false,
          locked: true,
        },
      ],
    },
    {
      title: "Backend Development with Node.js",
      description: "Dive into backend development using Node.js and Express.",
      subSections: [
        {
          title: "Introduction to Node.js",
          duration: "4:50",
          completed: true,
          locked: false,
        },
        {
          title: "Building RESTful APIs with Express",
          duration: "5:45",
          completed: true,
          locked: false,
        },
        {
          title: "Database Management with MongoDB",
          duration: "6:30",
          completed: false,
          locked: true,
        },
      ],
    },
    {
      title: "Deployment & DevOps",
      description: "Learn how to deploy full-stack applications.",
      subSections: [
        {
          title: "Deploying with Vercel & Netlify",
          duration: "5:00",
          completed: true,
          locked: false,
        },
        {
          title: "Docker & Containerization",
          duration: "6:20",
          completed: false,
          locked: true,
        },
      ],
    },
  ],
};