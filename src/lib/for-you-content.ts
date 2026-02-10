export interface ForYouContent {
  id: string;
  themeId: string;
  day: number; // Dia do ano (1-365) para rotação
  bibleText: {
    reference: string;
    text: string;
  };
  reflection: string;
  prayer: string;
  action: string;
}

// Banco de conteúdos - 30 conteúdos por tema (suficiente para 1 mês de rotação)
export const FOR_YOU_CONTENTS: ForYouContent[] = [
  // LUTO E PERDA
  {
    id: 'luto-1',
    themeId: 'luto-perda',
    day: 1,
    bibleText: {
      reference: 'Salmos 34:18',
      text: 'O Senhor está perto dos que têm o coração quebrantado e salva os de espírito abatido.',
    },
    reflection:
      'A dor da perda pode parecer insuportável, mas você não está sozinho. Deus está mais perto de você agora do que nunca. Ele vê suas lágrimas e conhece cada detalhe da sua dor. Permita-se sentir, chorar e descansar na presença Dele.',
    prayer:
      'Senhor, meu coração está partido e não sei como seguir em frente. Venha perto de mim neste momento de dor. Cura minhas feridas e me dá forças para cada dia. Amém.',
    action: 'Reserve 5 minutos para escrever uma carta para Deus compartilhando sua dor.',
  },
  {
    id: 'luto-2',
    themeId: 'luto-perda',
    day: 2,
    bibleText: {
      reference: 'Apocalipse 21:4',
      text: 'Ele enxugará dos olhos deles toda lágrima. Não haverá mais morte, nem tristeza, nem choro, nem dor.',
    },
    reflection:
      'Embora a dor seja real agora, há esperança de um futuro sem lágrimas. Deus promete restauração completa. Esta não é a palavra final - há vida após a perda.',
    prayer:
      'Pai, me ajude a enxergar além desta dor. Me dê esperança para continuar e fé para acreditar que dias melhores virão. Amém.',
    action: 'Identifique uma pequena fonte de esperança hoje, por menor que seja.',
  },

  // ANSIEDADE E MEDO
  {
    id: 'ansiedade-1',
    themeId: 'ansiedade-medo',
    day: 1,
    bibleText: {
      reference: 'Filipenses 4:6-7',
      text: 'Não andem ansiosos por coisa alguma, mas em tudo, pela oração e súplicas, e com ação de graças, apresentem seus pedidos a Deus.',
    },
    reflection:
      'A ansiedade tenta roubar sua paz, mas Deus oferece um caminho diferente. Em vez de carregar tudo sozinho, você pode entregar cada preocupação a Ele através da oração. Sua paz vai além do que conseguimos entender.',
    prayer:
      'Senhor, entrego a Ti minhas preocupações. Troco minha ansiedade pela Tua paz. Ajuda-me a confiar em Ti momento a momento. Amém.',
    action: 'Escreva 3 preocupações em um papel e faça uma oração entregando cada uma a Deus.',
  },
  {
    id: 'ansiedade-2',
    themeId: 'ansiedade-medo',
    day: 2,
    bibleText: {
      reference: 'Isaías 41:10',
      text: 'Não tema, pois estou com você; não tenha medo, pois sou o seu Deus.',
    },
    reflection:
      'O medo grita alto, mas a voz de Deus é mais forte. Ele não apenas pede para você não temer - Ele dá o motivo: Ele está com você. Você não precisa ser forte sozinho.',
    prayer:
      'Deus, quando o medo me dominar, me lembre que Tu estás comigo. Que eu sinta Tua presença real e constante. Amém.',
    action: 'Quando sentir medo hoje, respire fundo 3 vezes e diga: "Deus está comigo".',
  },

  // FORTALECIMENTO DA FÉ
  {
    id: 'fe-1',
    themeId: 'fortalecimento-fe',
    day: 1,
    bibleText: {
      reference: 'Hebreus 11:1',
      text: 'Ora, a fé é a certeza daquilo que esperamos e a prova das coisas que não vemos.',
    },
    reflection:
      'A fé não é a ausência de dúvidas, mas a decisão de confiar mesmo quando não vemos. Como um músculo, ela cresce com o exercício. Cada pequeno passo de confiança fortalece sua jornada espiritual.',
    prayer:
      'Senhor, aumenta minha fé. Ajuda-me a confiar em Ti mesmo quando não entendo Teus caminhos. Que minha fé cresça a cada dia. Amém.',
    action: 'Dê um pequeno passo de fé hoje: ore por algo que parece impossível.',
  },
  {
    id: 'fe-2',
    themeId: 'fortalecimento-fe',
    day: 2,
    bibleText: {
      reference: 'Romanos 10:17',
      text: 'A fé vem por ouvir a mensagem, e a mensagem é ouvida mediante a palavra de Cristo.',
    },
    reflection:
      'Sua fé se fortalece quando você se alimenta da Palavra de Deus. Não é mágica, é relacionamento. Quanto mais você conhece Deus através da Bíblia, mais forte fica sua confiança Nele.',
    prayer:
      'Pai, dá-me fome pela Tua Palavra. Que ao ler a Bíblia, meu coração se fortaleça e minha fé aumente. Amém.',
    action: 'Leia um Salmo hoje e sublinhe ou anote um versículo que fortalece sua fé.',
  },

  // GRATIDÃO E ALEGRIA
  {
    id: 'gratidao-1',
    themeId: 'gratidao-alegria',
    day: 1,
    bibleText: {
      reference: '1 Tessalonicenses 5:18',
      text: 'Deem graças em todas as circunstâncias, pois esta é a vontade de Deus para vocês em Cristo Jesus.',
    },
    reflection:
      'A gratidão transforma sua perspectiva. Mesmo nos dias difíceis, há motivos para agradecer. Quando você escolhe ver as bênçãos, a alegria se torna possível mesmo em meio aos desafios.',
    prayer:
      'Obrigado, Senhor, pelas bênçãos que muitas vezes passo despercebido. Abre meus olhos para ver Tua bondade a cada dia. Amém.',
    action: 'Anote 5 coisas pelas quais você é grato hoje, mesmo que sejam pequenas.',
  },

  // FINANCEIRO E TRABALHO
  {
    id: 'financeiro-1',
    themeId: 'financeiro-trabalho',
    day: 1,
    bibleText: {
      reference: 'Mateus 6:33',
      text: 'Busquem, pois, em primeiro lugar o Reino de Deus e a sua justiça, e todas essas coisas serão acrescentadas a vocês.',
    },
    reflection:
      'Suas necessidades financeiras são reais e importantes para Deus. Ele se importa com sua provisão. Quando você coloca Deus em primeiro lugar, Ele cuida do resto. Confie Nele também nesta área.',
    prayer:
      'Senhor, confio que Tu supres todas as minhas necessidades. Dá-me sabedoria nas finanças e provisão abundante. Amém.',
    action: 'Faça uma lista de suas necessidades financeiras e ore por cada uma especificamente.',
  },

  // RELACIONAMENTOS E FAMÍLIA
  {
    id: 'relacionamentos-1',
    themeId: 'relacionamentos-familia',
    day: 1,
    bibleText: {
      reference: '1 Coríntios 13:4-5',
      text: 'O amor é paciente, o amor é bondoso. Não inveja, não se vangloria, não se orgulha. Não maltrata, não procura seus interesses.',
    },
    reflection:
      'Relacionamentos saudáveis exigem amor intencional. O amor verdadeiro é uma escolha diária de servir, perdoar e valorizar o outro. Deus é a fonte desse amor que transforma relacionamentos.',
    prayer:
      'Pai, ensina-me a amar como Tu amas. Cura os relacionamentos quebrados e fortalece os laços familiares. Amém.',
    action: 'Escolha uma pessoa da sua família e faça algo gentil e inesperado por ela hoje.',
  },

  // PERDÃO E CURA INTERIOR
  {
    id: 'perdao-1',
    themeId: 'perdao-cura',
    day: 1,
    bibleText: {
      reference: 'Efésios 4:32',
      text: 'Sejam bondosos e compassivos uns para com os outros, perdoando-se mutuamente, assim como Deus os perdoou em Cristo.',
    },
    reflection:
      'O perdão liberta você antes de libertar o outro. Não é sobre esquecer ou aceitar o que foi feito, mas sobre escolher não carregar mais o peso da mágoa. Deus já te perdoou completamente - você pode fazer o mesmo.',
    prayer:
      'Senhor, me ajude a perdoar como Tu me perdoaste. Liberta meu coração da amargura e me dá paz interior. Amém.',
    action: 'Identifique uma pessoa que você precisa perdoar e ore por ela hoje.',
  },

  // DECISÕES DIFÍCEIS
  {
    id: 'decisoes-1',
    themeId: 'decisoes-dificeis',
    day: 1,
    bibleText: {
      reference: 'Provérbios 3:5-6',
      text: 'Confie no Senhor de todo o seu coração e não se apoie em seu próprio entendimento; reconheça o Senhor em todos os seus caminhos, e ele endireitará as suas veredas.',
    },
    reflection:
      'Decisões difíceis geram ansiedade porque dependemos do nosso entendimento limitado. Mas Deus vê todo o quadro. Quando você O busca primeiro, Ele promete direção clara. Confie Nele mais do que na sua própria sabedoria.',
    prayer:
      'Pai, preciso de direção. Mostra-me o caminho certo e me dá paz para seguir Tua vontade. Amém.',
    action: 'Reserve 10 minutos em silêncio para ouvir a Deus sobre a decisão que você enfrenta.',
  },

  // PROPÓSITO E VOCAÇÃO
  {
    id: 'proposito-1',
    themeId: 'proposito-vocacao',
    day: 1,
    bibleText: {
      reference: 'Jeremias 29:11',
      text: 'Porque sou eu que conheço os planos que tenho para vocês, diz o Senhor, planos de fazê-los prosperar e não de causar dano, planos de dar a vocês esperança e um futuro.',
    },
    reflection:
      'Sua vida tem propósito. Não é por acaso que você está aqui. Deus tem planos específicos para você - planos bons, cheios de esperança. Seu chamado se revela quando você caminha com Ele.',
    prayer:
      'Senhor, revela Teu propósito para minha vida. Mostra-me como posso usar meus dons para Tua glória. Amém.',
    action: 'Liste 3 talentos ou habilidades que você tem e pergunte a Deus como usá-los para Ele.',
  },

  // PAZ INTERIOR E DESCANSO
  {
    id: 'paz-1',
    themeId: 'paz-interior',
    day: 1,
    bibleText: {
      reference: 'Mateus 11:28',
      text: 'Venham a mim, todos os que estão cansados e sobrecarregados, e eu lhes darei descanso.',
    },
    reflection:
      'Você não foi criado para carregar tudo sozinho. O convite de Jesus é real: venha, descanse, respire. Paz interior não vem de circunstâncias perfeitas, mas de estar na presença Dele.',
    prayer:
      'Jesus, estou cansado. Venho a Ti buscando descanso verdadeiro. Renova minhas forças e me dá Tua paz. Amém.',
    action: 'Encontre um lugar tranquilo e passe 5 minutos em silêncio, apenas respirando e descansando na presença de Deus.',
  },
];

// Função para buscar conteúdo do dia baseado no tema
export const getForYouDailyContent = (themeId: string): ForYouContent | null => {
  // Calcular dia do ano (1-365)
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  // Filtrar conteúdos do tema
  const themeContents = FOR_YOU_CONTENTS.filter((c) => c.themeId === themeId);

  if (themeContents.length === 0) return null;

  // Usar módulo para rotacionar o conteúdo
  const index = dayOfYear % themeContents.length;
  return themeContents[index];
};
