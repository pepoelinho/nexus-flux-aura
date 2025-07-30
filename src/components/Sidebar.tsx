import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  MessageCircle, 
  FolderOpen, 
  Plus, 
  Settings, 
  PanelLeftClose, 
  PanelRightClose,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  currentView: string;
  projects: any[];
  onNavigate: (view: string, data?: any) => void;
  onNewProject: () => void;
}

export const Sidebar = ({ 
  collapsed, 
  onToggle, 
  currentView, 
  projects, 
  onNavigate, 
  onNewProject 
}: SidebarProps) => {
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tools', label: 'Ferramentas IA', icon: Sparkles },
    { id: 'chatbot', label: 'Chatbot', icon: MessageCircle },
  ];

  const sidebarVariants = {
    expanded: { width: "16rem" },
    collapsed: { width: "4rem" }
  };

  const contentVariants = {
    expanded: { opacity: 1, x: 0 },
    collapsed: { opacity: 0, x: -10 }
  };

  return (
    <motion.aside
      className="glass border-r border-border/50 flex flex-col h-full relative z-10"
      variants={sidebarVariants}
      animate={collapsed ? "collapsed" : "expanded"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Header */}
      <div className="flex items-center px-4 py-6 border-b border-border/50">
        <motion.div
          className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Sparkles className="w-4 h-4 text-white" />
        </motion.div>
        
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              className="ml-3"
              variants={contentVariants}
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              transition={{ duration: 0.2 }}
            >
              <h1 className="text-xl font-bold font-manrope bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Nexus AI
              </h1>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-2">
        <AnimatePresence>
          {!collapsed && (
            <motion.h3
              className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider"
              variants={contentVariants}
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
            >
              Geral
            </motion.h3>
          )}
        </AnimatePresence>

        {navigationItems.map((item, index) => (
          <motion.button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative",
              currentView === item.id
                ? "bg-primary/10 text-primary border border-primary/20"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            )}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  className="text-sm font-medium"
                  variants={contentVariants}
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Tooltip for collapsed state */}
            {collapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                {item.label}
              </div>
            )}
          </motion.button>
        ))}

        {/* Projects Section */}
        <div className="pt-6">
          <div className="flex items-center justify-between px-3 mb-3">
            <AnimatePresence>
              {!collapsed && (
                <motion.h3
                  className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                  variants={contentVariants}
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                >
                  Projetos
                </motion.h3>
              )}
            </AnimatePresence>
            
            <motion.button
              onClick={onNewProject}
              className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Novo Projeto"
            >
              <Plus className="w-4 h-4" />
            </motion.button>
          </div>

          <div className="space-y-1">
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <motion.button
                  key={project.id}
                  onClick={() => onNavigate('project', { projectId: project.id })}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group relative",
                    currentView === 'project' && project.id === project.currentId
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  )}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (navigationItems.length + index) * 0.1 }}
                  whileHover={{ x: 2 }}
                >
                  <FolderOpen className="w-4 h-4 flex-shrink-0" />
                  
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        className="text-sm truncate"
                        variants={contentVariants}
                        initial="collapsed"
                        animate="expanded"
                        exit="collapsed"
                      >
                        {project.name}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {collapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                      {project.name}
                    </div>
                  )}
                </motion.button>
              ))
            ) : (
              <AnimatePresence>
                {!collapsed && (
                  <motion.p
                    className="px-3 py-4 text-xs text-center text-muted-foreground"
                    variants={contentVariants}
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                  >
                    Nenhum projeto criado
                  </motion.p>
                )}
              </AnimatePresence>
            )}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-border/50 space-y-1">
        <motion.button
          onClick={() => onNavigate('settings')}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group relative",
            currentView === 'settings'
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
          )}
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.98 }}
        >
          <Settings className="w-4 h-4 flex-shrink-0" />
          
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                className="text-sm"
                variants={contentVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
              >
                Configurações
              </motion.span>
            )}
          </AnimatePresence>

          {collapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              Configurações
            </div>
          )}
        </motion.button>

        <motion.button
          onClick={onToggle}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-200 group relative"
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.98 }}
        >
          {collapsed ? (
            <PanelRightClose className="w-4 h-4 flex-shrink-0" />
          ) : (
            <PanelLeftClose className="w-4 h-4 flex-shrink-0" />
          )}
          
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                className="text-sm"
                variants={contentVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
              >
                Recolher
              </motion.span>
            )}
          </AnimatePresence>

          {collapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              Expandir Menu
            </div>
          )}
        </motion.button>
      </div>
    </motion.aside>
  );
};