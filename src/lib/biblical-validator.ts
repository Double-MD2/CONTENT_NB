/**
 * Validador de conteúdo bíblico/religioso
 * Verifica se a mensagem está dentro do escopo permitido
 */

// Lista completa dos livros da Bíblia em PT-BR
const BIBLICAL_BOOKS = [
  // Antigo Testamento
  'gênesis', 'genesis', 'êxodo', 'exodo', 'levítico', 'levitico', 'números', 'numeros',
  'deuteronômio', 'deuteronomio', 'josué', 'josue', 'juízes', 'juizes', 'rute',
  'samuel', '1 samuel', '2 samuel', 'reis', '1 reis', '2 reis',
  'crônicas', 'cronicas', '1 crônicas', '1 cronicas', '2 crônicas', '2 cronicas',
  'esdras', 'neemias', 'ester', 'jó', 'jo', 'salmos', 'salmo', 'provérbios', 'proverbios',
  'eclesiastes', 'cantares', 'cântico', 'cantico', 'isaías', 'isaias', 'jeremias',
  'lamentações', 'lamentacoes', 'ezequiel', 'daniel', 'oséias', 'oseias', 'joel',
  'amós', 'amos', 'obadias', 'jonas', 'miquéias', 'miqueias', 'naum', 'habacuque',
  'sofonias', 'ageu', 'zacarias', 'malaquias',
  // Livros Deuterocanônicos
  'tobias', 'judite', 'macabeus', '1 macabeus', '2 macabeus', 'sabedoria', 'eclesiástico', 'eclesiastico',
  'baruque', 'baruc',
  // Novo Testamento
  'mateus', 'marcos', 'lucas', 'joão', 'joao', 'atos', 'romanos', 'coríntios', 'corintios',
  '1 coríntios', '1 corintios', '2 coríntios', '2 corintios', 'gálatas', 'galatas',
  'efésios', 'efesios', 'filipenses', 'colossenses', 'tessalonicenses',
  '1 tessalonicenses', '2 tessalonicenses', 'timóteo', 'timoteo', '1 timóteo', '1 timoteo',
  '2 timóteo', '2 timoteo', 'tito', 'filemom', 'hebreus', 'tiago', 'pedro',
  '1 pedro', '2 pedro', '1 joão', '1 joao', '2 joão', '2 joao', '3 joão', '3 joao',
  'judas', 'apocalipse', 'revelação', 'revelacao'
];

// Termos religiosos comuns
const RELIGIOUS_TERMS = [
  'deus', 'jesus', 'cristo', 'espírito santo', 'espirito santo', 'bíblia', 'biblia',
  'oração', 'oracao', 'fé', 'fe', 'pecado', 'graça', 'graca', 'salvação', 'salvacao',
  'perdão', 'perdao', 'evangelho', 'igreja', 'batismo', 'ceia', 'eucaristia',
  'sacramento', 'sacramentos', 'profeta', 'apóstolo', 'apostolo', 'discípulo', 'discipulo',
  'ressurreição', 'ressurreicao', 'cruz', 'crucificação', 'crucificacao', 'redenção', 'redencao',
  'santidade', 'santo', 'santa', 'anjo', 'demônio', 'demonio', 'satanás', 'satanas',
  'céu', 'ceu', 'inferno', 'paraíso', 'paraiso', 'eternidade', 'vida eterna',
  'mandamento', 'lei', 'aliança', 'alianca', 'testamento', 'promessa', 'milagre',
  'adoração', 'adoracao', 'louvor', 'culto', 'liturgia', 'missa', 'sermão', 'sermao',
  'pregação', 'pregacao', 'testemunho', 'conversão', 'conversao', 'arrependimento',
  'confissão', 'confissao', 'jejum', 'vigília', 'vigilia', 'intercessão', 'intercessao',
  'bênção', 'bencao', 'unção', 'uncao', 'revelação', 'revelacao', 'profecia',
  'messias', 'senhor', 'pai', 'filho', 'trindade', 'divindade', 'encarnação', 'encarnacao',
  'ascensão', 'ascencao', 'pentecostes', 'natal', 'páscoa', 'pascoa', 'quaresma',
  'advento', 'cristão', 'cristao', 'cristianismo', 'católico', 'catolico', 'protestante',
  'evangélico', 'evangelico', 'ortodoxo', 'denominação', 'denominacao', 'teologia',
  'doutrina', 'dogma', 'heresia', 'cisma', 'reforma', 'concílio', 'concilio',
  'papa', 'bispo', 'padre', 'pastor', 'diácono', 'diacono', 'presbítero', 'presbitero',
  'ministério', 'ministerio', 'vocação', 'vocacao', 'chamado', 'missão', 'missao',
  'evangelização', 'evangelizacao', 'discipulado', 'comunhão', 'comunhao', 'fraternidade',
  'caridade', 'amor', 'esperança', 'esperanca', 'justiça', 'justica', 'misericórdia', 'misericordia',
  'compaixão', 'compaixao', 'humildade', 'obediência', 'obediencia', 'santificação', 'santificacao',
  'consagração', 'consagracao', 'devoção', 'devocao', 'espiritualidade', 'meditação', 'meditacao',
  'contemplação', 'contemplacao', 'retiro', 'peregrinação', 'peregrinacao', 'romaria',
  'relíquia', 'reliquia', 'imagem', 'ícone', 'icone', 'altar', 'templo', 'santuário', 'santuario',
  'tabernáculo', 'tabernaculo', 'arca', 'aliança', 'alianca', 'tábua', 'tabua', 'mandamentos'
];

