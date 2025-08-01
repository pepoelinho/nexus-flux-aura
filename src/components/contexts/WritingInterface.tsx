import { motion } from "framer-motion";
import { useState } from "react";
import { Bold, Italic, List, Quote, Save, Sparkles, Brain, Eye } from "lucide-react";
import { Button } from "../ui/button";

interface WritingInterfaceProps {
  projectData?: any;
  onContextChange: (context: any) => void;
}

export const WritingInterface = ({ projectData, onContextChange }: WritingInterfaceProps) => {
  const [content, setContent] = useState("");
  const [isAIAssisting, setIsAIAssisting] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setContent(text);
    setWordCount(text.trim().split(/\s+/).filter(word => word.length > 0).length);
  };

  const floatingTools = [
    { icon: Bold, label: "Negrito", action: () => {} },
    { icon: Italic, label: "Itálico", action: () => {} },
    { icon: List, label: "Lista", action: () => {} },
    { icon: Quote, label: "Citação", action: () => {} },
  ];

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header minimalista */}
      <motion.div
        className="flex items-center justify-between p-6 border-b border-border/50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-light text-foreground">Documento Sem Título</h1>
          <div className="text-sm text-muted-foreground">
            {wordCount} palavras
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsAIAssisting(!isAIAssisting)}
            className={isAIAssisting ? "bg-primary/10 text-primary" : ""}
          >
            <Brain className="w-4 h-4 mr-2" />
            IA Assistente
          </Button>
          <Button variant="ghost" size="sm">
            <Save className="w-4 h-4 mr-2" />
            Salvar
          </Button>
        </div>
      </motion.div>

      {/* Área de escrita principal */}
      <div className="flex-1 flex relative">
        {/* Editor principal */}
        <motion.div
          className="flex-1 p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder="Comece a escrever suas ideias..."
            className="w-full h-full resize-none border-none outline-none bg-transparent text-foreground text-lg leading-relaxed font-light placeholder:text-muted-foreground/50"
            style={{ fontFamily: "ui-serif, Georgia, serif" }}
          />
        </motion.div>

        {/* Ferramentas flutuantes contextuais */}
        {content.length > 10 && (
          <motion.div
            className="absolute right-8 top-1/2 transform -translate-y-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex flex-col gap-2 p-2 glass rounded-lg backdrop-blur-xl">
              {floatingTools.map((tool, index) => (
                <motion.button
                  key={index}
                  onClick={tool.action}
                  className="p-2 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title={tool.label}
                >
                  <tool.icon className="w-4 h-4" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Painel de IA Assistente */}
        {isAIAssisting && (
          <motion.div
            className="w-80 border-l border-border/50 bg-card/50 backdrop-blur-sm p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="font-medium">Assistente IA</h3>
              </div>

              <div className="space-y-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Brain className="w-4 h-4 mr-2" />
                  Continuar escrevendo
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Revisar gramática
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Melhorar estilo
                </Button>
              </div>

              {content.length > 100 && (
                <motion.div
                  className="p-3 bg-primary/5 rounded-lg border border-primary/20"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-sm text-primary">
                    💡 Sugestão: Considere adicionar uma transição entre os parágrafos para melhor fluidez.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};