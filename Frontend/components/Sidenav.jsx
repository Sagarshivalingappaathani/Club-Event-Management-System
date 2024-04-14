import React, { useState } from "react";

const Sidenav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile View */}
      <div className="lg:hidden">
        <button
          onClick={toggleSidebar}
          className="fixed top-3 right-3 z-50 rounded-md p-2 bg-gray-900 text-white focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
        {/* Sidebar */}
        {isOpen && (
          <div
            id="logo-sidebar"
            className="fixed top-12 right-12 rounded-xl z-40 w-60 h-75 bg-title-400 transition-transform -translate-x-0"
            aria-label="Sidebar"
          >
            <div className="h-full px-3 py-4 overflow-y-auto">
              <a href="/" className="flex items-center ps-2.5 mb-5 ">
                <img
                  src="/calender.png"
                  className="h-6 me-3 sm:h-10"
                  alt="ie_logo"
                />
                <span className="self-center ml-4 text-lg font-semibold whitespace-nowrap text-white">
                  Calender
                </span>
              </a>
              <ul className="space-y-2 font-medium text-white">
                <li>
                  <a
                    href="/"
                    className="flex items-center p-2  rounded-lg text-white hover:text-title-400 hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/events"
                    className="flex items-center p-2  rounded-lg text-white hover:text-title-400 hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    Dashbord
                  </a>
                </li>
                <li>
                  <a
                    href="/events/allevents"
                    className="flex items-center p-2  rounded-lg text-white hover:text-title-400 hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    All Events
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2  rounded-lg text-white hover:text-title-400 hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    Organisers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2  rounded-lg text-white hover:text-title-400 hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    User
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Desktop View */}
      <div
        id="logo-sidebar"
        className="hidden lg:block fixed top-0 left-0 z-40 w-64 h-screen bg-title-400 rounded-xl"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <a href="/" className="flex items-center ps-2.5 mb-5 ">
            <img
              src="/calender.png"
              className="h-6 me-3 sm:h-10"
              alt="ie_logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
              Calender
            </span>
          </a>
          <ul className="space-y-2 font-medium text-white">
            <li>
              <a
                href="/"
                className="flex items-center p-2  rounded-lg text-white hover:text-title-400 hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/events"
                className="flex items-center p-2  rounded-lg text-white hover:text-title-400 hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="/events/allevents"
                className="flex items-center p-2  rounded-lg text-white hover:text-title-400 hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                All Events
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2  rounded-lg text-white hover:text-title-400 hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                Organisers
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2  rounded-lg text-white hover:text-title-400 hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                Users
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidenav;
