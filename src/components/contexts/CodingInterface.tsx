import { motion } from "framer-motion";
import { useState } from "react";
import { FolderOpen, Terminal, Play, Save, Github, Code, FileText, Folder } from "lucide-react";
import { Button } from "../ui/button";

interface CodingInterfaceProps {
  projectData?: any;
  onContextChange: (context: any) => void;
}

export const CodingInterface = ({ projectData, onContextChange }: CodingInterfaceProps) => {
  const [selectedFile, setSelectedFile] = useState("src/App.tsx");
  const [code, setCode] = useState(`import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Nexus AI</h1>
        <p>Plataforma de Aumento Cognitivo</p>
      </header>
    </div>
  );
}

export default App;`);

  const fileTree = [
    { name: "src", type: "folder", children: [
      { name: "App.tsx", type: "file" },
      { name: "components", type: "folder", children: [
        { name: "AdaptiveLayout.tsx", type: "file" },
        { name: "NexusOracle.tsx", type: "file" },
      ]},
      { name: "utils", type: "folder", children: [
        { name: "api.ts", type: "file" },
      ]},
    ]},
    { name: "package.json", type: "file" },
    { name: "README.md", type: "file" },
  ];

  const renderFileTree = (items: any[], level = 0) => {
    return items.map((item, index) => (
      <motion.div
        key={index}
        className={`flex items-center gap-2 py-1 px-2 rounded cursor-pointer hover:bg-muted/50 transition-colors`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={() => item.type === 'file' && setSelectedFile(item.name)}
        whileHover={{ x: 2 }}
      >
        {item.type === 'folder' ? (
          <Folder className="w-4 h-4 text-blue-500" />
        ) : (
          <FileText className="w-4 h-4 text-muted-foreground" />
        )}
        <span className={`text-sm ${selectedFile === item.name ? 'text-primary font-medium' : 'text-foreground'}`}>
          {item.name}
        </span>
        {item.children && (
          <div className="ml-4">
            {renderFileTree(item.children, level + 1)}
          </div>
        )}
      </motion.div>
    ));
  };

  return (
    <div className="h-full flex bg-gradient-to-br from-background via-background to-card/20">
      {/* File Explorer */}
      <motion.div
        className="w-64 border-r border-border/50 bg-card/30 backdrop-blur-sm p-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <FolderOpen className="w-5 h-5 text-primary" />
          <h3 className="font-medium">Explorador</h3>
        </div>
        
        <div className="space-y-1">
          {renderFileTree(fileTree)}
        </div>

        {/* GitHub Integration Widget */}
        <motion.div
          className="mt-6 p-3 bg-primary/5 rounded-lg border border-primary/20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Github className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">GitHub</span>
          </div>
          <Button variant="outline" size="sm" className="w-full">
            Sincronizar
          </Button>
        </motion.div>
      </motion.div>

      {/* Code Editor */}
      <div className="flex-1 flex flex-col">
        {/* Editor Header */}
        <motion.div
          className="flex items-center justify-between p-4 border-b border-border/50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-primary" />
              <span className="font-medium">{selectedFile}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Play className="w-4 h-4 mr-2" />
              Executar
            </Button>
            <Button variant="ghost" size="sm">
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
          </div>
        </motion.div>

        {/* Code Area */}
        <motion.div
          className="flex-1 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-full resize-none border border-border/50 rounded-lg p-4 bg-card/50 backdrop-blur-sm text-foreground font-mono text-sm leading-relaxed"
            style={{ fontFamily: "Monaco, 'Cascadia Code', 'Roboto Mono', monospace" }}
          />
        </motion.div>
      </div>

      {/* Terminal */}
      <motion.div
        className="w-80 border-l border-border/50 bg-card/30 backdrop-blur-sm p-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Terminal className="w-5 h-5 text-primary" />
          <h3 className="font-medium">Terminal</h3>
        </div>
        
        <div className="bg-black/80 rounded-lg p-3 text-green-400 font-mono text-sm h-64 overflow-y-auto">
          <div>$ npm run dev</div>
          <div className="text-white">Local: http://localhost:3000</div>
          <div className="text-blue-400">ready - started server on 0.0.0.0:3000</div>
          <div className="text-yellow-400">warn - Fast Refresh had to perform a full reload</div>
          <div className="text-green-400">✓ compiled successfully</div>
          <div className="mt-2">
            <span className="text-white">$</span>
            <span className="animate-pulse">_</span>
          </div>
        </div>

        {/* AI Code Assistant */}
        <motion.div
          className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <p className="text-sm text-primary mb-2">
            💡 Sugestão: Adicionar TypeScript interfaces para melhor tipagem.
          </p>
          <Button variant="outline" size="sm" className="w-full">
            Aplicar sugestão
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};