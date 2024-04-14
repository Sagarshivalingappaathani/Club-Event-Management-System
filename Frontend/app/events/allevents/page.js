"use client";
import React from "react";
import { useState, useEffect } from "react";
import Sidenav from "../../../components/Sidenav";
import StarRating from "../../../components/StarRating";
import FeedbackModel from "../../../components/FeedbackModel";

const page = () => {
  const [events, setEvents] = useState([]);
  const [organizerNames, setOrganizerNames] = useState({});
  const [user, setUser] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [eventId, setEventId] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const parsedUser = JSON.parse(user);
    fetchEventsOfUserRegistered(parsedUser._id);
    setUser(parsedUser);
  }, []);

  const handleEventClick = (eventId) => {
    setEventId(eventId);
    setModalOpen(true);
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/getEvents");
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      } else {
        console.error("Error fetching events:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const fetchEventsOfUserRegistered = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/getallregisteredeventsofuser/${userId}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setRegisteredEvents(data);
      } else {
        console.error("Error fetching events:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleDelete = (eventId) => {
    const deleteEvent = async (eventId) => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/deleteEvent/${eventId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          window.location.href = "/events";
        } else {
          console.error("Error deleting event:", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    };

    if (window.confirm("Are you sure you want to delete this event?")) {
      deleteEvent(eventId);
    }
  };

  const toggleRegistration = async (eventId) => {
    console.log(user);
    try {
      if (registeredEvents.includes(eventId)) {
        const response = await fetch(
          "http://localhost:8080/api/unregisteruser",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: user._id,
              eventId: eventId,
            }),
          }
        );
        if (response.ok) {
          fetchEvents();
          fetchEventsOfUserRegistered(user._id);
          console.log(`Unregistered for event with ID: ${eventId}`);
        } else {
          console.error("Error unregistering for event:", response.statusText);
        }
      } else {
        const response = await fetch("http://localhost:8080/api/registeruser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user._id,
            eventId: eventId,
          }),
        });
        if (response.ok) {
          fetchEvents();
          fetchEventsOfUserRegistered(user._id);
          console.log(`Registered for event with ID: ${eventId}`);
        } else {
          console.error("Error registering for event:", response.statusText);
        }
      }
    } catch (error) {
      console.error("Error toggling registration:", error);
    }
  };

  return (
    <>
      <Sidenav />
      <div className="lg:ml-64 lg:p-10">
        <h2 className="mt-5 text-3xl font-bold sm:mr-5 text-center text-teal-600">
          ✨Our Events!
        </h2>
        <div className="flex flex-col gap-10 p-10" key={events}>
          {events.map((event) => (
            <div key={event._id} className="flex flex-col lg:flex-row p-6 rounded-md shadow-lg mt-2">
              <div className="lg:w-1/2">
                <img
                  className="w-full h-full rounded-xl"
                  src={`http://localhost:8080/${event.mediaURL}`}
                  alt="poster"
                ></img>
              </div>

              <div className="bg-white lg:pl-10 lg:w-1/2">
                <h3 className="text-2xl font-semibold mb-4 text-teal-600">
                  {event.title}
                </h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <p className="text-gray-700 mb-2">
                  Total Registrations: {event.totalRegistrations}
                </p>
                <p className="text-gray-700 mb-2">
                  Rating: <StarRating rating={event.rating} />
                </p>
                <div className="flex items-center mb-2">
                  <svg
                    className="w-4 h-4 text-gray-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="18"
                      height="18"
                      x="3"
                      y="2"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M16 2v4M8 2v4M3 10h18"></path>
                  </svg>
                  <p className="text-gray-700">
                    Date: {new Date(event.startDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center mb-2">
                  <svg
                    className="w-4 h-4 text-gray-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"></path>
                  </svg>
                  <p className="text-gray-700">Location: {event.location}</p>
                </div>

                <div className="flex items-center mb-4">
                  <svg
                    className="w-4 h-4 text-gray-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 6v6l3 3"></path>
                  </svg>
                  <p className="text-gray-700">Timing : {event.startTime} </p>
                </div>
                <div className="flex items-center mb-4">
                  <svg
                    className="w-4 h-4 text-gray-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="8" r="4"></circle>
                    <path d="M8 14s-1 1.5-3 2"></path>
                    <path d="M16 14s1 1.5 3 2"></path>
                  </svg>
                  <p className="text-gray-700">POC: {event.organizer.name}</p>
                </div>

                {user?.role === "admin" && (
                  <div className="flex justify-around my-4">
                    <a
                      href={`/events/edit/${event._id}`}
                      className="text-indigo-500 hover:underline flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                      Edit Event
                    </a>
                    <button
                      className="text-red-500  hover:underline flex items-center"
                      onClick={() => handleDelete(event._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        id="delete"
                        stroke="#FF0000"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <g fill="none" fillRule="evenodd" stroke="#FF0000">
                          <path d="M5.5 7.5V20A1.5 1.5 0 0 0 7 21.5h11a1.5 1.5 0 0 0 1.5-1.5V7.5h-14z"></path>
                          <path
                            strokeLinecap="round"
                            d="M8.5 10.41v8.18M12.5 10.41v8.18M16.5 10.41v8.18M9 4.333V3.244C9 2.557 9.627 2 10.4 2h4.2c.773 0 1.4.557 1.4 1.244v1.09"
                          ></path>
                          <rect
                            width="18"
                            height="3"
                            x="3.5"
                            y="4.5"
                            rx="1.5"
                          ></rect>
                        </g>
                      </svg>
                      Delete
                    </button>
                  </div>
                )}

                <div className="flex justify-around" key={registeredEvents}>
                  {new Date(event.endDate) < new Date() ? (
                    <div>
                      <button
                        onClick={() => handleEventClick(event._id)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                      >
                        Feedback
                      </button>
                      <FeedbackModel
                        isOpen={modalOpen}
                        setIsOpen={setModalOpen}
                        eventId={eventId}
                      />
                    </div>
                  ) : (
                    new Date(event.endDate) > new Date() && (
                      <button
                        className={`bg-${
                          registeredEvents.includes(event._id) ? "red" : "green"
                        }-500 text-white hover:bg-${
                          registeredEvents.includes(event._id) ? "red" : "green"
                        }-700 rounded-md hover:shadow-md px-4 py-2 flex items-center border border-${
                          registeredEvents.includes(event._id) ? "red" : "green"
                        }-500`}
                        onClick={() => toggleRegistration(event._id)}
                      >
                        {registeredEvents.includes(event._id)
                          ? "Unregister"
                          : "Register"}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
