'use client';
import React, { useState, useEffect } from 'react';
import StarRating from '../../../components/StarRating';

const Page = () => {
  const [event, setEvent] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [user,setUser]=useState(null);

  useEffect(() => {
    const eventId = window.location.pathname.split('/').pop();
    fetchEventDetails(eventId);
    fetchFeedbacks(eventId);
  }, []);

  useEffect(() => {
    const user = localStorage.getItem('user');
        const parsedUser = JSON.parse(user);
        if(parsedUser.role!=='admin'){
          alert("You are not authorized to view this page.");
          document.location='/'
        }else{
            setUser(parsedUser)
        }
  }, []);

  const fetchEventDetails = async (eventId) => {
    try {
      console.log(eventId)
      const response = await fetch(`http://localhost:8080/api/getEventDetails/${eventId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch event details');
      }
      const data = await response.json();
      setEvent(data);
    } catch (error) {
      console.error('Error fetching event details:', error);
    }
  };

  const fetchFeedbacks = async (eventId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/getFeedbacksForEvent/${eventId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch feedbacks for the event');
      }
      const data = await response.json();
      setFeedbacks(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  return (
    <div className="mx-auto px-20 py-10">
      {event && (
        <div key={event._id} className="flex p-6 rounded-md shadow-lg transition-transform hover:scale-105">
          <div className="w-1/2">
            <img className="w-70" src={`http://localhost:8080/${event.mediaURL}`} alt="poster" />
          </div>
          <div className="bg-white pl-10 w-1/2">
            <h3 className="text-2xl font-semibold mb-4 text-teal-600">{event.title}</h3>
            <p className="text-gray-600 mb-4">{event.description}</p>
            <p className="text-gray-700 mb-2">Total Registrations: {event.totalRegistrations}</p>
            <p className="text-gray-700 mb-2">Rating: <StarRating rating={event.rating} /></p>
            <div className="flex items-center mb-2">
              <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect width="18" height="18" x="3" y="2" rx="2" ry="2"></rect>
                <path d="M16 2v4M8 2v4M3 10h18"></path>
              </svg>
              <p className="text-gray-700">Date: {new Date(event.date).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center mb-2">
              <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"></path>
              </svg>
              <p className="text-gray-700">Location: {event.location}</p>
            </div>
            <div className="flex items-center mb-4">
              <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"></circle>
                <path d="M12 6v6l3 3"></path>
              </svg>
              <p className="text-gray-700">Timing : {event.startTime} </p>
            </div>
            <div className="flex items-center mb-4">
              <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="8" r="4"></circle>
                <path d="M8 14s-1 1.5-3 2"></path>
                <path d="M16 14s1 1.5 3 2"></path>
              </svg>
              <p className="text-gray-700">POC: {event.organizer.name}</p>
            </div>
            {user?.role === 'admin' && (
              <div className="flex justify-around">
                <a href={`/events/edit/${event._id}`} className="text-indigo-500 hover:underline mt-6 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  Edit Event
                </a>
                <button className="text-red-500  hover:underline flex items-center" onClick={() => handleDelete(event._id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="delete" stroke="#FF0000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <g fill="none" fillRule="evenodd" stroke="#FF0000">
                      <path d="M5.5 7.5V20A1.5 1.5 0 0 0 7 21.5h11a1.5 1.5 0 0 0 1.5-1.5V7.5h-14z"></path>
                      <path strokeLinecap="round" d="M8.5 10.41v8.18M12.5 10.41v8.18M16.5 10.41v8.18M9 4.333V3.244C9 2.557 9.627 2 10.4 2h4.2c.773 0 1.4.557 1.4 1.244v1.09"></path>
                      <rect width="18" height="3" x="3.5" y="4.5" rx="1.5"></rect>
                    </g>
                  </svg>
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-6">Feedbacks</h2>
        {feedbacks.map((feedback) => (
            <div key={feedback._id} className="p-6 bg-white rounded-lg shadow-md mb-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                <p className="text-lg font-semibold text-gray-800">{feedback.user.name}</p>
                </div>
                <div className="flex items-center">
                <StarRating rating={feedback.rating} />
                <p className="text-gray-600 ml-2">{feedback.rating}</p>
                </div>
            </div>
            <p className="text-gray-700">{feedback.feedbackText}</p>
            </div>
        ))}
      </div>


    </div>
  );
};

export default Page;
