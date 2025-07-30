import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import { LoadingScreen } from "./LoadingScreen";
import { Sidebar } from "./Sidebar";
import { Dashboard } from "./Dashboard";
import { Chatbot } from "./Chatbot";
import { CommandBar } from "./CommandBar";
import { ThemeSelector } from "./ThemeSelector";
import { ToolsExplorer } from "./ToolsExplorer";
import { ToolInterface } from "./ToolInterface";
import { toast } from "sonner";

// Import AI Tools from centralized data
import { AI_TOOLS } from "@/data/aiTools";

// Legacy tools configuration (keeping for compatibility)
const LEGACY_AI_TOOLS = AI_TOOLS;

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Project {
  id: string;
  name: string;
  documents: any[];
  createdAt: Date;
  updatedAt: Date;
}

interface AppState {
  currentView: string;
  projects: Project[];
  currentProjectId: string | null;
  currentToolKey: string | null;
  sidebarCollapsed: boolean;
  chatMessages: Message[];
  apiKey: string;
  theme: 'light' | 'dark' | 'cyberpunk';
  isLoading: boolean;
}

export const NexusApp = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [commandBarOpen, setCommandBarOpen] = useState(false);
  const [appState, setAppState] = useState<AppState>({
    currentView: 'dashboard',
    projects: [],
    currentProjectId: null,
    currentToolKey: null,
    sidebarCollapsed: false,
    chatMessages: [],
    apiKey: '',
    theme: 'light',
    isLoading: false
  });

  // Load saved state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('nexusAIState');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        setAppState(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Error loading saved state:', error);
      }
    }

    // Global keyboard shortcut for command bar
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandBarOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('nexusAIState', JSON.stringify(appState));
  }, [appState]);

  // Apply theme
  useEffect(() => {
    document.documentElement.className = appState.theme;
  }, [appState.theme]);

  const handleThemeChange = (theme: string) => {
    setAppState(prev => ({ ...prev, theme: theme as 'light' | 'dark' | 'cyberpunk' }));
  };

  const handleLoadingComplete = () => {
    setIsInitialLoading(false);
  };

  const handleNavigate = (view: string, data?: any) => {
    setAppState(prev => ({
      ...prev,
      currentView: view,
      currentProjectId: data?.projectId || null,
      currentToolKey: data?.toolKey || null
    }));
  };

  const handleToggleSidebar = () => {
    setAppState(prev => ({
      ...prev,
      sidebarCollapsed: !prev.sidebarCollapsed
    }));
  };

  const handleNewProject = () => {
    const projectName = prompt("Nome do projeto:");
    if (projectName?.trim()) {
      const newProject: Project = {
        id: Date.now().toString(),
        name: projectName.trim(),
        documents: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      setAppState(prev => ({
        ...prev,
        projects: [newProject, ...prev.projects],
        currentView: 'project',
        currentProjectId: newProject.id
      }));
      
      toast.success("Projeto criado com sucesso!");
    }
  };

  const handleChatSubmit = (message: string): Promise<string> => {
    if (!appState.apiKey) {
      toast.error("Configure sua chave de API nas configurações primeiro!");
      handleNavigate('settings');
      return Promise.reject("API key not configured");
    }

    return new Promise((resolve) => {
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: message,
        timestamp: new Date()
      };

      setAppState(prev => ({
        ...prev,
        currentView: 'chatbot',
        chatMessages: [...prev.chatMessages, userMessage],
        isLoading: true
      }));

      // Simulate AI response (replace with actual API call)
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `Esta é uma resposta simulada para: "${message}". Em uma implementação real, aqui estaria a resposta da API do Google Gemini usando sua chave de API configurada.`,
          timestamp: new Date()
        };

        setAppState(prev => ({
          ...prev,
          chatMessages: [...prev.chatMessages, aiResponse],
          isLoading: false
        }));
        
        resolve(aiResponse.content);
      }, 2000);
    });
  };

  const renderCurrentView = () => {
    const currentProject = appState.projects.find(p => p.id === appState.currentProjectId);

    switch (appState.currentView) {
      case 'dashboard':
        return (
          <Dashboard
            projects={appState.projects}
            onNavigate={handleNavigate}
            onChatSubmit={handleChatSubmit}
          />
        );
      
      case 'chatbot':
        return (
          <Chatbot
            messages={appState.chatMessages}
            onSendMessage={handleChatSubmit}
            isLoading={appState.isLoading}
          />
        );
      
      case 'project':
        if (!currentProject) {
          handleNavigate('dashboard');
          return null;
        }
        return (
          <div className="p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl font-bold font-manrope mb-6">{currentProject.name}</h1>
              <div className="glass p-8 rounded-2xl text-center">
                <h3 className="text-xl font-semibold mb-4">Em Desenvolvimento</h3>
                <p className="text-muted-foreground">
                  A visualização de projetos e ferramentas de IA serão implementadas em breve.
                </p>
              </div>
            </motion.div>
          </div>
        );
      
      case 'tools':
        return (
          <ToolsExplorer
            onSelectTool={(toolKey) => handleNavigate('tool-interface', { toolKey })}
            onNavigate={handleNavigate}
          />
        );
      
      case 'tool-interface':
        return (
          <ToolInterface
            toolKey={appState.currentToolKey!}
            onBack={() => handleNavigate('tools')}
            onGenerate={handleChatSubmit}
          />
        );
      
      case 'settings':
        return (
          <div className="p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto"
            >
              <h1 className="text-3xl font-bold font-manrope mb-8">Configurações</h1>
              
              <div className="space-y-6">
                {/* API Key Setting */}
                <div className="glass p-6 rounded-2xl">
                  <h2 className="text-xl font-semibold mb-4">Chave de API do Google Gemini</h2>
                  <p className="text-muted-foreground mb-4">
                    Configure sua chave de API para usar as funcionalidades de IA.
                  </p>
                  <div className="flex gap-3">
                    <input
                      type="password"
                      value={appState.apiKey}
                      onChange={(e) => setAppState(prev => ({ ...prev, apiKey: e.target.value }))}
                      placeholder="Cole sua chave de API aqui..."
                      className="flex-1 glass px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <motion.button
                      onClick={() => toast.success("Chave de API salva!")}
                      className="px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Salvar
                    </motion.button>
                  </div>
                </div>

                {/* Theme Setting */}
                <div className="glass p-6 rounded-2xl">
                  <h2 className="text-xl font-semibold mb-4">Tema da Interface</h2>
                  <ThemeSelector 
                    currentTheme={appState.theme}
                    onThemeChange={handleThemeChange}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        );
      
      default:
        return (
          <Dashboard
            projects={appState.projects}
            onNavigate={handleNavigate}
            onChatSubmit={handleChatSubmit}
          />
        );
    }
  };

  return (
    <>
      <AnimatePresence>
        {isInitialLoading && (
          <LoadingScreen onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      <motion.div
        className="flex h-screen w-full bg-background overflow-hidden"
        initial={{ filter: "blur(5px)" }}
        animate={{ filter: isInitialLoading ? "blur(5px)" : "blur(0px)" }}
        transition={{ duration: 0.5 }}
      >
        <Sidebar
          collapsed={appState.sidebarCollapsed}
          onToggle={handleToggleSidebar}
          currentView={appState.currentView}
          projects={appState.projects}
          onNavigate={handleNavigate}
          onNewProject={handleNewProject}
        />

        <main className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={appState.currentView}
              className="h-full"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {renderCurrentView()}
            </motion.div>
          </AnimatePresence>
        </main>

        <CommandBar
          isOpen={commandBarOpen}
          onClose={() => setCommandBarOpen(false)}
          onNavigate={handleNavigate}
          onCreateProject={handleNewProject}
          onCreateDocument={() => {/* TODO: Implement */}}
        />
      </motion.div>

      <Toaster 
        position="bottom-right"
        richColors
        theme={appState.theme === 'cyberpunk' ? 'dark' : appState.theme}
      />
    </>
  );
};