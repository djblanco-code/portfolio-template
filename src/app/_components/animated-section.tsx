'use client';

import { ReactNode } from 'react';
import { useScrollAnimation } from './use-scroll-animation';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight';
  delay?: number;
}

const AnimatedSection = ({ 
  children, 
  className = '', 
  animation = 'fadeIn',
  delay = 0 
}: AnimatedSectionProps) => {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    triggerOnce: true
  });

  const getAnimationClasses = () => {
    const baseClasses = 'transition-all duration-700 ease-out';
    
    if (!isVisible) {
      switch (animation) {
        case 'slideUp':
          return `${baseClasses} transform translate-y-8 opacity-0`;
        case 'slideLeft':
          return `${baseClasses} transform -translate-x-8 opacity-0`;
        case 'slideRight':
          return `${baseClasses} transform translate-x-8 opacity-0`;
        case 'fadeIn':
        default:
          return `${baseClasses} opacity-0`;
      }
    }
    
    return `${baseClasses} transform translate-y-0 translate-x-0 opacity-100`;
  };

  return (
    <div
      ref={ref}
      className={`${getAnimationClasses()} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
