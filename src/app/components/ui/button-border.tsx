"use client";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface AnimatedBorderButtonProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedBorderButton({ children, className }: AnimatedBorderButtonProps) {
  return (
    <Button variant={"outline"} className={cn("relative", className)}>
      <div
        className={cn(
          "-inset-px pointer-events-none absolute rounded-[inherit] border-2 border-transparent border-inset [mask-clip:padding-box,border-box]",
          "[mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
        )}
      >
        <motion.div
          className={cn(
            "absolute aspect-square bg-gradient-to-r from-transparent via-white to-white"
          )}
          animate={{
            offsetDistance: ["0%", "100%"],
          }}
          style={{
            width: 20,
            offsetPath: `rect(0 auto auto 0 round ${8}px)`,
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 5,
            ease: "linear",
          }}
        />
      </div>
      {children}
    </Button>
  );
}
