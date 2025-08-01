import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

interface CreateProjectModalProps {
  onCreateProject: (name: string) => void;
  children: React.ReactNode;
}

export const CreateProjectModal = ({ onCreateProject, children }: CreateProjectModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName.trim()) return;

    setIsCreating(true);
    
    // Simulate creation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    onCreateProject(projectName.trim());
    setShowSuccess(true);
    
    // Show success animation then close
    setTimeout(() => {
      setIsOpen(false);
      setProjectName("");
      setIsCreating(false);
      setShowSuccess(false);
    }, 1500);
  };

  const handleClose = () => {
    if (!isCreating) {
      setIsOpen(false);
      setProjectName("");
      setShowSuccess(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md glass border-primary/20">
        <AnimatePresence mode="wait">
          {!showSuccess ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Plus className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">
                      Novo Projeto
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Crie seu próximo projeto incrível
                    </p>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="h-8 w-8 p-0"
                  disabled={isCreating}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Nome do Projeto
                  </label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Digite o nome do seu projeto..."
                    className="w-full px-4 py-3 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground placeholder:text-muted-foreground"
                    disabled={isCreating}
                    autoFocus
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    disabled={isCreating}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={!projectName.trim() || isCreating}
                    className="flex-1 relative"
                  >
                    {isCreating ? (
                      <motion.div
                        className="flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <motion.div
                          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Criando...
                      </motion.div>
                    ) : (
                      "Criar Projeto"
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-8 text-center"
            >
              <motion.div
                className="relative mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
              >
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Sparkles className="w-10 h-10 text-primary" />
                  </motion.div>
                </div>
                
                {/* Success checkmark animation */}
                <motion.div
                  className="absolute inset-0 border-4 border-primary rounded-full"
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Projeto Criado!
                </h3>
                <p className="text-muted-foreground">
                  "{projectName}" foi criado com sucesso
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};