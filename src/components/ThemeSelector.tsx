import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sun, Moon, Zap } from "lucide-react";
import { Button } from "./ui/button";

interface ThemeSelectorProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

const THEMES = [
  {
    id: 'light',
    name: 'Foco Cristalino',
    description: 'Clareza absoluta para máxima produtividade',
    icon: Sun,
    preview: 'bg-gradient-to-br from-white to-gray-50',
    accent: 'bg-blue-500'
  },
  {
    id: 'dark',
    name: 'Imersão Cósmica',
    description: 'Tranquilidade noturna com fundo estelar',
    icon: Moon,
    preview: 'bg-gradient-to-br from-gray-900 to-black',
    accent: 'bg-blue-400'
  },
  {
    id: 'cyberpunk',
    name: 'Distopia Neon',
    description: 'Neo-Kyoto 2077 com estética cyberpunk',
    icon: Zap,
    preview: 'bg-gradient-to-br from-purple-900 via-gray-900 to-black',
    accent: 'bg-gradient-to-r from-purple-500 to-cyan-500'
  }
];

export const ThemeSelector = ({ currentTheme, onThemeChange }: ThemeSelectorProps) => {
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium text-muted-foreground mb-4">
        Escolha seu universo visual
      </div>
      
      <div className="grid gap-4">
        {THEMES.map((theme) => {
          const isSelected = currentTheme === theme.id;
          const isHovered = hoveredTheme === theme.id;
          
          return (
            <motion.div
              key={theme.id}
              className="relative"
              onHoverStart={() => setHoveredTheme(theme.id)}
              onHoverEnd={() => setHoveredTheme(null)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="outline"
                className={`w-full h-auto p-0 overflow-hidden transition-all duration-300 ${
                  isSelected 
                    ? 'ring-2 ring-primary border-primary' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => onThemeChange(theme.id)}
              >
                <div className="flex items-center gap-4 p-4 w-full">
                  {/* Theme Preview */}
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                    <div className={`w-full h-full ${theme.preview}`} />
                    <div className={`absolute bottom-1 right-1 w-3 h-3 rounded-full ${theme.accent}`} />
                    
                    {/* Floating particles for cyberpunk theme */}
                    {theme.id === 'cyberpunk' && isHovered && (
                      <motion.div
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                            style={{
                              left: `${20 + i * 10}%`,
                              top: `${20 + (i % 2) * 30}%`,
                            }}
                            animate={{
                              opacity: [0, 1, 0],
                              scale: [0.5, 1, 0.5],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.2,
                            }}
                          />
                        ))}
                      </motion.div>
                    )}
                  </div>
                  
                  {/* Theme Info */}
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <theme.icon className="w-4 h-4" />
                      <h3 className="font-semibold">{theme.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {theme.description}
                    </p>
                  </div>
                  
                  {/* Selection Indicator */}
                  <motion.div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected 
                        ? 'border-primary bg-primary' 
                        : 'border-muted-foreground/30'
                    }`}
                    initial={false}
                    animate={{ 
                      scale: isSelected ? 1 : 0.8,
                      backgroundColor: isSelected ? 'hsl(var(--primary))' : 'transparent'
                    }}
                  >
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <Check className="w-3 h-3 text-primary-foreground" />
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </Button>
            </motion.div>
          );
        })}
      </div>
      
      <div className="text-xs text-muted-foreground text-center pt-4 border-t border-border">
        Cada tema possui sua própria física visual e efeitos únicos
      </div>
    </div>
  );
};