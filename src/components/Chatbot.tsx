import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, User, Bot } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatbotProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

export const Chatbot = ({ messages, onSendMessage, isLoading = false }: ChatbotProps) => {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue.trim());
      setInputValue("");
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <motion.div
        className="flex items-center gap-4 p-6 border-b border-border/50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold font-manrope">Chatbot</h1>
          <p className="text-sm text-muted-foreground">
            Converse com a IA e obtenha respostas inteligentes
          </p>
        </div>
      </motion.div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <AnimatePresence mode="popLayout">
            {messages.length === 0 ? (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Olá! Como posso ajudar?</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Faça uma pergunta, peça ajuda com um texto, ou solicite informações sobre qualquer tópico.
                </p>
              </motion.div>
            ) : (
              messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  layout
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  <div className={`max-w-[70%] ${message.role === 'user' ? 'order-2' : ''}`}>
                    <motion.div
                      className={`glass p-4 rounded-2xl ${
                        message.role === 'user' 
                          ? 'bg-primary/10 border-primary/20' 
                          : 'bg-card/50 border-border/50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="prose prose-sm max-w-none">
                        <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                          {message.content}
                        </p>
                      </div>
                    </motion.div>
                    <p className="text-xs text-muted-foreground mt-2 px-2">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>

                  {message.role === 'user' && (
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0 order-3">
                      <User className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                </motion.div>
              ))
            )}
          </AnimatePresence>

          {/* Typing Indicator */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                className="flex gap-4 justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="glass p-4 rounded-2xl bg-card/50 border-border/50">
                  <div className="flex gap-1">
                    <motion.div 
                      className="w-2 h-2 bg-primary/60 rounded-full"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div 
                      className="w-2 h-2 bg-primary/60 rounded-full"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                    />
                    <motion.div 
                      className="w-2 h-2 bg-primary/60 rounded-full"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <motion.div
        className="border-t border-border/50 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <motion.div
            className="glass rounded-2xl p-2 hover-glow focus-within:shadow-glow transition-all duration-300"
            whileFocus={{ scale: 1.02 }}
          >
            <div className="flex items-end gap-3">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Digite sua mensagem..."
                disabled={isLoading}
                className="flex-1 bg-transparent px-4 py-3 text-lg placeholder:text-muted-foreground focus:outline-none disabled:opacity-50 resize-none"
              />
              <motion.button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="p-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
          
          <div className="flex items-center justify-between mt-3 px-2">
            <p className="text-xs text-muted-foreground">
              Pressione Enter para enviar
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              IA Online
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};