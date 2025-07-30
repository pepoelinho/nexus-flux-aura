import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import { LoadingScreen } from "./LoadingScreen";
import { Sidebar } from "./Sidebar";
import { Dashboard } from "./Dashboard";
import { Chatbot } from "./Chatbot";
import { toast } from "sonner";

// AI Tools configuration
const AI_TOOLS = {
  'resumidor': { name: 'Resumidor de Textos', icon: 'file-text', desc: 'Cria resumos concisos de textos longos.' },
  'humanizador': { name: 'Humanizador de Escrita', icon: 'sparkles', desc: 'Torna textos de IA mais naturais e fluidos.' },
  'corretor': { name: 'Corretor Ortográfico', icon: 'spell-check-2', desc: 'Corrige erros de gramática e ortografia.' },
  'pesquisador': { name: 'Pesquisador de Livros', icon: 'book', desc: 'Sugere livros e artigos sobre um tema.' },
  'gerador_questoes': { name: 'Gerador de Questões', icon: 'help-circle', desc: 'Cria perguntas e respostas sobre um texto.' },
  'brainstorm': { name: 'Assistente de Brainstorm', icon: 'lightbulb', desc: 'Gera ideias criativas para qualquer tópico.' },
  'formatador_citacoes': { name: 'Formatador de Citações', icon: 'quote', desc: 'Formata referências nos padrões ABNT/APA.' },
  'explicador_codigo': { name: 'Explicador de Código', icon: 'code-2', desc: 'Explica o que um trecho de código faz.' },
  'tradutor': { name: 'Tradutor Técnico', icon: 'languages', desc: 'Traduz textos técnicos entre idiomas.' },
  'gerador_titulos': { name: 'Gerador de Títulos', icon: 'type', desc: 'Cria títulos criativos e otimizados.' },
  'anti_plagio': { name: 'Refraseador Anti-Plágio', icon: 'shield', desc: 'Reescreve trechos para evitar plágio.' },
  'analisador_argumentos': { name: 'Analisador de Argumentos', icon: 'list-checks', desc: 'Avalia a força e a lógica de argumentos.' },
  'criador_glossario': { name: 'Criador de Glossário', icon: 'book-marked', desc: 'Cria uma lista de termos e definições.' },
};

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
  sidebarCollapsed: boolean;
  chatMessages: Message[];
  apiKey: string;
  theme: 'light' | 'dark';
  isLoading: boolean;
}

export const NexusApp = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [appState, setAppState] = useState<AppState>({
    currentView: 'dashboard',
    projects: [],
    currentProjectId: null,
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
  }, []);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('nexusAIState', JSON.stringify(appState));
  }, [appState]);

  // Apply theme
  useEffect(() => {
    document.documentElement.className = appState.theme;
  }, [appState.theme]);

  const handleLoadingComplete = () => {
    setIsInitialLoading(false);
  };

  const handleNavigate = (view: string, data?: any) => {
    setAppState(prev => ({
      ...prev,
      currentView: view,
      currentProjectId: data?.projectId || null
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

  const handleChatSubmit = (message: string) => {
    if (!appState.apiKey) {
      toast.error("Configure sua chave de API nas configurações primeiro!");
      handleNavigate('settings');
      return;
    }

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
    }, 2000);
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
                  <p className="text-muted-foreground mb-4">
                    Escolha entre o tema claro ou escuro.
                  </p>
                  <div className="flex gap-3">
                    <motion.button
                      onClick={() => setAppState(prev => ({ ...prev, theme: 'light' }))}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        appState.theme === 'light' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary text-secondary-foreground'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Claro
                    </motion.button>
                    <motion.button
                      onClick={() => setAppState(prev => ({ ...prev, theme: 'dark' }))}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        appState.theme === 'dark' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary text-secondary-foreground'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Escuro
                    </motion.button>
                  </div>
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
      </motion.div>

      <Toaster 
        position="bottom-right"
        richColors
        theme={appState.theme}
      />
    </>
  );
};