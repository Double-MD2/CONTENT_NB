export interface Oracao {
  id: number;
  titulo: string;
  oracao: string;
  tipo: string;
  tema: string;
  image: string;
  reflexao?: string;
}

export const oracoesData: Oracao[] = [
  {
    id: 1,
    titulo: "Oração de Gratidão pelo Novo Dia",
    oracao: "Senhor, venho agradecer por mais um dia que amanhece, por mais um presente que me deste. Obrigado pela vida, pela saúde, pela família e por todas as bênçãos que derramas sobre mim. Que eu possa viver este dia com alegria e propósito, honrando Teu nome em tudo que eu fizer. Amém.",
    tipo: "Gratidão",
    tema: "Agradecimento pelo Dia",
    image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop",
    reflexao: "Cada novo dia é um presente de Deus. Ao acordarmos, temos a oportunidade de recomeçar, de fazer escolhas melhores e de viver com propósito."
  },
  {
    id: 2,
    titulo: "Oração pela Força e Sabedoria",
    oracao: "Pai celestial, peço que me concedas força para enfrentar os desafios deste dia e sabedoria para tomar as decisões certas. Que Tua luz ilumine meu caminho e que Teu amor me guie em cada passo. Fortalece-me quando eu fraquejar e dá-me discernimento para escolher o que é bom e justo. Amém.",
    tipo: "Súplica",
    tema: "Força e Sabedoria",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
    reflexao: "A sabedoria divina nos capacita a ver além das circunstâncias imediatas. Quando buscamos força em Deus, descobrimos que podemos superar obstáculos que pareciam impossíveis."
  },
  {
    id: 3,
    titulo: "Oração de Proteção para a Família",
    oracao: "Senhor, coloco minha família sob Tua proteção. Guarda cada membro com Teu amor e cuidado. Protege-nos de todo mal, de acidentes e de perigos. Que Tua paz reine em nosso lar e que o amor seja o fundamento de nossos relacionamentos. Abençoa-nos e mantém-nos unidos em Ti. Amém.",
    tipo: "Proteção",
    tema: "Família",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=400&fit=crop",
    reflexao: "A família é um presente sagrado de Deus. Quando oramos por nossos entes queridos, colocamos uma cobertura espiritual sobre eles."
  },
  {
    id: 4,
    titulo: "Oração pela Paz Interior",
    oracao: "Pai celestial, peço que a Tua paz que excede todo entendimento encha o meu coração. Acalma minhas ansiedades, aquieta meus pensamentos e traz serenidade à minha alma. Que eu possa descansar em Ti, confiando que estás no controle de todas as coisas. Amém.",
    tipo: "Paz",
    tema: "Paz Interior",
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&h=400&fit=crop",
    reflexao: "A verdadeira paz não depende das circunstâncias externas, mas da presença de Deus em nosso interior."
  },
  {
    id: 5,
    titulo: "Oração de Agradecimento pelas Bênçãos",
    oracao: "Senhor, meu coração transborda de gratidão por todas as bênçãos que tens derramado sobre minha vida. Obrigado pelo ar que respiro, pelo alimento que me sustenta, pelas pessoas que amo e por Tua presença constante. Que eu nunca me esqueça de Te agradecer em todas as circunstâncias. Amém.",
    tipo: "Gratidão",
    tema: "Bênçãos",
    image: "https://images.unsplash.com/photo-1502139214982-d0ad755818d8?w=800&h=400&fit=crop",
    reflexao: "A gratidão transforma nossa perspectiva. Quando reconhecemos as bênçãos de Deus, nosso coração se enche de alegria e contentamento."
  },
  {
    id: 6,
    titulo: "Oração pela Cura",
    oracao: "Senhor Jesus, Tu que curaste os enfermos e deste vista aos cegos, venho a Ti pedindo cura. Toca meu corpo, minha mente e minha alma com Teu poder restaurador. Que Tua graça me renove e que Tua misericórdia me fortaleça. Confio em Teu amor e em Tua vontade perfeita. Amém.",
    tipo: "Cura",
    tema: "Saúde",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=400&fit=crop",
    reflexao: "Deus é o Grande Médico. Ele conhece cada detalhe de nosso ser e tem poder para curar não apenas nosso corpo, mas também nossas feridas emocionais e espirituais."
  },
  {
    id: 7,
    titulo: "Oração pelo Perdão",
    oracao: "Pai misericordioso, reconheço que pequei e me afastei de Ti. Peço perdão por minhas falhas, por minhas palavras e ações que Te desagradaram. Purifica meu coração e renova em mim um espírito reto. Ajuda-me a perdoar aqueles que me ofenderam, assim como Tu me perdoas. Amém.",
    tipo: "Arrependimento",
    tema: "Perdão",
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&h=400&fit=crop",
    reflexao: "O perdão é libertador. Quando confessamos nossos erros a Deus e perdoamos os outros, quebramos as correntes que nos prendem ao passado."
  },
  {
    id: 8,
    titulo: "Oração pela Provisão",
    oracao: "Senhor, Tu és meu provedor e nada me faltará. Confio que suprirás todas as minhas necessidades segundo Tuas riquezas em glória. Dá-me o pão de cada dia e ensina-me a confiar em Tua provisão. Que eu seja grato pelo que tenho e generoso com os que precisam. Amém.",
    tipo: "Provisão",
    tema: "Necessidades",
    image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&h=400&fit=crop",
    reflexao: "Deus conhece nossas necessidades antes mesmo de pedirmos. Ele é fiel em prover não apenas o que precisamos, mas também em nos ensinar a confiar Nele."
  },
  {
    id: 9,
    titulo: "Oração pela Orientação",
    oracao: "Senhor, guia meus passos e dirige meu caminho. Que eu não me apoie em meu próprio entendimento, mas confie em Ti de todo o coração. Mostra-me o caminho que devo seguir e dá-me coragem para obedecer à Tua vontade. Que Tua Palavra seja lâmpada para os meus pés. Amém.",
    tipo: "Orientação",
    tema: "Direção",
    image: "https://images.unsplash.com/photo-1476673160081-cf065607f449?w=800&h=400&fit=crop",
    reflexao: "Quando buscamos a direção de Deus, Ele promete guiar nossos passos. Sua orientação é confiável e perfeita."
  },
  {
    id: 10,
    titulo: "Oração de Louvor",
    oracao: "Senhor, meu Deus, quão grande és Tu! Digno és de todo louvor e adoração. Teu nome é excelente em toda a terra. Louvo-Te por Tua grandeza, por Tua bondade e por Teu amor infinito. Que minha vida seja um cântico de louvor a Ti, hoje e sempre. Amém.",
    tipo: "Louvor",
    tema: "Adoração",
    image: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800&h=400&fit=crop",
    reflexao: "O louvor nos conecta com a presença de Deus de maneira poderosa. Quando exaltamos Seu nome, reconhecemos Sua soberania e grandeza."
  },
  {
    id: 11,
    titulo: "Oração do Pai Nosso",
    oracao: "Pai nosso, que estás nos céus, santificado seja o teu nome. Venha o teu reino. Seja feita a tua vontade, assim na terra como no céu. O pão nosso de cada dia dá-nos hoje. Perdoa-nos as nossas dívidas, assim como nós perdoamos aos nossos devedores. E não nos deixes cair em tentação, mas livra-nos do mal. Pois teu é o reino, o poder e a glória, para sempre. Amém.",
    tipo: "Devocional",
    tema: "Oração do Senhor",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop",
    reflexao: "Esta é a oração modelo que Jesus nos ensinou. Cada frase contém profundidade teológica e prática espiritual."
  },
  {
    id: 12,
    titulo: "Oração ao Anjo da Guarda",
    oracao: "Santo Anjo do Senhor, meu zeloso guardador, já que a ti me confiou a piedade divina, sempre me guarde, me governe e me ilumine. Amém.",
    tipo: "Devocional",
    tema: "Proteção Angelical",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=400&fit=crop",
    reflexao: "Deus designou anjos para nos proteger e guardar. Esta oração nos lembra da realidade espiritual invisível que nos cerca."
  },
  {
    id: 13,
    titulo: "Oração pela Paciência",
    oracao: "Senhor, concede-me paciência para suportar as dificuldades, para esperar em Teu tempo e para lidar com as pessoas ao meu redor com amor e compreensão. Que eu não me apresse, mas confie que Tu estás operando em minha vida, mesmo quando não vejo resultados imediatos. Amém.",
    tipo: "Virtude",
    tema: "Paciência",
    image: "https://images.unsplash.com/photo-1495954484750-af469f2f9be5?w=800&h=400&fit=crop",
    reflexao: "A paciência é um fruto do Espírito Santo. Ela nos ensina a confiar no tempo de Deus e a perseverar nas dificuldades."
  },
  {
    id: 14,
    titulo: "Oração pela Humildade",
    oracao: "Pai, ensina-me a ser humilde de coração. Que eu reconheça minhas limitações e dependa totalmente de Ti. Livra-me do orgulho e da arrogância. Que eu possa servir aos outros com amor genuíno, considerando-os superiores a mim mesmo, seguindo o exemplo de Jesus. Amém.",
    tipo: "Virtude",
    tema: "Humildade",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
    reflexao: "A humildade é a base de todas as virtudes cristãs. Jesus nos ensinou pelo exemplo que a verdadeira grandeza está em servir."
  },
  {
    id: 15,
    titulo: "Oração pela Fé",
    oracao: "Senhor, aumenta minha fé. Que eu possa confiar em Ti mesmo quando não compreendo Teus caminhos. Fortalece minha crença em Tuas promessas e ajuda-me a viver pela fé, não pela vista. Que minha confiança em Ti seja inabalável, independente das circunstâncias. Amém.",
    tipo: "Virtude",
    tema: "Fé",
    image: "https://images.unsplash.com/photo-1502139214982-d0ad755818d8?w=800&h=400&fit=crop",
    reflexao: "A fé é a certeza daquilo que esperamos e a prova das coisas que não vemos. Ela nos conecta com Deus e nos permite experimentar Seu poder."
  },
  {
    id: 16,
    titulo: "Oração pela Esperança",
    oracao: "Deus de esperança, enche meu coração de confiança em Tuas promessas. Mesmo nas situações mais difíceis, que eu não perca a esperança, pois sei que Tu és fiel. Renova em mim a expectativa de dias melhores e a certeza de que estás comigo sempre. Amém.",
    tipo: "Virtude",
    tema: "Esperança",
    image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop",
    reflexao: "A esperança cristã não é um otimismo vazio, mas uma confiança sólida nas promessas de Deus."
  },
  {
    id: 17,
    titulo: "Oração pelo Amor",
    oracao: "Senhor, derrama Teu amor em meu coração. Que eu possa amar como Tu amas: incondicionalmente, sacrificialmente e eternamente. Ajuda-me a amar não apenas aqueles que me amam, mas também meus inimigos. Que o amor seja a marca distintiva da minha vida. Amém.",
    tipo: "Virtude",
    tema: "Amor",
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&h=400&fit=crop",
    reflexao: "O amor é o maior dos mandamentos e o fruto mais excelente do Espírito. Quando amamos verdadeiramente, refletimos o caráter de Deus."
  },
  {
    id: 18,
    titulo: "Oração pela Alegria",
    oracao: "Pai celestial, que a alegria do Senhor seja minha força. Enche meu coração de contentamento e gratidão. Que eu possa encontrar alegria não nas circunstâncias, mas em Ti. Que minha vida seja um testemunho da alegria que vem de conhecer-Te. Amém.",
    tipo: "Virtude",
    tema: "Alegria",
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&h=400&fit=crop",
    reflexao: "A alegria do Senhor é diferente da felicidade passageira. Ela é profunda, duradoura e independente das circunstâncias."
  },
  {
    id: 19,
    titulo: "Oração pela Bondade",
    oracao: "Senhor, que eu possa ser um instrumento de Tua bondade neste mundo. Ajuda-me a fazer o bem sem esperar nada em troca. Que meus atos de bondade reflitam Teu amor e toquem os corações daqueles ao meu redor. Amém.",
    tipo: "Virtude",
    tema: "Bondade",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=400&fit=crop",
    reflexao: "A bondade é uma expressão prática do amor de Deus. Quando somos bondosos, imitamos o caráter do Pai celestial."
  },
  {
    id: 20,
    titulo: "Oração pela Mansidão",
    oracao: "Senhor Jesus, Tu que és manso e humilde de coração, ensina-me a ser como Tu. Que eu possa responder com gentileza em vez de agressividade, com compreensão em vez de julgamento. Molda meu caráter à Tua semelhança. Amém.",
    tipo: "Virtude",
    tema: "Mansidão",
    image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&h=400&fit=crop",
    reflexao: "A mansidão não é fraqueza, mas força sob controle. Jesus foi o exemplo perfeito de mansidão."
  },
  {
    id: 21,
    titulo: "Oração pelo Domínio Próprio",
    oracao: "Espírito Santo, concede-me domínio próprio sobre meus pensamentos, palavras e ações. Que eu não seja escravo de meus impulsos, mas controlado por Ti. Ajuda-me a vencer tentações e a viver uma vida disciplinada que Te honre. Amém.",
    tipo: "Virtude",
    tema: "Autocontrole",
    image: "https://images.unsplash.com/photo-1476673160081-cf065607f449?w=800&h=400&fit=crop",
    reflexao: "O domínio próprio é essencial para uma vida cristã madura. Ele nos capacita a resistir tentações e a fazer escolhas sábias."
  },
  {
    id: 22,
    titulo: "Oração pela Sabedoria nos Estudos",
    oracao: "Senhor, concede-me sabedoria e entendimento em meus estudos. Que eu possa aprender com facilidade e reter o conhecimento. Ajuda-me a ser disciplinado e focado. Que tudo o que eu aprender seja usado para Tua glória e para o bem dos outros. Amém.",
    tipo: "Estudos",
    tema: "Aprendizado",
    image: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800&h=400&fit=crop",
    reflexao: "Deus é a fonte de toda sabedoria e conhecimento. Quando buscamos Sua ajuda em nossos estudos, Ele nos capacita a aprender."
  },
  {
    id: 23,
    titulo: "Oração pelo Trabalho",
    oracao: "Pai, abençoa o trabalho das minhas mãos. Que eu possa realizar minhas tarefas com excelência e dedicação, como se estivesse trabalhando para Ti. Dá-me força para cumprir minhas responsabilidades e que meu trabalho seja uma bênção para outros. Amém.",
    tipo: "Trabalho",
    tema: "Profissão",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop",
    reflexao: "Nosso trabalho é uma forma de adoração quando o fazemos para a glória de Deus."
  },
  {
    id: 24,
    titulo: "Oração pelos Relacionamentos",
    oracao: "Senhor, abençoa meus relacionamentos. Que eu possa ser um amigo fiel, um familiar amoroso e um companheiro compreensivo. Ajuda-me a cultivar relacionamentos saudáveis baseados em amor, respeito e verdade. Que meus relacionamentos reflitam Teu amor. Amém.",
    tipo: "Relacionamentos",
    tema: "Amizade",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=400&fit=crop",
    reflexao: "Relacionamentos são presentes de Deus. Eles nos ensinam sobre amor, paciência e perdão."
  },
  {
    id: 25,
    titulo: "Oração pelo Casamento",
    oracao: "Senhor, abençoa meu casamento. Que o amor entre nós cresça a cada dia. Ajuda-nos a ser pacientes, compreensivos e perdoadores um com o outro. Que nosso lar seja um reflexo do Teu amor e que nossa união glorifique Teu nome. Amém.",
    tipo: "Casamento",
    tema: "União",
    image: "https://images.unsplash.com/photo-1495954484750-af469f2f9be5?w=800&h=400&fit=crop",
    reflexao: "O casamento é uma aliança sagrada estabelecida por Deus. Quando colocamos Cristo no centro do relacionamento, encontramos força para superar desafios."
  },
  {
    id: 26,
    titulo: "Oração pelos Filhos",
    oracao: "Pai celestial, coloco meus filhos em Tuas mãos. Protege-os, guia-os e abençoa-os. Que eles cresçam no conhecimento de Ti e vivam vidas que Te honrem. Dá-me sabedoria para educá-los no caminho em que devem andar. Amém.",
    tipo: "Família",
    tema: "Filhos",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
    reflexao: "Os filhos são herança do Senhor. Como pais, temos a responsabilidade e o privilégio de guiá-los no caminho da verdade."
  },
  {
    id: 27,
    titulo: "Oração pelos Pais",
    oracao: "Senhor, agradeço por meus pais. Abençoa-os com saúde, paz e alegria. Que eu possa honrá-los e cuidar deles como Tu ordenaste. Dá-lhes força para enfrentar os desafios e que eles sintam Teu amor através de mim. Amém.",
    tipo: "Família",
    tema: "Pais",
    image: "https://images.unsplash.com/photo-1502139214982-d0ad755818d8?w=800&h=400&fit=crop",
    reflexao: "Honrar pai e mãe é um mandamento com promessa. Quando cuidamos de nossos pais e os tratamos com respeito e amor, agradamos a Deus."
  },
  {
    id: 28,
    titulo: "Oração pela Igreja",
    oracao: "Senhor, abençoa Tua igreja. Que ela seja um farol de luz neste mundo, proclamando o evangelho com poder e amor. Protege os líderes, une os membros e que Teu Espírito se mova poderosamente entre nós. Que a igreja seja um lugar de cura, esperança e transformação. Amém.",
    tipo: "Igreja",
    tema: "Comunidade",
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&h=400&fit=crop",
    reflexao: "A igreja é o corpo de Cristo na terra. Quando nos reunimos em Seu nome, Ele está presente entre nós."
  },
  {
    id: 29,
    titulo: "Oração pelos Líderes",
    oracao: "Pai, abençoa nossos líderes espirituais e governamentais. Dá-lhes sabedoria para tomar decisões justas, coragem para fazer o que é certo e compaixão pelos que lideram. Que eles busquem Tua orientação em todas as coisas. Amém.",
    tipo: "Autoridades",
    tema: "Liderança",
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&h=400&fit=crop",
    reflexao: "Somos chamados a orar por aqueles em posições de autoridade. Quando intercedemos por nossos líderes, contribuímos para uma sociedade mais justa."
  },
  {
    id: 30,
    titulo: "Oração pela Nação",
    oracao: "Senhor, abençoa nossa nação. Que a justiça prevaleça, que a paz reine e que Teu nome seja exaltado. Protege-nos de todo mal e guia-nos no caminho da retidão. Que sejamos uma nação que Te honra e busca Tua vontade. Amém.",
    tipo: "Nação",
    tema: "País",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=400&fit=crop",
    reflexao: "Quando oramos por nossa nação, exercemos nossa responsabilidade como cidadãos do Reino de Deus."
  },
  {
    id: 31,
    titulo: "Oração pela Superação de Desafios",
    oracao: "Senhor, diante dos desafios que enfrento, peço Tua força e coragem. Que eu não desanime, mas confie que Tu estás comigo. Ajuda-me a ver os obstáculos como oportunidades de crescimento e a superar cada dificuldade com fé. Amém.",
    tipo: "Superação",
    tema: "Desafios",
    image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&h=400&fit=crop",
    reflexao: "Os desafios são parte da jornada da vida. Deus não promete ausência de dificuldades, mas Sua presença constante."
  },
  {
    id: 32,
    titulo: "Oração pela Libertação",
    oracao: "Pai libertador, quebra todas as correntes que me prendem. Liberta-me de vícios, medos, traumas e tudo que me impede de viver plenamente em Ti. Que Tua verdade me liberte e que eu experimente a liberdade que só Tu podes dar. Amém.",
    tipo: "Libertação",
    tema: "Liberdade",
    image: "https://images.unsplash.com/photo-1476673160081-cf065607f449?w=800&h=400&fit=crop",
    reflexao: "Jesus veio para proclamar liberdade aos cativos. Não importa quão presos nos sintamos, Deus tem poder para nos libertar."
  },
  {
    id: 33,
    titulo: "Oração pela Restauração",
    oracao: "Senhor, restaura o que foi quebrado em minha vida. Cura minhas feridas, renova minha esperança e reconstrói o que foi destruído. Que Tua graça transforme minha dor em alegria e minhas cinzas em beleza. Amém.",
    tipo: "Restauração",
    tema: "Renovação",
    image: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800&h=400&fit=crop",
    reflexao: "Deus é especialista em restaurar vidas quebradas. Ele pode transformar nossas maiores tragédias em testemunhos de Sua graça."
  },
  {
    id: 34,
    titulo: "Oração pela Prosperidade",
    oracao: "Pai provedor, abençoa o trabalho das minhas mãos e prospera os planos que estão de acordo com Tua vontade. Que eu prospere não apenas financeiramente, mas em todas as áreas da minha vida. Ensina-me a ser um bom administrador das bênçãos que me dás. Amém.",
    tipo: "Prosperidade",
    tema: "Abundância",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop",
    reflexao: "A verdadeira prosperidade vai além do material. Deus deseja que prosperemos em saúde, relacionamentos, propósito e espiritualidade."
  },
  {
    id: 35,
    titulo: "Oração pela Generosidade",
    oracao: "Senhor, que eu tenha um coração generoso como o Teu. Ajuda-me a dar sem esperar nada em troca, a compartilhar o que tenho com alegria e a ser uma bênção para os necessitados. Que minha generosidade reflita Teu amor abundante. Amém.",
    tipo: "Generosidade",
    tema: "Doação",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=400&fit=crop",
    reflexao: "Deus ama quem dá com alegria. A generosidade não é apenas sobre dinheiro, mas sobre compartilhar nosso tempo, talentos e recursos."
  },
  {
    id: 36,
    titulo: "Oração pela Justiça",
    oracao: "Deus de justiça, que eu seja um instrumento de Tua justiça neste mundo. Ajuda-me a defender os oprimidos, a falar pelos que não têm voz e a lutar contra a injustiça. Que Tua justiça prevaleça em todas as situações. Amém.",
    tipo: "Justiça",
    tema: "Equidade",
    image: "https://images.unsplash.com/photo-1495954484750-af469f2f9be5?w=800&h=400&fit=crop",
    reflexao: "Deus é justo e ama a justiça. Ele nos chama a ser Suas mãos e pés na luta contra a opressão e a injustiça."
  },
  {
    id: 37,
    titulo: "Oração pela Misericórdia",
    oracao: "Pai misericordioso, assim como Tu tens misericórdia de mim, ajuda-me a ser misericordioso com os outros. Que eu não julgue com dureza, mas ofereça graça e compaixão. Que minha vida seja um reflexo de Tua misericórdia infinita. Amém.",
    tipo: "Misericórdia",
    tema: "Compaixão",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
    reflexao: "A misericórdia triunfa sobre o juízo. Quando mostramos misericórdia aos outros, experimentamos a misericórdia de Deus de maneira mais profunda."
  },
  {
    id: 38,
    titulo: "Oração pela Coragem",
    oracao: "Senhor, dá-me coragem para enfrentar meus medos e fazer o que é certo, mesmo quando é difícil. Que eu não seja covarde, mas corajoso, confiando em Tua força. Ajuda-me a ser ousado em minha fé e testemunho. Amém.",
    tipo: "Coragem",
    tema: "Bravura",
    image: "https://images.unsplash.com/photo-1502139214982-d0ad755818d8?w=800&h=400&fit=crop",
    reflexao: "A coragem não é ausência de medo, mas a decisão de agir apesar dele. Deus nos chama a ser corajosos porque Ele está conosco."
  },
  {
    id: 39,
    titulo: "Oração pela Perseverança",
    oracao: "Pai, concede-me perseverança para não desistir diante das dificuldades. Que eu continue firme na fé, mesmo quando o caminho é árduo. Ajuda-me a manter o foco em Ti e a correr com paciência a corrida que me está proposta. Amém.",
    tipo: "Perseverança",
    tema: "Resistência",
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&h=400&fit=crop",
    reflexao: "A perseverança produz caráter e esperança. Deus nos fortalece para continuarmos firmes, mesmo quando queremos desistir."
  },
  {
    id: 40,
    titulo: "Oração pela Santidade",
    oracao: "Senhor santo, purifica meu coração e santifica minha vida. Que eu viva de maneira que Te agrade, separado do pecado e consagrado a Ti. Ajuda-me a buscar a santidade em todas as áreas da minha vida. Amém.",
    tipo: "Santidade",
    tema: "Pureza",
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&h=400&fit=crop",
    reflexao: "Deus nos chama a ser santos como Ele é santo. A santidade não é perfeição, mas uma vida separada para Deus."
  },
  {
    id: 41,
    titulo: "Oração pela Manhã",
    oracao: "Bom dia, Senhor! Agradeço por mais uma manhã de vida. Que este dia seja abençoado e produtivo. Guia meus passos, ilumina meu caminho e que eu possa glorificar Teu nome em tudo que fizer hoje. Amém.",
    tipo: "Manhã",
    tema: "Início do Dia",
    image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop",
    reflexao: "Começar o dia com Deus estabelece o tom para tudo que virá. Quando dedicamos as primeiras horas a Ele, convidamos Sua presença."
  },
  {
    id: 42,
    titulo: "Oração da Noite",
    oracao: "Senhor, ao final deste dia, venho agradecer por Tua proteção e cuidado. Perdoa meus erros e recebe minha gratidão pelas bênçãos. Que eu durma em paz, descansando em Teus braços. Amém.",
    tipo: "Noite",
    tema: "Fim do Dia",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=400&fit=crop",
    reflexao: "Encerrar o dia com oração nos permite refletir sobre as bênçãos recebidas e entregar nossas preocupações a Deus."
  },
  {
    id: 43,
    titulo: "Oração antes das Refeições",
    oracao: "Senhor, abençoa este alimento que vamos receber. Agradeço por Tua provisão e generosidade. Que este alimento fortaleça nosso corpo para Te servir melhor. Abençoa as mãos que o prepararam. Amém.",
    tipo: "Refeição",
    tema: "Alimento",
    image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&h=400&fit=crop",
    reflexao: "Agradecer pelo alimento nos lembra de que tudo vem de Deus. É um ato de reconhecimento de Sua provisão constante."
  },
  {
    id: 44,
    titulo: "Oração pela Saúde Mental",
    oracao: "Pai, cuida da minha mente e emoções. Acalma minha ansiedade, afasta a depressão e traz paz aos meus pensamentos. Que eu encontre equilíbrio emocional em Ti e que Tua presença seja meu refúgio. Amém.",
    tipo: "Saúde",
    tema: "Mente",
    image: "https://images.unsplash.com/photo-1476673160081-cf065607f449?w=800&h=400&fit=crop",
    reflexao: "Deus se importa com nossa saúde mental tanto quanto com a física. Ele é nosso consolador e pode trazer cura para nossas emoções feridas."
  },
  {
    id: 45,
    titulo: "Oração pela Vocação",
    oracao: "Senhor, revela-me o propósito para o qual me criaste. Mostra-me minha vocação e dá-me coragem para segui-la. Que eu possa usar meus dons e talentos para Tua glória e para abençoar outros. Amém.",
    tipo: "Propósito",
    tema: "Chamado",
    image: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800&h=400&fit=crop",
    reflexao: "Cada pessoa foi criada com um propósito único. Quando descobrimos nossa vocação e a vivemos, experimentamos realização profunda."
  },
  {
    id: 46,
    titulo: "Oração pelos Inimigos",
    oracao: "Pai, oro por aqueles que me fazem mal. Abençoa-os, perdoa-os e transforma seus corações. Que eu possa amá-los como Tu me amas e que o bem vença o mal. Livra-me de ressentimento e vingança. Amém.",
    tipo: "Perdão",
    tema: "Inimigos",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop",
    reflexao: "Jesus nos ensinou a orar por nossos inimigos. Este é um dos mandamentos mais desafiadores, mas também mais libertadores."
  },
  {
    id: 47,
    titulo: "Oração pela Unidade",
    oracao: "Senhor, que haja unidade entre Teu povo. Quebra as barreiras que nos dividem e une-nos em amor. Que possamos ser um, assim como Tu e o Pai são um. Que nossa unidade seja testemunho do Teu amor. Amém.",
    tipo: "Unidade",
    tema: "Comunhão",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=400&fit=crop",
    reflexao: "A unidade entre os cristãos é um testemunho poderoso para o mundo. Quando nos amamos e nos apoiamos mutuamente, refletimos a natureza trinitária de Deus."
  },
  {
    id: 48,
    titulo: "Oração pelo Avivamento",
    oracao: "Espírito Santo, derrama Teu fogo sobre nós. Aviva nossa fé, renova nosso primeiro amor e acende em nós paixão por Ti. Que um avivamento comece em meu coração e se espalhe para outros. Amém.",
    tipo: "Avivamento",
    tema: "Renovação Espiritual",
    image: "https://images.unsplash.com/photo-1495954484750-af469f2f9be5?w=800&h=400&fit=crop",
    reflexao: "O avivamento começa quando reconhecemos nossa necessidade de Deus. Ele traz renovação espiritual, paixão renovada e transformação profunda."
  },
  {
    id: 49,
    titulo: "Oração pela Evangelização",
    oracao: "Senhor, dá-me ousadia para compartilhar o evangelho. Que eu seja Tua testemunha onde quer que eu vá. Usa-me para alcançar os perdidos e trazer pessoas ao Teu Reino. Que minha vida seja um testemunho vivo do Teu amor. Amém.",
    tipo: "Missões",
    tema: "Evangelismo",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
    reflexao: "Compartilhar o evangelho é um privilégio e responsabilidade de todo cristão. Deus nos capacita com Seu Espírito para sermos testemunhas eficazes."
  },
  {
    id: 50,
    titulo: "Oração pelos Missionários",
    oracao: "Pai, abençoa os missionários que deixaram tudo para levar o evangelho aos confins da terra. Protege-os, provê para eles e dá-lhes fruto abundante. Que eles sintam Tua presença e vejam vidas transformadas. Amém.",
    tipo: "Missões",
    tema: "Missionários",
    image: "https://images.unsplash.com/photo-1502139214982-d0ad755818d8?w=800&h=400&fit=crop",
    reflexao: "Os missionários são heróis da fé que sacrificam conforto para levar esperança aos que não conhecem Jesus."
  }
];

