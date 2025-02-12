// src/HeartExplosion.js
import React from 'react';
import { motion } from 'framer-motion';

const heartVariants = {
  initial: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
  },
  animate: (custom) => ({
    opacity: 0,
    x: custom.x,
    y: custom.y,
    scale: 1.5,
    transition: {
      duration: 1,
      ease: "easeOut"
    }
  })
};

const HeartExplosion = () => {
  // Create an array for, say, 10 hearts with random offsets.
  const hearts = Array.from({ length: 10 }, (_, i) => {
    const x = Math.random() * 200 - 100; // random x offset between -100 and 100
    const y = Math.random() * 200 - 100; // random y offset between -100 and 100
    return { id: i, x, y };
  });
  
  return (
    <div style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      width: 0,
      height: 0,
      pointerEvents: "none"
    }}>
      {hearts.map(heart => (
        <motion.div
          key={heart.id}
          custom={{ x: heart.x, y: heart.y }}
          variants={heartVariants}
          initial="initial"
          animate="animate"
          style={{
            position: "absolute",
            fontSize: "5.5em",
            color: "#ff0000",
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
};

export default HeartExplosion;
