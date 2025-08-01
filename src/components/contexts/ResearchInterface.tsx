import { motion } from "framer-motion";
import { useState } from "react";
import { Globe, BookOpen, Save, Link, Plus, Search, FileText, Bookmark } from "lucide-react";
import { Button } from "../ui/button";

interface ResearchInterfaceProps {
  projectData?: any;
  onContextChange: (context: any) => void;
}

interface Note {
  id: string;
  title: string;
  content: string;
  source?: string;
  timestamp: Date;
}

export const ResearchInterface = ({ projectData, onContextChange }: ResearchInterfaceProps) => {
  const [currentUrl, setCurrentUrl] = useState("https://www.google.com/search?q=artificial+intelligence+research");
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Definição de IA",
      content: "Inteligência Artificial é a capacidade de sistemas computacionais realizarem tarefas que normalmente requerem inteligência humana...",
      source: "https://example.com/ai-definition",
      timestamp: new Date()
    }
  ]);
  const [currentNote, setCurrentNote] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const addNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: `Nota ${notes.length + 1}`,
      content: currentNote,
      source: currentUrl,
      timestamp: new Date()
    };
    setNotes(prev => [...prev, newNote]);
    setCurrentNote("");
  };

  const webBrowserContent = (
    <div className="h-full flex flex-col bg-card/30 backdrop-blur-sm">
      {/* Browser Header */}
      <div className="flex items-center gap-2 p-3 border-b border-border/50 bg-muted/20">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-1 mx-3">
          <input
            type="text"
            value={currentUrl}
            onChange={(e) => setCurrentUrl(e.target.value)}
            className="w-full px-3 py-1 bg-background rounded border border-border/50 text-sm"
          />
        </div>
        <Button size="sm" variant="ghost">
          <Search className="w-4 h-4" />
        </Button>
      </div>

      {/* Browser Content Simulation */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="space-y-6">
          {/* Google-like search results */}
          <div className="space-y-4">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="text-lg font-medium text-primary hover:underline cursor-pointer">
                Artificial Intelligence - Wikipedia
              </h3>
              <p className="text-sm text-muted-foreground">
                https://en.wikipedia.org/wiki/Artificial_intelligence
              </p>
              <p className="mt-1 text-sm">
                Artificial intelligence is intelligence demonstrated by machines, in contrast to the natural intelligence displayed by humans and animals...
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-lg font-medium text-blue-600 hover:underline cursor-pointer">
                What is AI? | IBM
              </h3>
              <p className="text-sm text-muted-foreground">
                https://www.ibm.com/topics/artificial-intelligence
              </p>
              <p className="mt-1 text-sm">
                Artificial intelligence leverages computers and machines to mimic the problem-solving and decision-making capabilities...
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-lg font-medium text-green-600 hover:underline cursor-pointer">
                AI Research - Latest Papers and Trends
              </h3>
              <p className="text-sm text-muted-foreground">
                https://arxiv.org/list/cs.AI/recent
              </p>
              <p className="mt-1 text-sm">
                Recent submissions to the Artificial Intelligence category. Stay updated with the latest research...
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-3 border-t border-border/50 bg-muted/10">
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={addNote}>
            <Plus className="w-4 h-4 mr-2" />
            Adicionar aos Notes
          </Button>
          <Button size="sm" variant="outline">
            <Bookmark className="w-4 h-4 mr-2" />
            Bookmark
          </Button>
          <Button size="sm" variant="outline">
            <Link className="w-4 h-4 mr-2" />
            Copiar Link
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full flex bg-gradient-to-br from-background via-background to-purple-500/5">
      {/* Web Browser Panel */}
      <motion.div
        className="flex-1 border-r border-border/50"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/50">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              <h2 className="font-medium">Navegador de Pesquisa</h2>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Pesquisar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-3 py-1 bg-muted rounded border border-border/50 text-sm w-64"
              />
            </div>
          </div>

          {/* Browser Content */}
          {webBrowserContent}
        </div>
      </motion.div>

      {/* Notes Panel */}
      <motion.div
        className="w-96 bg-card/30 backdrop-blur-sm p-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="h-full flex flex-col">
          {/* Notes Header */}
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-primary" />
            <h2 className="font-medium">Notas de Pesquisa</h2>
          </div>

          {/* Current Note Editor */}
          <div className="mb-4">
            <textarea
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
              placeholder="Digite suas anotações aqui..."
              className="w-full h-32 p-3 bg-background rounded border border-border/50 resize-none text-sm"
            />
            <div className="flex items-center gap-2 mt-2">
              <Button size="sm" onClick={addNote} disabled={!currentNote.trim()}>
                <Save className="w-4 h-4 mr-2" />
                Salvar Nota
              </Button>
            </div>
          </div>

          {/* Saved Notes */}
          <div className="flex-1 overflow-y-auto">
            <h3 className="text-sm font-medium mb-2">Notas Salvas</h3>
            <div className="space-y-3">
              {notes.map((note) => (
                <motion.div
                  key={note.id}
                  className="p-3 bg-background rounded border border-border/50 hover:shadow-sm transition-shadow cursor-pointer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm">{note.title}</h4>
                    <span className="text-xs text-muted-foreground">
                      {note.timestamp.toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {note.content}
                  </p>
                  {note.source && (
                    <div className="mt-2 flex items-center gap-1">
                      <Link className="w-3 h-3 text-primary" />
                      <span className="text-xs text-primary truncate">
                        {note.source}
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* AI Research Assistant */}
          <motion.div
            className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Assistente IA</span>
            </div>
            <p className="text-xs text-primary mb-2">
              💡 Detectei interesse em IA. Quer que eu encontre papers recentes sobre "Cognitive Augmentation"?
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Buscar Papers
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};