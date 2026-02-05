'use client';
import { cn } from '@/lib/utils';
import { useMotionValue, animate, motion } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import useMeasure from 'react-use-measure';

type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  direction?: 'horizontal' | 'vertical';
  reverse?: boolean;
  className?: string;
};

export function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  durationOnHover,
  direction = 'horizontal',
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [currentDuration, setCurrentDuration] = useState(duration);
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [velocity, setVelocity] = useState(0);
  const dragStartPos = useRef(0);
  const dragStartTranslation = useRef(0);
  const lastPos = useRef(0);
  const lastTime = useRef(0);
  const animationRef = useRef<any>(null);

  useEffect(() => {
    let controls;
    const size = direction === 'horizontal' ? width : height;
    const contentSize = size + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

    // If dragging or decelerating, don't run the normal animation
    if (isDragging || velocity !== 0) {
      return;
    }

    if (isTransitioning) {
      controls = animate(translation, [translation.get(), to], {
        ease: 'linear',
        duration:
          currentDuration * Math.abs((translation.get() - to) / contentSize),
        onComplete: () => {
          setIsTransitioning(false);
          setKey((prevKey) => prevKey + 1);
        },
      });
    } else {
      controls = animate(translation, [from, to], {
        ease: 'linear',
        duration: currentDuration,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0,
        onRepeat: () => {
          translation.set(from);
        },
      });
    }

    animationRef.current = controls;
    return controls?.stop;
  }, [
    key,
    translation,
    currentDuration,
    width,
    height,
    gap,
    isTransitioning,
    direction,
    reverse,
    isDragging,
    velocity,
  ]);

  // Deceleration effect
  useEffect(() => {
    if (velocity === 0 || isDragging) return;

    const size = direction === 'horizontal' ? width : height;
    const contentSize = size + gap;
    const deceleration = 0.95; // Friction coefficient
    let currentVelocity = velocity;
    let rafId: number;

    const decelerate = () => {
      currentVelocity *= deceleration;

      // Update translation with wrapping
      let newTranslation = translation.get() + currentVelocity;
      const from = reverse ? -contentSize / 2 : 0;
      const to = reverse ? 0 : -contentSize / 2;
      
      // Wrap around for infinite scroll
      if (reverse) {
        if (newTranslation > 0) newTranslation = -contentSize / 2;
        if (newTranslation < -contentSize / 2) newTranslation = 0;
      } else {
        if (newTranslation > 0) newTranslation = -contentSize / 2;
        if (newTranslation < -contentSize / 2) newTranslation = 0;
      }
      
      translation.set(newTranslation);

      // Stop when velocity is very small
      if (Math.abs(currentVelocity) < 0.1) {
        setVelocity(0);
      } else {
        rafId = requestAnimationFrame(decelerate);
      }
    };

    rafId = requestAnimationFrame(decelerate);
    return () => cancelAnimationFrame(rafId);
  }, [velocity, isDragging, translation, width, height, gap, direction, reverse]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setVelocity(0);
    if (animationRef.current) {
      animationRef.current.stop();
    }
    dragStartPos.current = direction === 'horizontal' ? e.clientX : e.clientY;
    dragStartTranslation.current = translation.get();
    lastPos.current = direction === 'horizontal' ? e.clientX : e.clientY;
    lastTime.current = Date.now();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;

    const currentPos = direction === 'horizontal' ? e.clientX : e.clientY;
    const delta = currentPos - dragStartPos.current;
    const size = direction === 'horizontal' ? width : height;
    const contentSize = size + gap;
    
    let newTranslation = dragStartTranslation.current + delta;
    
    // Wrap around for infinite scroll
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;
    
    if (reverse) {
      while (newTranslation > 0) newTranslation -= contentSize / 2;
      while (newTranslation < -contentSize / 2) newTranslation += contentSize / 2;
    } else {
      while (newTranslation > 0) newTranslation -= contentSize / 2;
      while (newTranslation < -contentSize / 2) newTranslation += contentSize / 2;
    }
    
    translation.set(newTranslation);

    // Calculate velocity for momentum
    const now = Date.now();
    const timeDelta = now - lastTime.current;
    if (timeDelta > 0) {
      const posDelta = currentPos - lastPos.current;
      setVelocity(posDelta / timeDelta * 16); // Normalize to ~60fps
    }
    lastPos.current = currentPos;
    lastTime.current = now;
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const hoverProps = durationOnHover
    ? {
        onHoverStart: () => {
          if (!isDragging) {
            setIsTransitioning(true);
            setCurrentDuration(durationOnHover);
          }
        },
        onHoverEnd: () => {
          if (!isDragging) {
            setIsTransitioning(true);
            setCurrentDuration(duration);
          }
        },
      }
    : {};

  return (
    <div className={cn('overflow-hidden', className)}>
      <motion.div
        className='flex w-max'
        style={{
          ...(direction === 'horizontal'
            ? { x: translation }
            : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        ref={ref}
        {...hoverProps}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}