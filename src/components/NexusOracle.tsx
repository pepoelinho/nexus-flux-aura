import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Brain, Clock, CheckCircle, AlertCircle, Sparkles, X, Calendar, FileText } from "lucide-react";
import { Button } from "./ui/button";

interface Insight {
  id: string;
  type: 'briefing' | 'prediction' | 'connection' | 'suggestion';
  priority: 'high' | 'medium' | 'low';
  title: string;
  content: string;
  action?: () => void;
  timestamp: Date;
}

interface NexusOracleProps {
  isVisible: boolean;
  onClose: () => void;
  projectData?: any;
  onCreateDocument?: (title: string) => void;
}

export const NexusOracle = ({ isVisible, onClose, projectData, onCreateDocument }: NexusOracleProps) => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [currentInsight, setCurrentInsight] = useState(0);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    if (isVisible) {
      // Simular análise cognitiva
      setIsProcessing(true);
      const timer = setTimeout(() => {
        generateInsights();
        setIsProcessing(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const generateInsights = () => {
    const currentHour = new Date().getHours();
    const greeting = currentHour < 12 ? "Bom dia" : currentHour < 18 ? "Boa tarde" : "Boa noite";
    
    const generatedInsights: Insight[] = [
      {
        id: "1",
        type: "briefing",
        priority: "high",
        title: `${greeting}! Análise do seu workspace`,
        content: "Detectei que você tem um prazo importante para o 'Projeto TCC' em 3 dias. Sugiro focar nos documentos: 'Metodologia' e 'Resultados'. Já preparei um resumo do feedback recebido ontem.",
        timestamp: new Date()
      },
      {
        id: "2",
        type: "prediction",
        priority: "medium",
        title: "Rascunho Preditivo Criado",
        content: "Notei um evento 'Reunião de Marketing' no seu calendário. Criei automaticamente um documento '[Rascunho] Pauta Marketing' com os participantes e tópicos baseados nos seus projetos recentes.",
        action: () => onCreateDocument?.("[Rascunho] Pauta Marketing"),
        timestamp: new Date()
      },
      {
        id: "3",
        type: "connection",
        priority: "medium",
        title: "Nova Conexão de Conhecimento",
        content: "Encontrei 3 conexões interessantes entre o conceito 'Interface Adaptativa' no seu documento atual e ideias similares em projetos anteriores. Quer explorar essas conexões?",
        timestamp: new Date()
      },
      {
        id: "4",
        type: "suggestion",
        priority: "low",
        title: "Otimização de Fluxo de Trabalho",
        content: "Baseado no seu padrão de trabalho, seria mais produtivo se você escrevesse pela manhã e fizesse revisões à tarde. Quer que eu ajuste sua agenda automaticamente?",
        timestamp: new Date()
      }
    ];

    setInsights(generatedInsights);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-500/10';
      case 'medium': return 'border-yellow-500 bg-yellow-500/10';
      case 'low': return 'border-blue-500 bg-blue-500/10';
      default: return 'border-primary bg-primary/10';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'briefing': return Calendar;
      case 'prediction': return Brain;
      case 'connection': return Sparkles;
      case 'suggestion': return CheckCircle;
      default: return AlertCircle;
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Oracle Interface */}
        <motion.div
          className="relative w-full max-w-2xl glass rounded-2xl border border-primary/20 overflow-hidden"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
        >
          {/* Header */}
          <div className="relative p-6 bg-gradient-to-r from-primary/10 via-purple-500/10 to-accent/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  className="p-3 bg-primary/20 rounded-xl"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Brain className="w-6 h-6 text-primary" />
                </motion.div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Nexus Oracle</h2>
                  <p className="text-sm text-muted-foreground">Agente de Cognição Antecipatória</p>
                </div>
              </div>
              
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Neural Activity Indicator */}
            <div className="mt-4 flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-primary rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                {isProcessing ? "Analisando padrões cognitivos..." : "Análise completa"}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {isProcessing ? (
              <motion.div
                className="flex items-center justify-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-center">
                  <motion.div
                    className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full mx-auto mb-4"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <p className="text-muted-foreground">Processando dados cognitivos...</p>
                </div>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {/* Insights */}
                {insights.map((insight, index) => {
                  const IconComponent = getTypeIcon(insight.type);
                  return (
                    <motion.div
                      key={insight.id}
                      className={`p-4 rounded-lg border-2 ${getPriorityColor(insight.priority)}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-start gap-3">
                        <IconComponent className="w-5 h-5 text-foreground mt-0.5" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-2">
                            {insight.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            {insight.content}
                          </p>
                          {insight.action && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={insight.action}
                              className="text-xs"
                            >
                              Executar Ação
                            </Button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Action Buttons */}
                <motion.div
                  className="flex justify-between pt-4 border-t border-border/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button variant="outline" onClick={onClose}>
                    Revisar Depois
                  </Button>
                  <Button onClick={onClose}>
                    Pronto para Começar
                  </Button>
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};