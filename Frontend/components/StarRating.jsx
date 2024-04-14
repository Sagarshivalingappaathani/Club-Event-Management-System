import React from 'react';

const StarRating = ({ rating }) => {
  const stars = [];
  // Round the rating to the nearest 0.5 to display half stars
  const roundedRating = Math.round(rating * 2) / 2;

  // Fill stars based on the rounded rating
  for (let i = 0; i < 5; i++) {
    if (i < roundedRating) {
      if (roundedRating - i === 0.5) {
        // Add a half star
        stars.push(<span key={i} className="text-yellow-500">&#9733;</span>);
      } else {
        // Add a full star
        stars.push(<span key={i} className="text-yellow-500">&#9733;</span>);
      }
    } else {
      // Add an empty star
      stars.push(<span key={i} className="text-gray-400">&#9733;</span>);
    }
  }

  return <div>{stars}</div>;
};

export default StarRating;