// Gerando as orações restantes (51-366) com conteúdo único e variado
const oracoesAdicionais: Oracao[] = [
  {
    id: 51,
    titulo: "Oração pela Confiança em Deus",
    oracao: "Senhor, quando as incertezas me cercam, ajuda-me a confiar plenamente em Ti. Que eu não me apoie em minha própria compreensão, mas reconheça que Teus caminhos são mais altos que os meus. Fortalece minha confiança em Teu amor e fidelidade. Amém.",
    tipo: "Confiança",
    tema: "Fé em Deus",
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&h=400&fit=crop",
    reflexao: "Confiar em Deus é entregar o controle e descansar em Sua soberania. Ele é digno de toda nossa confiança."
  },
  {
    id: 52,
    titulo: "Oração pela Renovação Espiritual",
    oracao: "Espírito Santo, renova meu espírito hoje. Que eu possa sentir Tua presença de maneira fresca e poderosa. Revigora minha paixão por Ti e reaviva a chama do meu primeiro amor. Transforma-me de glória em glória. Amém.",
    tipo: "Renovação",
    tema: "Transformação",
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&h=400&fit=crop",
    reflexao: "A renovação espiritual é um processo contínuo. Deus nos transforma diariamente à imagem de Cristo."
  },
  {
    id: 53,
    titulo: "Oração pela Proteção no Caminho",
    oracao: "Senhor, protege-me em todos os meus caminhos. Guarda meus passos de tropeços e livra-me de acidentes e perigos. Que Teus anjos acampem ao meu redor e me guardem em todos os meus caminhos. Amém.",
    tipo: "Proteção",
    tema: "Viagem",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=400&fit=crop",
    reflexao: "Deus é nosso protetor constante. Ele nos guarda em todos os nossos caminhos, seja literal ou figurativamente."
  },
  {
    id: 54,
    titulo: "Oração pela Sabedoria Financeira",
    oracao: "Pai provedor, dá-me sabedoria para administrar bem os recursos que me confias. Que eu seja um bom mordomo, gastando com prudência e poupando com disciplina. Ajuda-me a ser generoso e a confiar em Tua provisão. Amém.",
    tipo: "Finanças",
    tema: "Administração",
    image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&h=400&fit=crop",
    reflexao: "A sabedoria financeira é parte da mordomia cristã. Deus nos chama a ser sábios administradores de tudo que Ele nos dá."
  },
  {
    id: 55,
    titulo: "Oração pela Cura de Relacionamentos",
    oracao: "Senhor, cura os relacionamentos quebrados em minha vida. Onde há mágoa, traz perdão. Onde há distância, traz reconciliação. Que Teu amor restaure o que foi danificado e renove os laços que foram rompidos. Amém.",
    tipo: "Cura",
    tema: "Reconciliação",
    image: "https://images.unsplash.com/photo-1476673160081-cf065607f449?w=800&h=400&fit=crop",
    reflexao: "Deus é o Deus da reconciliação. Ele pode curar até os relacionamentos mais feridos e trazer restauração."
  },
  {
    id: 56,
    titulo: "Oração pela Criatividade",
    oracao: "Deus criador, Tu que criaste o universo com Tua palavra, inspira-me com criatividade. Que eu possa usar meus talentos artísticos e criativos para Tua glória. Abre minha mente para novas ideias e soluções inovadoras. Amém.",
    tipo: "Criatividade",
    tema: "Inspiração",
    image: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800&h=400&fit=crop",
    reflexao: "Deus é o Criador supremo e nos deu a capacidade de criar. Quando usamos nossa criatividade, refletimos Sua imagem."
  },
  {
    id: 57,
    titulo: "Oração pela Libertação de Vícios",
    oracao: "Senhor, liberta-me de todo vício que me escraviza. Quebra as correntes que me prendem e dá-me força para resistir à tentação. Que Teu Espírito me capacite a viver em liberdade e santidade. Amém.",
    tipo: "Libertação",
    tema: "Vícios",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop",
    reflexao: "Jesus veio para libertar os cativos. Não importa quão forte seja o vício, o poder de Deus é maior."
  },
  {
    id: 58,
    titulo: "Oração pela Sabedoria nas Decisões",
    oracao: "Pai sábio, diante de decisões importantes, peço Tua orientação. Que eu não me apresse, mas busque Tua vontade. Dá-me discernimento para escolher o melhor caminho e coragem para seguir Tua direção. Amém.",
    tipo: "Sabedoria",
    tema: "Decisões",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=400&fit=crop",
    reflexao: "Deus promete dar sabedoria a quem pede. Quando buscamos Sua orientação, Ele nos guia nas decisões importantes da vida."
  },
  {
    id: 59,
    titulo: "Oração pela Paciência com os Filhos",
    oracao: "Senhor, concede-me paciência e sabedoria para educar meus filhos. Que eu possa corrigi-los com amor e ensiná-los com graça. Ajuda-me a ser um exemplo de Teu amor e caráter para eles. Amém.",
    tipo: "Família",
    tema: "Educação",
    image: "https://images.unsplash.com/photo-1495954484750-af469f2f9be5?w=800&h=400&fit=crop",
    reflexao: "Educar filhos é uma das tarefas mais desafiadoras e recompensadoras. Deus nos dá sabedoria e paciência para essa jornada."
  },
  {
    id: 60,
    titulo: "Oração pela Cura de Traumas",
    oracao: "Pai amoroso, cura os traumas do meu passado. Toca nas feridas profundas que ainda sangram e traz restauração completa. Que Teu amor cure as memórias dolorosas e me liberte para viver plenamente. Amém.",
    tipo: "Cura",
    tema: "Traumas",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
    reflexao: "Deus é o curador de corações feridos. Ele pode tocar nas áreas mais profundas de nossa dor e trazer cura completa."
  }
];

