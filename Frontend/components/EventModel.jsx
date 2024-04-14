import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClock, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

import { useState, useEffect } from "react";

const EventModel = ({ isOpen, setIsOpen, eventId }) => {

  const [eventDetails, setEventDetails] = useState(null);
  
  const fetchEventDetails = async (eventId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/getEventDetails/${eventId}`);
      if (response.status === 404) {
        throw new Error("Failed to fetch event details");
      }
      const data = await response.json();
      console.log(data);
      return data; 
    } catch (error) {
      console.error("Error fetching event details:", error);
      return null; 
    }
  };

  useEffect(() => {
    if (isOpen && eventId) {
        fetchEventDetails(eventId).then((data) => {
          setEventDetails(data);
        });
    
    }
  }, [isOpen, eventId]);
 
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };


  return (
  <>
  {isOpen && (
  <div className="bg-slate-400/20 backdrop-blur-sm p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer">
    <div className="bg-gradient-to-br from-teal-300 to-title-500 text-white p-6 rounded-lg w-full sm:w-1/2 shadow-xl cursor-default relative overflow-hidden">
      <div className="relative z-10 bg-white border border-gray-300 p-4 rounded-lg shadow-md text-black overflow-y-auto max-h-[80vh]"> {/* Added overflow-y-auto and max-h-[80vh] */}
        <h3 className="text-3xl font-bold text-center mb-6">{eventDetails?.title}</h3>
        <p className="mb-6">{eventDetails?.description}</p>
        <p className="mb-6"><span className="font-semibold">POC :</span> {eventDetails?.organizer.name}</p>

        <div className="border-t-2 pt-6 my-6 font-semibold flex justify-around">
          <div className="flex flex-col gap-4">
            <FontAwesomeIcon icon={faCalendarAlt} className="text-blue-500 mr-2" />
            <p>{formatDate(eventDetails?.startDate)} - </p>
            <p>{formatDate(eventDetails?.endDate)}</p>
          </div>
          <div className="flex flex-col gap-4">
            <FontAwesomeIcon icon={faClock} className="text-green-500 mr-2" />
            <p>{eventDetails?.startTime} - {eventDetails?.endTime}</p>
          </div>
          <div className="flex flex-col gap-4">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-500 mr-2" />
            <p>{eventDetails?.location}</p>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => setIsOpen(false)}
            className="bg-white hover:bg-gray-200 text-title-500 font-semibold py-1 px-4 rounded-md border border-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
)}
  
  </>
  );
};

export default EventModel;
