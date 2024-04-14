"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ShuffleHero = () => {
  return (
    <section className="w-full mb-1 py-2 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-7xl mx-auto min-h-screen">
      <div className="bg-gradient-to-br from-teal-400 to-teal-900 text-white text-center py-8 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 lg:mr-10">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-wide">
          About Us
        </h1>
        <div className="text-lg md:text-xl mb-8 opacity-80">
          <p className="mb-4">
            Student Club was founded with a vision to foster a vibrant and
            inclusive community on campus. Our journey began with the
            recognition of the need for a space where students could come
            together, exchange ideas, and collaborate on projects that inspire
            positive change. We are dedicated to providing a platform for
            students to explore their interests, develop valuable skills, and
            make meaningful connections.
          </p>
          <p>
            Whether you're a seasoned enthusiast or just curious to learn more,
            there's a place for everyone at our club. Join us as we embark on
            this exciting journey of growth, discovery, and impact!
          </p>
        </div>
        <button className="bg-white text-teal-700 hover:bg-teal-100 px-8 py-4 rounded-full transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500">
          Explore Our Innovations
        </button>
      </div>

      <ShuffleGrid />
    </section>
  );
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src: "./p1.jpg",
  },
  {
    id: 2,
    src: "./p5.jpg",
  },
  {
    id: 3,
    src: "./p2.jpg",
  },
  {
    id: 4,
    src: "./p3.jpg",
  },
  {
    id: 5,
    src: "./p4.jpg",
  },
  {
    id: 6,
    src: "./p6.jpg",
  },
  {
    id: 7,
    src: "./p7.jpg",
  },
  {
    id: 8,
    src: "./p8.jpg",
  },
  {
    id: 9,
    src: "./p9.png",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1610768764270-790fbec18178?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 11,
    src: "./p10.png",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=882&q=80",
  },
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1560089000-7433a4ebbd64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80",
  },
  {
    id: 15,
    src: "https://images.unsplash.com/photo-1606244864456-8bee63fce472?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=681&q=80",
  },
  {
    id: 16,
    src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1820&q=80",
  },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default ShuffleHero;
