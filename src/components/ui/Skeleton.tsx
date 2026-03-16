import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  children?: React.ReactNode;
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-gray-200', className)}
      {...props}
    />
  );
}

// Card skeleton for various content types
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('bg-white rounded-lg p-6 shadow-sm', className)}>
      <div className="space-y-4">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
}

// Team member skeleton
export function TeamMemberSkeleton() {
  return (
    <div className="bg-white rounded-[2rem] p-6 text-center shadow-lg border border-neutral-100">
      <div className="w-28 h-28 mx-auto rounded-full bg-gray-200 animate-pulse mb-4 ring-4 ring-orange-100" />
      <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
      <Skeleton className="h-4 w-1/2 mx-auto mb-3" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <Skeleton className="h-3 w-4/5" />
      </div>
    </div>
  );
}

// Form skeleton
export function FormSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-24 w-full" />
      </div>
      <Skeleton className="h-10 w-32" />
    </div>
  );
}

// Gallery skeleton
export function GallerySkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="aspect-square rounded-2xl bg-gray-200 animate-pulse" />
      ))}
    </div>
  );
}

// Event card skeleton
export function EventCardSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg">
      <Skeleton className="h-48 w-full" />
      <div className="p-6 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-16" />
        </div>
      </div>
    </div>
  );
}

// Loading spinner component
export function LoadingSpinner({ size = 'md', className }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div 
        className={cn(
          'animate-spin rounded-full border-2 border-gray-300 border-t-orange-500',
          sizeClasses[size]
        )}
      />
    </div>
  );
}

// Full page loading
export function PageLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <LoadingSpinner size="lg" className="mb-4" />
        <p className="text-gray-600 animate-pulse">Loading...</p>
      </div>
    </div>
  );
}

// Button loading state
export function ButtonLoading({ children }: { children: React.ReactNode }) {
  return (
    <button disabled className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg opacity-75 cursor-not-allowed">
      <LoadingSpinner size="sm" />
      {children}
    </button>
  );
}
