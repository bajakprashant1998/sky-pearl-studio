import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
  blurAmount?: number;
}

const LazyImage = ({
  src,
  alt,
  className,
  placeholderClassName,
  blurAmount = 20,
  ...props
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '100px',
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  // Generate a tiny placeholder color based on the image URL
  const getPlaceholderColor = () => {
    const colors = [
      'bg-gradient-to-br from-primary/20 to-accent/20',
      'bg-gradient-to-br from-blue-100 to-blue-200',
      'bg-gradient-to-br from-purple-100 to-pink-100',
      'bg-gradient-to-br from-teal-100 to-cyan-100',
      'bg-gradient-to-br from-amber-100 to-orange-100',
    ];
    const hash = src.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  return (
    <div ref={imgRef} className={cn('relative overflow-hidden', className)}>
      {/* Blur placeholder background */}
      <div
        className={cn(
          'absolute inset-0 transition-opacity duration-500',
          getPlaceholderColor(),
          isLoaded ? 'opacity-0' : 'opacity-100',
          placeholderClassName
        )}
      >
        {/* Animated shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
      </div>

      {/* Actual image */}
      {isInView && (
        <img
          src={hasError ? '/placeholder.svg' : src}
          alt={alt}
          className={cn(
            'w-full h-full object-cover transition-all duration-700',
            isLoaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-sm scale-105',
            className
          )}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          decoding="async"
          {...props}
        />
      )}

      {/* Loading skeleton for screen readers */}
      {!isLoaded && (
        <span className="sr-only">Loading image: {alt}</span>
      )}
    </div>
  );
};

export default LazyImage;
