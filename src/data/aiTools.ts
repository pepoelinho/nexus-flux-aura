// Central configuration for all AI tools organized by categories
export interface AITool {
  name: string;
  icon: string;
  desc: string;
  category: string;
  prompt?: (input: string, ...args: any[]) => string;
  inputLabel?: string;
  placeholder?: string;
  hasStyle?: boolean;
  hasLang?: boolean;
  hasOptions?: boolean;
  options?: string[];
  premium?: boolean;
}

export const AI_TOOL_CATEGORIES = {
  'texto': { name: 'Texto & Redação', icon: 'type', color: 'blue' },
  'imagem': { name: 'Imagem & Design', icon: 'image', color: 'purple' },
  'codigo': { name: 'Código & Programação', icon: 'code-2', color: 'green' },
  'negocios': { name: 'Negócios & Marketing', icon: 'briefcase', color: 'orange' },
  'educacao': { name: 'Educação & Pesquisa', icon: 'graduation-cap', color: 'indigo' },
  'criatividade': { name: 'Criatividade & Arte', icon: 'palette', color: 'pink' },
  'produtividade': { name: 'Produtividade', icon: 'zap', color: 'yellow' },
  'web': { name: 'Web & Sites', icon: 'globe', color: 'cyan' },
  'comunicacao': { name: 'Comunicação', icon: 'message-circle', color: 'teal' },
  'analise': { name: 'Análise & Dados', icon: 'trending-up', color: 'red' }
};

