// components/HeroSection.js
import { useEffect, useRef } from "react";

const navbarHeight = 64;

const HeroSection = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const windowHeight = window.innerHeight;
    const heroHeight = windowHeight - navbarHeight;
    heroRef.current.style.height = `${heroHeight}px`;
  }, []);

  return (
    <section
      ref={heroRef}
      className="bg-cover bg-center flex items-center justify-center z-0 relative"
      style={{ backgroundImage: "url('/hero3.jpg')" }}
    >
      <div className="text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold text-teal-500 mb-4 animate-fade-in">
          Welcome to Student Club
        </h1>

        <p className="text-lg md:text-xl w-1/2 mx-auto text-black font-bold ">
          When you bring together people from different backgrounds, you'll be
          surprised how diverse their lines of thought are, and yet, you'll find
          them supporting your revolutionary ideas. This diversity of
          perspectives not only enriches discussions but also fosters creativity
          and innovation.
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
