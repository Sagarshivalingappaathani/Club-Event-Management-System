"use client";
import { useRouter, usePathname } from 'next/navigation'
import { useState, useEffect } from 'react';
import axios from 'axios';

const EventForm = () => {

  const router = useRouter();
  const pathname = usePathname();
  const startDate = pathname.split("/").pop();

  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [organizer, setOrganizer] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [users, setUsers] = useState([]);
  
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaURL, setMediaURL]=useState('');

useEffect(() => {
    fetch('http://localhost:8080/api/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => console.error('Error fetching users:', error));
}, []);

useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
        const parsedUser = JSON.parse(user);
        const userRole = parsedUser.role;
        
        if (userRole !== 'admin') {
            router.push('/'); 
        }
        } else {
        router.push('/auth/login');
    }
}, []);

const handleUpload = async () => {
    const formData = new FormData()
    formData.append('file', mediaFile)
    try {
     const response = await axios.post('http://localhost:8080/api/uploadposter', formData );
     if (response.status === 201) {
    
       setMediaURL(response.data.path);

       alert('Upload successful!');
     } else {
       console.error('Failed to Upload:', response.status, response.statusText);
     }
    } catch (error) {
      console.error('Error Uploading :', error);
    }
};


const handleSubmit = (e) => {
    e.preventDefault();

    const apiUrl = 'http://localhost:8080/api/createevent';

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, startDate, startTime, endDate, endTime, organizer, description, location, mediaURL }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Event created successfully');
          setDescription("");
          setLocation("");
          setOrganizer("");
          setTitle("");
          setStartTime(null);
          setEndDate(null);
          setEndTime(null);
          setMediaURL('');
          router.push('/events');
        } else {
          console.error('Failed to create event');
          alert('error')
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <>
        <form onSubmit={handleSubmit} className="w-full md:w-2/3 lg:w-1/2 mx-auto mt-8 p-4 bg-gray-100 rounded-md">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label className="block">
                <span className="text-gray-700">Event Title:</span>
                <select
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md"
                >
                    <option value="" disabled>Select an event</option>
                    <option value="CP Contest">CP Contest</option>
                    <option value="KEPs">KEPs</option>
                    <option value="General Meet">General Meet</option>
                </select>
            </label>
            <label className="block mt-4">
                <span className="text-gray-700">Or enter your own:</span>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md"
                />
            </label>
        </div>
        <div>
            <label className="block">
                <span className="text-gray-700">Event Date:</span>
                <input
                    type="date"
                    value={startDate}
                    className="mt-1 p-2 w-full border rounded-md"
                    readOnly
                />
            </label>
            <label className="block mt-4">
                <span className="text-gray-700">Start Time:</span>
                <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md"
                />
            </label>
            <label className="block">
                <span className="text-gray-700">End Date:</span>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md"
                />
            </label>
            <label className="block mt-4">
                <span className="text-gray-700">End Time:</span>
                <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md"
                />
            </label>
        </div>
    </div>
    <div className="mt-4">
        <label className="block">
            <span className="text-gray-700">Organizer:</span>
            <select
                value={organizer}
                onChange={(e) => setOrganizer(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md bg-white text-black"
                style={{ appearance: 'menulist-button' }}
            >
                <option value="" disabled>Select Organizer</option>
                {users.map((user) => (
                    <option key={user._id} value={user._id}>
                        {user.name}
                    </option>
                ))}
            </select>
        </label>
    </div>
    <div className='flex gap-2 mt-4'>
    <div className="relative border border-gray-300 rounded-md px-2 py-1 flex items-center justify-between bg-white w-80">
        <input
        type="file"
        id="fileInput"
        className="absolute inset-0 opacity-0 h-full cursor-pointer"
        onChange={(e) =>  setMediaFile(e.target.files[0])}
        />
        <span className="text-gray-500">
             {!mediaFile ? 'Choose Event Poster' : <span className="truncate text-black">{mediaFile.name}</span>}
        </span>

    </div>
        <button
           type="button"
           className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded transition duration-300 ease-in-out"
           onClick={handleUpload}> Upload
        </button>
    </div>
    <div className="mt-4">
        <label className="block">
            <span className="text-gray-700">Description:</span>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
            />
        </label>
    </div>
    <div className="mt-4">
        <label className="block">
            <span className="text-gray-700">Location:</span>
            <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
            />
        </label>
    </div>
    <div className="mt-4">
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 w-full">
            Create Event
        </button>
    </div>
</form>

    </>
  );
};

export default EventForm;
