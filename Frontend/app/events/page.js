"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Sidenav from "../../components/Sidenav";
import EventModel from "../../components/EventModel";
import logo from '../../public/logo.jpg'

const EventsPage = () => {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [eventId, setEventId] = useState(null);

  const [windowWidth, setWindowWidth] = useState(undefined);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    if (typeof window !== 'undefined') { // Check if window object exists (for client-side rendering)
      setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  const aspectRatio = () => {
    if (windowWidth !== null) {
      if (windowWidth < 769) {
        return 0.8;
      } else {
        return 1.7;
      }
    }
    return 1.35;
  };

  const handleDateClick = (arg) => {
    if (role === "admin") {
      router.push(`/events/createEvent/${arg.dateStr}`);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    const parsedUser = JSON.parse(user);
    const userRole = parsedUser.role;
    setRole(userRole);
  }, []);

  const eventObjects = events.map((event) => {
    const colorMapping = {
      "CP Contest": "#FFD700",
      KEPs: "#00FF00",
      "General Meet": "#FFA07A",
    };
    const backgroundColor = colorMapping[event.title] || "#0080FF";
    return {
      id: event._id,
      title: event.title,
      start: `${event.startDate.substring(0, 11)}${event.startTime}:00`,
      end: `${event.endDate.substring(0, 11)}${event.endTime}:00`,
      backgroundColor: backgroundColor,
    };
  });

  const handleEventClick = (eventId) => {
    setEventId(eventId);
    setModalOpen(true);
  };

  const renderEventContent = (eventInfo) => {
    return (
      <div
        className="w-full rounded-md pl-2 cursor-pointer"
        style={{ backgroundColor: eventInfo.backgroundColor }}
        onClick={() => handleEventClick(eventInfo.event.id)}
      >
        <div className="text-wrap">{eventInfo.event.title}</div>
      </div>
    );
  };

  useEffect(() => {
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

    fetchEvents();
  }, []);

  return (
    <>
      <Sidenav />
      <div className="lg:ml-64">
        <div className="h-16 bg-title-500">
          <h1 className="text-title text-xl sm:text-3xl font-bold tracking-wide leading-tight pt-4 pl-5 sm:pl-9">
            Club Main Calender
          </h1>
        </div>
        <div
          className="overflow-y-auto"
          style={{ height: "calc(100vh - 4rem)" }}
        >
          <div className="flex justify-center lg:m-0 lg:mt-10">
            <div className="w-full lg:w-3/4 p-2 lg:p-0 calendar-container ">
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                  left: "today prev,next",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                aspectRatio = {aspectRatio()}
                dateClick={handleDateClick}
                eventContent={renderEventContent}
                events={eventObjects}
              />
              <EventModel
                isOpen={modalOpen}
                setIsOpen={setModalOpen}
                eventId={eventId}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventsPage;
