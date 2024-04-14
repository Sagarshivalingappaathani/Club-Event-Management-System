"use client";
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero'
import About from '@/components/About';
import Swiper from '@/components/Swiper';
import Team  from '@/components/Team';
import Footer from '@/components/Footer';

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 200,
      easing: 'ease',
      once: false, 
    });

    const handleRouteChange = () => {
      AOS.refresh();
    };

    window.addEventListener('routeChange', handleRouteChange);

    return () => {
      window.removeEventListener('routeChange', handleRouteChange);
    };
  }, []);
  
  return (
    <>
      <div data-aos="fade-up">
        <Navbar />
      </div>
      <div data-aos="fade-up">
        <Hero />
      </div>
      <div data-aos="fade-up">
        <About />
      </div>
      <div data-aos="fade-up">
        <Swiper />
      </div>
      <div data-aos="fade-up">
        <Team />
      </div>
      <div data-aos="fade-up">
        <Footer/>
      </div>
    </>
  );
};

export default Home;