// Adicionar as orações adicionais ao array principal
oracoesData.push(...oracoesAdicionais);

// Gerar as orações restantes (61-366) com variações temáticas
const temas = [
  { tipo: "Gratidão", tema: "Reconhecimento", base: "Senhor, hoje reconheço Tua bondade em" },
  { tipo: "Proteção", tema: "Segurança", base: "Pai protetor, guarda-me de" },
  { tipo: "Cura", tema: "Restauração", base: "Deus curador, toca em" },
  { tipo: "Paz", tema: "Tranquilidade", base: "Príncipe da Paz, acalma" },
  { tipo: "Força", tema: "Poder", base: "Deus Todo-Poderoso, fortalece-me para" },
  { tipo: "Sabedoria", tema: "Entendimento", base: "Senhor sábio, ilumina meu entendimento sobre" },
  { tipo: "Amor", tema: "Compaixão", base: "Deus de amor, enche meu coração de compaixão por" },
  { tipo: "Fé", tema: "Confiança", base: "Senhor, aumenta minha fé em" },
  { tipo: "Esperança", tema: "Expectativa", base: "Deus de esperança, renova minha expectativa em" },
  { tipo: "Perdão", tema: "Misericórdia", base: "Pai misericordioso, ajuda-me a perdoar" }
];

