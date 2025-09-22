import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-lg font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:shrink-0 touch-target shadow-soft hover:shadow-card active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-gradient-primary text-primary-foreground hover:shadow-elevated hover:-translate-y-0.5",
        secondary: "bg-gradient-secondary text-secondary-foreground hover:shadow-elevated hover:-translate-y-0.5",
        accent: "bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-elevated hover:-translate-y-0.5",
        success: "bg-success text-success-foreground hover:bg-success/90 hover:shadow-elevated hover:-translate-y-0.5",
        warning: "bg-warning text-warning-foreground hover:bg-warning/90 hover:shadow-elevated hover:-translate-y-0.5",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-elevated hover:-translate-y-0.5",
        outline: "border-2 border-primary bg-background text-primary hover:bg-primary hover:text-primary-foreground hover:shadow-card",
        ghost: "hover:bg-primary/10 hover:text-primary text-foreground",
        link: "text-primary underline-offset-4 hover:underline p-0 h-auto shadow-none",
        hero: "bg-gradient-hero text-foreground hover:shadow-elevated hover:-translate-y-1 text-lg font-bold",
      },
      size: {
        sm: "h-12 px-4 text-base [&_svg]:size-4",
        default: "h-14 px-6 text-lg [&_svg]:size-5",
        lg: "h-16 px-8 text-xl [&_svg]:size-6",
        xl: "h-20 px-10 text-2xl [&_svg]:size-8",
        icon: "h-14 w-14 [&_svg]:size-6",
        "icon-sm": "h-12 w-12 [&_svg]:size-4",
        "icon-lg": "h-16 w-16 [&_svg]:size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
