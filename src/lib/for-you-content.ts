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
      'A dor da perda é uma das experiências mais profundas e transformadoras que podemos enfrentar. Ela nos tira do chão, nos deixa vulneráveis e nos faz questionar tudo o que acreditávamos ser sólido. Neste momento, é importante saber que você não está sozinho - nem por um segundo. Deus não está distante observando sua dor de longe. Ele está mais perto de você agora do que em qualquer outro momento da sua vida. Ele vê cada lágrima que escorre pelo seu rosto, conhece cada suspiro profundo no meio da noite, e entende cada palavra que você não consegue pronunciar. O salmista nos lembra que Deus tem uma proximidade especial com aqueles que têm o coração partido. Não é fraqueza sentir essa dor - é humanidade. Não é falta de fé chorar - é honestidade. Jesus mesmo chorou diante da morte de seu amigo Lázaro. Permita-se passar por cada fase do luto sem culpa. Deus está caminhando com você através deste vale escuro, e Ele promete que não durará para sempre.',
    prayer:
      'Senhor, meu coração está dilacerado e não consigo encontrar palavras para expressar a dor que sinto. O vazio é tão grande que às vezes parece impossível continuar. Venha perto de mim neste momento de escuridão. Segura minha mão quando eu não tiver forças para dar mais um passo. Cura as feridas mais profundas do meu coração, aquelas que ninguém vê, mas que Tu conheces intimamente. Me dá forças não apenas para sobreviver, mas para, um dia, voltar a viver plenamente. Sei que o tempo de luto é necessário, mas também creio que Tu podes me sustentar em cada momento dele. Que eu possa sentir Tua presença real nesta dor, e que ela não me destrua, mas me transforme. Em nome de Jesus, que também conheceu a dor e a perda, amém.',
    action: 'Reserve 10 minutos em um lugar tranquilo para escrever uma carta sincera para Deus, compartilhando tudo o que está sentindo - sem filtros, sem medo de ser honesto demais. Deus pode lidar com sua dor.',
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
      'No meio da tempestade da perda, é difícil enxergar além das nuvens escuras. A dor do presente parece eterna, e a esperança parece um conceito distante e irreal. Mas a Palavra de Deus nos oferece uma visão do futuro que transcende nossa dor atual: um dia em que toda lágrima será enxugada, onde a morte não terá mais poder, e onde a dor será apenas uma memória distante. Esta promessa não diminui a legitimidade da sua dor agora - ela oferece um horizonte de esperança. A morte e a perda não têm a palavra final na história da sua vida. Deus promete restauração completa, não apenas superficial. Ele não está dizendo "supere isso rapidamente" - Ele está dizendo "Eu vou caminhar com você através disso, e do outro lado há cura, restauração e vida abundante". Enquanto você caminha por este vale, segure-se nesta promessa: esta não é a palavra final. Há vida após a perda. Há alegria após a tristeza. Há esperança após o desespero. E Deus está comprometido em levar você até lá.',
    prayer:
      'Pai celestial, neste momento é difícil enxergar além da dor que me consome. As promessas de esperança parecem distantes quando a perda é tão presente. Me ajude a levantar meus olhos acima das circunstâncias atuais e vislumbrar o futuro que Tu tens preparado para mim. Não peço que a dor desapareça imediatamente, pois sei que o luto tem seu tempo. Mas peço por pequenos vislumbres de esperança, momentos em que eu possa respirar um pouco mais fundo e acreditar que dias melhores virão. Fortalece minha fé para crer que a restauração é possível, mesmo quando parece impossível. Que eu possa honrar minha perda enquanto simultaneamente me abro para a cura que vem de Ti. Obrigado porque Tu és um Deus que enxuga lágrimas e restaura vidas. Amém.',
    action: 'Identifique uma pequena fonte de esperança hoje - pode ser o sorriso de uma criança, o nascer do sol, ou um gesto gentil de alguém. Anote e agradeça a Deus por essa pequena luz no meio da escuridão.',
  },

  // ANSIEDADE E MEDO
  {
    id: 'ansiedade-1',
    themeId: 'ansiedade-medo',
    day: 1,
    bibleText: {
      reference: 'Filipenses 4:6-7',
      text: 'Não andem ansiosos por coisa alguma, mas em tudo, pela oração e súplicas, e com ação de graças, apresentem seus pedidos a Deus. E a paz de Deus, que excede todo o entendimento, guardará o coração e a mente de vocês em Cristo Jesus.',
    },
    reflection:
      'A ansiedade é como uma tempestade interna que não nos deixa descansar. Ela rouba nossa paz, distorce nossa perspectiva e nos mantém presos em ciclos de preocupação que parecem intermináveis. Muitas vezes, tentamos combater a ansiedade com mais controle, mais planejamento, mais esforço próprio - mas isso só alimenta o ciclo. Deus oferece um caminho radicalmente diferente: entrega. Não se trata de ignorar problemas ou fingir que está tudo bem, mas de reconhecer que há um limite para o que você pode controlar, e que existe Alguém maior que você, que se importa profundamente com suas preocupações. A instrução de Paulo não é apenas "pare de se preocupar" - seria impossível. É "em vez de se preocupar, ore". Transforme cada pensamento ansioso em uma conversa com Deus. Cada preocupação pode se tornar um pedido de oração. E quando você faz isso, algo sobrenatural acontece: a paz de Deus, que transcende toda lógica humana, começa a guardar seu coração e sua mente. Esta paz não depende das suas circunstâncias mudarem - ela vem da presença de Deus habitando em você.',
    prayer:
      'Senhor, confesso que tenho carregado ansiedades que são pesadas demais para mim. Preocupações sobre o futuro, medos sobre o que pode acontecer, pensamentos que não me deixam descansar. Neste momento, conscientemente entrego cada uma dessas preocupações a Ti. Não porque são insignificantes, mas porque são importantes demais para eu carregar sozinho. Troco minha ansiedade pela Tua paz - aquela paz que o mundo não pode dar nem tirar. Ajuda-me a confiar em Ti não apenas em teoria, mas momento a momento, respiração por respiração. Quando a ansiedade tentar me dominar novamente, me lembre de voltar a Ti em oração. Guarda meu coração e minha mente em Cristo Jesus. Que eu possa experimentar Tua paz que excede todo entendimento. Amém.',
    action: 'Pegue um papel e escreva 3 preocupações específicas que estão causando ansiedade. Para cada uma, escreva uma oração sincera entregando aquela preocupação a Deus. Depois, dobre ou rasgue o papel como um ato simbólico de entrega.',
  },
  {
    id: 'ansiedade-2',
    themeId: 'ansiedade-medo',
    day: 2,
    bibleText: {
      reference: 'Isaías 41:10',
      text: 'Não tema, pois estou com você; não tenha medo, pois sou o seu Deus. Eu o fortalecerei e o ajudarei; eu o segurarei com a minha mão direita vitoriosa.',
    },
    reflection:
      'O medo é uma das emoções mais primitivas e poderosas que experimentamos. Ele pode paralisar, distorcer nossa percepção da realidade e nos fazer sentir completamente isolados. Mas note que Deus não minimiza o medo - Ele não diz "não há nada para temer". Em vez disso, Ele apresenta uma realidade maior: "Não tema, porque EU ESTOU COM VOCÊ". A presença de Deus é a resposta para o medo, não a ausência de coisas assustadoras. O mundo está cheio de incertezas e situações que podem nos assustar, mas nenhuma delas muda o fato de que Deus está com você. Mais do que isso - Ele não é apenas um observador passivo. Ele promete fortalecer você, ajudar você, e segurar você com Sua mão. Você não precisa ser forte o suficiente sozinho, porque a força de Deus está disponível para você. Quando o medo gritar, deixe a voz de Deus gritar mais alto: "Eu sou o seu Deus. Você não está sozinho. Eu não vou deixar você cair."',
    prayer:
      'Deus, o medo tem sido meu companheiro constante, e estou cansado de viver sob sua sombra. Quando o medo me dominar - e sei que isso acontecerá - me lembre de que Tu estás comigo. Não apenas perto, mas COMIGO. Que eu possa sentir Tua presença real e tangível, não apenas como um conceito teológico, mas como uma realidade que transforma meu dia a dia. Fortalece-me quando eu me sentir fraco. Ajuda-me quando eu me sentir incapaz. Segura-me quando eu sentir que vou cair. Tu és meu Deus, e isso significa que tenho acesso à Tua força ilimitada. Que o medo perca seu poder sobre mim à medida que eu me aprofundo na certeza da Tua presença constante. Amém.',
    action: 'Quando sentir medo hoje, pratique a respiração 4-7-8: inspire por 4 segundos, segure por 7, expire por 8. A cada ciclo, repita em voz alta ou mentalmente: "Deus está comigo. Eu não estou sozinho. Ele me fortalece."',
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
      'Vivemos em um mundo que valoriza provas, evidências e certezas visíveis. A fé parece quase contraproducente - crer no que não se vê? Confiar sem garantias? Mas a fé bíblica não é cega ou irracional. Ela é uma certeza profunda baseada no caráter de Deus, não nas circunstâncias ao nosso redor. É importante entender que fé não é a ausência de dúvidas - até os discípulos mais próximos de Jesus tiveram momentos de dúvida. Fé é a escolha deliberada de confiar em Deus mesmo quando as dúvidas surgem, mesmo quando não conseguimos ver o caminho completo à frente. Como um músculo que cresce com exercício, sua fé se fortalece cada vez que você escolhe confiar, cada vez que você dá um passo em direção a Deus apesar da incerteza. Não espere ter fé perfeita para começar a caminhar - comece a caminhar e sua fé crescerá no processo. Cada pequena escolha de confiança hoje constrói um alicerce mais forte para os desafios de amanhã.',
    prayer:
      'Senhor, confesso que muitas vezes minha fé se sente pequena e frágil. Eu queria ter a fé que move montanhas, mas às vezes sinto que mal tenho fé para passar pelo dia. Aumenta minha fé, não de uma só vez, mas passo a passo, dia após dia. Ajuda-me a confiar em Ti mesmo quando não entendo Teus caminhos, mesmo quando Tuas respostas são diferentes do que eu esperava, mesmo quando o silêncio parece longo demais. Que minha fé não se baseie em circunstâncias favoráveis, mas no Teu caráter imutável. Dá-me coragem para dar passos de fé mesmo quando tenho medo. Que minha fé cresça não apenas em conhecimento, mas em experiência real da Tua fidelidade. Amém.',
    action: 'Identifique uma área da sua vida onde você precisa exercitar fé hoje. Dê um pequeno passo de confiança - pode ser orar por algo que parece impossível, ter uma conversa difícil confiando que Deus está com você, ou simplesmente escolher acreditar que Deus é bom apesar das circunstâncias.',
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
      reference: 'Mateus 11:28-30',
      text: 'Venham a mim, todos os que estão cansados e sobrecarregados, e eu lhes darei descanso. Tomem sobre vocês o meu jugo e aprendam de mim, pois sou manso e humilde de coração, e vocês encontrarão descanso para as suas almas. Pois o meu jugo é suave e o meu fardo é leve.',
    },
    reflection:
      'Nossa cultura glorifica a agitação constante. Produtividade é virtude, descanso é preguiça. Estamos sempre conectados, sempre disponíveis, sempre fazendo algo. E no meio disso tudo, nossa alma grita por paz, por silêncio, por descanso verdadeiro. Mas paz interior não é algo que você alcança através de mais esforço - é algo que você recebe através da rendição. Jesus não oferece técnicas de relaxamento ou estratégias de gerenciamento de estresse. Ele oferece a Si mesmo. "Venham a MIM", Ele diz. Não venham a um lugar tranquilo (embora isso ajude). Não venham a uma prática espiritual (embora isso seja valioso). Venham a uma Pessoa - Jesus. O descanso que Ele oferece não depende de suas circunstâncias se acalmarem primeiro. Você pode ter paz interior mesmo em meio ao caos externo, porque essa paz vem da presença de Cristo em você. Note que Ele não promete remover todos os fardos - Ele oferece trocar seu fardo pesado por um leve. A diferença está em quem está carregando com você. Sozinho, tudo parece impossível. Com Cristo, até os desafios mais difíceis se tornam suportáveis.',
    prayer:
      'Jesus, estou exausto - física, emocional e espiritualmente. Venho a Ti não com grandes orações ou palavras eloquentes, mas simplesmente como estou: cansado e sobrecarregado. Preciso do descanso que só Tu podes dar, aquele descanso profundo que restaura a alma. Me ensine a parar, a respirar, a estar na Tua presença sem pressão de performance. Troco meus fardos pesados pelos Teus fardos leves. Me ensine a carregar apenas o que Tu me chamaste para carregar, e a deixar o resto em Tuas mãos. Renova minhas forças não apenas fisicamente, mas no nível mais profundo do meu ser. Que eu encontre em Ti a paz que excede todo entendimento. Amém.',
    action: 'Encontre um lugar tranquilo e reserve 10 minutos sem distrações. Desligue o telefone. Respire fundo e lentamente. Imagine-se entregando cada fardo a Jesus, um por um. Apenas descanse em Sua presença sem tentar fazer nada.',
  },

  // PROPÓSITO E VOCAÇÃO
  {
    id: 'proposito-2',
    themeId: 'proposito-vocacao',
    day: 2,
    bibleText: {
      reference: 'Efésios 2:10',
      text: 'Porque somos criação de Deus realizada em Cristo Jesus para fazermos boas obras, as quais Deus preparou de antemão para que nós as praticássemos.',
    },
    reflection:
      'Você não é um acidente. Você não é um erro. Sua vida não é resultado do acaso. Você é uma criação intencional de Deus, projetado com propósito desde antes do seu nascimento. E mais: Deus já preparou obras específicas para você realizar - não tarefas aleatórias, mas um chamado único que só você pode cumprir da maneira que você pode cumprir. Isso não significa necessariamente que você precisa ser um pastor, missionário ou líder religioso. Seu propósito pode se manifestar em sua profissão secular, em seus relacionamentos, na forma como você serve sua comunidade. O importante é entender que você foi criado COM propósito e PARA um propósito. Quando você vive alinhado com esse propósito divino, há um senso profundo de satisfação e significado que transcende circunstâncias. Você pode não ver o quadro completo ainda, e está tudo bem. Deus revela nosso chamado passo a passo, não de uma vez. Confie que cada temporada da sua vida está preparando você para o próximo capítulo do seu propósito.',
    prayer:
      'Senhor, há momentos em que me sinto perdido, sem saber para onde ir ou o que fazer. Me pergunto se minha vida tem significado real, se estou fazendo diferença. Mas Tua Palavra declara que fui criado com propósito, para obras que Tu preparaste antecipadamente. Isso me enche de esperança e expectativa. Revela-me, dia a dia, qual é meu chamado único. Mostra-me como posso usar meus talentos, experiências e até minhas dificuldades para cumprir o propósito para o qual fui criado. Não permita que eu desperdice minha vida em coisas que não importam. Alinha meu coração com Tua vontade. E me dá coragem para seguir o caminho que Tu preparaste para mim, mesmo quando parecer desafiador. Amém.',
    action: 'Reflita sobre seus talentos naturais, suas experiências de vida e as necessidades que você enxerga ao seu redor. Onde essas três coisas se encontram pode estar uma pista sobre seu propósito. Escreva suas reflexões.',
  },

  // DECISÕES DIFÍCEIS - Expandido
  {
    id: 'decisoes-2',
    themeId: 'decisoes-dificeis',
    day: 2,
    bibleText: {
      reference: 'Tiago 1:5',
      text: 'Se algum de vocês tem falta de sabedoria, peça-a a Deus, que a todos dá livremente, de boa vontade; e lhe será concedida.',
    },
    reflection:
      'Decisões difíceis são aquelas que mantêm você acordado à noite. Você pesa prós e contras, busca conselhos, faz listas, mas a clareza parece elusiva. E se você escolher errado? E se houver consequências irreversíveis? A paralisia da análise pode ser tão prejudicial quanto uma escolha impulsiva. Mas há boa notícia: você não precisa ter toda a sabedoria por conta própria. Deus promete dar sabedoria generosamente a quem pede - não com relutância ou de forma complicada, mas "livremente, de boa vontade". Isso não significa que você receberá uma resposta audível ou um sinal miraculoso. Mas significa que quando você busca a Deus genuinamente, Ele guiará seu pensamento, abrirá portas certas, fechará portas erradas, e dará paz sobre a direção correta. Parte da sabedoria é também reconhecer que nem sempre teremos 100% de certeza, e às vezes precisamos dar um passo de fé baseado no melhor entendimento que temos no momento. Deus é grande o suficiente para trabalhar até mesmo com nossas escolhas imperfeitas.',
    prayer:
      'Pai, estou diante de uma decisão que parece grande demais para eu fazer sozinho. Preciso de Tua sabedoria, não apenas de informação, mas de discernimento divino. Peço que Tu fales ao meu coração, me guies através de conselhos sábios, e me dês paz sobre a direção certa. Fecha as portas que não devo atravessar, por mais atraentes que pareçam. Abre as portas que conduzem ao Teu propósito para mim, mesmo que pareçam assustadoras. Me dá coragem para agir quando for hora de agir, e paciência para esperar quando for hora de esperar. Confio que Tu não me deixarás tomar o caminho errado se eu estiver genuinamente buscando Tua vontade. Obrigado porque posso contar com Tua orientação. Amém.',
    action: 'Liste os fatores importantes da decisão que você enfrenta. Ore especificamente por sabedoria. Depois, busque conselho de 2-3 pessoas sábias que conhecem sua situação. Observe onde há consenso.',
  },

  // RELACIONAMENTOS E FAMÍLIA - Expandido
  {
    id: 'relacionamentos-2',
    themeId: 'relacionamentos-familia',
    day: 2,
    bibleText: {
      reference: 'Colossenses 3:13-14',
      text: 'Suportem-se uns aos outros e perdoem as queixas que tiverem uns contra os outros. Perdoem como o Senhor lhes perdoou. Acima de tudo, porém, revistam-se do amor, que é o elo perfeito.',
    },
    reflection:
      'Relacionamentos familiares são simultaneamente as maiores fontes de alegria e os maiores desafios da vida. Ninguém consegue nos ferir tão profundamente quanto aqueles que amamos, e ninguém conhece nossos piores lados como nossa família. Mas é justamente nesse contexto imperfeito que Deus nos chama para amar de verdade - não um amor baseado em sentimentos voláteis, mas um amor que é uma decisão diária. Paulo não é ingênuo sobre as dificuldades dos relacionamentos. Ele reconhece que haverá "queixas uns contra os outros" - conflitos, mágoas, desentendimentos. A questão não é se haverá problemas, mas como responderemos a eles. Suportar uns aos outros não significa tolerar abuso, mas significa ter paciência com imperfeições, dar espaço para crescimento, e escolher não desistir facilmente. Perdoar não significa que o que foi feito estava certo, mas significa liberar o outro da dívida emocional. E acima de tudo isso está o amor - não como sentimento, mas como compromisso. É esse amor deliberado que mantém relacionamentos unidos quando os sentimentos falham.',
    prayer:
      'Senhor, meus relacionamentos familiares são complicados. Há amor, mas também há feridas. Há bons momentos, mas também há conflitos. Me ensine a amar com o Teu amor - paciente, bondoso, não mantendo registro de erros. Ajuda-me a perdoar quando for difícil, a ter paciência quando estiver no limite, e a buscar reconciliação mesmo quando for desconfortável. Cura as relações quebradas em minha família. Onde há distância, traz proximidade. Onde há amargura, traz perdão. Onde há silêncio, traz diálogo. Que eu possa ser instrumento de paz e restauração, começando pela forma como eu trato aqueles mais próximos de mim. Reveste-me com amor genuíno que vem de Ti. Amém.',
    action: 'Escolha um membro da família com quem você tem alguma tensão. Faça algo específico hoje para demonstrar amor e valorização - pode ser uma mensagem, uma ligação, um gesto gentil. Não espere mudança imediata; plante uma semente.',
  },

  // GRATIDÃO E ALEGRIA - Expandido
  {
    id: 'gratidao-2',
    themeId: 'gratidao-alegria',
    day: 2,
    bibleText: {
      reference: 'Salmos 100:4-5',
      text: 'Entrem por suas portas com ações de graças, e em seus átrios com louvor; deem-lhe graças e bendigam o seu nome. Pois o Senhor é bom; o seu amor leal dura para sempre, e a sua fidelidade permanece de geração em geração.',
    },
    reflection:
      'A gratidão é uma prática transformadora que muda não apenas nosso humor, mas nossa perspectiva sobre a vida inteira. Quando escolhemos focar no que temos em vez do que nos falta, quando celebramos bênçãos em vez de reclamar de problemas, algo profundo acontece em nossa alma. Não se trata de negar dificuldades ou fingir que está tudo bem quando não está - trata-se de reconhecer que mesmo em meio às dificuldades, há motivos para agradecer. O salmista nos convida a entrar na presença de Deus com ações de graças, não porque nossa vida é perfeita, mas porque Deus é bom, Seu amor é eterno, e Sua fidelidade nunca falha. Essas verdades permanecem constantes independente das nossas circunstâncias. Quando praticamos gratidão consistentemente, desenvolvemos uma disposição alegre que não depende de circunstâncias externas. Alegria bíblica não é felicidade superficial baseada em situações favoráveis - é uma profunda confiança no caráter de Deus que produz contentamento mesmo em tempos difíceis.',
    prayer:
      'Senhor, confesso que é fácil focar no que está faltando e esquecer tudo que já recebi. Perdoa-me por ter um coração ingrato. Neste momento, escolho deliberadamente agradecer. Obrigado pela vida, pela saúde, pela família, pelas provisões diárias. Obrigado pelas bênçãos óbvias e pelas escondidas que ainda não reconheci. Obrigado por Teu amor que nunca falha e Tua fidelidade que permanece constante. Ajuda-me a cultivar um coração grato que vê Tua bondade em cada dia. Transforma minha perspectiva através da gratidão. Que eu possa ser uma pessoa que espalha alegria em vez de reclamação, esperança em vez de negatividade, gratidão em vez de amargura. Enche meu coração com Tua alegria. Amém.',
    action: 'Crie um "Diário de Gratidão" simples. Antes de dormir hoje, escreva 5 bênçãos específicas do dia - podem ser grandes ou pequenas. Faça isso por 7 dias e observe como sua perspectiva muda.',
  },

  // FINANCEIRO E TRABALHO - Expandido
  {
    id: 'financeiro-2',
    themeId: 'financeiro-trabalho',
    day: 2,
    bibleText: {
      reference: 'Filipenses 4:19',
      text: 'O meu Deus suprirá todas as necessidades de vocês, de acordo com as suas gloriosas riquezas em Cristo Jesus.',
    },
    reflection:
      'Preocupações financeiras são uma das principais fontes de estresse e ansiedade. Contas para pagar, objetivos para alcançar, família para sustentar - a pressão pode ser esmagadora. E Deus não é insensível a essas preocupações; Ele sabe que você tem necessidades reais e legítimas. A promessa de Paulo não é que você ficará rico ou que nunca terá dificuldades financeiras. É que Deus suprirá suas NECESSIDADES - não necessariamente todos os seus desejos, mas tudo aquilo que você genuinamente precisa. E note a fonte: "de acordo com Suas gloriosas riquezas em Cristo Jesus". Você não está dependendo dos seus recursos limitados; está conectado à provisão ilimitada de Deus. Isso não significa que você pode ser irresponsável financeiramente e esperar que Deus resolva. Parte da fé é administrar bem o que Deus já te deu. Mas significa que você pode confiar que, enquanto você faz sua parte com diligência e integridade, Deus fará a parte Dele. Sua provisão pode vir de formas inesperadas, mas Ele é fiel.',
    prayer:
      'Pai, as preocupações financeiras às vezes me consomem. Me preocupo com o presente e tenho ansiedade sobre o futuro. Mas Tua Palavra promete que Tu supres todas as minhas necessidades. Ajuda-me a confiar nessa promessa não apenas teoricamente, mas praticamente, no dia a dia. Dá-me sabedoria para administrar bem os recursos que já tenho. Abre portas de provisão que eu nem imagino. Me ensine a diferença entre necessidades e desejos, e a estar contente com o que tenho enquanto trabalho responsavelmente pelo futuro. Que eu nunca coloque minha segurança em dinheiro, mas sempre em Ti. Tu és meu provedor fiel, e eu confio em Ti. Amém.',
    action: 'Faça um orçamento simples ou revise o que você já tem. Identifique uma área onde você pode ser mais sábio financeiramente. Ore especificamente por provisão nas áreas de necessidade real.',
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
