import { useState, useEffect } from "react";
import axios from 'axios';

const FeedbackModel = ({ isOpen, setIsOpen, eventId}) => {
    
    const [feedbackText, setFeedbackText] = useState('');
    const [rating, setRating] = useState(0);
    const [userId, setUserId] = useState('');

    useEffect(() => {
      const user = localStorage.getItem('user');
          const parsedUser = JSON.parse(user);
          setUserId(parsedUser)
    }, []);
    
    const handleStarClick = (starValue) => {
      setRating(starValue);
    };

    const handleSubmit = async () => {
      const feedback = {
        userId :  userId,
        eventId : eventId,
        feedbackText : feedbackText,
        rating : rating 
      }
      try {
          const response = await axios.post('http://localhost:8080/api/postFeedback', feedback);
          if(response.status === 200){
              setFeedbackText('');
              setRating(0);
              setIsOpen(false);
              
          }
          else {
             console.log(response);
          }
      } catch(error) {
        console.error('Error occurred while submitting feedback:', error);
      }
      
    };
  
    return (
      <>
        {isOpen && (
          <div className="bg-slate-400/20 backdrop-blur-sm p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer">
            <div className="bg-gradient-to-br from-slate-100 to-slate-300 text-white p-6 rounded-lg lg:w-1/2  cursor-default relative overflow-hidden">
            <div className="flex justify-end">
              <button
               onClick={() => setIsOpen(false)}
               className="bg-white hover:bg-gray-200 text-black font-semibold py-1 px-4 rounded-md border border-gray-300">
               <svg
                className="w-4 h-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20">
                <path fillRule="evenodd"
                  d="M10 8.586l4.95-4.95 1.414 1.414L11.414 10l4.95 4.95-1.414 1.414L10 11.414l-4.95 4.95-1.414-1.414L8.586 10 3.636 5.05l1.414-1.414L10 8.586z"/>
                </svg>
              </button>
            </div>
              <div className="mt-4">
                <label htmlFor="feedback" className="block text-gray-700 font-bold mb-2">
                  Your Feedback
                </label>
                <textarea
                  id="feedback"
                  className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40"
                  placeholder="Write your feedback here..."
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                ></textarea>
              </div>
              <div className="mt-4 flex justify-center gap-4 text-black">
                <p>Rate event </p>
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  onClick={() => handleStarClick(star)}
                  className={`w-6 h-6 fill-current cursor-pointer ${
                    star <= rating ? 'text-yellow-500' : 'text-gray-400'
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 1l2.598 6.775H19.5l-5.192 4.235L16.5 19l-6.5-5.5L3.5 19l1.192-7.99L0 7.775h6.902L10 1z"
                  />
                </svg>
              ))}
            </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                >
                  Submit Feedback
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };
  

export default FeedbackModel;


