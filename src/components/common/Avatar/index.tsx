import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';

import { cn, generateBgColor } from '@/utils';

const AvatarRoot = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
      className,
    )}
    {...props}
  />
));
AvatarRoot.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full', className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-muted text-2xl',
      className,
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

type AvatarContainerProps = {
  src: string;
  alt?: string;
  fallback?: React.ReactNode;
  size?: number | string;
  className?: string;
  fallbackClass?: string;
  onClick?: () => void;
};

const Avatar = ({
  src,
  fallback,
  alt = 'avatar',
  size = 40,
  className,
  fallbackClass,
  onClick,
}: AvatarContainerProps) => {
  const computedSize = typeof size === 'number' ? `${size}px` : size;
  const bgColor = generateBgColor(alt);

  return (
    <AvatarRoot
      style={{ width: computedSize, height: computedSize }}
      className={className}
      onClick={onClick}
    >
      <AvatarImage alt={alt} src={src} />
      <AvatarFallback className={cn(`text-white ${bgColor}`, fallbackClass)}>
        {fallback}
      </AvatarFallback>
    </AvatarRoot>
  );
};

export { AvatarRoot, AvatarImage, AvatarFallback, Avatar };
