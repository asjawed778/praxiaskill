import { motion } from "framer-motion";

const timelineData = [
  { date: "17th March 2025", icon: "fa-home", title: "Step 1", desc: " Registration Begins." },
  { date: "20th March 2025", icon: "fa-gift", title: "Event 2", desc: "Executive Summary and Form Submission last date." },
  { date: "21th March 2025", icon: "fa-user", title: "Event 3", desc: "Evetn kickoff & theme Announcement & team building Announcement." },
  { date: "21th to 26th March 2025 ", icon: "fa-running", title: "Event 4", desc: "Ideation & Mentorship." },
  { date: "27th and 28th March 2025 ", icon: "fa-cog", title: "Event 5", desc: "Final Presentation Submission (Pitching and Evaluation)." },
  { date: "28th March 2025", icon: "fa-certificate", title: "Event 6", desc: "Finale Events Result & Award." }
];

const Timeline = () => {
  return (
    <div className="relative w-full mx-auto mt-8 max-w-4xl px-4 md:px-8 flex-grow">
      {/* Center Vertical Line */}
      <h1 className="text-center text-4xl font-bold mb-6 mt-6">Key Timelines</h1>
      <div className="absolute left-1/2 top-0 w-1 h-full mt-10 bg-red-500 transform -translate-x-1/2"></div>
      
      {/* Timeline Items */}
      {timelineData.map((event, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          viewport={{ once: true }}
          className={`relative flex items-center w-1/2 px-6 py-6 ${
            index % 2 === 0 ? "justify-start left-0" : "justify-end left-1/2"
          }`}
        >
          
          {/* Timeline Dot */}
          {/* <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-red-700 border-4 border-white rounded-full shadow-lg"></div> */}

          {/* Connecting Line (Fix) */}
          <div
  className={`absolute top-1/2 w-16 h-1 bg-red-500 transform -translate-y-1/2 ${
    index % 2 === 0 ? "right-[-4rem]" : "left-[-4rem]"
  }`}
>
<div
  className={`absolute top-1/2 w-16 h-1 bg-red-500 transform -translate-y-1/2 ${
    index % 2 === 0 ? "left-[-4rem]" : "right-[-4rem]"
  }`}
></div>
</div>


          {/* Event Date (Opposite Side) */}
          <span
            className={`absolute top-1/2 text-sm font-bold uppercase -mt-3 transform -translate-y-1/2 bg-red-500 px-3 py-1 text-white rounded-md text-center ${
              index % 2 === 0 ? "left-full ml-4" : "right-full mr-4"
            }`}
          >
            {event.date}
          </span>

          {/* Event Content */}
          <div
            className={`relative w-full p-6 bg-white text-black rounded-lg shadow-lg text-center   ${
              index % 2 === 0 ? "text-right pr-10" : "text-left pl-10"
            }`}
          >
            {/* <h2 className="mt-2 text-lg font-bold">{event.title}</h2> */}
            <p className="text-lg">{event.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Timeline;



// import React from "react";

// const timelineData = [
//   { date: "15 Dec", icon: "fa-home", title: "Event 1", desc: "Lorem ipsum dolor sit amet." },
//   { date: "22 Oct", icon: "fa-gift", title: "Event 2", desc: "Lorem ipsum dolor sit amet." },
//   { date: "10 Jul", icon: "fa-user", title: "Event 3", desc: "Lorem ipsum dolor sit amet." },
//   { date: "18 May", icon: "fa-running", title: "Event 4", desc: "Lorem ipsum dolor sit amet." },
//   { date: "10 Feb", icon: "fa-cog", title: "Event 5", desc: "Lorem ipsum dolor sit amet." },
//   { date: "01 Jan", icon: "fa-certificate", title: "Event 6", desc: "Lorem ipsum dolor sit amet." },
// ];

// const Timeline = () => {
//   return (
//     <div className="relative bg-gray-100 py-10">
//       {/* Center Vertical Line */}
//       <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-green-700 transform -translate-x-1/2"></div>

//       <h1 className="text-3xl font-bold text-center text-green-800 mb-10">Timeline</h1>

//       {/* Timeline Items */}
//       <div className="relative flex flex-col items-center space-y-10">
//         {timelineData.map((event, index) => (
//           <div key={index} className={`relative flex w-full max-w-2xl ${index % 2 === 0 ? "justify-start pr-12" : "justify-end pl-12"}`}>
//             {/* Connector Line Between Dot & Card */}
//             <div className={`absolute top-1/2 w-10 h-1 bg-green-700 ${index % 2 === 0 ? "right-0" : "left-0"}`}></div>

//             {/* Timeline Dot */}
//             <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full border-4 border-green-700 bg-white flex items-center justify-center">
//               <i className={`fas ${event.icon} text-green-700 text-lg`}></i>
//             </div>

//             {/* Event Content */}
//             <div className={`relative p-6 bg-yellow-400 text-black rounded-lg shadow-lg w-80 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
//               <span className="text-sm font-bold uppercase text-green-800">{event.date}</span>
//               <h2 className="mt-2 text-lg font-bold">{event.title}</h2>
//               <p className="text-sm">{event.desc}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Timeline;









