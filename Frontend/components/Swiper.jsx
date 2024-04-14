"use client";
import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  EffectCoverflow,
  Autoplay,
} from "swiper";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/effect-coverflow/effect-coverflow.scss";
import "../styles/global.css";

SwiperCore.use([Navigation, Pagination, EffectCoverflow, Autoplay]);

export default function SwiperCoverflow() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const cards = [
    {
      title: "Code",
      details:
        "Code is a peer group of computer tech enthusiasts. We at Code explore various new fields and technologies in computer science and maintain a competitive",
      imagepath: "./Code.png",
    },
    {
      title: "Capital",
      details:
        "Capital is a financial consulting firm specializing in investment strategies and wealth management services for high-net-worth individuals and businesses.",
      imagepath: "./Capital.png",
    },
    {
      title: "Gadget",
      details:
        "Gadget is your ultimate destination for the latest tech gadgets, reviews, and tips. Stay updated with the newest innovations in the world of technology.",
      imagepath: "./Gadget.png",
    },
    {
      title: "Media",
      details:
        "Media is a digital media production company offering services in video production, animation, and multimedia content creation for businesses and brands.",
      imagepath: "./Media.png",
    },
    {
      title: "Robotics",
      details:
        "Robotics specializes in robotic solutions for industries such as manufacturing, healthcare, and automation. We provide cutting-edge robotic systems ",
      imagepath: "./Robotics.png",
    },
    {
      title: "Script",
      details:
        "Script is a creative writing platform where writers can showcase their work, connect with readers, and explore diverse genres and styles of writing and styles of writing.",
      imagepath: "./Script.png",
    },
    {
      title: "Tectonic",
      details:
        "Tectonic is a geology research institute studying seismic activities, tectonic plate movements, and geological phenomena to understand Earth's",
      imagepath: "./Tectonic.png",
    },
  ];

  const mainSwiperRef = useRef(null);

  useEffect(() => {
    if (mainSwiperRef.current && mainSwiperRef.current.swiper) {
      mainSwiperRef.current.swiper.update();
    }
  }, []);

  return (
    <>
      {isClient && (
        <div className="App mx-auto">
          <h2 className="mt-10 text-4xl md:text-5xl font-extrabold mb-8 tracking-wide text-teal-600 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-teal-600">
                  Our Special Sigs
              </span>
          </h2>
          <div className="grid grid-cols-12 items-center">
            <div className="col-span-1 ml-10">
              <button
                className="prev-button w-full"
                onClick={() => {
                  if (mainSwiperRef.current && mainSwiperRef.current.swiper) {
                    mainSwiperRef.current.swiper.slidePrev();
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                  <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z" />
                  <path d="M13.293 7.293 8.586 12l4.707 4.707 1.414-1.414L11.414 12l3.293-3.293-1.414-1.414z" />
                </svg>
              </button>
            </div>

            <div className="col-span-10">
              <Swiper
                ref={mainSwiperRef}
                loop={true}
                effect="coverflow"
                coverflowEffect={{
                  rotate: 0,
                  stretch: -50,
                  depth: 100,
                  modifier: 1,
                  slideShadows: false,
                }}
                slidesPerView={1}
                breakpoints={{
                  640: {
                    slidesPerView: 3,
                  },
                }}
                className="w-full"
                autoplay={{ delay: 2000 }}
              >
                {cards.map((card, index) => (
                  <SwiperSlide key={index}>
                    <div className="w-full flex flex-col mt-6 text-gray-700 bg-gray-200 shadow-md bg-clip-border rounded-xl hover:shadow-lg border-4 border-teal-600">
                      <img
                        src={card.imagepath}
                        alt="card-image"
                        width={300}
                        height={400}
                        className="mx-auto shadow-lg rounded-2xl align-middle border-none"
                      />
                      <div className="p-6">
                        <h5 className="block mb-2 font-sans text-xl text-center antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                          {card.title}
                        </h5>
                        <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                          {card.details}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="col-span-1 ml-10">
              <button
                className="next-button w-full"
                onClick={() => {
                  if (mainSwiperRef.current && mainSwiperRef.current.swiper) {
                    mainSwiperRef.current.swiper.slideNext();
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                  <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z" />
                  <path d="M9.293 8.707 12.586 12l-3.293 3.293 1.414 1.414L15.414 12l-4.707-4.707-1.414 1.414z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
