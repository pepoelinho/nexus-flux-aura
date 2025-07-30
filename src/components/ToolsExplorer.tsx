import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Star, Crown, Filter, Grid, List, ArrowRight, FileText, Sparkles, BookOpen, Code2, Briefcase, GraduationCap, Palette, Zap, Globe, MessageCircle, TrendingUp } from "lucide-react";
import { AI_TOOLS, AI_TOOL_CATEGORIES, getToolsByCategory, getAllCategories, getCategoryInfo, searchTools } from "@/data/aiTools";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

// Icon mapping for categories
const CATEGORY_ICONS = {
  'texto': FileText,
  'imagem': Palette,
  'codigo': Code2,
  'negocios': Briefcase,
  'educacao': GraduationCap,
  'criatividade': Sparkles,
  'produtividade': Zap,
  'web': Globe,
  'comunicacao': MessageCircle,
  'analise': TrendingUp
};

interface ToolsExplorerProps {
  onSelectTool: (toolKey: string) => void;
  onNavigate: (view: string, data?: any) => void;
}

export const ToolsExplorer = ({ onSelectTool, onNavigate }: ToolsExplorerProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('texto');
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  const displayedTools = useMemo(() => {
    if (searchQuery.trim()) {
      return searchTools(searchQuery);
    }
    return getToolsByCategory(selectedCategory);
  }, [selectedCategory, searchQuery]);

  const toggleFavorite = (toolKey: string) => {
    setFavorites(prev => 
      prev.includes(toolKey) 
        ? prev.filter(key => key !== toolKey)
        : [...prev, toolKey]
    );
  };

  const categories = getAllCategories();
  const categoryInfo = getCategoryInfo(selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const ToolCard = ({ toolKey, tool }: { toolKey: string; tool: any }) => {
    const isFavorite = favorites.includes(toolKey);
    const CategoryIcon = CATEGORY_ICONS[tool.category as keyof typeof CATEGORY_ICONS] || FileText;
    
    return (
      <motion.div
        className={`glass p-6 rounded-2xl hover-glow group cursor-pointer ${
          viewMode === 'list' ? 'flex items-center gap-4' : ''
        }`}
        variants={itemVariants}
        whileHover={{ y: -4, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onSelectTool(toolKey)}
      >
        <div className={`${viewMode === 'list' ? 'flex items-center gap-4 flex-1' : ''}`}>
          <motion.div
            className={`p-4 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors ${
              viewMode === 'list' ? 'flex-shrink-0' : 'mb-4'
            }`}
            whileHover={{ rotate: 5 }}
          >
            <CategoryIcon className="w-8 h-8 text-primary" />
          </motion.div>
          
          <div className={viewMode === 'list' ? 'flex-1' : ''}>
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {tool.name}
              </h3>
              <div className="flex items-center gap-2">
                {tool.premium && (
                  <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
                    <Crown className="w-3 h-3 mr-1" />
                    Pro
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(toolKey);
                  }}
                >
                  <Star 
                    className={`w-4 h-4 ${isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} 
                  />
                </Button>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {tool.desc}
            </p>
            
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs">
                {getCategoryInfo(tool.category)?.name}
              </Badge>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      className="h-full flex flex-col"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div className="mb-8" variants={itemVariants}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold font-manrope text-foreground mb-2">
              Ferramentas de IA
            </h1>
            <p className="text-lg text-muted-foreground">
              Mais de 60 ferramentas para impulsionar sua produtividade
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Pesquisar ferramentas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          
          <Button
            variant={showFavorites ? 'default' : 'outline'}
            onClick={() => setShowFavorites(!showFavorites)}
            className="flex items-center gap-2"
          >
            <Star className="w-4 h-4" />
            Favoritos ({favorites.length})
          </Button>
        </div>
      </motion.div>

      {/* Category Tabs */}
      {!searchQuery && (
        <motion.div className="mb-8" variants={itemVariants}>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const info = getCategoryInfo(category);
              const CategoryIcon = CATEGORY_ICONS[category as keyof typeof CATEGORY_ICONS] || FileText;
              return (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="flex items-center gap-2"
                >
                  <CategoryIcon className="w-4 h-4" />
                  {info?.name}
                </Button>
              );
            })}
          </div>
          
          {categoryInfo && (
            <div className="mt-4 p-4 glass rounded-xl">
              <h3 className="font-semibold text-foreground mb-1">
                {categoryInfo.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {Object.keys(displayedTools).length} ferramentas disponíveis
              </p>
            </div>
          )}
        </motion.div>
      )}

      {/* Tools Grid */}
      <motion.div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${searchQuery}-${viewMode}`}
            className={
              viewMode === 'grid'
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {Object.entries(displayedTools).map(([toolKey, tool]) => (
              <ToolCard key={toolKey} toolKey={toolKey} tool={tool} />
            ))}
          </motion.div>
        </AnimatePresence>

        {Object.keys(displayedTools).length === 0 && (
          <motion.div
            className="flex flex-col items-center justify-center py-16 text-center"
            variants={itemVariants}
          >
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Nenhuma ferramenta encontrada
            </h3>
            <p className="text-muted-foreground max-w-md">
              Tente ajustar sua pesquisa ou explorar outras categorias.
            </p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};