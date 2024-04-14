import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user,setUser]=useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    setUser(JSON.parse(storedUser));
    console.log(storedUser)
    if (storedUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <nav className="bg-white shadow sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <a href="/" className="flex-shrink-0 flex items-center">
              <img className="block h-8 w-auto" src="./club-logo.jpg" alt="Logo" />
              <span className="font-mono self-center ml-4 text-black text-2xl font-sens font-bold whitespace-nowrap">Student Club</span>
            </a>
          </div>
          <div className="hidden lg:flex lg:items-center lg:ml-6">
            <div className="flex space-x-4">
              <a href="/" className="text-gray-900 hover:bg-teal-100 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </a>
              <a href="#" className="text-gray-900 hover:bg-teal-100 px-3 py-2 rounded-md text-sm font-medium">
                Team
              </a>
              <a href="#" className="text-gray-900 hover:bg-teal-100 px-3 py-2 rounded-md text-sm font-medium">
                SIGS
              </a>
              <a href="/events" className="text-gray-900 hover:bg-teal-100 px-3 py-2 rounded-md text-sm font-medium">
                Events
              </a>
              <a href="#" className="text-gray-900 hover:bg-teal-100 px-3 py-2 rounded-md text-sm font-medium">
                Stories
              </a>
            </div>
            {isLoggedIn ? (
              <div className="flex items-center">
                <button onClick={toggleProfile} className="ml-4 bg-gray-50 hover:bg-teal-100 px-3 py-2 rounded-md text-sm font-medium text-gray-900">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="profile"><g fill="none" fill-rule="evenodd" stroke="#200E32" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" transform="translate(4 2.5)"><circle cx="7.579" cy="4.778" r="4.778"></circle><path d="M5.32907052e-15,16.2013731 C-0.00126760558,15.8654831 0.0738531734,15.5336997 0.219695816,15.2311214 C0.677361723,14.3157895 1.96797958,13.8306637 3.0389178,13.610984 C3.81127745,13.4461621 4.59430539,13.3360488 5.38216724,13.2814646 C6.84083861,13.1533327 8.30793524,13.1533327 9.76660662,13.2814646 C10.5544024,13.3366774 11.3373865,13.4467845 12.1098561,13.610984 C13.1807943,13.8306637 14.4714121,14.270023 14.929078,15.2311214 C15.2223724,15.8479159 15.2223724,16.5639836 14.929078,17.1807781 C14.4714121,18.1418765 13.1807943,18.5812358 12.1098561,18.7917621 C11.3383994,18.9634099 10.5550941,19.0766219 9.76660662,19.1304349 C8.57936754,19.2310812 7.38658584,19.2494317 6.19681255,19.1853548 C5.92221301,19.1853548 5.65676678,19.1853548 5.38216724,19.1304349 C4.59663136,19.077285 3.8163184,18.9640631 3.04807112,18.7917621 C1.96797958,18.5812358 0.686515041,18.1418765 0.219695816,17.1807781 C0.0745982583,16.8746908 -0.000447947969,16.5401098 5.32907052e-15,16.2013731 Z"></path></g></svg>
                </button>
                <button onClick={handleLogout} className="ml-4 bg-teal-500 hover:bg-teal-700 px-3 py-2 rounded-md text-sm font-medium text-gray-900">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <a href="/auth/login" className="ml-4 bg-gray-50 hover:bg-teal-100 px-3 py-2 rounded-md text-sm font-medium text-gray-900">
                  Sign In
                </a>
                <a href="/auth/register" className="ml-4 bg-teal-500 hover:bg-teal-600 px-3 py-2 rounded-md text-sm font-medium text-white">
                  Sign up
                </a>
              </div>
            )}
          </div>
          <div className="flex lg:hidden">
            <button onClick={toggleMenu} className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900">
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isProfileOpen && (
        <div className="mr-10 absolute right-20 mt-5 w-48 bg-white rounded-md shadow-lg overlay z-50">
            <div className="py-1">
                <button onClick={toggleProfile} className="block w-full font-bold text-left px-4 py-2 text-sm text-teal-500 hover:bg-gray-100">
                    {user?.name}
                </button>
                <button onClick={toggleProfile} className="block w-full text-left font-bold px-4 py-2 text-sm text-teal-500 hover:bg-gray-100">
                    {user?.email}
                </button>
            </div>
        </div>
      )}

      <div className={`${isMenuOpen ? 'block' : 'hidden'} lg:hidden`}>
        <div className="flex flex-col items-center px-2 pt-2 pb-3 space-y-1">
          <a href="#" className="hover:bg-teal-100 block px-3 py-2 rounded-md text-base font-medium text-gray-900">
            Home
          </a>
          <a href="#" className="hover:bg-teal-100 block px-3 py-2 rounded-md text-base font-medium text-gray-900">
            Team
          </a>
          <a href="#" className="hover:bg-teal-100 block px-3 py-2 rounded-md text-base font-medium text-gray-900">
            SIGS
          </a>
          <a href="#" className="hover:bg-teal-100 block px-3 py-2 rounded-md text-base font-medium text-gray-900">
            Events
          </a>
          <a href="#" className="hover:bg-teal-100 block px-3 py-2 rounded-md text-base font-medium text-gray-900">
            Stories
          </a>
        </div>
        {isLoggedIn ? (
              <div className="flex flex-col items-center px-2 pt-2 pb-3">
                <button onClick={toggleProfile} className="bg-gray-50 hover:bg-teal-100 px-3 py-2 rounded-md text-sm font-medium text-gray-900">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="profile"><g fill="none" fill-rule="evenodd" stroke="#200E32" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" transform="translate(4 2.5)"><circle cx="7.579" cy="4.778" r="4.778"></circle><path d="M5.32907052e-15,16.2013731 C-0.00126760558,15.8654831 0.0738531734,15.5336997 0.219695816,15.2311214 C0.677361723,14.3157895 1.96797958,13.8306637 3.0389178,13.610984 C3.81127745,13.4461621 4.59430539,13.3360488 5.38216724,13.2814646 C6.84083861,13.1533327 8.30793524,13.1533327 9.76660662,13.2814646 C10.5544024,13.3366774 11.3373865,13.4467845 12.1098561,13.610984 C13.1807943,13.8306637 14.4714121,14.270023 14.929078,15.2311214 C15.2223724,15.8479159 15.2223724,16.5639836 14.929078,17.1807781 C14.4714121,18.1418765 13.1807943,18.5812358 12.1098561,18.7917621 C11.3383994,18.9634099 10.5550941,19.0766219 9.76660662,19.1304349 C8.57936754,19.2310812 7.38658584,19.2494317 6.19681255,19.1853548 C5.92221301,19.1853548 5.65676678,19.1853548 5.38216724,19.1304349 C4.59663136,19.077285 3.8163184,18.9640631 3.04807112,18.7917621 C1.96797958,18.5812358 0.686515041,18.1418765 0.219695816,17.1807781 C0.0745982583,16.8746908 -0.000447947969,16.5401098 5.32907052e-15,16.2013731 Z"></path></g></svg>
                </button>
                <button onClick={handleLogout} className="bg-gray-50 hover:bg-teal-100 px-3 py-2 rounded-md text-sm font-medium text-gray-900">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center px-2 pt-2 pb-3">
                <a href="/auth/login" className=" bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium text-gray-900">
                  Sign In
                </a>
                <a href="/auth/register" className=" bg-teal-500 hover:bg-teal-600 px-3 py-2 rounded-md text-sm font-medium text-white">
                  Sign up
                </a>
              </div>
            )}
      </div>
    </nav>
  );
};

export default Navbar;
