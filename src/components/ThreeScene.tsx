'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function ThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Create geometric shapes
    const geometry1 = new THREE.TorusKnotGeometry(10, 3, 100, 16);
    const geometry2 = new THREE.OctahedronGeometry(8);
    const geometry3 = new THREE.IcosahedronGeometry(6);

    const material = new THREE.MeshPhongMaterial({
      color: 0x9333ea,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });

    const shape1 = new THREE.Mesh(geometry1, material);
    const shape2 = new THREE.Mesh(geometry2, material.clone());
    const shape3 = new THREE.Mesh(geometry3, material.clone());

    shape1.position.set(-15, 5, -30);
    shape2.position.set(15, -5, -35);
    shape3.position.set(0, 10, -40);

    scene.add(shape1, shape2, shape3);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    const pointLight1 = new THREE.PointLight(0x9333ea, 1);
    const pointLight2 = new THREE.PointLight(0xec4899, 1);

    pointLight1.position.set(20, 20, 20);
    pointLight2.position.set(-20, -20, 20);

    scene.add(ambientLight, pointLight1, pointLight2);

    camera.position.z = 30;

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 100;
    }

    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      color: 0xffffff,
      transparent: true,
      opacity: 0.6,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      shape1.rotation.x += 0.003;
      shape1.rotation.y += 0.005;

      shape2.rotation.x += 0.004;
      shape2.rotation.z += 0.003;

      shape3.rotation.y += 0.006;
      shape3.rotation.z += 0.002;

      particlesMesh.rotation.y += 0.001;

      // Mouse parallax
      camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 5 - camera.position.y) * 0.05;

      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      geometry1.dispose();
      geometry2.dispose();
      geometry3.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 -z-10" />;
}