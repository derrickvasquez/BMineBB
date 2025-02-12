// src/LandingPage.js
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Heart3D from './Heart3D';
import FallingHearts from './FallingHearts';
import FlyingText from './FlyingText';
import HeartExplosion from './HeartExplosion';

const LandingPage = () => {
  const [clicked, setClicked] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);
  const audioRef = useRef(null);

  const handleHeartClick = () => {
    if (!clicked) {
      setClicked(true);
      setShowExplosion(true);
      // After 1.5 seconds, hide the explosion so that the Valentine text appears.
      setTimeout(() => {
        setShowExplosion(false);
      }, 1500);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
      audioRef.current.play().catch((err) =>
        console.error("Audio playback error:", err)
      );
    }
  }, []);

  return (
    <div className="landing-page">
      {/* Background falling hearts */}
      <FallingHearts />
      {/* Flying text that appears until the heart is clicked */}
      {!clicked && <FlyingText />}
      
      {/* Audio element playing the song */}
      <audio ref={audioRef} src="/song.mp3" autoPlay />

      {/* The heart container */}
      <div
        className="heart-container"
        onClick={handleHeartClick}
        style={{ position: "relative" }}
      >
        <motion.div
          className="heart-wrapper"
          animate={!clicked ? { scale: [1, 1.05, 1] } : { scale: 1 }}
          transition={!clicked ? { repeat: Infinity, duration: 1 } : {}}
        >
          <Heart3D />
        </motion.div>

        {/* "Click Here" overlay appears only until the heart is clicked */}
        <AnimatePresence>
          {!clicked && (
            <motion.div
              key="clickHere"
              className="click-here-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, scale: [1, 1.2, 1] }}
              exit={{
                opacity: 0,
                scale: 0.8,
                transition: { duration: 0.2 } // exit quickly
              }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "loop" }}
              style={{
                position: "center",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "#ffffff",
                fontSize: "1.2em",
                fontWeight: "bold",
                textShadow: "0 0 8px rgba(255, 255, 255, 0.8)",
                pointerEvents: "none"
              }}
            >
              Click Here
            </motion.div>
          )}
        </AnimatePresence>

        {/* Explosion of hearts animation */}
        <AnimatePresence>
          {clicked && showExplosion && (
            <motion.div
              key="explosion"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <HeartExplosion />
            </motion.div>
          )}
        </AnimatePresence>

        {/* "Will you be my valentine?" overlay appears after explosion */}
        <AnimatePresence>
          {clicked && !showExplosion && (
            <motion.div
              key="valentineText"
              className="valentine-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "#f8f8f2",
                fontSize: "2em",
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
                fontWeight: "bold",
                textShadow: "0 0 8px rgba(255, 255, 255, 0.8)"
              }}
            >
              Will you be my Valentine? 😘🤗💜
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LandingPage;