// Padrão de referência bíblica (ex: João 3:16, 1 Coríntios 13:4-7)
const BIBLE_REFERENCE_PATTERN = /\b(\d\s)?[a-záàâãéêíóôõúç]+\s+\d+:\d+(-\d+)?\b/i;

/**
 * Verifica se a mensagem contém conteúdo bíblico/religioso
 */
export function isBiblicalContent(message: string): boolean {
  const normalizedMessage = message.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  
  // Verifica referências bíblicas (ex: João 3:16)
  if (BIBLE_REFERENCE_PATTERN.test(message)) {
    return true;
  }
  
  // Verifica livros da Bíblia
  for (const book of BIBLICAL_BOOKS) {
    if (normalizedMessage.includes(book)) {
      return true;
    }
  }
  
  // Verifica termos religiosos
  for (const term of RELIGIOUS_TERMS) {
    if (normalizedMessage.includes(term)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Verifica se a mensagem contém conteúdo inapropriado
 */
export function hasInappropriateContent(message: string): boolean {
  const normalizedMessage = message.toLowerCase();
  
  // Lista de termos proibidos (ódio, sexual explícito, insultos)
  const inappropriateTerms = [
    'ódio', 'odio', 'matar', 'morte', 'violência', 'violencia', 'sexo', 'sexual',
    'pornografia', 'pornografico', 'nudez', 'estupro', 'abuso', 'drogas', 'droga',
    'idiota', 'burro', 'estúpido', 'estupido', 'imbecil', 'cretino', 'merda',
    'porra', 'caralho', 'puta', 'viado', 'gay' // contexto ofensivo
  ];
  
  // Verifica termos médicos/legais/financeiros que devem ser recusados
  const restrictedAdvice = [
    'diagnóstico', 'diagnostico', 'doença', 'doenca', 'tratamento', 'remédio', 'remedio',
    'medicamento', 'cirurgia', 'sintoma', 'processo', 'advogado', 'tribunal', 'ação judicial',
    'investimento', 'ações', 'acoes', 'bolsa de valores', 'empréstimo', 'emprestimo',
    'financiamento', 'dívida', 'divida', 'imposto'
  ];
  
  for (const term of [...inappropriateTerms, ...restrictedAdvice]) {
    if (normalizedMessage.includes(term)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Mensagem padrão de recusa para conteúdo fora do escopo
 */
export const OUT_OF_SCOPE_MESSAGE = 'Posso ajudar apenas com conteúdos bíblicos e religiosos. Quer reformular sua pergunta?';

/**
 * Mensagem padrão de recusa para conteúdo inapropriado
 */
export const INAPPROPRIATE_CONTENT_MESSAGE = 'Desculpe, não posso responder a esse tipo de conteúdo. Estou aqui para ajudar com questões bíblicas e religiosas de forma respeitosa.';
