// src/FallingHearts.js
import React, { useEffect, useState } from 'react';

const colors = ['#800080', '#ff0000', '#ffc0cb', '#ffffff'];

const FallingHearts = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    // Generate a new heart every 500ms
    const interval = setInterval(() => {
      const newHeart = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100, // random horizontal position (in %)
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 20 + 20, // size between 20px and 40px
      };
      setHearts((prev) => [...prev, newHeart]);
      // Remove hearts older than 10 seconds
      setHearts((prev) => prev.filter((h) => Date.now() - h.id < 10000));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="falling-hearts">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          style={{
            position: 'absolute',
            left: `${heart.left}%`,
            top: '-50px',
            animation: 'fall 10s linear',
            pointerEvents: 'none',
          }}
        >
          <svg
            width={`${heart.size}px`}
            height={`${(heart.size * 29.6) / 32}px`}
            viewBox="0 0 32 29.6"
            fill={heart.color}
          >
            <path d="M23.6,0c-3.4,0-6.4,2.4-7.6,5.7C14.8,2.4,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4
                     c0,9.5,16,21.2,16,21.2s16-11.7,16-21.2C32,3.8,28.2,0,23.6,0z" />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default FallingHearts;
