"use client"

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Globe, TrendingUp } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, limit } from 'firebase/firestore';

interface VisitorData {
  id: string;
  email: string;
  ip: string;
  country: string;
  city?: string;
  region?: string;
  latitude?: string;
  longitude?: string;
  timestamp: any;
}

export default function AnalyticsGlobe() {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const globeRef = useRef(null);
  const pointsRef = useRef([]);
  const cloudRef = useRef(null);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const rotationVelocityRef = useRef({ x: 0, y: 0 });
  
  const [visitors, setVisitors] = useState<VisitorData[]>([]);
  const [visitorsByCountry, setVisitorsByCountry] = useState({});

  // Fetch visitors from Firebase
  useEffect(() => {
    const q = query(
      collection(db, "subscribers"), 
      orderBy("timestamp", "desc"),
      limit(100)
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const visitorsData: VisitorData[] = [];
      const countryMap = {};
      
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.latitude && data.longitude && 
            data.latitude !== "Unknown" && data.longitude !== "Unknown") {
          const visitor = {
            id: doc.id,
            email: data.email || "N/A",
            ip: data.ip || "Unknown",
            country: data.country || "Unknown",
            city: data.city || "Unknown",
            region: data.region || "Unknown",
            latitude: data.latitude,
            longitude: data.longitude,
            timestamp: data.timestamp
          };
          visitorsData.push(visitor);
          
          // Count visitors by country
          const country = data.country || "Unknown";
          countryMap[country] = (countryMap[country] || 0) + 1;
        }
      });
      
      setVisitors(visitorsData);
      setVisitorsByCountry(countryMap);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 2.8;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create realistic Earth
    const globeGeometry = new THREE.SphereGeometry(1, 128, 128);
    
    // Create realistic Earth texture
    const earthTexture = createRealisticEarthTexture();
    
    const globeMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      bumpScale: 0.03,
      specular: new THREE.Color(0x111111),
      shininess: 25,
      emissive: new THREE.Color(0x001100),
      emissiveIntensity: 0.1
    });
    
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);
    globeRef.current = globe;

    // Add cloud layer
    const cloudGeometry = new THREE.SphereGeometry(1.01, 64, 64);
    const cloudTexture = createCloudTexture();
    const cloudMaterial = new THREE.MeshPhongMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.15,
      depthWrite: false
    });
    const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
    scene.add(clouds);
    cloudRef.current = clouds;

    // Atmosphere glow
    const atmosphereGeometry = new THREE.SphereGeometry(1.12, 64, 64);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(0.0, 1.0, 0.5, 1.0) * intensity;
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Realistic lighting setup
    const ambientLight = new THREE.AmbientLight(0x333333, 0.5);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 1.2);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0x4488ff, 0.3);
    fillLight.position.set(-5, 0, -5);
    scene.add(fillLight);

    addStars(scene);

    // Mouse drag controls
    const handleMouseDown = (event) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = {
        x: event.clientX,
        y: event.clientY
      };
    };

    const handleMouseMove = (event) => {
      if (!isDraggingRef.current) return;

      const deltaX = event.clientX - previousMousePositionRef.current.x;
      const deltaY = event.clientY - previousMousePositionRef.current.y;

      rotationVelocityRef.current = {
        x: deltaY * 0.005,
        y: deltaX * 0.005
      };

      previousMousePositionRef.current = {
        x: event.clientX,
        y: event.clientY
      };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleTouchStart = (event) => {
      if (event.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePositionRef.current = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY
        };
      }
    };

    const handleTouchMove = (event) => {
      if (!isDraggingRef.current || event.touches.length !== 1) return;

      const deltaX = event.touches[0].clientX - previousMousePositionRef.current.x;
      const deltaY = event.touches[0].clientY - previousMousePositionRef.current.y;

      rotationVelocityRef.current = {
        x: deltaY * 0.005,
        y: deltaX * 0.005
      };

      previousMousePositionRef.current = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      };
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };

    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    renderer.domElement.addEventListener('touchstart', handleTouchStart);
    renderer.domElement.addEventListener('touchmove', handleTouchMove);
    renderer.domElement.addEventListener('touchend', handleTouchEnd);

    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Earth rotation - realistic speed (24 hour day = 0.00007 rad/frame at 60fps)
      if (!isDraggingRef.current) {
        globe.rotation.y += 0.0005; // Slightly faster for visibility
        if (cloudRef.current) {
          cloudRef.current.rotation.y += 0.0007; // Clouds move slightly faster
        }
      } else {
        globe.rotation.x += rotationVelocityRef.current.x;
        globe.rotation.y += rotationVelocityRef.current.y;
        if (cloudRef.current) {
          cloudRef.current.rotation.x = globe.rotation.x;
          cloudRef.current.rotation.y = globe.rotation.y;
        }
      }

      // Apply damping
      rotationVelocityRef.current.x *= 0.95;
      rotationVelocityRef.current.y *= 0.95;

      // Animate visitor points
      pointsRef.current.forEach((point, index) => {
        if (point.userData.isPoint) {
          const scale = 1 + Math.sin(Date.now() * 0.003 + index) * 0.5;
          point.scale.set(scale, scale, scale);
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      renderer.domElement.removeEventListener('touchstart', handleTouchStart);
      renderer.domElement.removeEventListener('touchmove', handleTouchMove);
      renderer.domElement.removeEventListener('touchend', handleTouchEnd);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    if (!sceneRef.current || !globeRef.current) return;

    pointsRef.current.forEach(point => {
      sceneRef.current.remove(point);
    });
    pointsRef.current = [];

    addVisitorPoints(sceneRef.current, globeRef.current, visitors);
  }, [visitors]);

  function createRealisticEarthTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Ocean - realistic blue
    const oceanGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    oceanGradient.addColorStop(0, '#0a1929');
    oceanGradient.addColorStop(0.5, '#1a3a52');
    oceanGradient.addColorStop(1, '#0a1929');
    ctx.fillStyle = oceanGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Land - realistic green/brown
    ctx.fillStyle = '#2d5016';
    ctx.shadowColor = '#00ff88';
    ctx.shadowBlur = 15;

    // Draw continents with more detail
    // North America
    ctx.beginPath();
    ctx.ellipse(280, 280, 220, 270, 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#3a6b1f';
    ctx.beginPath();
    ctx.ellipse(350, 220, 80, 100, 0.5, 0, Math.PI * 2);
    ctx.fill();

    // South America
    ctx.fillStyle = '#2d5016';
    ctx.beginPath();
    ctx.ellipse(420, 580, 130, 220, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // Europe
    ctx.fillStyle = '#3a6b1f';
    ctx.beginPath();
    ctx.ellipse(1050, 260, 160, 130, 0, 0, Math.PI * 2);
    ctx.fill();

    // Africa
    ctx.fillStyle = '#2d5016';
    ctx.beginPath();
    ctx.ellipse(1120, 480, 200, 280, 0, 0, Math.PI * 2);
    ctx.fill();

    // Asia
    ctx.fillStyle = '#3a6b1f';
    ctx.beginPath();
    ctx.ellipse(1520, 280, 320, 270, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#2d5016';
    ctx.beginPath();
    ctx.ellipse(1600, 350, 150, 120, 0.3, 0, Math.PI * 2);
    ctx.fill();

    // Australia
    ctx.fillStyle = '#3a6b1f';
    ctx.beginPath();
    ctx.ellipse(1680, 720, 130, 110, 0, 0, Math.PI * 2);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }

  function createCloudTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgba(255, 255, 255, 0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw cloud patterns
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 100 + 50;
      
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }

  function addVisitorPoints(scene, globe, visitors) {
    visitors.forEach((visitor, index) => {
      const lat = parseFloat(visitor.latitude);
      const lon = parseFloat(visitor.longitude);

      if (isNaN(lat) || isNaN(lon)) return;

      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);

      const x = -Math.sin(phi) * Math.cos(theta) * 1.015;
      const z = Math.sin(phi) * Math.sin(theta) * 1.015;
      const y = Math.cos(phi) * 1.015;

      // Green marker pin style
      const pointGeometry = new THREE.SphereGeometry(0.018, 16, 16);
      const pointMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff88,
        transparent: true,
        opacity: 1
      });
      const point = new THREE.Mesh(pointGeometry, pointMaterial);
      point.position.set(x, y, z);
      point.userData.isPoint = true;
      scene.add(point);
      pointsRef.current.push(point);

      // Outer glow
      const glowGeometry = new THREE.SphereGeometry(0.03, 16, 16);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff88,
        transparent: true,
        opacity: 0.3
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      glow.position.set(x, y, z);
      scene.add(glow);
      pointsRef.current.push(glow);

      // Pin line pointing down to surface
      const lineGeometry = new THREE.CylinderGeometry(0.002, 0.002, 0.03);
      const lineMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff88 });
      const line = new THREE.Mesh(lineGeometry, lineMaterial);
      
      // Position line between point and surface
      const surfaceX = -Math.sin(phi) * Math.cos(theta);
      const surfaceZ = Math.sin(phi) * Math.sin(theta);
      const surfaceY = Math.cos(phi);
      
      line.position.set(
        (x + surfaceX) / 2,
        (y + surfaceY) / 2,
        (z + surfaceZ) / 2
      );
      line.lookAt(0, 0, 0);
      scene.add(line);
      pointsRef.current.push(line);
    });
  }

  function addStars(scene) {
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 5000;
    const positions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 200;
      positions[i + 1] = (Math.random() - 0.5) * 200;
      positions[i + 2] = (Math.random() - 0.5) * 200;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.15,
      transparent: true,
      opacity: 0.8
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-card border border-primary/20 rounded-lg overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-primary/20 bg-card/80">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-primary font-mono flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                REAL-TIME GLOBAL VISITOR MAP
              </h2>
              <p className="text-sm text-muted-foreground font-mono mt-1">
                Drag to rotate • Live Firebase data • {visitors.length} active locations tracked
              </p>
            </div>
          </div>
        </div>
        
        <div 
          ref={mountRef} 
          className="w-full bg-black cursor-grab active:cursor-grabbing"
          style={{ height: '700px' }}
        />
        
        <div className="p-4 border-t border-primary/20 bg-card/80">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-6 text-sm font-mono">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50"></div>
                <span className="text-muted-foreground">{visitors.length} Visitors</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">{Object.keys(visitorsByCountry).length} Countries</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Real-time Firebase</span>
              </div>
            </div>
            <div className="text-xs text-green-400 font-mono">
              🌍 Realistic Earth Rotation
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-card border border-primary/20 rounded-lg p-4">
        <p className="text-sm text-muted-foreground font-mono text-center">
          💡 <span className="text-green-400">LIVE DATA:</span> Green pins show visitor locations from Firebase • Drag to explore • Auto-rotates like Earth (24-hour cycle simulation)
        </p>
      </div>
    </div>
  );
}