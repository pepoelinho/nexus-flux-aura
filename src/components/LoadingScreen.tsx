import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center space-y-8">
        {/* Animated Logo */}
        <motion.div
          className="relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="w-24 h-24 relative">
            {/* Outer rotating ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Inner pulsing circle */}
            <motion.div
              className="absolute inset-4 rounded-full bg-gradient-to-br from-primary to-primary-glow"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Center dot */}
            <div className="absolute top-1/2 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
          </div>
        </motion.div>

        {/* Brand Text */}
        <motion.div
          className="text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold font-manrope bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Nexus AI
          </h1>
          <p className="text-muted-foreground mt-2">Workspace Inteligente</p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="w-64 h-1 bg-secondary rounded-full overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: "16rem" }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-primary-glow rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};