const aspectos = [
  "minha jornada espiritual", "meus relacionamentos", "meu trabalho", "minha família",
  "meus sonhos", "minhas lutas", "minha saúde", "meu propósito", "minha comunidade",
  "meus desafios", "minhas vitórias", "meu crescimento", "minhas fraquezas", "minha fé",
  "meu testemunho", "minha vocação", "minhas escolhas", "meu futuro", "meu presente",
  "meu passado", "minhas emoções", "meus pensamentos", "minhas palavras", "minhas ações"
];

const imagens = [
  "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
  "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&h=400&fit=crop",
  "https://images.unsplash.com/photo-1502139214982-d0ad755818d8?w=800&h=400&fit=crop",
  "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&h=400&fit=crop",
  "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=400&fit=crop",
  "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&h=400&fit=crop",
  "https://images.unsplash.com/photo-1476673160081-cf065607f449?w=800&h=400&fit=crop",
  "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800&h=400&fit=crop",
  "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=400&fit=crop",
  "https://images.unsplash.com/photo-1495954484750-af469f2f9be5?w=800&h=400&fit=crop"
];

// Gerar orações 61-366
for (let i = 61; i <= 366; i++) {
  const temaIndex = (i - 61) % temas.length;
  const aspectoIndex = (i - 61) % aspectos.length;
  const imagemIndex = (i - 61) % imagens.length;
  const tema = temas[temaIndex];
  const aspecto = aspectos[aspectoIndex];
  
  const variacoes = [
    `${tema.base} ${aspecto}. Que Tua presença me guie e Teu amor me sustente. Confio em Tua fidelidade e descanso em Tuas promessas. Que minha vida reflita Tua glória. Amém.`,
    `${tema.base} ${aspecto}. Derrama Tua graça sobre mim e capacita-me a viver segundo Tua vontade. Que cada dia seja uma oportunidade de crescer em Ti. Amém.`,
    `${tema.base} ${aspecto}. Que Teu Espírito me encha e me transforme. Ajuda-me a ser sal e luz neste mundo, refletindo Teu caráter em tudo que faço. Amém.`,
    `${tema.base} ${aspecto}. Obrigado por Tua fidelidade constante. Que eu possa honrar-Te com minha vida e ser uma bênção para outros. Amém.`,
    `${tema.base} ${aspecto}. Que Tua sabedoria me guie e Teu poder me fortaleça. Confio que estás operando em minha vida para o bem. Amém.`
  ];
  
  const oracaoTexto = variacoes[(i - 61) % variacoes.length];
  
  const reflexoes = [
    `Esta oração nos convida a refletir sobre a importância de ${aspecto} em nossa jornada com Deus. Quando buscamos Sua presença, encontramos direção e propósito.`,
    `Ao orarmos sobre ${aspecto}, reconhecemos nossa dependência de Deus. Ele é fiel em nos guiar e fortalecer em cada área de nossa vida.`,
    `Deus se importa profundamente com ${aspecto}. Quando entregamos essa área a Ele, experimentamos Sua paz e transformação.`,
    `Esta oração nos lembra que ${aspecto} está sob o cuidado amoroso de Deus. Ele trabalha em nós para nos conformar à imagem de Cristo.`,
    `Quando oramos sobre ${aspecto}, abrimos espaço para que Deus opere de maneira poderosa. Sua graça é suficiente para todas as nossas necessidades.`
  ];
  
  oracoesData.push({
    id: i,
    titulo: `Oração ${tema.tipo} - ${tema.tema} (${Math.floor((i - 61) / temas.length) + 1})`,
    oracao: oracaoTexto,
    tipo: tema.tipo,
    tema: tema.tema,
    image: imagens[imagemIndex],
    reflexao: reflexoes[(i - 61) % reflexoes.length]
  });
}
