import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { Plus, Lightbulb, Link, Sparkles, Share, Save } from "lucide-react";
import { Button } from "../ui/button";

interface Node {
  id: string;
  x: number;
  y: number;
  text: string;
  color: string;
  connections: string[];
}

interface BrainstormingCanvasProps {
  projectData?: any;
  onContextChange: (context: any) => void;
}

export const BrainstormingCanvas = ({ projectData, onContextChange }: BrainstormingCanvasProps) => {
  const [nodes, setNodes] = useState<Node[]>([
    {
      id: "1",
      x: 300,
      y: 200,
      text: "Nexus AI",
      color: "bg-primary/20 border-primary",
      connections: ["2", "3"]
    },
    {
      id: "2",
      x: 500,
      y: 150,
      text: "Interface Líquida",
      color: "bg-blue-500/20 border-blue-500",
      connections: ["1"]
    },
    {
      id: "3",
      x: 450,
      y: 300,
      text: "Cognição Antecipatória",
      color: "bg-purple-500/20 border-purple-500",
      connections: ["1"]
    }
  ]);
  
  const [isCreatingNode, setIsCreatingNode] = useState(false);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (isCreatingNode && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const newNode: Node = {
        id: Date.now().toString(),
        x,
        y,
        text: "Nova Ideia",
        color: "bg-accent/20 border-accent",
        connections: []
      };
      
      setNodes(prev => [...prev, newNode]);
      setIsCreatingNode(false);
    }
  };

  const handleNodeDrag = (nodeId: string, deltaX: number, deltaY: number) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId 
        ? { ...node, x: node.x + deltaX, y: node.y + deltaY }
        : node
    ));
  };

  const renderConnections = () => {
    return nodes.flatMap(node => 
      node.connections.map(connectionId => {
        const connectedNode = nodes.find(n => n.id === connectionId);
        if (!connectedNode) return null;
        
        return (
          <motion.line
            key={`${node.id}-${connectionId}`}
            x1={node.x + 75}
            y1={node.y + 30}
            x2={connectedNode.x + 75}
            y2={connectedNode.y + 30}
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeOpacity="0.3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
          />
        );
      })
    ).filter(Boolean);
  };

  return (
    <div className="h-full relative bg-gradient-to-br from-background via-background to-accent/5 overflow-hidden">
      {/* Toolbar */}
      <motion.div
        className="absolute top-6 left-6 z-50 flex items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Button
          variant={isCreatingNode ? "default" : "outline"}
          size="sm"
          onClick={() => setIsCreatingNode(!isCreatingNode)}
        >
          <Plus className="w-4 h-4 mr-2" />
          {isCreatingNode ? "Clique para criar" : "Nova Ideia"}
        </Button>
        
        <Button variant="outline" size="sm">
          <Link className="w-4 h-4 mr-2" />
          Conectar
        </Button>
        
        <Button variant="outline" size="sm">
          <Sparkles className="w-4 h-4 mr-2" />
          IA Brainstorm
        </Button>
      </motion.div>

      {/* Canvas Title */}
      <motion.div
        className="absolute top-6 right-6 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-light text-foreground">Canvas Infinito</h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
            <Button variant="ghost" size="sm">
              <Share className="w-4 h-4 mr-2" />
              Compartilhar
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Canvas */}
      <motion.div
        ref={canvasRef}
        className="w-full h-full relative cursor-crosshair"
        onClick={handleCanvasClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Grid Background */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--border)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />

        {/* SVG for connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {renderConnections()}
        </svg>

        {/* Nodes */}
        {nodes.map((node, index) => (
          <motion.div
            key={node.id}
            className={`absolute p-4 rounded-lg cursor-move select-none ${node.color} border-2 backdrop-blur-sm`}
            style={{ left: node.x, top: node.y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileDrag={{ scale: 1.1, zIndex: 50 }}
            drag
            onDrag={(e, info) => handleNodeDrag(node.id, info.delta.x, info.delta.y)}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedNode(node.id);
            }}
          >
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-primary" />
              <span className="font-medium text-foreground">{node.text}</span>
            </div>
            
            {selectedNode === node.id && (
              <motion.div
                className="absolute -bottom-2 -right-2 w-4 h-4 bg-primary rounded-full border-2 border-background"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              />
            )}
          </motion.div>
        ))}

        {/* AI Suggestions Panel */}
        <motion.div
          className="absolute bottom-6 right-6 w-80 p-4 glass rounded-xl backdrop-blur-xl border border-border/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="font-medium">Sugestões IA</h3>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="p-2 bg-primary/5 rounded-lg border border-primary/20">
              💡 Que tal explorar "Personalização de Interface" como uma ramificação?
            </div>
            <div className="p-2 bg-blue-500/5 rounded-lg border border-blue-500/20">
              🔗 "Interface Líquida" poderia se conectar com "Experiência do Usuário"
            </div>
            <div className="p-2 bg-purple-500/5 rounded-lg border border-purple-500/20">
              ⚡ Considere adicionar "Machine Learning" ao mapa
            </div>
          </div>
          
          <Button variant="outline" size="sm" className="w-full mt-3">
            Aplicar sugestões
          </Button>
        </motion.div>

        {/* Floating Instructions */}
        {isCreatingNode && (
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 glass rounded-lg backdrop-blur-xl border border-primary/50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="text-center">
              <Lightbulb className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm text-foreground">Clique em qualquer lugar para criar uma nova ideia</p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};