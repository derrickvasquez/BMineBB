// src/FlyingText.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const generateRandomPath = () => {
  const points = [];
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  // Generate 5 random points within a reduced range (so the text stays on-screen).
  for (let i = 0; i < 5; i++) {
    const x = Math.random() * (vw - 200) - (vw - 200) / 2;
    const y = Math.random() * (vh - 200) - (vh - 200) / 2;
    points.push({ x, y });
  }
  // Start and end at (0,0) for a loop.
  points.unshift({ x: 0, y: 0 });
  points.push({ x: 0, y: 0 });
  return points;
};

const FlyingText = () => {
  const [path, setPath] = useState(generateRandomPath());

  useEffect(() => {
    // Regenerate the path on window resize (optional).
    const handleResize = () => {
      setPath(generateRandomPath());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.div
      className="flying-text"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
        fontSize: '1.5em',
        fontWeight: 'bold',
        color: '#f8f8f2',
        textShadow: '0 0 8px rgba(255, 255, 255, 0.8)',
        pointerEvents: 'none',
      }}
      animate={{
        // Map the random points to arrays for x and y.
        x: path.map(point => point.x),
        y: path.map(point => point.y),
      }}
      transition={{
        duration: 10,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'loop',
      }}
    >
      Hey babe....
    </motion.div>
  );
};

export default FlyingText;
