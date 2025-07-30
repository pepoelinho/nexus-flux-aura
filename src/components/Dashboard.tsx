import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, Folder, Clock, Sparkles } from "lucide-react";
import { useState } from "react";

interface DashboardProps {
  projects: any[];
  onNavigate: (view: string, data?: any) => void;
  onChatSubmit: (message: string) => void;
  onNewProject?: () => void;
}

export const Dashboard = ({ projects, onNavigate, onChatSubmit, onNewProject }: DashboardProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onChatSubmit(searchQuery);
      setSearchQuery("");
    }
  };

  const recentProjects = projects.slice(0, 3);
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Bom dia" : currentHour < 18 ? "Boa tarde" : "Boa noite";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <motion.div
      className="h-full flex flex-col items-center justify-center px-6 py-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="w-full max-w-4xl mx-auto text-center space-y-8">
        {/* Greeting Section */}
        <motion.div
          className="space-y-2"
          variants={itemVariants}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-6xl font-bold font-manrope text-foreground leading-tight">
            {greeting}.
          </h1>
          <motion.h2
            className="text-6xl font-bold font-manrope bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent leading-tight"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            style={{ backgroundSize: "200% 200%" }}
          >
            Tudo bem?
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground mt-6 max-w-2xl mx-auto"
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            Como posso te ajudar hoje? Comece escrevendo ou pergunte algo à IA.
          </motion.p>
        </motion.div>

        {/* Command Input */}
        <motion.div
          variants={itemVariants}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="w-full max-w-3xl mx-auto"
        >
          <form onSubmit={handleChatSubmit} className="relative group">
            <motion.div
              className="glass rounded-2xl p-1 hover-glow group-focus-within:shadow-glow transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileFocus={{ scale: 1.02 }}
            >
              <div className="relative flex items-center">
                <Search className="absolute left-6 w-6 h-6 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Comece a escrever ou pergunte algo à IA... (⌘K para comando rápido)"
                  className="w-full bg-transparent px-16 py-6 text-lg font-medium placeholder:text-muted-foreground focus:outline-none focus:placeholder:text-muted-foreground/50 transition-all"
                />
                <motion.button
                  type="submit"
                  className="absolute right-3 p-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-colors disabled:opacity-50"
                  disabled={!searchQuery.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </form>
        </motion.div>

        {/* Recent Projects */}
        <AnimatePresence>
          {recentProjects.length > 0 && (
            <motion.div
              className="w-full space-y-6"
              variants={itemVariants}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="flex items-center gap-3 justify-center">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <h3 className="text-lg font-semibold text-muted-foreground">
                  Projetos Recentes
                </h3>
              </div>
              
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
                variants={containerVariants}
              >
                {recentProjects.map((project, index) => (
                  <motion.button
                    key={project.id}
                    onClick={() => onNavigate('project', { projectId: project.id })}
                    className="glass p-6 rounded-2xl text-left hover-glow group"
                    variants={cardVariants}
                    transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.1 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start gap-4">
                      <motion.div
                        className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors"
                        whileHover={{ rotate: 5 }}
                      >
                        <Folder className="w-6 h-6 text-primary" />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                          {project.name}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {project.documents?.length || 0} documento(s)
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Atualizado há 2 dias
                        </p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Actions */}
        <motion.div
          className="w-full max-w-2xl mx-auto"
          variants={itemVariants}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
        >
          <div className="flex items-center gap-3 justify-center mb-6">
            <Sparkles className="w-5 h-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-muted-foreground">
              Ações Rápidas
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.button
              onClick={() => onNavigate('chatbot')}
              className="glass p-4 rounded-xl text-center hover-glow group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-3 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                Conversar com IA
              </h4>
              <p className="text-sm text-muted-foreground mt-1">
                Faça perguntas e obtenha respostas
              </p>
            </motion.button>
            
            <motion.button
              onClick={() => onNavigate('tools')}
              className="glass p-4 rounded-xl text-center hover-glow group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-3 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                Ferramentas de IA
              </h4>
              <p className="text-sm text-muted-foreground mt-1">
                60+ ferramentas especializadas
              </p>
            </motion.button>
            
            <motion.button
              onClick={() => onNewProject && onNewProject()}
              className="glass p-4 rounded-xl text-center hover-glow group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-3 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Folder className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                Novo Projeto
              </h4>
              <p className="text-sm text-muted-foreground mt-1">
                Organize seus documentos
              </p>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};