'use client';

import { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsExpanded(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Detect dark mode using matchMedia
    const match = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(match.matches);
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    match.addEventListener('change', handler);
    return () => match.removeEventListener('change', handler);
  }, []);

  return (
    <div
      style={{
        cursor: isExpanded ? 'pointer' : '',
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        width: isExpanded ? '48px' : '12px',
        height: isExpanded ? '48px' : '12px',
        backgroundColor: isDark ? 'black' : 'white',
        border: isDark ? '1px solid #444' : '1px solid #ddd',
        borderRadius: '50%',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: isActive ? '100ms cubic-bezier(0.4, 0, 0.2, 1)' : 
                 isExpanded ? '600ms cubic-bezier(0.34, 1.56, 0.64, 1)' : 
                 '100ms cubic-bezier(0.4, 0, 0.2, 1)',
        opacity: isHovered && isExpanded ? 0.9 : 1,
        transform: `scale(${isActive ? 0.95 : isHovered ? 1.05 : 1})`
      }}
      onClick={() => {
        if (!isExpanded) return;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsActive(false);
      }}
      onMouseDown={() => isExpanded && setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
    >
      {isExpanded && (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke={isDark ? 'white' : 'black'}
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      )}
    </div>
  );
} 