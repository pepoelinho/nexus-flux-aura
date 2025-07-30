import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Zap, FileText, MessageCircle, Settings, Plus, Book, Code, PenTool } from "lucide-react";
import { Button } from "./ui/button";

interface CommandBarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: string, data?: any) => void;
  onCreateProject: () => void;
  onCreateDocument: () => void;
}

const COMMANDS = [
  // Navigation
  { id: 'dashboard', label: 'Ir para Dashboard', icon: Search, group: 'Navegação' },
  { id: 'chatbot', label: 'Abrir Chatbot', icon: MessageCircle, group: 'Navegação' },
  { id: 'settings', label: 'Configurações', icon: Settings, group: 'Navegação' },
  
  // Creation
  { id: 'new-project', label: 'Criar Novo Projeto', icon: Plus, group: 'Criar' },
  { id: 'new-document', label: 'Novo Documento', icon: FileText, group: 'Criar' },
  
  // AI Tools
  { id: 'ai-resumidor', label: 'Resumir Texto', icon: FileText, group: 'IA' },
  { id: 'ai-humanizador', label: 'Humanizar Texto', icon: PenTool, group: 'IA' },
  { id: 'ai-corretor', label: 'Corrigir Texto', icon: Book, group: 'IA' },
  { id: 'ai-codigo', label: 'Explicar Código', icon: Code, group: 'IA' },
  { id: 'ai-brainstorm', label: 'Brainstorm', icon: Zap, group: 'IA' },
];

export const CommandBar = ({ isOpen, onClose, onNavigate, onCreateProject, onCreateDocument }: CommandBarProps) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredCommands = COMMANDS.filter(cmd =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  const groupedCommands = filteredCommands.reduce((acc, cmd) => {
    if (!acc[cmd.group]) acc[cmd.group] = [];
    acc[cmd.group].push(cmd);
    return acc;
  }, {} as Record<string, typeof COMMANDS>);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, filteredCommands.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(filteredCommands[selectedIndex]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const executeCommand = (command: typeof COMMANDS[0]) => {
    if (command.id === 'new-project') {
      onCreateProject();
    } else if (command.id === 'new-document') {
      onCreateDocument();
    } else if (command.id.startsWith('ai-')) {
      const toolKey = command.id.replace('ai-', '');
      onNavigate('chatbot', { initialPrompt: `Usar ferramenta: ${command.label}` });
    } else {
      onNavigate(command.id);
    }
    onClose();
    setQuery("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center pt-32 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Command Bar */}
          <motion.div
            className="relative w-full max-w-2xl glass rounded-2xl shadow-elegant border border-border overflow-hidden"
            initial={{ scale: 0.95, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* Search Input */}
            <div className="flex items-center p-4 border-b border-border">
              <Search className="w-5 h-5 text-muted-foreground mr-3" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Digite um comando ou pesquise..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground text-lg"
              />
              <div className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
                ESC
              </div>
            </div>

            {/* Commands List */}
            <div className="max-h-96 overflow-y-auto">
              {Object.entries(groupedCommands).map(([group, commands]) => (
                <div key={group} className="p-2">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 py-1">
                    {group}
                  </div>
                  {commands.map((command, index) => {
                    const globalIndex = filteredCommands.indexOf(command);
                    const isSelected = globalIndex === selectedIndex;
                    
                    return (
                      <Button
                        key={command.id}
                        variant="ghost"
                        className={`w-full justify-start h-auto p-3 rounded-lg transition-colors ${
                          isSelected ? 'bg-primary/10 text-primary' : 'hover:bg-secondary'
                        }`}
                        onClick={() => executeCommand(command)}
                      >
                        <command.icon className="w-4 h-4 mr-3" />
                        <span className="text-left">{command.label}</span>
                      </Button>
                    );
                  })}
                </div>
              ))}
              
              {filteredCommands.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>Nenhum comando encontrado</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};