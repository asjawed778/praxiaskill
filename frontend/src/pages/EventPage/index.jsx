import { eventData } from "./eventData";
import ccfs from "./CCFS.png";
import Timeline from "./TimeLine";
import { useNavigate } from "react-router-dom";

const EventPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-red-600 via-blue-600 to-orange-600 min-h-screen text-white font-poppins overflow-hidden w-full">
      {/* Hero Section */}
      <header className="relative flex flex-col items-center justify-center text-center py-10 px-4 sm:px-6"> 
        <img
          src={ccfs}
          alt="ccfs_image"
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] sm:w-[150px] md:w-[200px]" 
        />
        
        {/* Title and Subtitle */}
        <h1 className="mt-18 text-4xl sm:text-5xl md:text-6xl font-bold md:mt-24 lg:mt-32">{eventData.title}</h1> 
        {/* Call to Action Button */}
        <button
          className="mt-6 px-4 sm:px-6 py-2 sm:py-3 bg-red-600 text-white text-base sm:text-lg font-bold rounded-lg cursor-pointer hover:bg-red-400 transition" // Updated for responsiveness
          onClick={() => navigate("/eventForm")}
        >
          Register Now
        </button>
       </header> 
       
      {/* Event Overview */}
      <section className="container mx-auto max-w-4xl px-4 sm:px-6 md:px-8"> 
        <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-4 font-montserrat">Event Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {eventData.eventOverview.map((item, index) => (
            <div key={index} className="bg-white text-gray-900 p-4 md:p-6 rounded-lg shadow-md text-center"> 
              <h3 className="text-xl sm:text-2xl font-semibold">{item.title}</h3> 
              <p className="text-base sm:text-lg">{item.description}</p> 
            </div>
          ))}
        </div>
      </section>

      {/* Event Objective */}
      <section className="container mt-8 mx-auto max-w-4xl px-4 sm:px-6 md:px-8">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-4 font-montserrat">Event Objective</h2> 
        <div className="bg-white text-gray-900 p-4 md:p-6 rounded-lg shadow-md text-base sm:text-lg"> 
          {eventData.objective}
        </div>
      </section>

      {/* Event Details */}
      <section className="container mx-auto mt-8 max-w-4xl px-4 sm:px-6 md:px-8"> 
        <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-4 font-montserrat">Event Details</h2> 
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-4 text-center"> 
          {eventData.eventDetails.map((detail, index) => (
            <div key={index} className="bg-white text-gray-900 p-4 md:p-6 rounded-lg shadow-md"> 
              <h3 className="text-xl sm:text-2xl font-semibold">{detail.title}</h3> 
              <p className="text-base sm:text-lg">{detail.description}</p> 
            </div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 mt-8"> 
        <Timeline />
      </div>
    </div>
  );
};

export default EventPage;

