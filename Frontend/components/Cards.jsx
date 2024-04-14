'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';

const isClient = typeof window !== 'undefined';

const CardLayout = ({ cards }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 900);
    };

    if (isClient) {
      checkScreenSize();
      window.addEventListener('resize', checkScreenSize);

      return () => {
        window.removeEventListener('resize', checkScreenSize);
      };
    }
  }, [isClient]);

  const handlePrev = () => {
    setStartIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  const handleNext = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const visibleCards = [
    cards[(startIndex) % cards.length],
    cards[(startIndex + 1) % cards.length],
    cards[(startIndex + 2) % cards.length],
  ];
  
  return (
  <>
    <h2 className="mt-10 text-3xl md:text-5xl font-extrabold mb-8 tracking-wide text-teal-600 text-center">
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-teal-600">
        Explore Our Special Interest Groups
      </span>
    </h2>
    <div className="flex items-center flex-wrap justify-center gap-4">
      {!isSmallScreen && (
        <button
          className="mx-2 p-1 rounded-full bg-teal-500 text-white hover:bg-teal-700 focus:outline-none focus:shadow-outline-blue active:bg-teal-800"
          onClick={handlePrev}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      {!isSmallScreen && 
      visibleCards.map((card, index) => (
        <div key={index} className={`mx-12 p-4 w-80 h-90 relative flex flex-col mt-6 text-gray-700 bg-gray-200 shadow-md bg-clip-border rounded-xl hover:scale-105 hover:shadow-lg hover:bg-gray-400 border-4 border-teal-600`}>
          <Image
            src={card.imagepath} 
            alt="card-image" 
            width={200}
            height={300}
            className={`mx-auto ${index === 1 ? 'w-25 h-25' : 'w-20 h-20'} shadow-lg rounded-2xl align-middle border-none`} />
          <div className="p-6">
            <h5 className="block mb-2 font-sans text-xl text-center antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              {card.title}
            </h5>
            <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
              {card.details}
            </p>
          </div>
          <div className='mx-auto mt-1'>
            <button
              type="button"
              className="mx-auto text-white bg-teal-600 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              See More
            </button>
          </div>
        </div>
      ))}
      {!isSmallScreen && (
        <button
          className="mx-2 p-1 rounded-full bg-teal-500 text-white hover:bg-teal-700 focus:outline-none focus:shadow-outline-blue active:bg-teal-800"
          onClick={handleNext}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 transform rotate-180">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      {isSmallScreen && cards.map((card, index) => (
        <div key={index} className={`mx-12 p-4 w-80 h-90 relative flex flex-col mt-6 text-gray-700 bg-gray-200 shadow-md bg-clip-border rounded-xl hover:scale-105 hover:shadow-lg hover:bg-gray-400 border-4 border-teal-600`}>
          <Image
            src={card.imagepath} 
            alt="card-image" 
            width={200}
            height={300}
            className={`mx-auto w-20 h-20 shadow-lg rounded-2xl align-middle border-none`} />
          <div className="p-6">
            <h5 className="block mb-2 font-sans text-xl text-center antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              {card.title}
            </h5>
            <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
              {card.details}
            </p>
          </div>
          <div className='mx-auto mt-1'>
            <button
              type="button"
              className="mx-auto text-white bg-teal-600 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              See More
            </button>
          </div>
        </div>
      ))}
    </div>
  </>
  );
};

export default CardLayout;
