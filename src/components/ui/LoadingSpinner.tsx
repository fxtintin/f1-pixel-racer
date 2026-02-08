import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  text?: string;
}

export function LoadingSpinner({ text = 'LOADING...' }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      {/* Pixel Racing Car Animation */}
      <div className="relative h-16 w-48 overflow-hidden">
        <motion.div
          className="absolute top-1/2 -translate-y-1/2"
          animate={{
            x: [-48, 192],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {/* Pixel Car */}
          <svg
            width="40"
            height="24"
            viewBox="0 0 40 24"
            fill="none"
            className="text-f1-red"
          >
            {/* Car body */}
            <rect x="8" y="8" width="24" height="8" fill="currentColor" />
            <rect x="4" y="12" width="4" height="4" fill="currentColor" />
            <rect x="32" y="10" width="4" height="6" fill="currentColor" />
            {/* Wheels */}
            <motion.rect
              x="10"
              y="16"
              width="6"
              height="4"
              fill="#334155"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 0.2, repeat: Infinity }}
            />
            <motion.rect
              x="26"
              y="16"
              width="6"
              height="4"
              fill="#334155"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 0.2, repeat: Infinity }}
            />
            {/* Driver helmet */}
            <rect x="28" y="6" width="4" height="4" fill="#00d9ff" />
          </svg>
        </motion.div>
        
        {/* Track line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-pixel-border">
          <motion.div
            className="h-full w-4 bg-f1-red"
            animate={{ x: [0, 192] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>
      </div>
      
      <motion.p
        className="font-pixel text-pixel-xs text-pixel-cyan"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        {text}
      </motion.p>
    </div>
  );
}
