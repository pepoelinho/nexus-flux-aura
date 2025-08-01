import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  MessageCircle, 
  FolderOpen, 
  Plus, 
  Settings, 
  PanelLeftClose, 
  PanelRightClose,
  Sparkles,
  Github,
  Figma,
  Slack,
  Zap,
  Calendar,
  BookOpen
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CreateProjectModal } from "./CreateProjectModal";
import { ContextType } from "./AdaptiveLayout";

interface ContextualSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  currentView: string;
  currentContext: ContextType;
  projects: any[];
  onNavigate: (view: string, data?: any) => void;
  onNewProject: (projectName: string) => void;
}

// Detecção de contexto do projeto baseada no conteúdo
const detectProjectContext = (project: any): 'code' | 'academic' | 'creative' | 'business' => {
  // Simulação de análise de contexto
  const keywords = project.name?.toLowerCase() || '';
  
  if (keywords.includes('code') || keywords.includes('app') || keywords.includes('web')) {
    return 'code';
  }
  if (keywords.includes('tcc') || keywords.includes('pesquisa') || keywords.includes('artigo')) {
    return 'academic';
  }
  if (keywords.includes('design') || keywords.includes('arte') || keywords.includes('criativo')) {
    return 'creative';
  }
  return 'business';
};

// Widgets contextuais baseados no tipo de projeto
const getContextualWidgets = (projectType: string, currentContext: ContextType) => {
  const widgets = [];
  
  if (projectType === 'code' || currentContext === 'coding') {
    widgets.push({
      id: 'github',
      title: 'GitHub Sync',
      icon: Github,
      color: 'bg-gray-500/10 border-gray-500/20 text-gray-600',
      action: 'Sincronizar'
    });
  }
  
  if (projectType === 'academic' || currentContext === 'researching') {
    widgets.push({
      id: 'zotero',
      title: 'Zotero/Mendeley',
      icon: BookOpen,
      color: 'bg-blue-500/10 border-blue-500/20 text-blue-600',
      action: 'Importar Refs'
    });
  }
  
  if (projectType === 'creative' || currentContext === 'brainstorming') {
    widgets.push({
      id: 'figma',
      title: 'Figma Sync',
      icon: Figma,
      color: 'bg-purple-500/10 border-purple-500/20 text-purple-600',
      action: 'Conectar'
    });
  }
  
  if (projectType === 'business') {
    widgets.push({
      id: 'slack',
      title: 'Slack Integration',
      icon: Slack,
      color: 'bg-green-500/10 border-green-500/20 text-green-600',
      action: 'Conectar Canal'
    });
  }
  
  return widgets;
};

export const ContextualSidebar = ({ 
  collapsed, 
  onToggle, 
  currentView, 
  currentContext,
  projects, 
  onNavigate, 
  onNewProject 
}: ContextualSidebarProps) => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [projectType, setProjectType] = useState<string>('business');
  
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tools', label: 'Ferramentas IA', icon: Sparkles },
    { id: 'chatbot', label: 'Chatbot', icon: MessageCircle },
  ];

  // Detectar contexto do projeto atual
  useEffect(() => {
    if (selectedProject) {
      setProjectType(detectProjectContext(selectedProject));
    }
  }, [selectedProject]);

  const contextualWidgets = getContextualWidgets(projectType, currentContext);

  const sidebarVariants = {
    expanded: { width: "16rem" },
    collapsed: { width: "4rem" }
  };

  const contentVariants = {
    expanded: { opacity: 1, x: 0 },
    collapsed: { opacity: 0, x: -10 }
  };

  // Cores dinâmicas baseadas no contexto
  const getContextColor = (context: ContextType) => {
    switch (context) {
      case 'writing': return 'from-blue-500/10 to-purple-500/10';
      case 'coding': return 'from-green-500/10 to-blue-500/10';
      case 'brainstorming': return 'from-yellow-500/10 to-orange-500/10';
      case 'researching': return 'from-purple-500/10 to-pink-500/10';
      default: return 'from-primary/10 to-accent/10';
    }
  };

  return (
    <motion.aside
      className={`glass border-r border-border/50 flex flex-col h-full relative z-10 bg-gradient-to-b ${getContextColor(currentContext)}`}
      variants={sidebarVariants}
      animate={collapsed ? "collapsed" : "expanded"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Header */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                className="flex items-center gap-3"
                variants={contentVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="p-2 bg-primary/20 rounded-lg"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Sparkles className="w-5 h-5 text-primary" />
                </motion.div>
                <div>
                  <h1 className="font-bold text-foreground">Nexus AI</h1>
                  <p className="text-xs text-muted-foreground">
                    {currentContext === 'default' ? 'Modo Padrão' : `Contexto: ${currentContext}`}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.button
            onClick={onToggle}
            className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {collapsed ? (
              <PanelRightClose className="w-5 h-5" />
            ) : (
              <PanelLeftClose className="w-5 h-5" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              variants={contentVariants}
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              className="mb-6"
            >
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                GERAL
              </h2>
            </motion.div>
          )}
        </AnimatePresence>

        {navigationItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200",
              currentView === item.id
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            )}
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
          >
            <item.icon className={cn("w-5 h-5", collapsed ? "mx-auto" : "")} />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  variants={contentVariants}
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  className="font-medium"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        ))}

        {/* Contextual Widgets */}
        {!collapsed && contextualWidgets.length > 0 && (
          <motion.div
            className="mt-6 space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              INTEGRAÇÕES
            </h3>
            
            {contextualWidgets.map((widget) => (
              <motion.div
                key={widget.id}
                className={`p-3 rounded-lg border ${widget.color}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <widget.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{widget.title}</span>
                </div>
                <motion.button
                  className="w-full px-2 py-1 bg-background/50 rounded text-xs hover:bg-background/80 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  {widget.action}
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Projects */}
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              variants={contentVariants}
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              className="mt-6"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  PROJETOS
                </h2>
                <CreateProjectModal onCreateProject={onNewProject}>
                  <motion.button
                    className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Novo Projeto"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </CreateProjectModal>
              </div>

              <div className="space-y-1">
                {projects.map((project) => {
                  const projectContext = detectProjectContext(project);
                  const contextColor = projectContext === 'code' ? 'text-green-600' 
                    : projectContext === 'academic' ? 'text-blue-600'
                    : projectContext === 'creative' ? 'text-purple-600'
                    : 'text-orange-600';
                    
                  return (
                    <motion.button
                      key={project.id}
                      onClick={() => {
                        setSelectedProject(project);
                        onNavigate('project', { projectId: project.id });
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm hover:bg-secondary/50 transition-colors group"
                      whileHover={{ x: 2 }}
                    >
                      <div className={`w-2 h-2 rounded-full ${contextColor.replace('text-', 'bg-')}`} />
                      <span className="text-foreground group-hover:text-primary transition-colors truncate">
                        {project.name}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Settings */}
      <div className="p-4 border-t border-border/50">
        <motion.button
          onClick={() => onNavigate('settings')}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.98 }}
        >
          <Settings className={cn("w-5 h-5", collapsed ? "mx-auto" : "")} />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                variants={contentVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
              >
                Configurações
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.aside>
  );
};