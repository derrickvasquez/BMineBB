// src/Heart3D.js
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Heart3D = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Ensure the mount exists.
    if (!mountRef.current) {
      console.error('mountRef.current is null');
      return;
    }

    // Create scene, camera, and renderer.
    const scene = new THREE.Scene();
    const containerWidth = mountRef.current.clientWidth;
    const containerHeight = mountRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(
      75,
      containerWidth / containerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Create a renderer and attach it once.
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(containerWidth, containerHeight);
    // Remove any existing children before appending (to avoid duplicates).
    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }
    mountRef.current.appendChild(renderer.domElement);

    // Define the heart shape.
    const x = 0, y = 0;
    const heartShape = new THREE.Shape();
    heartShape.moveTo(x + 0.5, y + 0.5);
    heartShape.bezierCurveTo(x + 0.5, y + 0.5, x + 0.4, y, x, y);
    heartShape.bezierCurveTo(x - 0.6, y, x - 0.6, y + 0.7, x - 0.6, y + 0.7);
    heartShape.bezierCurveTo(x - 0.6, y + 1.1, x - 0.3, y + 1.54, x + 0.5, y + 1.9);
    heartShape.bezierCurveTo(x + 1.2, y + 1.54, x + 1.6, y + 1.1, x + 1.6, y + 0.7);
    heartShape.bezierCurveTo(x + 1.6, y + 0.7, x + 1.6, y, x + 1, y);
    heartShape.bezierCurveTo(x + 0.7, y, x + 0.5, y + 0.5, x + 0.5, y + 0.5);

    // Create a flat heart geometry.
    const geometry = new THREE.ShapeGeometry(heartShape);
    geometry.center(); // Center the geometry.

    // Use a basic material that does not reflect light.
    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      side: THREE.FrontSide,
    });
    const heartMesh = new THREE.Mesh(geometry, material);

    // Scale the heart and set its position.
    heartMesh.scale.set(2, 2, 2);
    heartMesh.position.set(0, 0, 0);
    // If the heart appears upside down, you might adjust with:
    heartMesh.rotation.z = Math.PI;

    // Add the heart mesh to the scene.
    scene.add(heartMesh);

    // Start the animation loop.
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize.
    const handleResize = () => {
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    // Cleanup on unmount.
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement.parentElement === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ 
        width: '80vw', 
        maxWidth: '300px', 
        height: '80vw', 
        maxHeight: '300px', 
        cursor: 'pointer',
        margin: '0 auto' // Centers the container horizontally.
      }}
    />
  );
};

export default Heart3D;