export const AI_TOOLS: Record<string, AITool> = {
  // === TEXTO & REDAÇÃO (15 ferramentas) ===
  'resumidor': {
    name: 'Resumidor de Textos',
    icon: 'file-text',
    desc: 'Cria resumos concisos de textos longos',
    category: 'texto',
    inputLabel: 'Texto para resumir',
    placeholder: 'Cole o texto completo aqui...'
  },
  'humanizador': {
    name: 'Humanizador de Escrita',
    icon: 'sparkles',
    desc: 'Torna textos de IA mais naturais e fluidos',
    category: 'texto',
    inputLabel: 'Texto para humanizar',
    placeholder: 'Cole o texto gerado por IA aqui...'
  },
  'corretor': {
    name: 'Corretor Ortográfico',
    icon: 'spell-check-2',
    desc: 'Corrige erros de gramática e ortografia',
    category: 'texto',
    inputLabel: 'Texto para corrigir',
    placeholder: 'Cole o texto para revisão...'
  },
  'gerador_titulos': {
    name: 'Gerador de Títulos',
    icon: 'type',
    desc: 'Cria títulos criativos e otimizados',
    category: 'texto',
    inputLabel: 'Tema do conteúdo',
    placeholder: 'Ex: artigo sobre inteligência artificial'
  },
  'anti_plagio': {
    name: 'Refraseador Anti-Plágio',
    icon: 'shield',
    desc: 'Reescreve trechos para evitar plágio',
    category: 'texto',
    inputLabel: 'Texto para refrasear',
    placeholder: 'Cole o trecho original...'
  },
  'tradutor': {
    name: 'Tradutor Universal',
    icon: 'languages',
    desc: 'Traduz textos entre múltiplos idiomas',
    category: 'texto',
    hasLang: true,
    inputLabel: 'Texto para traduzir',
    placeholder: 'Cole o texto aqui...'
  },
  'roteirista': {
    name: 'Roteirista Criativo',
    icon: 'film',
    desc: 'Cria roteiros para vídeos e apresentações',
    category: 'texto',
    inputLabel: 'Tema do roteiro',
    placeholder: 'Ex: vídeo sobre sustentabilidade'
  },
  'copywriter': {
    name: 'Copywriter Persuasivo',
    icon: 'megaphone',
    desc: 'Escreve textos de vendas convincentes',
    category: 'texto',
    inputLabel: 'Produto/serviço',
    placeholder: 'Descreva o que você está vendendo...'
  },
  'poeta': {
    name: 'Poeta Digital',
    icon: 'feather',
    desc: 'Cria poemas em diversos estilos',
    category: 'texto',
    hasOptions: true,
    options: ['Soneto', 'Haicai', 'Verso Livre', 'Rap'],
    inputLabel: 'Tema do poema',
    placeholder: 'Ex: amor, natureza, tecnologia...'
  },
  'jornalista': {
    name: 'Jornalista Virtual',
    icon: 'newspaper',
    desc: 'Escreve notícias e artigos jornalísticos',
    category: 'texto',
    inputLabel: 'Fatos principais',
    placeholder: 'Descreva os fatos da notícia...'
  },
  'ghostwriter': {
    name: 'Ghostwriter de E-books',
    icon: 'book-open',
    desc: 'Escreve capítulos de livros digitais',
    category: 'texto',
    premium: true,
    inputLabel: 'Estrutura do capítulo',
    placeholder: 'Descreva o tema e estrutura do capítulo...'
  },
  'dialogo_criador': {
    name: 'Criador de Diálogos',
    icon: 'message-square',
    desc: 'Gera diálogos realistas para personagens',
    category: 'texto',
    inputLabel: 'Situação e personagens',
    placeholder: 'Descreva a cena e os personagens...'
  },
  'revisor_tecnico': {
    name: 'Revisor Técnico',
    icon: 'file-check',
    desc: 'Revisa textos técnicos e acadêmicos',
    category: 'texto',
    inputLabel: 'Texto técnico',
    placeholder: 'Cole o texto técnico ou acadêmico...'
  },
  'otimizador_seo': {
    name: 'Otimizador SEO',
    icon: 'search',
    desc: 'Otimiza textos para mecanismos de busca',
    category: 'texto',
    inputLabel: 'Conteúdo e palavra-chave',
    placeholder: 'Cole o texto e mencione a palavra-chave principal...'
  },
  'sinopse_criador': {
    name: 'Criador de Sinopses',
    icon: 'scroll',
    desc: 'Cria sinopses atrativas para livros e filmes',
    category: 'texto',
    inputLabel: 'História completa',
    placeholder: 'Descreva a história ou enredo...'
  },

  // === IMAGEM & DESIGN (12 ferramentas) ===
  'gerador_imagens': {
    name: 'Gerador de Imagens',
    icon: 'image',
    desc: 'Cria imagens a partir de descrições',
    category: 'imagem',
    premium: true,
    inputLabel: 'Descrição da imagem',
    placeholder: 'Descreva a imagem que deseja criar...'
  },
  'analisador_imagens': {
    name: 'Analisador de Imagens',
    icon: 'scan',
    desc: 'Analisa e descreve o conteúdo de imagens',
    category: 'imagem',
    inputLabel: 'Upload de imagem',
    placeholder: 'Faça upload da imagem para análise...'
  },
  'criador_logos': {
    name: 'Criador de Logos',
    icon: 'hexagon',
    desc: 'Gera conceitos e ideias para logos',
    category: 'imagem',
    inputLabel: 'Nome da empresa/marca',
    placeholder: 'Nome da empresa e estilo desejado...'
  },
  'paleta_cores': {
    name: 'Gerador de Paletas',
    icon: 'palette',
    desc: 'Cria paletas de cores harmoniosas',
    category: 'imagem',
    hasOptions: true,
    options: ['Monocromática', 'Complementar', 'Análoga', 'Triádica'],
    inputLabel: 'Cor base ou tema',
    placeholder: 'Ex: #FF5733 ou "oceano"'
  },
  'editor_visual': {
    name: 'Editor Visual',
    icon: 'edit',
    desc: 'Sugere edições e melhorias para imagens',
    category: 'imagem',
    inputLabel: 'Descrição da edição',
    placeholder: 'Descreva as mudanças que deseja fazer...'
  },
  'designer_ui': {
    name: 'Designer de Interface',
    icon: 'layout',
    desc: 'Cria wireframes e mockups de interfaces',
    category: 'imagem',
    hasOptions: true,
    options: ['Mobile App', 'Website', 'Dashboard', 'E-commerce'],
    inputLabel: 'Tipo de interface',
    placeholder: 'Descreva a funcionalidade da tela...'
  },
  'criador_infograficos': {
    name: 'Criador de Infográficos',
    icon: 'bar-chart',
    desc: 'Planeja infográficos informativos',
    category: 'imagem',
    inputLabel: 'Dados e informações',
    placeholder: 'Cole os dados que deseja visualizar...'
  },
  'icone_designer': {
    name: 'Designer de Ícones',
    icon: 'star',
    desc: 'Cria conceitos para ícones e símbolos',
    category: 'imagem',
    inputLabel: 'Conceito do ícone',
    placeholder: 'Ex: ícone para app de fitness...'
  },
  'compositor_visual': {
    name: 'Compositor Visual',
    icon: 'layers',
    desc: 'Planeja composições e layouts',
    category: 'imagem',
    inputLabel: 'Elementos da composição',
    placeholder: 'Descreva os elementos que devem compor a imagem...'
  },
  'restaurador_fotos': {
    name: 'Consultor de Restauração',
    icon: 'image-plus',
    desc: 'Orienta na restauração de fotos antigas',
    category: 'imagem',
    inputLabel: 'Problema da foto',
    placeholder: 'Descreva os danos ou problemas da foto...'
  },
  'criador_avatars': {
    name: 'Criador de Avatars',
    icon: 'user-circle',
    desc: 'Gera descrições para avatars únicos',
    category: 'imagem',
    inputLabel: 'Personalidade e estilo',
    placeholder: 'Descreva a personalidade e aparência...'
  },
  'consultor_branding': {
    name: 'Consultor de Branding',
    icon: 'award',
    desc: 'Desenvolve identidade visual de marcas',
    category: 'imagem',
    inputLabel: 'Sobre a marca',
    placeholder: 'Descreva a empresa, valores e público-alvo...'
  },

  // === CÓDIGO & PROGRAMAÇÃO (10 ferramentas) ===
  'explicador_codigo': {
    name: 'Explicador de Código',
    icon: 'code-2',
    desc: 'Explica o funcionamento de códigos',
    category: 'codigo',
    inputLabel: 'Código para explicar',
    placeholder: 'Cole o código que deseja entender...'
  },
  'gerador_codigo': {
    name: 'Gerador de Código',
    icon: 'terminal',
    desc: 'Gera código em diversas linguagens',
    category: 'codigo',
    hasOptions: true,
    options: ['JavaScript', 'Python', 'React', 'HTML/CSS', 'SQL'],
    inputLabel: 'Descrição da funcionalidade',
    placeholder: 'Descreva o que o código deve fazer...'
  },
  'revisor_codigo': {
    name: 'Revisor de Código',
    icon: 'search-code',
    desc: 'Revisa e otimiza códigos existentes',
    category: 'codigo',
    inputLabel: 'Código para revisar',
    placeholder: 'Cole o código que deseja revisar...'
  },
  'debugger_virtual': {
    name: 'Debugger Virtual',
    icon: 'bug',
    desc: 'Identifica e corrige bugs em código',
    category: 'codigo',
    inputLabel: 'Código com erro',
    placeholder: 'Cole o código com problema e descreva o erro...'
  },
  'documentador': {
    name: 'Documentador de Código',
    icon: 'file-text',
    desc: 'Gera documentação para códigos',
    category: 'codigo',
    inputLabel: 'Código para documentar',
    placeholder: 'Cole o código que precisa de documentação...'
  },
  'conversor_linguagens': {
    name: 'Conversor de Linguagens',
    icon: 'repeat',
    desc: 'Converte código entre linguagens',
    category: 'codigo',
    hasOptions: true,
    options: ['JS para Python', 'Python para JS', 'SQL para NoSQL', 'CSS para SCSS'],
    inputLabel: 'Código original',
    placeholder: 'Cole o código que deseja converter...'
  },
  'gerador_testes': {
    name: 'Gerador de Testes',
    icon: 'check-circle',
    desc: 'Cria testes unitários para funções',
    category: 'codigo',
    inputLabel: 'Função para testar',
    placeholder: 'Cole a função que precisa de testes...'
  },
  'arquiteto_api': {
    name: 'Arquiteto de API',
    icon: 'server',
    desc: 'Projeta estruturas de APIs REST',
    category: 'codigo',
    inputLabel: 'Requisitos da API',
    placeholder: 'Descreva os endpoints e funcionalidades...'
  },
  'otimizador_sql': {
    name: 'Otimizador SQL',
    icon: 'database',
    desc: 'Otimiza consultas de banco de dados',
    category: 'codigo',
    inputLabel: 'Query SQL',
    placeholder: 'Cole a consulta SQL que deseja otimizar...'
  },
  'gerador_regex': {
    name: 'Gerador de Regex',
    icon: 'hash',
    desc: 'Cria expressões regulares',
    category: 'codigo',
    inputLabel: 'Padrão desejado',
    placeholder: 'Descreva o padrão que deseja capturar...'
  },

  // === NEGÓCIOS & MARKETING (8 ferramentas) ===
  'analisador_sentimento': {
    name: 'Analisador de Sentimento',
    icon: 'heart',
    desc: 'Analisa sentimentos em textos e feedbacks',
    category: 'negocios',
    inputLabel: 'Texto para analisar',
    placeholder: 'Cole feedbacks ou comentários...'
  },
  'gerador_personas': {
    name: 'Gerador de Personas',
    icon: 'users',
    desc: 'Cria personas detalhadas de clientes',
    category: 'negocios',
    inputLabel: 'Produto/serviço',
    placeholder: 'Descreva seu produto ou serviço...'
  },
  'estrategista_precos': {
    name: 'Estrategista de Preços',
    icon: 'dollar-sign',
    desc: 'Sugere estratégias de precificação',
    category: 'negocios',
    inputLabel: 'Produto e mercado',
    placeholder: 'Descreva o produto, custos e concorrência...'
  },
  'plano_negocios': {
    name: 'Criador de Plano de Negócios',
    icon: 'clipboard',
    desc: 'Estrutura planos de negócios completos',
    category: 'negocios',
    premium: true,
    inputLabel: 'Ideia de negócio',
    placeholder: 'Descreva sua ideia de negócio...'
  },
  'analista_concorrencia': {
    name: 'Analista de Concorrência',
    icon: 'target',
    desc: 'Analisa concorrentes e mercado',
    category: 'negocios',
    inputLabel: 'Setor e concorrentes',
    placeholder: 'Descreva seu setor e principais concorrentes...'
  },
  'gerador_campanhas': {
    name: 'Gerador de Campanhas',
    icon: 'megaphone',
    desc: 'Cria campanhas de marketing digital',
    category: 'negocios',
    inputLabel: 'Objetivo da campanha',
    placeholder: 'Descreva o objetivo e público-alvo...'
  },
  'otimizador_linkedin': {
    name: 'Otimizador LinkedIn',
    icon: 'linkedin',
    desc: 'Otimiza perfis profissionais',
    category: 'negocios',
    inputLabel: 'Perfil atual',
    placeholder: 'Cole seu resumo profissional atual...'
  },
  'criador_pitch': {
    name: 'Criador de Pitch',
    icon: 'presentation',
    desc: 'Desenvolve apresentações de vendas',
    category: 'negocios',
    inputLabel: 'Produto/ideia',
    placeholder: 'Descreva o que está apresentando...'
  },

  // === EDUCAÇÃO & PESQUISA (7 ferramentas) ===
  'pesquisador': {
    name: 'Pesquisador de Livros',
    icon: 'book',
    desc: 'Sugere livros e artigos sobre temas',
    category: 'educacao',
    inputLabel: 'Tema de pesquisa',
    placeholder: 'Ex: inteligência artificial na educação'
  },
  'gerador_questoes': {
    name: 'Gerador de Questões',
    icon: 'help-circle',
    desc: 'Cria questões e exercícios',
    category: 'educacao',
    inputLabel: 'Conteúdo base',
    placeholder: 'Cole o conteúdo para gerar questões...'
  },
  'tutor_virtual': {
    name: 'Tutor Virtual',
    icon: 'graduation-cap',
    desc: 'Explica conceitos complexos de forma simples',
    category: 'educacao',
    inputLabel: 'Conceito para explicar',
    placeholder: 'Ex: mecânica quântica para iniciantes'
  },
  'planejador_aulas': {
    name: 'Planejador de Aulas',
    icon: 'calendar',
    desc: 'Cria planos de aula detalhados',
    category: 'educacao',
    inputLabel: 'Matéria e objetivo',
    placeholder: 'Ex: Matemática - Funções quadráticas'
  },
  'analisador_argumentos': {
    name: 'Analisador de Argumentos',
    icon: 'list-checks',
    desc: 'Avalia força e lógica de argumentos',
    category: 'educacao',
    inputLabel: 'Texto argumentativo',
    placeholder: 'Cole o argumento para análise...'
  },
  'criador_glossario': {
    name: 'Criador de Glossário',
    icon: 'book-marked',
    desc: 'Extrai e define termos técnicos',
    category: 'educacao',
    inputLabel: 'Texto técnico',
    placeholder: 'Cole o texto para extrair termos...'
  },
  'formatador_citacoes': {
    name: 'Formatador de Citações',
    icon: 'quote',
    desc: 'Formata referências ABNT/APA',
    category: 'educacao',
    hasStyle: true,
    inputLabel: 'Dados da publicação',
    placeholder: 'Autor, título, ano, editora...'
  },

  // === WEB & SITES (5 ferramentas) ===
  'construtor_sites': {
    name: 'Construtor de Sites',
    icon: 'globe',
    desc: 'Gera estruturas e códigos para sites',
    category: 'web',
    premium: true,
    hasOptions: true,
    options: ['Landing Page', 'Blog', 'E-commerce', 'Portfolio', 'Institucional'],
    inputLabel: 'Tipo e objetivo do site',
    placeholder: 'Descreva o tipo de site e suas funcionalidades...'
  },
  'otimizador_web': {
    name: 'Otimizador Web',
    icon: 'zap',
    desc: 'Sugere melhorias de performance',
    category: 'web',
    inputLabel: 'URL ou código',
    placeholder: 'Cole a URL do site ou código HTML/CSS...'
  },
  'gerador_meta_tags': {
    name: 'Gerador de Meta Tags',
    icon: 'tag',
    desc: 'Cria meta tags otimizadas para SEO',
    category: 'web',
    inputLabel: 'Página e conteúdo',
    placeholder: 'Descreva a página e conteúdo principal...'
  },
  'auditor_acessibilidade': {
    name: 'Auditor de Acessibilidade',
    icon: 'accessibility',
    desc: 'Analisa acessibilidade de sites',
    category: 'web',
    inputLabel: 'Código HTML/CSS',
    placeholder: 'Cole o código para análise de acessibilidade...'
  },
  'gerador_sitemap': {
    name: 'Gerador de Sitemap',
    icon: 'map',
    desc: 'Cria estruturas de navegação',
    category: 'web',
    inputLabel: 'Páginas do site',
    placeholder: 'Liste as páginas e seções do site...'
  },

  // === CRIATIVIDADE & ARTE (6 ferramentas) ===
  'brainstorm': {
    name: 'Assistente de Brainstorm',
    icon: 'lightbulb',
    desc: 'Gera ideias criativas para projetos',
    category: 'criatividade',
    inputLabel: 'Desafio ou projeto',
    placeholder: 'Descreva o desafio criativo...'
  },
  'contador_historias': {
    name: 'Contador de Histórias',
    icon: 'book-open',
    desc: 'Cria narrativas envolventes',
    category: 'criatividade',
    hasOptions: true,
    options: ['Ficção', 'Fantasia', 'Mistério', 'Romance', 'Aventura'],
    inputLabel: 'Tema ou elementos',
    placeholder: 'Elementos da história: personagens, ambiente...'
  },
  'compositor_musical': {
    name: 'Compositor Musical',
    icon: 'music',
    desc: 'Cria letras e progressões musicais',
    category: 'criatividade',
    hasOptions: true,
    options: ['Pop', 'Rock', 'Jazz', 'Clássica', 'Eletrônica'],
    inputLabel: 'Tema e estilo',
    placeholder: 'Tema da música e estilo desejado...'
  },
  'criador_personagens': {
    name: 'Criador de Personagens',
    icon: 'user-plus',
    desc: 'Desenvolve personagens para histórias',
    category: 'criatividade',
    inputLabel: 'Tipo de personagem',
    placeholder: 'Descreva o tipo de personagem e contexto...'
  },
  'idealizador_produtos': {
    name: 'Idealizador de Produtos',
    icon: 'lightbulb',
    desc: 'Gera ideias inovadoras de produtos',
    category: 'criatividade',
    inputLabel: 'Problema ou necessidade',
    placeholder: 'Que problema precisa ser resolvido?'
  },
  'critico_arte': {
    name: 'Crítico de Arte',
    icon: 'eye',
    desc: 'Analisa obras artísticas e criativas',
    category: 'criatividade',
    inputLabel: 'Descrição da obra',
    placeholder: 'Descreva a obra de arte ou criação...'
  },

  // === PRODUTIVIDADE (4 ferramentas) ===
  'planejador_viagens': {
    name: 'Planejador de Viagens',
    icon: 'map-pin',
    desc: 'Cria roteiros de viagem personalizados',
    category: 'produtividade',
    inputLabel: 'Destino e duração',
    placeholder: 'Ex: Paris, 5 dias, orçamento médio'
  },
  'chef_digital': {
    name: 'Chef Digital',
    icon: 'chef-hat',
    desc: 'Sugere receitas com ingredientes disponíveis',
    category: 'produtividade',
    inputLabel: 'Ingredientes disponíveis',
    placeholder: 'Liste os ingredientes que você tem...'
  },
  'organizador_tarefas': {
    name: 'Organizador de Tarefas',
    icon: 'check-square',
    desc: 'Organiza e prioriza listas de tarefas',
    category: 'produtividade',
    inputLabel: 'Lista de tarefas',
    placeholder: 'Liste suas tarefas e prazos...'
  },
  'calculadora_tempo': {
    name: 'Calculadora de Tempo',
    icon: 'clock',
    desc: 'Estima tempo necessário para projetos',
    category: 'produtividade',
    inputLabel: 'Projeto e atividades',
    placeholder: 'Descreva o projeto e suas etapas...'
  },

  // === COMUNICAÇÃO (3 ferramentas) ===
  'assistente_emails': {
    name: 'Assistente de E-mails',
    icon: 'mail',
    desc: 'Redige e-mails profissionais eficazes',
    category: 'comunicacao',
    hasOptions: true,
    options: ['Formal', 'Casual', 'Vendas', 'Suporte', 'Follow-up'],
    inputLabel: 'Propósito do e-mail',
    placeholder: 'Descreva o objetivo e contexto do e-mail...'
  },
  'mediador_conflitos': {
    name: 'Mediador de Conflitos',
    icon: 'handshake',
    desc: 'Ajuda a resolver conflitos de comunicação',
    category: 'comunicacao',
    inputLabel: 'Situação do conflito',
    placeholder: 'Descreva a situação e as partes envolvidas...'
  },
  'apresentador_virtual': {
    name: 'Apresentador Virtual',
    icon: 'presentation',
    desc: 'Cria scripts para apresentações',
    category: 'comunicacao',
    inputLabel: 'Tema da apresentação',
    placeholder: 'Descreva o tema e público-alvo...'
  }
};

// Helper functions
export const getToolsByCategory = (category: string): Record<string, AITool> => {
  return Object.entries(AI_TOOLS)
    .filter(([_, tool]) => tool.category === category)
    .reduce((acc, [key, tool]) => ({ ...acc, [key]: tool }), {});
};

export const getAllCategories = () => {
  return Object.keys(AI_TOOL_CATEGORIES);
};

export const getCategoryInfo = (category: string) => {
  return AI_TOOL_CATEGORIES[category];
};

export const searchTools = (query: string): Record<string, AITool> => {
  const lowercaseQuery = query.toLowerCase();
  return Object.entries(AI_TOOLS)
    .filter(([_, tool]) => 
      tool.name.toLowerCase().includes(lowercaseQuery) ||
      tool.desc.toLowerCase().includes(lowercaseQuery)
    )
    .reduce((acc, [key, tool]) => ({ ...acc, [key]: tool }), {});
};