import backgroundVideo from "/video/background_video.mp4"
import { useState } from "react";
import { motion } from "framer-motion";
import BookDemoClass from "../../components/BookDemo/BookDemoClass";
import Courses from "./Carousal";
import Membership from "../../components/Membership";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import SEOHelmet from "../../SEO/SEOHelmet";
import { generateOrganizationSchema } from "../../SEO/SEOHelper";

const gradientBackground = {
  background:
    "linear-gradient(to bottom left, #E69CC1, #8C6BED, #426BE1, #4896EC)",
};

function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.5 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80 },
    },
  };

  return (
    <>
    <SEOHelmet
      title={"Praxia Skill"}
      description={"Join Praxia Skill for the best Data Analytics program"}
      keywords={"Data Analytics, Praxia Skill"}
      image={backgroundVideo}
      url={"https://praxiaskill.com"}
      robots="index, follow"
      schema={generateOrganizationSchema()}
    />
      <motion.div
        className="h-auto flex flex-col items-center w-full font-sans overflow-x-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="relative w-full flex flex-col md:flex-row md:items-center justify-around p-4">
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover -z-10"
          >
            <source src={backgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Text Section */}
          <motion.div
            className="flex flex-col items-start text-left text-white px-4 mb-8"
            variants={itemVariants}
          >
            <motion.h2
              className="text-4xl  md:text-4xl font-sans"
              variants={itemVariants}
            >
              Ready For the Future
            </motion.h2>
            <motion.h2
              className="text-4xl md:text-4xl font-sans mb-4"
              variants={itemVariants}
            >
              At Praxia Skill
            </motion.h2>

            <motion.p
              className="text-white mt-6 mb-1 font-sans text-xl"
              variants={itemVariants}
            >
              Join this 20 weeks, Job-ready Program to master
            </motion.p>
            <motion.p
              className="text-white text-xl mb-1 font-sans"
              variants={itemVariants}
            >
              Data Analytics from scratch with Top Data Analysts
            </motion.p>
            <motion.p
              className="text-white mb-4 font-sans"
              variants={itemVariants}
            >
              from Microsoft, KPMG, Amazon, and Rapido.
            </motion.p>

            <Link
              to="/courses"
              variants={itemVariants}

            >
              <Button type="button" className="relative mt-4  py-2 px-6 rounded-lg duration-200">Explore Program</Button>

            </Link>
          </motion.div>

          {/* Form Section */}
          <BookDemoClass />
        </motion.div>

        {/* Skill Boxes */}
        <motion.div
          className="mt-10 flex flex-wrap flex-col md:flex-row gap-4 justify-center px-4"
          variants={containerVariants}
        >
          {["Foundational", "Employability", "Entrepreneurial"].map(
            (skill, index) => (
              <motion.div
                key={index}
                style={gradientBackground}
                className="text-white font-sans flex flex-col items-start justify-center p-8 sm:p-6 h-48 w-80 md:w-56 lg:w-80 rounded-lg shadow-lg"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                variants={itemVariants}
              >
                <h1 className="font-semibold text-2xl lg:text-3xl flex flex-col">
                  {skill}
                  <span>Skills</span>
                </h1>
              </motion.div>
            )
          )}
        </motion.div>

        {/* Courses Section */}
        <motion.div
          className="flex items-center justify-center lg:w-[1000px]"
          variants={itemVariants}
        >
          <Courses />
        </motion.div>

        {/* <Membership /> */}

      </motion.div>
    </>
  );
}

export default HomePage;
