"use client";

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className,
  priority = false,
  sizes,
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
  onLoad,
  onError,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  if (hasError) {
    return (
      <div 
        className={cn(
          'flex items-center justify-center bg-gray-100 text-gray-400',
          className
        )}
        style={fill ? {} : { width, height }}
      >
        <span className="text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-orange-500 rounded-full animate-spin" />
        </div>
      )}
      
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        priority={priority}
        sizes={sizes}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          fill ? 'absolute inset-0' : 'w-full h-auto'
        )}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
}

// Specialized components for common use cases
export function TeamMemberImage({ src, alt, name }: { src: string; alt: string; name: string }) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={112}
      height={112}
      className="w-28 h-28 mx-auto rounded-full object-cover ring-4 ring-orange-100"
      priority={false}
      sizes="(max-width: 768px) 112px, 112px"
    />
  );
}

export function LogoImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={120}
      height={40}
      className={cn('w-auto h-auto', className)}
      priority={false}
      sizes="120px"
      quality={90}
    />
  );
}

export function HeroImage({ src, alt }: { src: string; alt: string }) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={900}
      height={700}
      className="w-full h-auto object-cover"
      priority={true}
      sizes="(max-width: 768px) 100vw, 900px"
      quality={85}
    />
  );
}
