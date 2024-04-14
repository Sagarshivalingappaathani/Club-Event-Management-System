"use client";
import React, { useEffect, useState } from 'react';

const EditEventPage = () => {
  const [eventId, setEventId] = useState(null);
  const [users, setUsers] = useState([]);
  const [eventDetails, setEventDetails] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    organizer:'',
  });

  useEffect(() => {
    fetch('http://localhost:8080/api/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => console.error('Error fetching users:', error));
  }, []);


  useEffect(() => {
    const dynamicSegment = window.location.pathname.split('/').pop();
    setEventId(dynamicSegment);

    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/getEventDetails/${dynamicSegment}`);
        if (response.ok) {
          const eventData = await response.json();
          setEventDetails(eventData);
        } else {
          console.error('Error fetching event details:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEventDetails();
  }, []);

  const handleDelete = () => {

    const deleteEvent = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/deleteEvent/${eventId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          window.location.href = '/events';
        } else {
          console.error('Error deleting event:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    };

    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent();
    }
  };

  const handleUpdate = () => {

    const updateEvent = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/updateEvent/${eventId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(eventDetails),
        });
        if (response.ok) {
          window.location.href = '/events';
        } else {
          console.error('Error updating event:', response.statusText);
        }
      } catch (error) {
        console.error('Error updating event:', error);
      }
    };

    updateEvent();
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4">Edit Event {eventDetails.title}</h1>
        <form className="space-y-4">
            <div>
            <label className="block text-sm font-medium text-gray-700">Title:</label>
            <input
                type="text"
                className="mt-1 p-2 w-full border rounded-md"
                value={eventDetails.title}
                onChange={(e) => setEventDetails({ ...eventDetails, title: e.target.value })}
            />
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-700">Description:</label>
            <textarea
                className="mt-1 p-2 w-full border rounded-md"
                value={eventDetails.description}
                onChange={(e) => setEventDetails({ ...eventDetails, description: e.target.value })}
            />
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-700">Start Date:</label>
            <input
                type="date"
                className="mt-1 p-2 w-full border rounded-md"
                value={eventDetails.startDate}
                onChange={(e) => setEventDetails({ ...eventDetails, startDate: e.target.value })}
            />
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700">End Date:</label>
            <input
                type="date"
                className="mt-1 p-2 w-full border rounded-md"
                value={eventDetails.endDate}
                onChange={(e) => setEventDetails({ ...eventDetails, endDate: e.target.value })}
            />
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700">Location:</label>
            <input
                type="text"
                className="mt-1 p-2 w-full border rounded-md"
                value={eventDetails.location}
                onChange={(e) => setEventDetails({ ...eventDetails, location: e.target.value })}
            />
            </div>
            <label className="block mb-4">
                <span className="text-gray-700">Organizer:</span>
                <select
                value={eventDetails.organizer}
                onChange={(e) => setEventDetails({ ...eventDetails, organizer: e.target.value })}
                className="mt-1 p-2 w-full border rounded-md bg-white text-black"
                style={{ appearance: 'menulist-button' }} 
                >
                <option value="" disabled>
                    Select Organizer
                </option>
                {users.map((user) => (
                    <option key={user._id} value={user._id}>
                    {user.name}
                    </option>
                ))}
                </select>
            </label>
            <div className="flex justify-between">
            <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300"
                onClick={handleDelete}
            >
                Delete Event
            </button>

            <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                onClick={handleUpdate}
            >
                Update Event
            </button>
            </div>
        </form>
    </div>

  );
};

export default EditEventPage;
