import { motion } from "framer-motion";

const timelineData = [
  { date: "17th March 2025", desc: " Registration Begins." },
  { date: "20th March 2025", desc: "Executive Summary and Form Submission last date." },
  { date: "21th March 2025",  desc: "Evetn kickoff & theme Announcement & team building Announcement." },
  { date: "21th to 26th March 2025 ", desc: "Ideation & Mentorship." },
  { date: "27th and 28th March 2025 ",  desc: "Final Presentation Submission (Pitching and Evaluation)." },
  { date: "28th March 2025",  desc: "Finale Events Result & Award." }
];

const Timeline = () => {
  return (
    <div className="relative w-full  mt-8  md:px-8 flex-grow lg:mx-auto lg:max-w-4xl">
      {/* Center Vertical Line */}
      <h1 className="text-center text-4xl font-bold mb-6 mt-6">Key Timelines</h1>
      <div className="absolute left-1/2 top-0 w-1 h-full mt-10 bg-red-500 transform -translate-x-1/2">
      </div>
      
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
      <div
      className={`absolute top-1/2 w-16 h-1 bg-red-500 transform -translate-y-1/2 ${
      index % 2 === 0 ? "right-[-4rem]" : "left-[-4rem]"
      }`}>
      <div
        className={`absolute top-1/2 w-16 h-1 bg-red-500 transform -translate-y-1/2 ${
        index % 2 === 0 ? "left-[-4rem]" : "right-[-4rem]"
        }`}>
      </div>
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
            className={`relative w-full p-6 bg-white text-black rounded-lg shadow-lg text-center sm:text-left  ${
              index % 2 === 0 ? "sm:pr-10" : "sm:pl-10"
            }`}
          >
            
            <p className="text-lg break-words">{event.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Timeline;









