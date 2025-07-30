import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, Copy, Download, Star, Sparkles, Loader, Crown } from "lucide-react";
import { AI_TOOLS } from "@/data/aiTools";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner";

interface ToolInterfaceProps {
  toolKey: string;
  onBack: () => void;
  onGenerate: (prompt: string) => Promise<string>;
}

export const ToolInterface = ({ toolKey, onBack, onGenerate }: ToolInterfaceProps) => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("ABNT");
  const [selectedLang, setSelectedLang] = useState("Inglês");
  const outputRef = useRef<HTMLDivElement>(null);

  const tool = AI_TOOLS[toolKey];
  if (!tool) return null;

  const handleGenerate = async () => {
    if (!input.trim()) {
      toast.error("Por favor, insira o conteúdo necessário");
      return;
    }

    setIsLoading(true);
    try {
      let prompt = `Como ${tool.name}, ${tool.desc}.\n\nInput do usuário: ${input}`;
      
      // Add specific instructions based on tool type
      if (tool.hasStyle && selectedStyle) {
        prompt += `\n\nFormate no padrão: ${selectedStyle}`;
      }
      
      if (tool.hasLang && selectedLang) {
        prompt += `\n\nTraduzir para: ${selectedLang}`;
      }
      
      if (tool.hasOptions && selectedOption) {
        prompt += `\n\nEstilo/Tipo: ${selectedOption}`;
      }

      // Add tool-specific prompts
      switch (toolKey) {
        case 'construtor_sites':
          prompt = `Crie uma estrutura completa de site ${selectedOption} com HTML, CSS e JavaScript. 
                   Requisitos: ${input}
                   
                   Forneça:
                   1. Estrutura HTML semântica
                   2. CSS responsivo e moderno
                   3. JavaScript interativo
                   4. Explicação da arquitetura`;
          break;
          
        case 'pesquisador':
          prompt = `Como especialista em pesquisa bibliográfica, sugira uma lista de 8-10 livros, artigos acadêmicos e recursos sobre: ${input}
                   
                   Para cada sugestão, forneça:
                   - Título e autor
                   - Ano de publicação
                   - Breve descrição da relevância
                   - Nível de dificuldade
                   
                   Organize por ordem de importância.`;
          break;
          
        case 'analisador_imagens':
          prompt = `Analise detalhadamente a imagem fornecida. Descreva:
                   1. Elementos visuais principais
                   2. Composição e técnica
                   3. Cores e iluminação
                   4. Possível contexto ou significado
                   5. Qualidade técnica
                   
                   Contexto adicional: ${input}`;
          break;
          
        case 'gerador_imagens':
          prompt = `Crie uma descrição detalhada para geração de imagem:
                   
                   Conceito: ${input}
                   
                   Inclua:
                   - Elementos visuais específicos
                   - Estilo artístico
                   - Paleta de cores
                   - Composição e enquadramento
                   - Atmosfera e mood
                   
                   Formate como prompt para IA de imagem.`;
          break;
      }

      const result = await onGenerate(prompt);
      setOutput(result);
      
      // Scroll to output
      setTimeout(() => {
        outputRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      
    } catch (error) {
      toast.error("Erro ao gerar conteúdo. Tente novamente.");
      console.error("Generation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast.success("Copiado para a área de transferência!");
  };

  const downloadAsText = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tool.name.toLowerCase().replace(/\s+/g, '_')}_resultado.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Download iniciado!");
  };

  return (
    <motion.div
      className="h-full flex flex-col"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <motion.div 
        className="mb-8 pb-6 border-b border-border"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-start gap-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="mt-1">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <motion.div
                className="p-3 bg-primary/10 rounded-xl"
                whileHover={{ rotate: 5 }}
              >
                <div className="w-6 h-6 text-primary flex items-center justify-center">
                  {/* Icon placeholder */}
                  <div className="w-full h-full bg-primary/30 rounded"></div>
                </div>
              </motion.div>
              
              <div>
                <h1 className="text-2xl font-bold font-manrope text-foreground flex items-center gap-2">
                  {tool.name}
                  {tool.premium && (
                    <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
                      <Crown className="w-3 h-3 mr-1" />
                      Pro
                    </Badge>
                  )}
                </h1>
                <p className="text-muted-foreground">{tool.desc}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Input Section */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="glass p-6 rounded-2xl space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {tool.inputLabel || 'Entrada'}
            </label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={tool.placeholder || 'Digite seu conteúdo aqui...'}
              className="min-h-32 resize-none"
            />
          </div>

          {/* Options */}
          {tool.hasOptions && tool.options && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Opções
              </label>
              <Select value={selectedOption} onValueChange={setSelectedOption}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma opção" />
                </SelectTrigger>
                <SelectContent>
                  {tool.options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Style Selector */}
          {tool.hasStyle && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Estilo de Citação
              </label>
              <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ABNT">ABNT</SelectItem>
                  <SelectItem value="APA">APA</SelectItem>
                  <SelectItem value="MLA">MLA</SelectItem>
                  <SelectItem value="Chicago">Chicago</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Language Selector */}
          {tool.hasLang && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Idioma de Destino
              </label>
              <Select value={selectedLang} onValueChange={setSelectedLang}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Inglês">Inglês</SelectItem>
                  <SelectItem value="Espanhol">Espanhol</SelectItem>
                  <SelectItem value="Francês">Francês</SelectItem>
                  <SelectItem value="Alemão">Alemão</SelectItem>
                  <SelectItem value="Italiano">Italiano</SelectItem>
                  <SelectItem value="Português">Português</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <Button
            onClick={handleGenerate}
            disabled={isLoading || !input.trim()}
            className="w-full h-12 text-lg font-medium"
          >
            {isLoading ? (
              <>
                <Loader className="w-5 h-5 mr-2 animate-spin" />
                Gerando...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Gerar com IA
              </>
            )}
          </Button>
        </div>
      </motion.div>

      {/* Output Section */}
      <AnimatePresence>
        {output && (
          <motion.div
            ref={outputRef}
            className="flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="glass p-6 rounded-2xl h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Resultado
                </h3>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copiar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={downloadAsText}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
              
              <div className="flex-1 bg-background/50 rounded-xl p-4 overflow-y-auto">
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <div className="whitespace-pre-wrap text-foreground">
                    {output}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading State */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="flex-1 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-center">
              <motion.div
                className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-8 h-8 text-primary" />
              </motion.div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Processando com IA...
              </h3>
              <p className="text-muted-foreground">
                Isso pode levar alguns segundos
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};