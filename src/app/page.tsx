"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

interface Rainbow {
  id: string;
  keyCode: string;
  x: number;
  y: number;
  initialSize: number;
  currentSize: number;
  isPressed: boolean;
  fallY: number;
  fallVelocity: number;
  shakeOffset: number;
  shakeTime: number;
}

interface Star {
  id: number;
  x: number;
  y: number;
  z: number;
  prevX: number;
  prevY: number;
  emoji: string;
  rotation: number;
}

export default function Playground() {
  const [rainbows, setRainbows] = useState<Rainbow[]>([]);
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [isHyperspace, setIsHyperspace] = useState(false);
  const [stars, setStars] = useState<Star[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const hyperspaceRef = useRef<number>(0);

  // Create a new rainbow at random position
  const createRainbow = useCallback((keyCode: string): Rainbow => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const initialSize = 40 + Math.random() * 80; // 40px to 120px
    
    return {
      id: `${keyCode}-${Date.now()}-${Math.random().toString()}`,
      keyCode,
      x: Math.random() * (viewportWidth - initialSize),
      y: Math.random() * (viewportHeight - initialSize),
      initialSize,
      currentSize: initialSize,
      isPressed: true,
      fallY: 0,
      fallVelocity: 0,
      shakeOffset: 0,
      shakeTime: 0
    };
  }, []);

  // Create stars for hyperspace effect
  const createStars = useCallback(() => {
    const numStars = 200; // Reduced for better performance
    const newStars: Star[] = [];
    const emojis = ['⭐', '🌟', '✨', '🚀', '💫', '🦄', '🌈', '✨'];
    
    for (let i = 0; i < numStars; i++) {
      // Better distribution - create stars in a larger area around center
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * Math.max(window.innerWidth, window.innerHeight) * 2;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      newStars.push({
        id: i,
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        z: 500 + Math.random() * 1500, // Deeper space
        prevX: 0,
        prevY: 0,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        rotation: Math.random() * 360
      });
    }
    
    setStars(newStars);
  }, []);

  // Handle key press events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle space bar for hyperspace effect
      if (e.code === 'Space') {
        e.preventDefault();
        if (!isHyperspace) {
          setIsHyperspace(true);
          createStars();
        }
        return;
      }
      
      // Ignore already pressed keys
      if (pressedKeys.has(e.code)) return;
      
      // Prevent default behavior for better UX
      e.preventDefault();
      
      // Add key to pressed keys set
      setPressedKeys(prev => new Set(prev).add(e.code));
      
      // Create new rainbow
      const newRainbow = createRainbow(e.code);
      setRainbows(prev => [...prev, newRainbow]);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setIsHyperspace(false);
        setStars([]);
        return;
      }
      
      // Remove key from pressed keys set
      setPressedKeys(prev => {
        const newSet = new Set(prev);
        newSet.delete(e.code);
        return newSet;
      });
      
      // Mark corresponding rainbows as not pressed to start falling
      setRainbows(prev => prev.map(rainbow => 
        rainbow.keyCode === e.code 
          ? { ...rainbow, isPressed: false }
          : rainbow
      ));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [pressedKeys, createRainbow, createStars, isHyperspace]);

  // Hyperspace star animation
  useEffect(() => {
    if (!isHyperspace) return;

    const animateHyperspace = () => {
      const emojis = ['⭐', '🌟', '✨', '🚀', '🛸', '🌠', '💫', '🦄', '🌈', '✨'];
      const speed = 15;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const perspective = 800;
      
      setStars(prevStars => 
        prevStars.map(star => {
          // Move star towards viewer (decrease z)
          let newZ = star.z - speed;
          
          // Reset star if it goes past the viewer
          if (newZ <= 0) {
            newZ = 2000;
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * Math.max(window.innerWidth, window.innerHeight) * 2.5;
            const newX = centerX + Math.cos(angle) * radius;
            const newY = centerY + Math.sin(angle) * radius;
            return {
              ...star,
              x: newX,
              y: newY,
              z: newZ,
              prevX: newX,
              prevY: newY,
              emoji: emojis[Math.floor(Math.random() * emojis.length)],
              rotation: Math.random() * 360
            };
          }
          
          // Calculate 3D projection with cached values
          const projectionFactor = perspective / newZ;
          const x = centerX + (star.x - centerX) * projectionFactor;
          const y = centerY + (star.y - centerY) * projectionFactor;
          
          return {
            ...star,
            x,
            y,
            z: newZ,
            prevX: star.x,
            prevY: star.y
          };
        })
      );
      
      hyperspaceRef.current = requestAnimationFrame(animateHyperspace);
    };

    hyperspaceRef.current = requestAnimationFrame(animateHyperspace);

    return () => {
      if (hyperspaceRef.current) {
        cancelAnimationFrame(hyperspaceRef.current);
      }
    };
  }, [isHyperspace]);

  // Animation loop for growth, shaking, and falling
  useEffect(() => {
    const animate = () => {
      setRainbows(prev => {
        const updatedRainbows = prev.map(rainbow => {
          if (rainbow.isPressed) {
            // Growth and shake animation while key is pressed
            const growthRate = 1.5;
            const maxSize = rainbow.initialSize * 2.5;
            const newSize = Math.min(rainbow.currentSize + growthRate, maxSize);
            
            // Shake animation using sine waves
            const newShakeTime = rainbow.shakeTime + 0.15;
            const shakeAmplitude = 8;
            const newShakeOffset = Math.sin(newShakeTime) * shakeAmplitude;
            
            return {
              ...rainbow,
              currentSize: newSize,
              shakeTime: newShakeTime,
              shakeOffset: newShakeOffset
            };
          } else {
            // Falling animation with gravity
            const gravity = 0.5;
            const newVelocity = rainbow.fallVelocity + gravity;
            const newFallY = rainbow.fallY + newVelocity;
            
            return {
              ...rainbow,
              fallY: newFallY,
              fallVelocity: newVelocity,
              shakeOffset: 0 // Stop shaking when falling
            };
          }
        });

        // Remove rainbows that have fallen off screen
        return updatedRainbows.filter(rainbow => 
          rainbow.y + rainbow.fallY < window.innerHeight + 200
        );
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Touch support for mobile devices
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      // Simulate key press for touch
      const syntheticKeyCode = `Touch-${Date.now()}`;
      setPressedKeys(prev => new Set(prev).add(syntheticKeyCode));
      const newRainbow = createRainbow(syntheticKeyCode);
      setRainbows(prev => [...prev, newRainbow]);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      // Release all touch-based rainbows
      setRainbows(prev => prev.map(rainbow => 
        rainbow.keyCode.startsWith('Touch-')
          ? { ...rainbow, isPressed: false }
          : rainbow
      ));
      setPressedKeys(prev => {
        const newSet = new Set(prev);
        Array.from(prev).forEach(key => {
          if (key.startsWith('Touch-')) {
            newSet.delete(key);
          }
        });
        return newSet;
      });
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [createRainbow]);

  return (
    <>
      <div 
        ref={containerRef}
        style={{
          flexBasis: "content",
          flexGrow: 1,
          flexDirection: "column",
          position: "relative",
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
          background: isHyperspace 
            ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f172a 100%)"
            : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          fontFamily: "system-ui, -apple-system, sans-serif",
          transition: "background 0.5s ease-in-out"
        }}
      >
        {/* Top Marquee - only show during hyperspace */}
        {isHyperspace && (
          <div style={{
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            height: "60px",
            overflow: "hidden",
            zIndex: 1000,
            background: "rgba(0,0,0,0.1)",
            display: "flex",
            alignItems: "center"
          }}>
            <div style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "white",
              textShadow: "0 0 10px rgba(255,255,255,0.8)",
              whiteSpace: "nowrap",
              animation: "marquee 10s linear infinite"
            }}>
              ⭐ I LOVE STARS ⭐ I LOVE STARS ⭐ I LOVE STARS ⭐ I LOVE STARS ⭐ I LOVE STARS ⭐
            </div>
          </div>
        )}

        {/* Bottom Marquee - only show during hyperspace */}
        {isHyperspace && (
          <div style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            height: "60px",
            overflow: "hidden",
            zIndex: 1000,
            background: "rgba(0,0,0,0.1)",
            display: "flex",
            alignItems: "center"
          }}>
            <div style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "white",
              textShadow: "0 0 10px rgba(255,255,255,0.8)",
              whiteSpace: "nowrap",
              animation: "marqueeReverse 10s linear infinite"
            }}>
              ⭐ I LOVE STARS ⭐ I LOVE STARS ⭐ I LOVE STARS ⭐ I LOVE STARS ⭐ I LOVE STARS ⭐
            </div>
          </div>
        )}

        {/* Hyperspace stars */}
        {isHyperspace && stars.map(star => {
          const size = Math.max(8, (2000 - star.z) / 30); // More dramatic size scaling
          const opacity = Math.min(1, (2000 - star.z) / 800);
          const speed = (2000 - star.z) / 2000; // Speed-based effects
          
          return (
            <div key={star.id}>
              {/* Star */}
              <div
                style={{
                  position: "absolute",
                  left: `${star.x - size/2}px`,
                  top: `${star.y - size/2}px`,
                  fontSize: `${size}px`,
                  opacity: opacity,
                  transform: `rotate(${star.rotation + (2000 - star.z) * 0.3}deg) scale(${0.5 + speed * 1.5}) translate3d(0,0,0)`,
                  pointerEvents: 'none',
                  userSelect: 'none',
                  filter: `brightness(${1 + speed * 2}) saturate(${1 + speed}) drop-shadow(0 0 ${size * speed}px rgba(255,255,255,${opacity * 0.8})) blur(${Math.max(0, (star.z - 1500) / 200)}px)`,
                  willChange: 'transform, opacity'
                }}
              >
                {star.emoji}
              </div>
            </div>
          );
        })}
        
        {/* Render rainbows */}
        {rainbows.map(rainbow => (
          <div
            key={rainbow.id}
            style={{
              position: "absolute",
              left: `${rainbow.x + rainbow.shakeOffset}px`,
              top: `${rainbow.y + rainbow.fallY}px`,
              fontSize: `${rainbow.currentSize}px`,
              userSelect: 'none',
              pointerEvents: 'none',
              zIndex: Math.floor(rainbow.currentSize),
              filter: rainbow.isPressed 
                ? `brightness(1.2) drop-shadow(0 0 10px rgba(255,255,255,0.5))`
                : 'none',
              transform: rainbow.isPressed 
                ? `rotate(${Math.sin(rainbow.shakeTime * 0.5) * 5}deg) scale(${1 + Math.sin(rainbow.shakeTime) * 0.1})`
                : `rotate(${rainbow.fallVelocity * 2}deg)`,
              transition: rainbow.isPressed ? 'none' : 'transform 0.1s ease-out'
            }}
          >
            🌈
          </div>
        ))}
      </div>
    </>
  );
}
