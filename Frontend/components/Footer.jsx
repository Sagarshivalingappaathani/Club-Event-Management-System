import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram,
  faGithubAlt,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="font-poppins px-10 bg-black text-white py-8 md:py-16">
      <div className="container mx-auto flex flex-wrap justify-around">
        <div className="w-full md:w-1/2 lg:w-2/5 mb-8 md:mb-0">
          <div className="mb-6 mr-5">
           <div className="flex flex-row items-center mb-4">
                <img src="./club-logo.jpg" className="h-10 mr-4 rounded-md" alt="" />
                <p className="text-lg md:text-xl font-bold ">Student Club</p>
           </div>
            <p className="text-sm md:text-base">
              This is the student club of our college. We are divided by three core Special Interest Groups (SIGs) - Code, Gadget and Garage; but united by five auxiliary SIGs - Vriddhi, our social initiative, Script, our literary SIG, Robotics, Business and Tectonic, our newest SIG for Civil and Architecture.
            </p>
          </div>
          <div className="social">
            <p className="text-lg md:text-xl font-bold mb-4">Social</p>
            <div className="flex space-x-4">
              <FontAwesomeIcon
                className="icon text-gray-400"
                icon={faFacebook}
                size="1x"
              />
              <FontAwesomeIcon
                className="icon text-gray-400"
                icon={faGithubAlt}
                size="1x"
              />
              <FontAwesomeIcon
                className="icon text-gray-400"
                icon={faLinkedin}
                size="1x"
              />
              <FontAwesomeIcon
                className="icon text-gray-400"
                icon={faInstagram}
                size="1x"
              />
              <FontAwesomeIcon
                className="icon text-gray-400"
                icon={faTwitter}
                size="1x"
              />
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:mx-10 lg:w-1/5 mb-8 md:mb-0">
          <div className="mb-6 lg:mx-10">
            <p className="text-lg md:text-xl font-bold mb-4">Links</p>
            <ul className="text-sm md:text-base">
              <li>
                <a href="#" className="text-gray-500 block mb-2">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 block mb-2">
                  Events
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 block mb-2">
                  SIGs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 block mb-2">
                  SMP
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 block mb-2">
                  Team
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 block mb-2">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 block">
                  Bored?
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/5">
          <div>
            <p className="text-lg md:text-xl font-bold mb-4">Contact Info</p>
            <p className="text-sm md:text-base flex items-center mb-2">
              <FontAwesomeIcon icon={faMapMarkerAlt} size="1x" className="mr-2" />
              National Institute of Technology Karnataka, Surathkal
            </p>
            <p className="text-sm md:text-base flex items-center">
              <FontAwesomeIcon icon={faEnvelope} size="1x" className="mr-2" />
              studentclub@nitk.edu.in
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;