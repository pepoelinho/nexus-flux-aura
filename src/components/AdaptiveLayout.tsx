import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Code, FileText, Lightbulb, Search, Terminal, Globe, Book, Sparkles } from "lucide-react";
import { WritingInterface } from "./contexts/WritingInterface";
import { CodingInterface } from "./contexts/CodingInterface";
import { BrainstormingCanvas } from "./contexts/BrainstormingCanvas";
import { ResearchInterface } from "./contexts/ResearchInterface";

export type ContextType = 'writing' | 'coding' | 'brainstorming' | 'researching' | 'default';

interface AdaptiveLayoutProps {
  context: ContextType;
  onContextChange: (context: ContextType) => void;
  projectData?: any;
  children?: React.ReactNode;
}

const CONTEXT_CONFIGS = {
  writing: {
    icon: FileText,
    label: "Modo Escrita",
    gradient: "from-blue-500/20 to-purple-500/20",
    component: WritingInterface
  },
  coding: {
    icon: Code,
    label: "Modo Código",
    gradient: "from-green-500/20 to-blue-500/20",
    component: CodingInterface
  },
  brainstorming: {
    icon: Lightbulb,
    label: "Canvas Infinito",
    gradient: "from-yellow-500/20 to-orange-500/20",
    component: BrainstormingCanvas
  },
  researching: {
    icon: Search,
    label: "Modo Pesquisa",
    gradient: "from-purple-500/20 to-pink-500/20",
    component: ResearchInterface
  },
  default: {
    icon: Sparkles,
    label: "Nexus AI",
    gradient: "from-primary/20 to-accent/20",
    component: null
  }
};

export const AdaptiveLayout = ({ context, onContextChange, projectData, children }: AdaptiveLayoutProps) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [previousContext, setPreviousContext] = useState<ContextType>(context);

  const currentConfig = CONTEXT_CONFIGS[context];
  const CurrentComponent = currentConfig.component;

  useEffect(() => {
    if (context !== previousContext) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setPreviousContext(context);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [context, previousContext]);

  // Morfose do layout baseada no contexto
  const layoutVariants = {
    writing: {
      padding: "0",
      background: "linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--muted)) 100%)"
    },
    coding: {
      padding: "0",
      background: "linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--card)) 100%)"
    },
    brainstorming: {
      padding: "0",
      background: "radial-gradient(circle at center, hsl(var(--background)) 0%, hsl(var(--accent)/10%) 100%)"
    },
    researching: {
      padding: "0",
      background: "linear-gradient(45deg, hsl(var(--background)) 0%, hsl(var(--primary)/5%) 100%)"
    },
    default: {
      padding: "2rem",
      background: "hsl(var(--background))"
    }
  };

  const containerVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      scale: 1
    },
    exit: { 
      opacity: 0, 
      scale: 1.05
    }
  };

  return (
    <motion.div
      className="h-full w-full relative overflow-hidden"
      animate={context}
      variants={layoutVariants}
      transition={{ duration: 0.8 }}
    >
      {/* Context Indicator */}
      <motion.div
        className="absolute top-4 right-4 z-50 flex items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className={`p-2 glass rounded-lg backdrop-blur-xl bg-gradient-to-br ${currentConfig.gradient}`}>
          <currentConfig.icon className="w-4 h-4 text-foreground" />
        </div>
        <span className="text-sm font-medium text-muted-foreground">
          {currentConfig.label}
        </span>
      </motion.div>

      {/* Neural Network Background Animation */}
      {isTransitioning && (
        <motion.div
          className="absolute inset-0 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="neural-network-animation">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: Math.random() * 1,
                  repeat: Infinity,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Context-Specific Interface */}
      <AnimatePresence mode="wait">
        <motion.div
          key={context}
          className="h-full w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {CurrentComponent ? (
            <CurrentComponent 
              projectData={projectData}
              onContextChange={onContextChange}
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              {children}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Floating Context Switcher */}
      <motion.div
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="flex items-center gap-2 p-2 glass rounded-full backdrop-blur-xl border border-border/50">
          {Object.entries(CONTEXT_CONFIGS).map(([key, config]) => (
            <motion.button
              key={key}
              onClick={() => onContextChange(key as ContextType)}
              className={`p-2 rounded-full transition-all ${
                context === key 
                  ? 'bg-primary text-primary-foreground shadow-lg' 
                  : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title={config.label}
            >
              <config.icon className="w-4 h-4" />
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};