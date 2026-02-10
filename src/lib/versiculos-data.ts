// Base de dados com 366 versículos inspiradores da Bíblia
// Selecionados para inspirar e motivar os leitores diariamente

export interface Versiculo {
  id: number;
  referencia: string;
  texto: string;
  tema: string;
  reflexao?: string;
  imagem: string;
}

export const versiculosDoDia: Versiculo[] = [
  {
    id: 1,
    referencia: "João 3:16",
    texto: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
    tema: "Amor de Deus",
    reflexao: "O amor de Deus é incondicional e eterno. Ele nos oferece salvação através de Jesus Cristo, demonstrando o maior ato de amor da história.",
    imagem: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop"
  },
  {
    id: 2,
    referencia: "Salmos 23:1",
    texto: "O Senhor é o meu pastor; nada me faltará.",
    tema: "Provisão",
    reflexao: "Deus cuida de nós como um pastor cuida de suas ovelhas. Quando confiamos Nele, temos a certeza de que nada nos faltará.",
    imagem: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=400&fit=crop"
  },
  {
    id: 3,
    referencia: "Filipenses 4:13",
    texto: "Tudo posso naquele que me fortalece.",
    tema: "Força",
    reflexao: "Nossa força não vem de nós mesmos, mas de Cristo que vive em nós. Com Ele, somos capazes de superar qualquer desafio.",
    imagem: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&h=400&fit=crop"
  },
  {
    id: 4,
    referencia: "Provérbios 3:5-6",
    texto: "Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento. Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas.",
    tema: "Confiança",
    reflexao: "Quando confiamos em Deus completamente e não apenas em nossa própria sabedoria, Ele guia nossos passos e direciona nosso caminho.",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: 5,
    referencia: "Jeremias 29:11",
    texto: "Porque eu sei os planos que tenho para vocês, diz o Senhor, planos de fazê-los prosperar e não de causar dano, planos de dar a vocês esperança e um futuro.",
    tema: "Esperança",
    reflexao: "Deus tem um propósito maravilhoso para cada um de nós. Seus planos são sempre para o nosso bem e para nos dar esperança.",
    imagem: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
  },
  {
    id: 6,
    referencia: "Romanos 8:28",
    texto: "Sabemos que Deus age em todas as coisas para o bem daqueles que o amam, dos que foram chamados de acordo com o seu propósito.",
    tema: "Propósito",
    reflexao: "Mesmo nas dificuldades, Deus está trabalhando para o nosso bem. Tudo coopera para o bem daqueles que amam a Deus.",
    imagem: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop"
  },
  {
    id: 7,
    referencia: "Mateus 11:28",
    texto: "Venham a mim, todos os que estão cansados e sobrecarregados, e eu lhes darei descanso.",
    tema: "Descanso",
    reflexao: "Jesus nos convida a descansar Nele. Quando estamos cansados e sobrecarregados, podemos encontrar paz e renovação em Sua presença.",
    imagem: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop"
  },
  {
    id: 8,
    referencia: "Isaías 41:10",
    texto: "Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus; eu te fortaleço, e te ajudo, e te sustento com a destra da minha justiça.",
    tema: "Coragem",
    reflexao: "Deus está sempre conosco. Não precisamos temer, pois Ele nos fortalece, ajuda e sustenta em todos os momentos.",
    imagem: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop"
  },
  {
    id: 9,
    referencia: "Salmos 46:1",
    texto: "Deus é o nosso refúgio e fortaleza, socorro bem presente na angústia.",
    tema: "Refúgio",
    reflexao: "Em tempos de dificuldade, Deus é nosso refúgio seguro. Ele está sempre presente para nos socorrer e nos dar força.",
    imagem: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
  },
  {
    id: 10,
    referencia: "2 Coríntios 5:7",
    texto: "Porque andamos por fé e não por vista.",
    tema: "Fé",
    reflexao: "Nossa jornada cristã é baseada na fé, não no que vemos. Confiamos em Deus mesmo quando não entendemos completamente Seus caminhos.",
    imagem: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop"
  },
  {
    id: 11,
    referencia: "Josué 1:9",
    texto: "Não fui eu que lhe ordenei? Seja forte e corajoso! Não se apavore nem desanime, pois o Senhor, o seu Deus, estará com você por onde você andar.",
    tema: "Coragem",
    reflexao: "A coragem não é a ausência de medo, mas a certeza da presença de Deus conosco. Ele nos capacita a enfrentar qualquer desafio com confiança.",
    imagem: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop"
  },
  {
    id: 12,
    referencia: "Salmos 37:4",
    texto: "Deleite-se no Senhor, e ele atenderá aos desejos do seu coração.",
    tema: "Alegria",
    reflexao: "Quando encontramos nossa alegria em Deus, Ele alinha nossos desejos com Sua vontade perfeita para nossas vidas.",
    imagem: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
  },
  {
    id: 13,
    referencia: "1 João 4:19",
    texto: "Nós amamos porque ele nos amou primeiro.",
    tema: "Amor",
    reflexao: "Nossa capacidade de amar vem do amor que Deus primeiro derramou sobre nós. Ele é a fonte de todo amor verdadeiro.",
    imagem: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop"
  },
  {
    id: 14,
    referencia: "Efésios 2:8-9",
    texto: "Porque pela graça vocês são salvos, por meio da fé, e isto não vem de vocês, é dom de Deus; não por obras, para que ninguém se glorie.",
    tema: "Graça",
    reflexao: "A salvação é um presente gratuito de Deus, não algo que podemos conquistar. Isso nos liberta da pressão de tentar ganhar o amor de Deus.",
    imagem: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=400&fit=crop"
  },
  {
    id: 15,
    referencia: "Salmos 119:105",
    texto: "Lâmpada para os meus pés é a tua palavra e luz para o meu caminho.",
    tema: "Palavra de Deus",
    reflexao: "A Palavra de Deus ilumina nosso caminho na escuridão, guiando cada passo que damos e revelando a direção certa a seguir.",
    imagem: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&h=400&fit=crop"
  },
  {
    id: 16,
    referencia: "Mateus 6:33",
    texto: "Busquem, pois, em primeiro lugar o Reino de Deus e a sua justiça, e todas essas coisas serão acrescentadas a vocês.",
    tema: "Prioridades",
    reflexao: "Quando colocamos Deus em primeiro lugar, Ele cuida de todas as nossas necessidades. Nossas prioridades determinam nosso destino.",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: 17,
    referencia: "Romanos 12:2",
    texto: "Não se amoldem ao padrão deste mundo, mas transformem-se pela renovação da sua mente, para que sejam capazes de experimentar e comprovar a boa, agradável e perfeita vontade de Deus.",
    tema: "Transformação",
    reflexao: "A verdadeira mudança começa na mente. Quando renovamos nossos pensamentos com a Palavra de Deus, nossa vida inteira é transformada.",
    imagem: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop"
  },
  {
    id: 18,
    referencia: "Gálatas 5:22-23",
    texto: "Mas o fruto do Espírito é amor, alegria, paz, paciência, amabilidade, bondade, fidelidade, mansidão e domínio próprio.",
    tema: "Fruto do Espírito",
    reflexao: "O Espírito Santo produz em nós qualidades divinas que transformam nosso caráter e impactam positivamente todos ao nosso redor.",
    imagem: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop"
  },
  {
    id: 19,
    referencia: "Hebreus 11:1",
    texto: "Ora, a fé é a certeza daquilo que esperamos e a prova das coisas que não vemos.",
    tema: "Fé",
    reflexao: "A fé nos permite enxergar além do visível e confiar nas promessas de Deus mesmo quando as circunstâncias parecem contrárias.",
    imagem: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop"
  },
  {
    id: 20,
    referencia: "Salmos 34:8",
    texto: "Provem e vejam como o Senhor é bom. Como é feliz o homem que nele se refugia!",
    tema: "Bondade de Deus",
    reflexao: "A bondade de Deus não é apenas uma teoria, mas uma experiência real. Quando nos refugiamos Nele, descobrimos Sua bondade incomparável.",
    imagem: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
  },
  {
    id: 21,
    referencia: "1 Coríntios 13:4-7",
    texto: "O amor é paciente, o amor é bondoso. Não inveja, não se vangloria, não se orgulha. Não maltrata, não procura seus interesses, não se ira facilmente, não guarda rancor.",
    tema: "Amor",
    reflexao: "O amor verdadeiro é muito mais que um sentimento - é uma escolha diária de agir com paciência, bondade e perdão em todas as situações.",
    imagem: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop"
  },
  {
    id: 22,
    referencia: "Isaías 40:31",
    texto: "Mas os que esperam no Senhor renovam as suas forças. Voam alto como águias; correm e não ficam exaustos, andam e não se cansam.",
    tema: "Renovação",
    reflexao: "Quando esperamos pacientemente no Senhor, Ele renova nossas forças de maneira sobrenatural, capacitando-nos a ir além de nossos limites.",
    imagem: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=400&fit=crop"
  },
  {
    id: 23,
    referencia: "João 14:6",
    texto: "Respondeu Jesus: 'Eu sou o caminho, a verdade e a vida. Ninguém vem ao Pai, a não ser por mim.'",
    tema: "Salvação",
    reflexao: "Jesus não é apenas um caminho entre muitos - Ele é o único caminho para Deus. Nele encontramos verdade absoluta e vida eterna.",
    imagem: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&h=400&fit=crop"
  },
  {
    id: 24,
    referencia: "Salmos 91:1-2",
    texto: "Aquele que habita no abrigo do Altíssimo e descansa à sombra do Todo-poderoso pode dizer ao Senhor: 'Tu és o meu refúgio e a minha fortaleza, o meu Deus, em quem confio.'",
    tema: "Proteção",
    reflexao: "Habitar na presença de Deus é o lugar mais seguro que existe. Sob Sua proteção, encontramos descanso e segurança verdadeiros.",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: 25,
    referencia: "Filipenses 4:6-7",
    texto: "Não andem ansiosos por coisa alguma, mas em tudo, pela oração e súplicas, e com ação de graças, apresentem seus pedidos a Deus.",
    tema: "Paz",
    reflexao: "A ansiedade é substituída pela paz quando levamos nossas preocupações a Deus em oração, confiando que Ele cuida de cada detalhe.",
    imagem: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop"
  },
  {
    id: 26,
    referencia: "Mateus 5:14-16",
    texto: "Vocês são a luz do mundo. Não se pode esconder uma cidade construída sobre um monte.",
    tema: "Testemunho",
    reflexao: "Como cristãos, somos chamados a brilhar a luz de Cristo em um mundo escuro. Nossa vida deve refletir o amor e a verdade de Deus.",
    imagem: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop"
  },
  {
    id: 27,
    referencia: "Romanos 8:38-39",
    texto: "Pois estou convencido de que nem morte nem vida, nem anjos nem demônios, nem o presente nem o futuro será capaz de nos separar do amor de Deus.",
    tema: "Amor Eterno",
    reflexao: "Nada no universo pode nos separar do amor de Deus. Seu amor por nós é inabalável, incondicional e eterno.",
    imagem: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop"
  },
  {
    id: 28,
    referencia: "Tiago 1:2-4",
    texto: "Meus irmãos, considerem motivo de grande alegria o fato de passarem por diversas provações, pois vocês sabem que a prova da sua fé produz perseverança.",
    tema: "Perseverança",
    reflexao: "As provações não são obstáculos, mas oportunidades de crescimento. Cada desafio fortalece nossa fé e desenvolve nosso caráter.",
    imagem: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
  },
  {
    id: 29,
    referencia: "Salmos 139:14",
    texto: "Eu te louvo porque me fizeste de modo especial e admirável. Tuas obras são maravilhosas!",
    tema: "Identidade",
    reflexao: "Você foi criado de forma única e intencional por Deus. Sua identidade não está no que você faz, mas em quem Deus diz que você é.",
    imagem: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop"
  },
  {
    id: 30,
    referencia: "João 15:5",
    texto: "Eu sou a videira; vocês são os ramos. Se alguém permanecer em mim e eu nele, esse dá muito fruto.",
    tema: "Dependência de Deus",
    reflexao: "Assim como o ramo depende da videira para viver, nós dependemos de Cristo para tudo. Separados Dele, nada podemos fazer.",
    imagem: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=400&fit=crop"
  },
  {
    id: 31,
    referencia: "2 Timóteo 1:7",
    texto: "Pois Deus não nos deu espírito de covardia, mas de poder, de amor e de equilíbrio.",
    tema: "Poder",
    reflexao: "O medo não vem de Deus. Ele nos deu poder para vencer, amor para servir e equilíbrio para tomar decisões sábias.",
    imagem: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&h=400&fit=crop"
  },
  {
    id: 32,
    referencia: "Salmos 27:1",
    texto: "O Senhor é a minha luz e a minha salvação; de quem terei medo?",
    tema: "Confiança",
    reflexao: "Quando Deus é nossa luz, não há escuridão que possa nos assustar. Quando Ele é nossa salvação, não há inimigo que possa nos vencer.",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: 33,
    referencia: "Colossenses 3:23",
    texto: "Tudo o que fizerem, façam de todo o coração, como para o Senhor, e não para os homens.",
    tema: "Trabalho",
    reflexao: "Nosso trabalho ganha novo significado quando o fazemos para Deus. Cada tarefa, por menor que seja, pode ser um ato de adoração.",
    imagem: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop"
  },
  {
    id: 34,
    referencia: "1 Pedro 5:7",
    texto: "Lancem sobre ele toda a sua ansiedade, porque ele tem cuidado de vocês.",
    tema: "Cuidado de Deus",
    reflexao: "Deus não apenas permite que levemos nossas ansiedades a Ele - Ele nos convida a fazê-lo porque se importa profundamente conosco.",
    imagem: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop"
  },
  {
    id: 35,
    referencia: "Mateus 28:20",
    texto: "E eu estarei sempre com vocês, até o fim dos tempos.",
    tema: "Presença de Deus",
    reflexao: "A promessa da presença constante de Jesus nos dá coragem para enfrentar qualquer situação, sabendo que nunca estamos sozinhos.",
    imagem: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop"
  },
  {
    id: 36,
    referencia: "Salmos 103:12",
    texto: "Quanto o oriente está longe do ocidente, assim ele afasta para longe de nós as nossas transgressões.",
    tema: "Perdão",
    reflexao: "O perdão de Deus é completo e definitivo. Ele não apenas perdoa nossos pecados, mas os remove completamente de nós.",
    imagem: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
  },
  {
    id: 37,
    referencia: "Efésios 3:20",
    texto: "Àquele que é capaz de fazer infinitamente mais do que tudo o que pedimos ou pensamos.",
    tema: "Poder de Deus",
    reflexao: "Deus não está limitado por nossa imaginação. Ele pode fazer muito além do que ousamos sonhar ou pedir em oração.",
    imagem: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop"
  },
  {
    id: 38,
    referencia: "Provérbios 16:3",
    texto: "Consagre ao Senhor tudo o que você faz, e os seus planos serão bem-sucedidos.",
    tema: "Sucesso",
    reflexao: "O verdadeiro sucesso vem quando dedicamos nossos planos e ações a Deus, permitindo que Ele dirija nossos passos.",
    imagem: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=400&fit=crop"
  },
  {
    id: 39,
    referencia: "João 16:33",
    texto: "Eu lhes disse essas coisas para que em mim vocês tenham paz. Neste mundo vocês terão aflições; contudo, tenham ânimo! Eu venci o mundo.",
    tema: "Vitória",
    reflexao: "As dificuldades são inevitáveis, mas a vitória já está garantida em Cristo. Podemos ter paz mesmo em meio às tempestades da vida.",
    imagem: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&h=400&fit=crop"
  },
  {
    id: 40,
    referencia: "Salmos 121:1-2",
    texto: "Elevo os meus olhos para os montes: de onde me vem o socorro? O meu socorro vem do Senhor.",
    tema: "Socorro",
    reflexao: "Quando olhamos para Deus em busca de ajuda, encontramos o socorro que vem do Criador do céu e da terra - um socorro seguro e poderoso.",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: 41,
    referencia: "Romanos 5:8",
    texto: "Mas Deus demonstra seu amor por nós: Cristo morreu em nosso favor quando ainda éramos pecadores.",
    tema: "Amor Sacrificial",
    reflexao: "O amor de Deus não esperou que fôssemos perfeitos. Ele nos amou e se sacrificou por nós quando ainda estávamos em pecado.",
    imagem: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop"
  },
  {
    id: 42,
    referencia: "Hebreus 13:5",
    texto: "Nunca o deixarei, nunca o abandonarei.",
    tema: "Fidelidade",
    reflexao: "A fidelidade de Deus é inabalável. Mesmo quando somos infiéis, Ele permanece fiel, nunca nos abandonando ou deixando sozinhos.",
    imagem: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop"
  },
  {
    id: 43,
    referencia: "Salmos 145:18",
    texto: "O Senhor está perto de todos os que o invocam, de todos os que o invocam com sinceridade.",
    tema: "Proximidade de Deus",
    reflexao: "Deus não está distante ou inacessível. Ele está perto de todos que O buscam com um coração sincero e verdadeiro.",
    imagem: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop"
  },
  {
    id: 44,
    referencia: "Mateus 7:7",
    texto: "Peçam, e será dado; busquem, e encontrarão; batam, e a porta será aberta.",
    tema: "Oração",
    reflexao: "Deus nos convida a ser persistentes em oração. Quando pedimos, buscamos e batemos com fé, Ele responde de acordo com Sua vontade perfeita.",
    imagem: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
  },
  {
    id: 45,
    referencia: "1 João 1:9",
    texto: "Se confessarmos os nossos pecados, ele é fiel e justo para perdoar os nossos pecados e nos purificar de toda injustiça.",
    tema: "Confissão",
    reflexao: "A confissão abre a porta para o perdão e a purificação. Deus é fiel em perdoar quando reconhecemos nossos erros com sinceridade.",
    imagem: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop"
  },
  {
    id: 46,
    referencia: "Isaías 43:2",
    texto: "Quando você atravessar as águas, eu estarei com você; quando você atravessar os rios, eles não o encobrirão.",
    tema: "Proteção Divina",
    reflexao: "Deus não promete ausência de dificuldades, mas Sua presença constante em meio a elas. Ele nos sustenta nas águas mais profundas.",
    imagem: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=400&fit=crop"
  },
  {
    id: 47,
    referencia: "Salmos 55:22",
    texto: "Entregue suas preocupações ao Senhor, e ele o susterá; jamais permitirá que o justo venha a cair.",
    tema: "Sustento",
    reflexao: "Quando entregamos nossas preocupações a Deus, Ele nos sustenta com Sua força. Podemos confiar que Ele não permitirá nossa queda.",
    imagem: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&h=400&fit=crop"
  },
  {
    id: 48,
    referencia: "João 10:10",
    texto: "O ladrão vem apenas para roubar, matar e destruir; eu vim para que tenham vida, e a tenham plenamente.",
    tema: "Vida Abundante",
    reflexao: "Jesus não oferece apenas sobrevivência, mas vida abundante e plena. Ele veio para que experimentemos a vida em toda sua plenitude.",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: 49,
    referencia: "Provérbios 18:10",
    texto: "O nome do Senhor é uma torre forte; os justos correm para ela e estão seguros.",
    tema: "Segurança",
    reflexao: "No nome do Senhor encontramos segurança verdadeira. Ele é nossa torre forte, um refúgio inabalável em tempos de perigo.",
    imagem: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop"
  },
  {
    id: 50,
    referencia: "Romanos 15:13",
    texto: "Que o Deus da esperança os encha de toda alegria e paz, por sua confiança nele.",
    tema: "Esperança",
    reflexao: "Deus é a fonte de toda esperança. Quando confiamos Nele, Ele enche nosso coração de alegria e paz que transcendem as circunstâncias.",
    imagem: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop"
  },
  {
    id: 51,
    referencia: "Salmos 18:2",
    texto: "O Senhor é a minha rocha, a minha fortaleza e o meu libertador.",
    tema: "Fortaleza",
    reflexao: "Deus é nossa base sólida, nossa proteção segura e nosso libertador poderoso. Nele encontramos tudo o que precisamos para vencer.",
    imagem: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop"
  },
  {
    id: 52,
    referencia: "Mateus 5:16",
    texto: "Assim brilhe a luz de vocês diante dos homens, para que vejam as suas boas obras.",
    tema: "Testemunho",
    reflexao: "Nossa vida deve ser um testemunho visível do amor de Deus. Nossas ações falam mais alto que palavras e glorificam ao Pai.",
    imagem: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
  },
  {
    id: 53,
    referencia: "Tiago 1:5",
    texto: "Se algum de vocês tem falta de sabedoria, peça-a a Deus, que a todos dá livremente.",
    tema: "Sabedoria",
    reflexao: "Deus não retém sabedoria daqueles que a buscam. Ele a concede generosamente a todos que pedem com fé e humildade.",
    imagem: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop"
  },
  {
    id: 54,
    referencia: "Salmos 62:8",
    texto: "Confiem nele o tempo todo, ó povo; desabafem o coração diante dele.",
    tema: "Confiança",
    reflexao: "Deus nos convida a confiar Nele em todos os momentos e a abrir nosso coração completamente. Ele é digno de toda nossa confiança.",
    imagem: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=400&fit=crop"
  },
  {
    id: 55,
    referencia: "1 Coríntios 10:13",
    texto: "Não sobreveio a vocês tentação que não fosse comum aos homens. E Deus é fiel.",
    tema: "Tentação",
    reflexao: "Nenhuma tentação é maior que a fidelidade de Deus. Ele sempre providencia uma saída e a força necessária para resistir.",
    imagem: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&h=400&fit=crop"
  },
  {
    id: 56,
    referencia: "João 14:27",
    texto: "Deixo-lhes a paz; a minha paz lhes dou. Não a dou como o mundo a dá.",
    tema: "Paz",
    reflexao: "A paz de Jesus é diferente da paz que o mundo oferece. É uma paz profunda que permanece mesmo em meio às tempestades da vida.",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: 57,
    referencia: "Salmos 32:8",
    texto: "Eu o instruirei e o ensinarei no caminho que você deve seguir.",
    tema: "Direção",
    reflexao: "Deus não nos deixa caminhar às cegas. Ele promete nos instruir e guiar em cada passo, mostrando o caminho certo a seguir.",
    imagem: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop"
  },
  {
    id: 58,
    referencia: "Efésios 6:10",
    texto: "Finalmente, fortaleçam-se no Senhor e no seu forte poder.",
    tema: "Força Espiritual",
    reflexao: "Nossa força espiritual não vem de nós mesmos, mas do poder do Senhor. Nele encontramos a força para vencer todas as batalhas.",
    imagem: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop"
  },
  {
    id: 59,
    referencia: "Provérbios 4:23",
    texto: "Acima de tudo, guarde o seu coração, pois dele depende toda a sua vida.",
    tema: "Coração",
    reflexao: "O coração é a fonte de nossas ações e decisões. Proteger nosso coração com a Palavra de Deus é essencial para uma vida plena.",
    imagem: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop"
  },
  {
    id: 60,
    referencia: "Mateus 6:34",
    texto: "Portanto, não se preocupem com o amanhã, pois o amanhã trará as suas próprias preocupações.",
    tema: "Ansiedade",
    reflexao: "Viver um dia de cada vez é a chave para vencer a ansiedade. Deus nos dá graça suficiente para hoje, não para amanhã.",
    imagem: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
  },
  {
    id: 61,
    referencia: "Salmos 100:5",
    texto: "Pois o Senhor é bom e o seu amor leal é eterno.",
    tema: "Bondade",
    reflexao: "A bondade e o amor de Deus não têm fim. Sua fidelidade se estende de geração em geração, permanecendo para sempre.",
    imagem: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop"
  },
  {
    id: 62,
    referencia: "Romanos 10:17",
    texto: "Consequentemente, a fé vem por se ouvir a mensagem.",
    tema: "Fé",
    reflexao: "A fé cresce quando ouvimos e meditamos na Palavra de Deus. Quanto mais conhecemos Sua Palavra, mais nossa fé se fortalece.",
    imagem: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=400&fit=crop"
  },
  {
    id: 63,
    referencia: "João 8:32",
    texto: "E conhecerão a verdade, e a verdade os libertará.",
    tema: "Verdade",
    reflexao: "A verdade de Deus tem poder libertador. Quando conhecemos a verdade em Cristo, somos libertos de toda mentira e escravidão.",
    imagem: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&h=400&fit=crop"
  },
  {
    id: 64,
    referencia: "Salmos 16:11",
    texto: "Tu me farás conhecer a vereda da vida, a alegria plena da tua presença.",
    tema: "Alegria",
    reflexao: "A verdadeira alegria não está nas circunstâncias, mas na presença de Deus. Nele encontramos alegria plena e duradoura.",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: 65,
    referencia: "2 Coríntios 12:9",
    texto: "Minha graça é suficiente para você, pois o meu poder se aperfeiçoa na fraqueza.",
    tema: "Graça",
    reflexao: "Nossa fraqueza é oportunidade para o poder de Deus se manifestar. Quando reconhecemos nossa fragilidade, Sua graça nos sustenta.",
    imagem: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop"
  },
  {
    id: 66,
    referencia: "Provérbios 22:6",
    texto: "Ensine a criança no caminho em que deve andar.",
    tema: "Educação",
    reflexao: "A educação espiritual desde cedo estabelece fundamentos sólidos para a vida. Investir na formação das crianças é investir no futuro.",
    imagem: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop"
  },
  {
    id: 67,
    referencia: "Mateus 22:37-39",
    texto: "Ame o Senhor, o seu Deus, de todo o seu coração, de toda a sua alma e de todo o seu entendimento.",
    tema: "Amor",
    reflexao: "O maior mandamento é amar a Deus completamente e amar ao próximo como a nós mesmos. Nestes dois mandamentos resume-se toda a lei.",
    imagem: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop"
  },
  {
    id: 68,
    referencia: "Salmos 73:26",
    texto: "O meu corpo e o meu coração poderão fraquejar, mas Deus é a força do meu coração.",
    tema: "Força",
    reflexao: "Mesmo quando nossas forças físicas e emocionais se esgotam, Deus permanece como nossa força inabalável e eterna.",
    imagem: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
  },
  {
    id: 69,
    referencia: "João 1:12",
    texto: "Contudo, aos que o receberam, deu-lhes o direito de se tornarem filhos de Deus.",
    tema: "Adoção",
    reflexao: "Quando recebemos Jesus, somos adotados na família de Deus. Tornamo-nos Seus filhos com todos os direitos e privilégios dessa posição.",
    imagem: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop"
  },
  {
    id: 70,
    referencia: "Hebreus 12:1",
    texto: "Corramos com perseverança a corrida que nos é proposta.",
    tema: "Perseverança",
    reflexao: "A vida cristã é uma maratona, não uma corrida de velocidade. Precisamos de perseverança para completar a jornada com fidelidade.",
    imagem: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=400&fit=crop"
  },
  {
    id: 71,
    referencia: "Salmos 150:6",
    texto: "Tudo o que tem vida louve o Senhor! Aleluia!",
    tema: "Louvor",
    reflexao: "O louvor é a resposta natural de toda criatura ao Criador. Fomos criados para adorar e glorificar a Deus em tudo.",
    imagem: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&h=400&fit=crop"
  },
  {
    id: 72,
    referencia: "Apocalipse 21:4",
    texto: "Ele enxugará dos seus olhos toda lágrima. Não haverá mais morte, nem tristeza.",
    tema: "Esperança Eterna",
    reflexao: "Um dia todas as lágrimas serão enxugadas e toda dor terá fim. Esta esperança nos sustenta nas dificuldades presentes.",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: 73,
    referencia: "Salmos 19:14",
    texto: "Que as palavras da minha boca e a meditação do meu coração sejam agradáveis a ti, Senhor.",
    tema: "Oração",
    reflexao: "Nossas palavras e pensamentos devem ser agradáveis a Deus. Esta deve ser nossa oração constante - que tudo em nós O glorifique.",
    imagem: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop"
  },
  {
    id: 74,
    referencia: "Gálatas 6:9",
    texto: "E não nos cansemos de fazer o bem, pois no tempo próprio colheremos.",
    tema: "Perseverança",
    reflexao: "Fazer o bem pode ser cansativo, mas a colheita virá no tempo certo. Não desista - Deus vê e recompensará sua fidelidade.",
    imagem: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop"
  },
  {
    id: 75,
    referencia: "Salmos 51:10",
    texto: "Cria em mim um coração puro, ó Deus, e renova dentro de mim um espírito estável.",
    tema: "Renovação",
    reflexao: "Precisamos constantemente pedir a Deus que renove nosso coração e espírito. Somente Ele pode nos purificar e restaurar completamente.",
    imagem: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop"
  },
  {
    id: 76,
    referencia: "Marcos 11:24",
    texto: "Portanto, eu lhes digo: tudo o que vocês pedirem em oração, creiam que já o receberam.",
    tema: "Fé",
    reflexao: "A fé verdadeira crê antes de ver. Quando oramos com fé genuína, confiamos que Deus já está agindo em nosso favor.",
    imagem: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
  },
  {
    id: 77,
    referencia: "Salmos 126:3",
    texto: "O Senhor fez grandes coisas por nós, e estamos alegres.",
    tema: "Gratidão",
    reflexao: "Lembrar das grandes coisas que Deus fez por nós enche nosso coração de alegria e gratidão. Ele é digno de todo louvor.",
    imagem: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop"
  },
  {
    id: 78,
    referencia: "1 Tessalonicenses 5:16-18",
    texto: "Alegrem-se sempre, orem continuamente, deem graças em todas as circunstâncias.",
    tema: "Gratidão",
    reflexao: "Alegria constante, oração contínua e gratidão em tudo - este é o estilo de vida que Deus deseja para nós em todas as situações.",
    imagem: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=400&fit=crop"
  },
  {
    id: 79,
    referencia: "Salmos 42:11",
    texto: "Por que você está assim tão triste, ó minha alma? Ponha a sua esperança em Deus!",
    tema: "Esperança",
    reflexao: "Quando a tristeza nos abate, precisamos lembrar nossa alma de colocar a esperança em Deus. Ele é nossa âncora segura.",
    imagem: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&h=400&fit=crop"
  },
  {
    id: 80,
    referencia: "Atos 1:8",
    texto: "Mas receberão poder quando o Espírito Santo descer sobre vocês.",
    tema: "Poder do Espírito",
    reflexao: "O Espírito Santo nos capacita com poder sobrenatural para sermos testemunhas de Cristo. Não dependemos de nossa própria força.",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: 81,
    referencia: "Salmos 84:11",
    texto: "Pois o Senhor Deus é sol e escudo; o Senhor concede favor e honra.",
    tema: "Provisão",
    reflexao: "Deus é nossa luz que ilumina e nosso escudo que protege. Ele não retém nenhum bem daqueles que andam em integridade.",
    imagem: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop"
  },
  {
    id: 82,
    referencia: "Isaías 26:3",
    texto: "Tu, Senhor, guardarás em perfeita paz aquele cujo propósito está firme.",
    tema: "Paz",
    reflexao: "A paz perfeita vem quando mantemos nossa mente focada em Deus. Confiar Nele traz tranquilidade mesmo em meio ao caos.",
    imagem: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop"
  },
  {
    id: 83,
    referencia: "Provérbios 3:9-10",
    texto: "Honre o Senhor com todos os seus recursos e com os primeiros frutos de todas as suas colheitas.",
    tema: "Generosidade",
    reflexao: "Quando honramos a Deus com nossas primícias, demonstramos que Ele é nossa prioridade. Ele promete abençoar nossa generosidade.",
    imagem: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop"
  },
  {
    id: 84,
    referencia: "Mateus 11:29",
    texto: "Tomem sobre vocês o meu jugo e aprendam de mim, pois sou manso e humilde de coração.",
    tema: "Humildade",
    reflexao: "Jesus nos convida a aprender Dele a mansidão e humildade. Estas qualidades trazem descanso para nossa alma.",
    imagem: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
  },
  {
    id: 85,
    referencia: "Salmos 90:12",
    texto: "Ensina-nos a contar os nossos dias, para que o nosso coração alcance sabedoria.",
    tema: "Sabedoria",
    reflexao: "Reconhecer a brevidade da vida nos leva a viver com sabedoria. Cada dia é precioso e deve ser vivido com propósito.",
    imagem: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop"
  },
  {
    id: 86,
    referencia: "João 13:34",
    texto: "Um novo mandamento lhes dou: Amem-se uns aos outros.",
    tema: "Amor",
    reflexao: "O amor mútuo entre os cristãos é a marca distintiva dos discípulos de Jesus. É assim que o mundo reconhece que somos Seus.",
    imagem: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=400&fit=crop"
  },
  {
    id: 87,
    referencia: "Romanos 12:12",
    texto: "Alegrem-se na esperança, sejam pacientes na tribulação, perseverem na oração.",
    tema: "Esperança",
    reflexao: "A tríade da vida cristã vitoriosa: alegria na esperança, paciência nas dificuldades e perseverança na oração.",
    imagem: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&h=400&fit=crop"
  },
  {
    id: 88,
    referencia: "Salmos 25:4-5",
    texto: "Mostra-me, Senhor, os teus caminhos, ensina-me as tuas veredas.",
    tema: "Direção",
    reflexao: "Buscar a direção de Deus é sinal de sabedoria. Ele promete nos ensinar e guiar em Seus caminhos perfeitos.",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: 89,
    referencia: "Filipenses 2:3-4",
    texto: "Nada façam por ambição egoísta ou por vaidade, mas humildemente considerem os outros superiores a si mesmos.",
    tema: "Humildade",
    reflexao: "A verdadeira humildade se manifesta quando colocamos os interesses dos outros acima dos nossos próprios.",
    imagem: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop"
  },
  {
    id: 90,
    referencia: "Salmos 147:3",
    texto: "Ele sara os de coração quebrantado e cuida das suas feridas.",
    tema: "Cura",
    reflexao: "Deus é especialista em curar corações quebrantados. Ele não apenas cura, mas cuida amorosamente de cada ferida.",
    imagem: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop"
  },
  {
    id: 91,
    referencia: "Isaías 54:10",
    texto: "Embora as montanhas se retirem e as colinas sejam removidas, o meu amor por você jamais mudará.",
    tema: "Amor Eterno",
    reflexao: "O amor de Deus é mais firme que as montanhas. Mesmo que tudo ao redor mude, Seu amor permanece constante e inabalável.",
    imagem: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop"
  },
  {
    id: 92,
    referencia: "Mateus 5:9",
    texto: "Bem-aventurados os pacificadores, pois serão chamados filhos de Deus.",
    tema: "Paz",
    reflexao: "Promover a paz é uma característica dos filhos de Deus. Somos chamados a ser agentes de reconciliação em um mundo dividido.",
    imagem: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
  },
  {
    id: 93,
    referencia: "Salmos 30:5",
    texto: "Pois a sua ira dura apenas um instante, mas o seu favor dura a vida toda.",
    tema: "Misericórdia",
    reflexao: "A disciplina de Deus é momentânea, mas Seu favor é eterno. Sua misericórdia sempre prevalece sobre o juízo.",
    imagem: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop"
  },
  {
    id: 94,
    referencia: "João 4:24",
    texto: "Deus é espírito, e é necessário que os seus adoradores o adorem em espírito e em verdade.",
    tema: "Adoração",
    reflexao: "A verdadeira adoração vai além de rituais externos. Deus busca adoradores que O adorem com sinceridade de coração.",
    imagem: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=400&fit=crop"
  },
  {
    id: 95,
    referencia: "Provérbios 15:1",
    texto: "A resposta calma desvia a fúria, mas a palavra ríspida desperta a ira.",
    tema: "Sabedoria",
    reflexao: "Nossas palavras têm poder para acalmar ou inflamar situações. A sabedoria nos ensina a responder com mansidão.",
    imagem: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&h=400&fit=crop"
  },
  {
    id: 96,
    referencia: "Salmos 118:24",
    texto: "Este é o dia que o Senhor fez; regozijemo-nos e alegremo-nos nele.",
    tema: "Alegria",
    reflexao: "Cada dia é um presente de Deus. Escolher a alegria diariamente é uma decisão que transforma nossa perspectiva.",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: 97,
    referencia: "Romanos 8:31",
    texto: "Se Deus é por nós, quem será contra nós?",
    tema: "Vitória",
    reflexao: "Com Deus ao nosso lado, nenhuma oposição pode prevalecer. Sua presença garante nossa vitória final.",
    imagem: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop"
  },
  {
    id: 98,
    referencia: "Salmos 133:1",
    texto: "Como é bom e agradável quando os irmãos convivem em união!",
    tema: "Unidade",
    reflexao: "A unidade entre os irmãos é preciosa aos olhos de Deus. Ela traz bênção e reflete o coração do Pai.",
    imagem: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop"
  },
  {
    id: 99,
    referencia: "Mateus 6:9-10",
    texto: "Pai nosso, que estás nos céus, santificado seja o teu nome. Venha o teu Reino.",
    tema: "Oração",
    reflexao: "Jesus nos ensinou a orar colocando Deus em primeiro lugar - Seu nome, Seu reino e Sua vontade acima de tudo.",
    imagem: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop"
  },
  {
    id: 100,
    referencia: "Salmos 40:1",
    texto: "Esperei com paciência no Senhor; ele se inclinou para mim e ouviu o meu grito de socorro.",
    tema: "Paciência",
    reflexao: "Esperar pacientemente em Deus não é passividade, mas confiança ativa. Ele sempre ouve e responde no tempo certo.",
    imagem: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
  },
  {
    id: 101,
    referencia: "Isaías 55:8-9",
    texto: "Pois os meus pensamentos não são os pensamentos de vocês, nem os seus caminhos são os meus caminhos.",
    tema: "Soberania",
    reflexao: "Os caminhos de Deus são infinitamente superiores aos nossos. Confiar em Sua sabedoria é reconhecer Sua soberania.",
    imagem: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop"
  },
  {
    id: 102,
    referencia: "João 11:25",
    texto: "Eu sou a ressurreição e a vida. Aquele que crê em mim, ainda que morra, viverá.",
    tema: "Vida Eterna",
    reflexao: "Jesus não apenas promete vida eterna - Ele é a própria vida eterna. Nele, a morte não tem a última palavra.",
    imagem: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=400&fit=crop"
  },
  {
    id: 103,
    referencia: "Salmos 139:23-24",
    texto: "Sonda-me, ó Deus, e conhece o meu coração; prova-me e conhece as minhas inquietações.",
    tema: "Autoexame",
    reflexao: "Convidar Deus a examinar nosso coração é um ato de humildade e desejo de santidade. Ele revela o que precisa ser transformado.",
    imagem: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&h=400&fit=crop"
  },
  {
    id: 104,
    referencia: "Provérbios 11:25",
    texto: "O generoso prosperará; quem dá alívio aos outros, alívio receberá.",
    tema: "Generosidade",
    reflexao: "A generosidade cria um ciclo de bênçãos. Quando abençoamos outros, Deus nos abençoa de volta de maneiras inesperadas.",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: 105,
    referencia: "Mateus 5:44",
    texto: "Mas eu lhes digo: Amem os seus inimigos e orem por aqueles que os perseguem.",
    tema: "Amor",
    reflexao: "Amar os inimigos é um amor sobrenatural que só é possível através do poder de Deus em nós. É a marca do discípulo maduro.",
    imagem: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop"
  },
  {
    id: 106,
    referencia: "Salmos 68:19",
    texto: "Bendito seja o Senhor, que dia a dia carrega os nossos fardos.",
    tema: "Cuidado",
    reflexao: "Deus não apenas nos ajuda ocasionalmente - Ele carrega nossos fardos diariamente. Seu cuidado é constante e fiel.",
    imagem: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop"
  },
  {
    id: 107,
    referencia: "Romanos 12:1",
    texto: "Portanto, irmãos, rogo-lhes que se ofereçam em sacrifício vivo, santo e agradável a Deus.",
    tema: "Consagração",
    reflexao: "A verdadeira adoração é oferecer nossa vida inteira a Deus. Não apenas momentos de culto, mas cada aspecto do nosso ser.",
    imagem: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop"
  },
  {
    id: 108,
    referencia: "Salmos 95:1-2",
    texto: "Venham! Cantemos ao Senhor! Aclamemos a Rocha da nossa salvação!",
    tema: "Louvor",
    reflexao: "O louvor é uma resposta alegre à bondade de Deus. Ele é nossa rocha firme e merece toda nossa adoração.",
    imagem: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
  },
  {
    id: 109,
    referencia: "João 6:35",
    texto: "Então Jesus declarou: 'Eu sou o pão da vida. Aquele que vem a mim nunca terá fome.'",
    tema: "Satisfação",
    reflexao: "Jesus é a única fonte de satisfação verdadeira. Nele, nossa fome espiritual mais profunda é completamente saciada.",
    imagem: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop"
  },
  {
    id: 110,
    referencia: "Salmos 143:8",
    texto: "De manhã faze-me ouvir a tua bondade, pois em ti confio.",
    tema: "Confiança",
    reflexao: "Começar o dia buscando a Deus estabelece o fundamento de confiança para enfrentar qualquer desafio que vier.",
    imagem: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=400&fit=crop"
  },
  {
    id: 111,
    referencia: "Isaías 40:8",
    texto: "A erva murcha e cai a sua flor, mas a palavra do nosso Deus permanece para sempre.",
    tema: "Palavra de Deus",
    reflexao: "Tudo neste mundo é temporário e passageiro, mas a Palavra de Deus é eterna e imutável. Podemos confiar nela completamente.",
    imagem: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&h=400&fit=crop"
  },
  {
    id: 112,
    referencia: "Mateus 18:20",
    texto: "Pois onde se reunirem dois ou três em meu nome, ali eu estou no meio deles.",
    tema: "Comunhão",
    reflexao: "A presença de Jesus é garantida quando nos reunimos em Seu nome. A comunhão cristã traz a presença manifesta de Deus.",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: 113,
    referencia: "Salmos 86:5",
    texto: "Tu, Senhor, és bom, e estás pronto a perdoar; rico em amor para com todos os que te invocam.",
    tema: "Perdão",
    reflexao: "Deus não apenas pode perdoar - Ele está pronto e disposto a fazê-lo. Seu amor abundante está disponível para todos que O buscam.",
    imagem: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop"
  },
  {
    id: 114,
    referencia: "Provérbios 17:17",
    texto: "Em todo tempo ama o amigo, e na angústia se faz o irmão.",
    tema: "Amizade",
    reflexao: "A verdadeira amizade é testada nas dificuldades. Um amigo fiel permanece ao nosso lado tanto na alegria quanto na tristeza.",
    imagem: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop"
  },
  {
    id: 115,
    referencia: "João 8:12",
    texto: "Eu sou a luz do mundo. Quem me segue, nunca andará em trevas.",
    tema: "Luz",
    reflexao: "Jesus é a luz que dissipa toda escuridão. Seguir a Ele significa caminhar em clareza, verdade e direção divina.",
    imagem: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop"
  },
  {
    id: 116,
    referencia: "Salmos 34:18",
    texto: "Perto está o Senhor dos que têm o coração quebrantado.",
    tema: "Consolo",
    reflexao: "Deus não está distante em nosso sofrimento - Ele se aproxima especialmente dos que estão com o coração quebrantado.",
    imagem: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
  },
  {
    id: 117,
    referencia: "Romanos 6:23",
    texto: "Pois o salário do pecado é a morte, mas o dom gratuito de Deus é a vida eterna.",
    tema: "Salvação",
    reflexao: "O contraste é claro: o pecado leva à morte, mas Deus oferece vida eterna como presente gratuito através de Jesus.",
    imagem: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop"
  },
  {
    id: 118,
    referencia: "Salmos 107:1",
    texto: "Deem graças ao Senhor porque ele é bom; o seu amor dura para sempre!",
    tema: "Gratidão",
    reflexao: "A bondade e o amor eterno de Deus são razões permanentes para gratidão. Ele merece nosso louvor constante.",
    imagem: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=400&fit=crop"
  },
  {
    id: 119,
    referencia: "Mateus 7:12",
    texto: "Assim, em tudo, façam aos outros o que vocês querem que eles lhes façam.",
    tema: "Regra de Ouro",
    reflexao: "Esta regra simples resume toda a ética cristã: tratar os outros como gostaríamos de ser tratados.",
    imagem: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&h=400&fit=crop"
  },
  {
    id: 120,
    referencia: "Salmos 145:9",
    texto: "O Senhor é bom para todos; ele se compadece de tudo o que fez.",
    tema: "Bondade",
    reflexao: "A bondade de Deus se estende a toda Sua criação. Sua compaixão não tem limites nem exceções.",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: 121,
    referencia: "Isaías 41:13",
    texto: "Pois eu sou o Senhor, o seu Deus, que o segura pela mão direita.",
    tema: "Proteção",
    reflexao: "Deus não apenas nos guia - Ele nos segura pela mão. Sua presença é pessoal, próxima e protetora.",
    imagem: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop"
  },
  {
    id: 122,
    referencia: "João 14:1",
    texto: "Não se perturbe o coração de vocês. Creiam em Deus; creiam também em mim.",
    tema: "Paz",
    reflexao: "A fé em Deus e em Jesus é o antídoto para a perturbação do coração. Crer traz paz em meio às tempestades.",
    imagem: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop"
  },
  {
    id: 123,
    referencia: "Salmos 56:3",
    texto: "Quando eu tiver medo, confiarei em ti.",
    tema: "Confiança",
    reflexao: "O medo é uma emoção humana natural, mas a confiança em Deus é a resposta sobrenatural que vence o medo.",
    imagem: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop"
  },
  {
    id: 124,
    referencia: "Provérbios 16:9",
    texto: "O coração do homem planeja o seu caminho, mas o Senhor lhe dirige os passos.",
    tema: "Direção",
    reflexao: "Podemos fazer planos, mas é Deus quem dirige nossos passos. Submeter nossos planos a Ele garante o melhor caminho.",
    imagem: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
  },
  {
    id: 125,
    referencia: "Mateus 5:6",
    texto: "Bem-aventurados os que têm fome e sede de justiça, pois serão satisfeitos.",
    tema: "Justiça",
    reflexao: "Ter fome e sede de justiça é desejar ardentemente a vontade de Deus. Esse desejo será plenamente satisfeito.",
    imagem: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop"
  },
  {
    id: 126,
    referencia: "Salmos 31:24",
    texto: "Sejam fortes e corajosos, todos vocês que esperam no Senhor!",
    tema: "Coragem",
    reflexao: "A coragem verdadeira vem de esperar no Senhor. Ele fortalece nosso coração e nos capacita para enfrentar qualquer desafio.",
    imagem: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=400&fit=crop"
  },
  {
    id: 127,
    referencia: "Romanos 8:26",
    texto: "Da mesma forma o Espírito nos ajuda em nossa fraqueza.",
    tema: "Ajuda",
    reflexao: "O Espírito Santo não nos abandona em nossa fraqueza - Ele vem em nosso auxílio, intercedendo por nós.",
    imagem: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&h=400&fit=crop"
  },
  {
    id: 128,
    referencia: "Salmos 119:11",
    texto: "Guardei no coração a tua palavra para não pecar contra ti.",
    tema: "Palavra",
    reflexao: "Guardar a Palavra de Deus no coração é a melhor defesa contra o pecado. Ela nos guia e protege.",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: 129,
    referencia: "João 10:11",
    texto: "Eu sou o bom pastor. O bom pastor dá a sua vida pelas ovelhas.",
    tema: "Cuidado",
    reflexao: "Jesus não é apenas um pastor - Ele é o bom pastor que amou tanto Suas ovelhas que deu Sua vida por elas.",
    imagem: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop"
  },
  {
    id: 130,
    referencia: "Salmos 103:2-3",
    texto: "Bendiga o Senhor a minha alma! Não esqueça nenhuma de suas bênçãos!",
    tema: "Gratidão",
    reflexao: "Lembrar das bênçãos de Deus mantém nosso coração grato. Ele nos perdoa, cura e coroa de amor e compaixão.",
    imagem: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop"
  },
  {
    id: 131,
    referencia: "Isaías 9:6",
    texto: "Porque um menino nos nasceu, um filho nos foi dado, e o governo está sobre os seus ombros.",
    tema: "Messias",
    reflexao: "Jesus é o Messias prometido - Conselheiro Maravilhoso, Deus Forte, Pai da Eternidade, Príncipe da Paz.",
    imagem: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop"
  },
  {
    id: 132,
    referencia: "Mateus 5:8",
    texto: "Bem-aventurados os puros de coração, pois verão a Deus.",
    tema: "Pureza",
    reflexao: "A pureza de coração nos capacita a ver Deus. Não é perfeição, mas sinceridade e integridade diante Dele.",
    imagem: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
  },
  {
    id: 133,
    referencia: "Salmos 63:1",
    texto: "Ó Deus, tu és o meu Deus; de madrugada te buscarei.",
    tema: "Busca",
    reflexao: "Buscar a Deus desde cedo demonstra que Ele é nossa prioridade. Nossa alma tem sede Dele acima de tudo.",
    imagem: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop"
  },
  {
    id: 134,
    referencia: "Provérbios 3:7-8",
    texto: "Não seja sábio aos seus próprios olhos; tema o Senhor e evite o mal.",
    tema: "Sabedoria",
    reflexao: "A verdadeira sabedoria começa com humildade - reconhecer que precisamos de Deus e não de nossa própria compreensão.",
    imagem: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=400&fit=crop"
  },
  {
    id: 135,
    referencia: "João 15:13",
    texto: "Ninguém tem maior amor do que este: de dar alguém a própria vida pelos seus amigos.",
    tema: "Amor",
    reflexao: "O maior amor é sacrificial. Jesus demonstrou esse amor supremo ao dar Sua vida por nós.",
    imagem: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&h=400&fit=crop"
  },
  {
    id: 136,
    referencia: "Salmos 71:5",
    texto: "Pois tu és a minha esperança, ó Soberano Senhor, a minha confiança desde a minha juventude.",
    tema: "Esperança",
    reflexao: "Deus é nossa esperança desde a juventude até a velhice. Ele é fiel em todas as estações da vida.",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: 137,
    referencia: "Romanos 5:3-4",
    texto: "Mas também nos gloriamos nas tribulações, porque sabemos que a tribulação produz perseverança.",
    tema: "Perseverança",
    reflexao: "As tribulações não são obstáculos, mas oportunidades de desenvolver perseverança, caráter e esperança.",
    imagem: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop"
  },
  {
    id: 138,
    referencia: "Salmos 119:130",
    texto: "A revelação das tuas palavras traz luz e dá discernimento aos inexperientes.",
    tema: "Luz",
    reflexao: "A Palavra de Deus ilumina nossa compreensão e nos dá sabedoria, mesmo quando somos inexperientes.",
    imagem: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop"
  },
  {
    id: 139,
    referencia: "Mateus 6:21",
    texto: "Pois onde estiver o seu tesouro, aí também estará o seu coração.",
    tema: "Prioridades",
    reflexao: "Nosso coração segue nosso tesouro. O que valorizamos mais revela onde está nosso verdadeiro foco.",
    imagem: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop"
  },
  {
    id: 140,
    referencia: "Salmos 28:7",
    texto: "O Senhor é a minha força e o meu escudo; nele o meu coração confia.",
    tema: "Força",
    reflexao: "Quando confiamos em Deus como nossa força e escudo, nosso coração encontra segurança e proteção verdadeiras.",
    imagem: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
  },
  {
    id: 141,
    referencia: "Isaías 53:5",
    texto: "Mas ele foi transpassado por causa das nossas transgressões, foi esmagado por causa de nossas iniquidades.",
    tema: "Redenção",
    reflexao: "Jesus sofreu em nosso lugar, levando sobre Si o castigo que merecíamos. Por Suas feridas fomos sarados.",
    imagem: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop"
  },
  {
    id: 142,
    referencia: "João 3:3",
    texto: "Em verdade, em verdade te digo que, se alguém não nascer de novo, não pode ver o Reino de Deus.",
    tema: "Novo Nascimento",
    reflexao: "O novo nascimento espiritual é essencial para entrar no Reino de Deus. É uma transformação radical operada pelo Espírito Santo.",
    imagem: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=400&fit=crop"
  },
  {
    id: 143,
    referencia: "Salmos 119:9",
    texto: "Como pode o jovem manter pura a sua conduta? Vivendo de acordo com a tua palavra.",
    tema: "Pureza",
    reflexao: "A pureza de vida vem de viver de acordo com a Palavra de Deus. Ela é nosso guia para uma conduta santa.",
    imagem: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&h=400&fit=crop"
  },
  {
    id: 144,
    referencia: "Provérbios 12:25",
    texto: "A ansiedade no coração do homem o abate, mas a boa palavra o alegra.",
    tema: "Alegria",
    reflexao: "Palavras de encorajamento têm poder para transformar a ansiedade em alegria. Sejamos portadores de boas palavras.",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: 145,
    referencia: "Mateus 5:7",
    texto: "Bem-aventurados os misericordiosos, pois obterão misericórdia.",
    tema: "Misericórdia",
    reflexao: "A misericórdia que demonstramos aos outros retorna para nós. Deus nos trata com a mesma medida que usamos.",
    imagem: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop"
  },
  {
    id: 146,
    referencia: "Salmos 119:165",
    texto: "Grande paz têm os que amam a tua lei; para eles não há tropeço.",
    tema: "Paz",
    reflexao: "Amar a lei de Deus traz paz profunda e estabilidade. Ela nos guarda de tropeços e nos mantém firmes.",
    imagem: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop"
  },
  {
    id: 147,
    referencia: "Romanos 12:21",
    texto: "Não se deixe vencer pelo mal, mas vença o mal com o bem.",
    tema: "Vitória",
    reflexao: "A verdadeira vitória sobre o mal não vem de retaliação, mas de responder com bondade e amor.",
    imagem: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop"
  },
  {
    id: 148,
    referencia: "Salmos 37:5",
    texto: "Entregue o seu caminho ao Senhor; confie nele, e ele agirá.",
    tema: "Confiança",
    reflexao: "Quando entregamos nosso caminho a Deus e confiamos Nele, Ele age em nosso favor de maneiras surpreendentes.",
    imagem: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
  },
  {
    id: 149,
    referencia: "João 14:21",
    texto: "Quem tem os meus mandamentos e lhes obedece, esse é o que me ama.",
    tema: "Obediência",
    reflexao: "O verdadeiro amor a Jesus se manifesta em obediência. Não é apenas sentimento, mas ação concreta.",
    imagem: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop"
  },
  {
    id: 150,
    referencia: "Salmos 118:6",
    texto: "O Senhor está comigo; não temerei. O que me podem fazer os homens?",
    tema: "Coragem",
    reflexao: "Com Deus ao nosso lado, não há razão para temer. Nenhuma oposição humana pode prevalecer contra Sua presença.",
    imagem: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=400&fit=crop"
  },
  {
    id: 151,
    referencia: "Isaías 40:29",
    texto: "Ele dá força ao cansado e aumenta o vigor do fraco.",
    tema: "Força",
    reflexao: "Quando nossas forças se esgotam, Deus renova nosso vigor. Ele é especialista em fortalecer os fracos e cansados.",
    imagem: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&h=400&fit=crop"
  },
  {
    id: 152,
    referencia: "Mateus 6:14-15",
    texto: "Pois, se perdoarem as ofensas uns dos outros, o Pai celestial também lhes perdoará.",
    tema: "Perdão",
    reflexao: "O perdão que oferecemos aos outros está diretamente ligado ao perdão que recebemos de Deus. Perdoar é essencial.",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: 153,
    referencia: "Salmos 119:114",
    texto: "Tu és o meu refúgio e o meu escudo; na tua palavra ponho a minha esperança.",
    tema: "Esperança",
    reflexao: "A Palavra de Deus é o fundamento seguro de nossa esperança. Nela encontramos refúgio e proteção.",
    imagem: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop"
  },
  {
    id: 154,
    referencia: "Provérbios 10:12",
    texto: "O ódio provoca dissensão, mas o amor cobre todos os pecados.",
    tema: "Amor",
    reflexao: "O amor tem poder de cobrir falhas e restaurar relacionamentos. Ele constrói pontes onde o ódio constrói muros.",
    imagem: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop"
  },
  {
    id: 155,
    referencia: "João 1:1",
    texto: "No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.",
    tema: "Palavra",
    reflexao: "Jesus é a Palavra viva de Deus. Ele existia desde o princípio e é a revelação completa do Pai.",
    imagem: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop"
  },
  {
    id: 156,
    referencia: "Salmos 34:4",
    texto: "Busquei o Senhor, e ele me respondeu; livrou-me de todos os meus temores.",
    tema: "Libertação",
    reflexao: "Quando buscamos o Senhor, Ele responde e nos liberta de nossos medos. Sua presença dissipa todo temor.",
    imagem: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
  },
  {
    id: 157,
    referencia: "Romanos 8:1",
    texto: "Portanto, agora já não há condenação para os que estão em Cristo Jesus.",
    tema: "Liberdade",
    reflexao: "Em Cristo, somos completamente livres da condenação. Não há mais culpa ou vergonha para quem está Nele.",
    imagem: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop"
  },
  {
    id: 158,
    referencia: "Salmos 119:105",
    texto: "A tua palavra é lâmpada que ilumina os meus passos e luz que clareia o meu caminho.",
    tema: "Orientação",
    reflexao: "A Palavra de Deus não apenas ilumina nossos passos imediatos, mas também clareia todo o caminho à frente.",
    imagem: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=400&fit=crop"
  },
  {
    id: 159,
    referencia: "Mateus 5:5",
    texto: "Bem-aventurados os mansos, pois eles herdarão a terra.",
    tema: "Mansidão",
    reflexao: "A mansidão não é fraqueza, mas força sob controle. Os mansos confiam em Deus e herdarão Suas promessas.",
    imagem: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&h=400&fit=crop"
  },
  {
    id: 160,
    referencia: "Salmos 9:9",
    texto: "O Senhor é refúgio para os oprimidos, uma torre segura na hora da adversidade.",
    tema: "Refúgio",
    reflexao: "Nas horas mais difíceis, Deus é nosso refúgio seguro. Ele protege e ampara os oprimidos com Sua força.",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: 161,
    referencia: "Isaías 43:1",
    texto: "Mas agora, assim diz o Senhor que o criou: Não tema, pois eu o resgatei; eu o chamei pelo nome; você é meu.",
    tema: "Identidade",
    reflexao: "Deus nos conhece pelo nome e nos chama de Seus. Nossa identidade está segura em quem Ele diz que somos.",
    imagem: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop"
  },
  {
    id: 162,
    referencia: "João 6:37",
    texto: "Todo aquele que o Pai me der virá a mim, e quem vier a mim eu jamais rejeitarei.",
    tema: "Aceitação",
    reflexao: "Jesus nunca rejeita aqueles que vêm a Ele. Sua aceitação é completa e incondicional para todos que O buscam.",
    imagem: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop"
  },
  {
    id: 163,
    referencia: "Salmos 145:13",
    texto: "O teu reino é reino eterno, e o teu domínio permanece de geração em geração.",
    tema: "Reino",
    reflexao: "O reino de Deus é eterno e inabalável. Seu domínio permanece para sempre, transcendendo todas as gerações.",
    imagem: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop"
  },
  {
    id: 164,
    referencia: "Provérbios 19:21",
    texto: "Muitos são os planos no coração do homem, mas o que prevalece é o propósito do Senhor.",
    tema: "Propósito",
    reflexao: "Podemos fazer muitos planos, mas é o propósito de Deus que prevalece. Submeter nossos planos a Ele é sabedoria.",
    imagem: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
  },
  {
    id: 165,
    referencia: "Mateus 5:4",
    texto: "Bem-aventurados os que choram, pois serão consolados.",
    tema: "Consolo",
    reflexao: "Deus promete consolo para os que choram. Ele não ignora nossa dor, mas vem pessoalmente nos confortar.",
    imagem: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop"
  },
  {
    id: 166,
    referencia: "Salmos 147:5",
    texto: "Grande é o nosso Soberano e tremendo é o seu poder; é impossível medir o seu entendimento.",
    tema: "Grandeza",
    reflexao: "A grandeza de Deus é imensurável. Seu poder e entendimento vão além de nossa compreensão humana.",
    imagem: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=400&fit=crop"
  },
  {
    id: 167,
    referencia: "Romanos 8:11",
    texto: "E, se o Espírito daquele que ressuscitou Jesus dentre os mortos habita em vocês, aquele que ressuscitou a Cristo dentre os mortos também dará vida a seus corpos mortais.",
    tema: "Ressurreição",
    reflexao: "O mesmo poder que ressuscitou Jesus habita em nós. Esse poder nos dá vida e nos capacita para viver em vitória.",
    imagem: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&h=400&fit=crop"
  },
  {
    id: 168,
    referencia: "Salmos 119:76",
    texto: "Que o teu amor infalível seja o meu consolo, conforme a promessa que fizeste ao teu servo.",
    tema: "Consolo",
    reflexao: "O amor infalível de Deus é nossa fonte de consolo. Suas promessas são firmes e nos sustentam em toda situação.",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: 169,
    referencia: "João 17:3",
    texto: "Esta é a vida eterna: que te conheçam, o único Deus verdadeiro, e a Jesus Cristo, a quem enviaste.",
    tema: "Vida Eterna",
    reflexao: "A vida eterna não é apenas duração, mas qualidade - conhecer intimamente a Deus e a Jesus Cristo.",
    imagem: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop"
  },
  {
    id: 170,
    referencia: "Salmos 103:8",
    texto: "O Senhor é compassivo e misericordioso, paciente e transbordante de amor.",
    tema: "Misericórdia",
    reflexao: "O caráter de Deus é definido por compaixão, misericórdia, paciência e amor abundante. Ele é bom em essência.",
    imagem: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop"
  },
  {
    id: 171,
    referencia: "Isaías 58:11",
    texto: "O Senhor o guiará constantemente; satisfará os seus desejos numa terra ressequida pelo sol.",
    tema: "Orientação",
    reflexao: "Deus nos guia constantemente, mesmo nos lugares mais áridos da vida. Ele satisfaz nossos desejos mais profundos.",
    imagem: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop"
  },
  {
    id: 172,
    referencia: "Mateus 5:3",
    texto: "Bem-aventurados os pobres em espírito, pois deles é o Reino dos céus.",
    tema: "Humildade",
    reflexao: "Reconhecer nossa pobreza espiritual é o primeiro passo para receber o Reino de Deus. A humildade abre as portas do céu.",
    imagem: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
  },
  {
    id: 173,
    referencia: "Salmos 119:50",
    texto: "Este é o meu consolo no sofrimento: a tua promessa dá-me vida.",
    tema: "Consolo",
    reflexao: "As promessas de Deus são fonte de vida e consolo no sofrimento. Elas nos sustentam quando tudo mais falha.",
    imagem: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop"
  },
  {
    id: 174,
    referencia: "Provérbios 14:12",
    texto: "Há um caminho que ao homem parece direito, mas no final conduz à morte.",
    tema: "Sabedoria",
    reflexao: "Nem todo caminho que parece certo é o caminho de Deus. Precisamos de Sua sabedoria para discernir o caminho verdadeiro.",
    imagem: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=400&fit=crop"
  },
  {
    id: 175,
    referencia: "João 12:46",
    texto: "Eu vim ao mundo como luz, para que todo aquele que crê em mim não permaneça nas trevas.",
    tema: "Luz",
    reflexao: "Jesus veio como luz para dissipar as trevas. Crer Nele significa sair da escuridão e viver na luz.",
    imagem: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&h=400&fit=crop"
  },
  {
    id: 176,
    referencia: "Salmos 138:7",
    texto: "Quando eu andar em meio à tribulação, tu me preservarás a vida.",
    tema: "Proteção",
    reflexao: "Deus não apenas nos protege da tribulação, mas nos preserva em meio a ela. Sua mão nos sustenta nas dificuldades.",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: 177,
    referencia: "Romanos 8:37",
    texto: "Em todas estas coisas, porém, somos mais que vencedores, por meio daquele que nos amou.",
    tema: "Vitória",
    reflexao: "Não somos apenas vencedores, mas mais que vencedores em Cristo. Seu amor nos garante vitória esmagadora.",
    imagem: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop"
  },
  {
    id: 178,
    referencia: "Salmos 119:28",
    texto: "A minha alma está consumida de tristeza; fortalece-me segundo a tua palavra.",
    tema: "Força",
    reflexao: "Quando a tristeza nos consome, a Palavra de Deus é nossa fonte de fortalecimento e renovação.",
    imagem: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop"
  },
  {
    id: 179,
    referencia: "Mateus 4:4",
    texto: "Nem só de pão viverá o homem, mas de toda palavra que procede da boca de Deus.",
    tema: "Palavra",
    reflexao: "A Palavra de Deus é tão essencial para nossa vida espiritual quanto o pão é para nossa vida física.",
    imagem: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop"
  },
  {
    id: 180,
    referencia: "Salmos 86:15",
    texto: "Mas tu, Senhor, és Deus compassivo e misericordioso, paciente, cheio de amor e de fidelidade.",
    tema: "Caráter de Deus",
    reflexao: "O caráter de Deus é perfeito - Ele é compassivo, misericordioso, paciente, amoroso e fiel em todas as circunstâncias.",
    imagem: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
  },
  {
    id: 181,
    referencia: "Isaías 12:2",
    texto: "Deus é a minha salvação; terei confiança e não temerei.",
    tema: "Salvação",
    reflexao: "Quando Deus é nossa salvação, podemos viver sem medo. Nossa confiança está segura Nele.",
    imagem: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop"
  },
  {
    id: 182,
    referencia: "João 5:24",
    texto: "Quem ouve a minha palavra e crê naquele que me enviou tem a vida eterna.",
    tema: "Vida Eterna",
    reflexao: "A vida eterna não é apenas futura - ela começa agora para quem ouve e crê em Jesus.",
    imagem: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=400&fit=crop"
  },
  {
    id: 183,
    referencia: "Salmos 119:143",
    texto: "Aflição e angústia se apoderaram de mim, mas os teus mandamentos são o meu prazer.",
    tema: "Alegria",
    reflexao: "Mesmo em meio à aflição, encontramos prazer nos mandamentos de Deus. Eles são fonte de alegria verdadeira.",
    imagem: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&h=400&fit=crop"
  },
  {
    id: 184,
    referencia: "Provérbios 21:21",
    texto: "Quem busca a justiça e o amor encontra vida, prosperidade e honra.",
    tema: "Justiça",
    reflexao: "Buscar justiça e amor traz bênçãos múltiplas - vida plena, prosperidade verdadeira e honra duradoura.",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: 185,
    referencia: "Mateus 9:13",
    texto: "Vão aprender o que significa isto: 'Desejo misericórdia, não sacrifícios.'",
    tema: "Misericórdia",
    reflexao: "Deus valoriza mais a misericórdia do que rituais religiosos. Ele busca corações compassivos, não apenas ações externas.",
    imagem: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop"
  },
  {
    id: 186,
    referencia: "Salmos 119:160",
    texto: "Toda a tua palavra é verdade; todas as tuas justas ordenanças são eternas.",
    tema: "Verdade",
    reflexao: "A Palavra de Deus é verdade absoluta e eterna. Suas ordenanças permanecem firmes para sempre.",
    imagem: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop"
  },
  {
    id: 187,
    referencia: "Romanos 8:15",
    texto: "Pois vocês não receberam um espírito que os escravize para novamente temerem, mas receberam o Espírito que os adota como filhos.",
    tema: "Adoção",
    reflexao: "Não somos escravos vivendo em medo, mas filhos adotados por Deus. Temos liberdade e intimidade com o Pai.",
    imagem: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop"
  },
  {
    id: 188,
    referencia: "Salmos 119:71",
    texto: "Foi bom para mim ter sido castigado, para que aprendesse os teus decretos.",
    tema: "Disciplina",
    reflexao: "A disciplina de Deus, embora difícil, é boa para nós. Ela nos ensina e nos aproxima de Seus caminhos.",
    imagem: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
  },
  {
    id: 189,
    referencia: "João 7:38",
    texto: "Quem crer em mim, como diz a Escritura, do seu interior fluirão rios de água viva.",
    tema: "Espírito Santo",
    reflexao: "O Espírito Santo em nós é como rios de água viva - uma fonte inesgotável de vida, poder e refrigério.",
    imagem: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop"
  },
  {
    id: 190,
    referencia: "Salmos 103:13",
    texto: "Como um pai tem compaixão de seus filhos, assim o Senhor tem compaixão dos que o temem.",
    tema: "Compaixão",
    reflexao: "A compaixão de Deus por nós é como a de um pai amoroso. Ele nos compreende e nos trata com ternura.",
    imagem: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=400&fit=crop"
  },
  {
    id: 191,
    referencia: "Isaías 30:21",
    texto: "Quer você se volte para a direita quer para a esquerda, uma voz nas suas costas dirá a você: 'Este é o caminho; siga por ele.'",
    tema: "Direção",
    reflexao: "Deus promete nos guiar claramente em cada encruzilhada. Sua voz nos direciona para o caminho certo.",
    imagem: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&h=400&fit=crop"
  },
  {
    id: 192,
    referencia: "Mateus 10:31",
    texto: "Portanto, não tenham medo; vocês valem mais do que muitos pardais!",
    tema: "Valor",
    reflexao: "Somos preciosos aos olhos de Deus. Se Ele cuida dos pardais, quanto mais cuidará de nós!",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: 193,
    referencia: "Salmos 119:89",
    texto: "A tua palavra, Senhor, para sempre está firmada nos céus.",
    tema: "Palavra Eterna",
    reflexao: "A Palavra de Deus é eterna e imutável. Ela permanece firmada nos céus, confiável para sempre.",
    imagem: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop"
  },
  {
    id: 194,
    referencia: "Provérbios 29:25",
    texto: "O temor dos homens é uma armadilha, mas quem confia no Senhor está seguro.",
    tema: "Confiança",
    reflexao: "Temer a opinião dos outros nos aprisiona, mas confiar em Deus nos liberta e nos mantém seguros.",
    imagem: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop"
  },
  {
    id: 195,
    referencia: "João 20:29",
    texto: "Bem-aventurados os que não viram e creram.",
    tema: "Fé",
    reflexao: "A fé verdadeira não depende de ver para crer. Bem-aventurados são aqueles que creem sem ver.",
    imagem: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop"
  },
  {
    id: 196,
    referencia: "Salmos 119:162",
    texto: "Regozijo-me na tua promessa como alguém que encontra grandes despojos.",
    tema: "Alegria",
    reflexao: "As promessas de Deus são tesouros preciosos. Encontrar alegria nelas é como descobrir grandes riquezas.",
    imagem: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
  },
  {
    id: 197,
    referencia: "Romanos 8:32",
    texto: "Aquele que não poupou seu próprio Filho, mas o entregou por todos nós, como não nos dará juntamente com ele todas as coisas?",
    tema: "Generosidade",
    reflexao: "Se Deus deu Seu maior tesouro - Jesus - certamente nos dará tudo o que precisamos. Sua generosidade é ilimitada.",
    imagem: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop"
  },
  {
    id: 198,
    referencia: "Salmos 119:18",
    texto: "Abre os meus olhos para que eu veja as maravilhas da tua lei.",
    tema: "Revelação",
    reflexao: "Precisamos que Deus abra nossos olhos espirituais para enxergar as maravilhas de Sua Palavra.",
    imagem: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=400&fit=crop"
  },
  {
    id: 199,
    referencia: "Mateus 11:30",
    texto: "Pois o meu jugo é suave e o meu fardo é leve.",
    tema: "Descanso",
    reflexao: "O jugo de Jesus não é pesado - é suave e leve. Seguir a Ele traz descanso, não exaustão.",
    imagem: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&h=400&fit=crop"
  },
  {
    id: 200,
    referencia: "Salmos 119:103",
    texto: "Como são doces para o meu paladar as tuas palavras! Mais que o mel para a minha boca!",
    tema: "Palavra",
    reflexao: "A Palavra de Deus é mais doce que o mel. Ela satisfaz nossa alma de maneira única e prazerosa.",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: 201,
    referencia: "Isaías 61:1",
    texto: "O Espírito do Soberano Senhor está sobre mim, porque o Senhor ungiu-me para levar boas notícias aos pobres.",
    tema: "Unção",
    reflexao: "A unção do Espírito Santo nos capacita para levar boas notícias e libertar os cativos. Somos ungidos com propósito.",
    imagem: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop"
  },
  {
    id: 202,
    referencia: "João 16:24",
    texto: "Peçam, e vocês receberão, para que a alegria de vocês seja completa.",
    tema: "Alegria",
    reflexao: "Deus deseja que nossa alegria seja completa. Ele nos convida a pedir para que possamos receber e nos alegrar.",
    imagem: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop"
  },
  {
    id: 203,
    referencia: "Salmos 119:133",
    texto: "Dirige os meus passos conforme a tua palavra; não permitas que nenhum pecado me domine.",
    tema: "Direção",
    reflexao: "A Palavra de Deus dirige nossos passos e nos protege do domínio do pecado. Ela é nosso guia seguro.",
    imagem: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop"
  },
  {
    id: 204,
    referencia: "Provérbios 27:17",
    texto: "Como o ferro afia o ferro, o homem afia o seu companheiro.",
    tema: "Amizade",
    reflexao: "Amizades verdadeiras nos afinam e aprimoram. Precisamos de relacionamentos que nos desafiem a crescer.",
    imagem: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
  },
  {
    id: 205,
    referencia: "Mateus 16:24",
    texto: "Se alguém quiser acompanhar-me, negue-se a si mesmo, tome a sua cruz e siga-me.",
    tema: "Discipulado",
    reflexao: "Seguir a Jesus requer abnegação e compromisso. É um chamado para morrer para si mesmo e viver para Ele.",
    imagem: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop"
  },
  {
    id: 206,
    referencia: "Salmos 119:140",
    texto: "As tuas promessas foram bem testadas, e o teu servo as ama.",
    tema: "Promessas",
    reflexao: "As promessas de Deus foram testadas e provadas verdadeiras. Podemos amá-las e confiar nelas completamente.",
    imagem: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=400&fit=crop"
  },
  {
    id: 207,
    referencia: "Romanos 8:16",
    texto: "O próprio Espírito testemunha ao nosso espírito que somos filhos de Deus.",
    tema: "Identidade",
    reflexao: "O Espírito Santo confirma em nosso interior que somos filhos de Deus. Nossa identidade é assegurada por Ele.",
    imagem: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&h=400&fit=crop"
  },
  {
    id: 208,
    referencia: "Salmos 119:97",
    texto: "Como eu amo a tua lei! Medito nela o dia inteiro.",
    tema: "Meditação",
    reflexao: "Meditar na lei de Deus o dia todo demonstra amor profundo por Sua Palavra. Ela deve ocupar nossos pensamentos.",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: 209,
    referencia: "João 21:17",
    texto: "Senhor, tu sabes todas as coisas e sabes que te amo.",
    tema: "Amor",
    reflexao: "Jesus conhece nosso coração completamente. Ele sabe quando nosso amor por Ele é genuíno e verdadeiro.",
    imagem: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop"
  },
  {
    id: 210,
    referencia: "Salmos 119:111",
    texto: "Os teus testemunhos são a minha herança para sempre; eles são a alegria do meu coração.",
    tema: "Herança",
    reflexao: "A Palavra de Deus é nossa herança eterna. Ela traz alegria duradoura ao nosso coração.",
    imagem: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop"
  },
  {
    id: 211,
    referencia: "Isaías 65:24",
    texto: "Antes de me invocarem, eu responderei; ainda não estarão falando, e eu os ouvirei.",
    tema: "Oração",
    reflexao: "Deus conhece nossas necessidades antes mesmo de orarmos. Ele está pronto para responder antes de pedirmos.",
    imagem: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop"
  },
  {
    id: 212,
    referencia: "Mateus 19:26",
    texto: "Jesus olhou para eles e respondeu: 'Para o homem é impossível, mas para Deus todas as coisas são possíveis.'",
    tema: "Possibilidades",
    reflexao: "O que é impossível para nós é possível para Deus. Não há limites para o que Ele pode fazer.",
    imagem: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
  },
  {
    id: 213,
    referencia: "Salmos 119:147",
    texto: "Levanto-me antes da alvorada e clamo por ajuda; na tua palavra ponho a minha esperança.",
    tema: "Esperança",
    reflexao: "Buscar a Deus desde cedo demonstra dependência e esperança em Sua Palavra. Ele é nossa primeira prioridade.",
    imagem: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop"
  },
  {
    id: 214,
    referencia: "Provérbios 31:25",
    texto: "Reveste-se de força e dignidade; sorri diante do futuro.",
    tema: "Força",
    reflexao: "Quando nos revestimos da força de Deus, podemos encarar o futuro com confiança e alegria.",
    imagem: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=400&fit=crop"
  },
  {
    id: 215,
    referencia: "João 15:16",
    texto: "Vocês não me escolheram, mas eu os escolhi para irem e darem fruto.",
    tema: "Chamado",
    reflexao: "Fomos escolhidos por Jesus com um propósito - dar fruto que permaneça. Nosso chamado é intencional.",
    imagem: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&h=400&fit=crop"
  },
  {
    id: 216,
    referencia: "Salmos 119:151",
    texto: "Contudo, tu estás perto, Senhor, e todos os teus mandamentos são verdadeiros.",
    tema: "Proximidade",
    reflexao: "Deus está sempre perto de nós. Sua proximidade e a verdade de Seus mandamentos são certezas inabaláveis.",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: 217,
    referencia: "Romanos 8:18",
    texto: "Considero que os nossos sofrimentos atuais não podem ser comparados com a glória que em nós será revelada.",
    tema: "Glória",
    reflexao: "Os sofrimentos presentes são temporários e incomparáveis à glória eterna que nos aguarda em Cristo.",
    imagem: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop"
  },
  {
    id: 218,
    referencia: "Salmos 119:164",
    texto: "Sete vezes por dia eu te louvo por tuas justas ordenanças.",
    tema: "Louvor",
    reflexao: "O louvor constante a Deus deve marcar nossos dias. Suas ordenanças justas merecem nossa adoração contínua.",
    imagem: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop"
  },
  {
    id: 219,
    referencia: "Mateus 25:40",
    texto: "O Rei responderá: 'Digo-lhes a verdade: O que vocês fizeram a algum dos meus menores irmãos, a mim o fizeram.'",
    tema: "Serviço",
    reflexao: "Servir aos necessitados é servir a Jesus. Nosso serviço aos outros é um ato de adoração a Ele.",
    imagem: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop"
  },
  {
    id: 220,
    referencia: "Salmos 119:174",
    texto: "Anseio pela tua salvação, Senhor, e a tua lei é o meu prazer.",
    tema: "Salvação",
    reflexao: "Ansiar pela salvação de Deus e ter prazer em Sua lei são marcas de um coração que O ama verdadeiramente.",
    imagem: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
  },
  {
    id: 221,
    referencia: "Isaías 7:14",
    texto: "Portanto, o Senhor mesmo lhes dará um sinal: a virgem ficará grávida e dará à luz um filho, e o chamará Emanuel.",
    tema: "Emanuel",
    reflexao: "Emanuel significa 'Deus conosco'. Jesus é o cumprimento desta profecia - Deus habitando entre nós.",
    imagem: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop"
  },
  {
    id: 222,
    referencia: "João 19:30",
    texto: "Quando Jesus provou o vinagre, disse: 'Está consumado!' Com isso, curvou a cabeça e entregou o espírito.",
    tema: "Consumação",
    reflexao: "Na cruz, Jesus completou a obra da redenção. 'Está consumado' significa que nossa salvação está completa.",
    imagem: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=400&fit=crop"
  },
  {
    id: 223,
    referencia: "Salmos 119:175",
    texto: "Que eu viva para te louvar, e que as tuas ordenanças me sustentem.",
    tema: "Louvor",
    reflexao: "Viver para louvar a Deus é nosso propósito maior. Suas ordenanças nos sustentam nessa jornada.",
    imagem: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&h=400&fit=crop"
  },
  {
    id: 224,
    referencia: "Provérbios 4:18",
    texto: "A vereda dos justos é como a luz da aurora, que brilha cada vez mais até a plena claridade do dia.",
    tema: "Crescimento",
    reflexao: "O caminho dos justos é progressivo - brilha cada vez mais. Nosso crescimento espiritual é contínuo e crescente.",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: 225,
    referencia: "Mateus 28:19-20",
    texto: "Portanto, vão e façam discípulos de todas as nações, batizando-os em nome do Pai e do Filho e do Espírito Santo.",
    tema: "Grande Comissão",
    reflexao: "Fazer discípulos é nossa missão. Somos chamados a compartilhar o evangelho e ensinar outros a seguir Jesus.",
    imagem: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop"
  },
  {
    id: 226,
    referencia: "Salmos 119:176",
    texto: "Perdi-me como ovelha desgarrada. Busca o teu servo, pois não me esqueci dos teus mandamentos.",
    tema: "Busca",
    reflexao: "Mesmo quando nos perdemos, Deus nos busca. Ele é o bom pastor que vai atrás da ovelha perdida.",
    imagem: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop"
  },
  {
    id: 227,
    referencia: "Romanos 8:35",
    texto: "Quem nos separará do amor de Cristo? Será tribulação, ou angústia, ou perseguição, ou fome, ou nudez, ou perigo, ou espada?",
    tema: "Amor Inseparável",
    reflexao: "Nada pode nos separar do amor de Cristo. Nenhuma circunstância, por mais difícil que seja, pode romper esse vínculo.",
    imagem: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop"
  },
  {
    id: 228,
    referencia: "Salmos 119:1",
    texto: "Como são felizes os que andam em caminhos irrepreensíveis, que vivem conforme a lei do Senhor!",
    tema: "Felicidade",
    reflexao: "A verdadeira felicidade vem de viver em obediência a Deus. Andar em Seus caminhos traz alegria genuína.",
    imagem: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
  },
  {
    id: 229,
    referencia: "João 11:35",
    texto: "Jesus chorou.",
    tema: "Compaixão",
    reflexao: "O versículo mais curto da Bíblia revela o coração compassivo de Jesus. Ele se comove com nossa dor.",
    imagem: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop"
  },
  {
    id: 230,
    referencia: "Salmos 119:2",
    texto: "Como são felizes os que guardam os seus testemunhos e de todo o coração o buscam!",
    tema: "Busca",
    reflexao: "Buscar a Deus de todo coração e guardar Seus testemunhos resulta em felicidade verdadeira e duradoura.",
    imagem: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=400&fit=crop"
  },
  {
    id: 231,
    referencia: "Isaías 1:18",
    texto: "Venham, vamos refletir juntos, diz o Senhor. Embora os seus pecados sejam vermelhos como escarlate, eles se tornarão brancos como a neve.",
    tema: "Perdão",
    reflexao: "Deus pode transformar completamente nossos pecados. O que era vermelho como escarlate torna-se branco como neve.",
    imagem: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&h=400&fit=crop"
  },
  {
    id: 232,
    referencia: "Mateus 5:10",
    texto: "Bem-aventurados os perseguidos por causa da justiça, pois deles é o Reino dos céus.",
    tema: "Perseguição",
    reflexao: "Sofrer perseguição por causa da justiça é uma bênção. O Reino dos céus pertence aos que permanecem fiéis.",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: 233,
    referencia: "Salmos 119:7",
    texto: "Eu te louvarei com um coração sincero quando aprender as tuas justas ordenanças.",
    tema: "Louvor",
    reflexao: "Aprender as ordenanças de Deus leva a um louvor sincero. Conhecer Sua justiça inspira adoração verdadeira.",
    imagem: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop"
  },
  {
    id: 234,
    referencia: "Provérbios 1:7",
    texto: "O temor do Senhor é o princípio do conhecimento, mas os insensatos desprezam a sabedoria e a disciplina.",
    tema: "Sabedoria",
    reflexao: "Todo conhecimento verdadeiro começa com o temor do Senhor. Respeitar a Deus é o fundamento da sabedoria.",
    imagem: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop"
  },
  {
    id: 235,
    referencia: "João 14:2",
    texto: "Na casa de meu Pai há muitos aposentos; se não fosse assim, eu lhes teria dito. Vou preparar-lhes lugar.",
    tema: "Céu",
    reflexao: "Jesus está preparando um lugar para nós no céu. Nossa morada eterna está sendo preparada pelo próprio Salvador.",
    imagem: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop"
  },
  {
    id: 236,
    referencia: "Salmos 119:12",
    texto: "Bendito sejas tu, Senhor! Ensina-me os teus decretos.",
    tema: "Ensino",
    reflexao: "Bendizer a Deus e pedir que Ele nos ensine demonstra humildade e desejo de crescer em Seu conhecimento.",
    imagem: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
  },
  {
    id: 237,
    referencia: "Romanos 8:14",
    texto: "Porque todos os que são guiados pelo Espírito de Deus são filhos de Deus.",
    tema: "Filiação",
    reflexao: "Ser guiado pelo Espírito Santo é a marca dos filhos de Deus. Sua direção confirma nossa identidade em Cristo.",
    imagem: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop"
  },
  {
    id: 238,
    referencia: "Salmos 119:14",
    texto: "Regozijo-me em seguir os teus testemunhos como quem possui grandes riquezas.",
    tema: "Alegria",
    reflexao: "Os testemunhos de Deus são mais valiosos que riquezas materiais. Seguir Sua Palavra traz alegria incomparável.",
    imagem: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=400&fit=crop"
  },
  {
    id: 239,
    referencia: "Mateus 5:11-12",
    texto: "Bem-aventurados serão vocês quando, por minha causa, os insultarem, os perseguirem e levantarem todo tipo de calúnia contra vocês.",
    tema: "Bem-aventurança",
    reflexao: "Sofrer por causa de Cristo é motivo de alegria. Grande é nossa recompensa nos céus quando permanecemos fiéis.",
    imagem: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&h=400&fit=crop"
  },
  {
    id: 240,
    referencia: "Salmos 119:15",
    texto: "Meditarei nos teus preceitos e considerarei os teus caminhos.",
    tema: "Meditação",
    reflexao: "Meditar nos preceitos de Deus e considerar Seus caminhos nos aproxima Dele e transforma nossa mente.",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: 241,
    referencia: "Isaías 52:7",
    texto: "Como são belos sobre os montes os pés daqueles que anunciam boas notícias!",
    tema: "Evangelismo",
    reflexao: "Anunciar o evangelho é belo aos olhos de Deus. Levar boas notícias de salvação é um privilégio sagrado.",
    imagem: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop"
  },
  {
    id: 242,
    referencia: "João 14:13",
    texto: "E eu farei o que vocês pedirem em meu nome, para que o Pai seja glorificado no Filho.",
    tema: "Oração",
    reflexao: "Orar em nome de Jesus tem poder. Ele responde nossas orações para que o Pai seja glorificado.",
    imagem: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop"
  },
  {
    id: 243,
    referencia: "Salmos 119:16",
    texto: "Terei prazer nos teus decretos; não me esquecerei da tua palavra.",
    tema: "Prazer",
    reflexao: "Ter prazer nos decretos de Deus e não esquecer Sua palavra são escolhas que transformam nossa vida.",
    imagem: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop"
  },
  {
    id: 244,
    referencia: "Provérbios 2:6",
    texto: "Pois o Senhor dá sabedoria; de sua boca procedem o conhecimento e o discernimento.",
    tema: "Sabedoria",
    reflexao: "Toda sabedoria verdadeira vem de Deus. Ele é a fonte de conhecimento e discernimento que precisamos.",
    imagem: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
  },
  {
    id: 245,
    referencia: "Mateus 5:13",
    texto: "Vocês são o sal da terra. Mas se o sal perder o seu sabor, como restaurá-lo?",
    tema: "Influência",
    reflexao: "Como sal, devemos influenciar positivamente o mundo ao nosso redor. Nossa presença deve fazer diferença.",
    imagem: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop"
  },
  {
    id: 246,
    referencia: "Salmos 119:19",
    texto: "Sou peregrino na terra; não escondas de mim os teus mandamentos.",
    tema: "Peregrinação",
    reflexao: "Somos peregrinos nesta terra, a caminho da eternidade. Precisamos dos mandamentos de Deus para nos guiar.",
    imagem: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=400&fit=crop"
  },
  {
    id: 247,
    referencia: "Romanos 8:17",
    texto: "Se somos filhos, então somos herdeiros; herdeiros de Deus e co-herdeiros com Cristo.",
    tema: "Herança",
    reflexao: "Como filhos de Deus, somos herdeiros de todas as Suas promessas. Compartilhamos a herança com Cristo.",
    imagem: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&h=400&fit=crop"
  },
  {
    id: 248,
    referencia: "Salmos 119:20",
    texto: "A minha alma consome-se de desejo pelos teus juízos em todo o tempo.",
    tema: "Desejo",
    reflexao: "Desejar ardentemente os juízos de Deus demonstra um coração que anseia por Sua presença e verdade.",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: 249,
    referencia: "João 14:16-17",
    texto: "E eu pedirei ao Pai, e ele lhes dará outro Conselheiro para estar com vocês para sempre, o Espírito da verdade.",
    tema: "Espírito Santo",
    reflexao: "O Espírito Santo é nosso Conselheiro eterno. Ele permanece conosco para sempre, guiando-nos em toda verdade.",
    imagem: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop"
  },
  {
    id: 250,
    referencia: "Salmos 119:24",
    texto: "Os teus testemunhos são o meu prazer; eles são os meus conselheiros.",
    tema: "Conselho",
    reflexao: "Os testemunhos de Deus são nossos conselheiros sábios. Neles encontramos direção e prazer verdadeiros.",
    imagem: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop"
  },
  {
    id: 251,
    referencia: "Isaías 53:6",
    texto: "Todos nós, tal qual ovelhas, nos desviamos, cada um de nós se voltou para o seu próprio caminho; e o Senhor fez cair sobre ele a iniquidade de todos nós.",
    tema: "Redenção",
    reflexao: "Todos pecamos e nos desviamos, mas Jesus levou sobre Si a iniquidade de todos nós. Ele pagou o preço da nossa redenção.",
    imagem: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop"
  },
  {
    id: 252,
    referencia: "Mateus 5:14",
    texto: "Vocês são a luz do mundo. Não se pode esconder uma cidade construída sobre um monte.",
    tema: "Luz",
    reflexao: "Nossa luz deve brilhar visivelmente para o mundo. Não podemos esconder o que Deus fez em nós.",
    imagem: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
  },
  {
    id: 253,
    referencia: "Salmos 119:25",
    texto: "Estou prostrado no pó; preserva a minha vida conforme a tua palavra.",
    tema: "Preservação",
    reflexao: "Mesmo quando estamos abatidos, a Palavra de Deus tem poder para preservar e restaurar nossa vida.",
    imagem: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop"
  },
  {
    id: 254,
    referencia: "Provérbios 3:11-12",
    texto: "Meu filho, não despreze a disciplina do Senhor nem se magoe com a sua repreensão.",
    tema: "Disciplina",
    reflexao: "A disciplina de Deus é prova de Seu amor. Ele nos corrige porque nos ama como filhos.",
    imagem: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=400&fit=crop"
  },
  {
    id: 255,
    referencia: "João 14:18",
    texto: "Não os deixarei órfãos; voltarei para vocês.",
    tema: "Presença",
    reflexao: "Jesus prometeu não nos deixar órfãos. Sua presença através do Espírito Santo está sempre conosco.",
    imagem: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&h=400&fit=crop"
  },
  {
    id: 256,
    referencia: "Salmos 119:27",
    texto: "Faze-me compreender o caminho dos teus preceitos, e meditarei nas tuas maravilhas.",
    tema: "Compreensão",
    reflexao: "Pedir compreensão dos preceitos de Deus nos leva a meditar em Suas maravilhas e crescer em sabedoria.",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: 257,
    referencia: "Romanos 8:23",
    texto: "E não só isso, mas também nós, que temos os primeiros frutos do Espírito, gememos interiormente, esperando ansiosamente nossa adoção como filhos.",
    tema: "Esperança",
    reflexao: "Aguardamos ansiosamente a redenção completa. O Espírito em nós é apenas o começo da glória que virá.",
    imagem: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop"
  },
  {
    id: 258,
    referencia: "Salmos 119:29",
    texto: "Guarda-me do caminho da falsidade e concede-me a graça de conhecer a tua lei.",
    tema: "Verdade",
    reflexao: "Precisamos da graça de Deus para nos guardar da falsidade e nos manter no caminho da verdade.",
    imagem: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop"
  },
  {
    id: 259,
    referencia: "Mateus 5:15",
    texto: "E, também, ninguém acende uma candeia e a coloca debaixo de uma vasilha. Ao contrário, coloca-a no lugar apropriado.",
    tema: "Testemunho",
    reflexao: "Nossa luz deve ser visível. Não devemos esconder o que Deus fez em nós, mas deixar que brilhe para todos verem.",
    imagem: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop"
  },
  {
    id: 260,
    referencia: "Salmos 119:30",
    texto: "Escolhi o caminho da fidelidade; decidi seguir as tuas ordenanças.",
    tema: "Fidelidade",
    reflexao: "Escolher a fidelidade e decidir seguir a Deus são decisões diárias que moldam nosso caráter e destino.",
    imagem: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
  },
  {
    id: 261,
    referencia: "Isaías 55:6",
    texto: "Busquem o Senhor enquanto é possível achá-lo; clamem por ele enquanto está perto.",
    tema: "Busca",
    reflexao: "Há um tempo oportuno para buscar a Deus. Não devemos adiar - hoje é o dia de buscá-Lo de todo coração.",
    imagem: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop"
  },
  {
    id: 262,
    referencia: "João 14:23",
    texto: "Respondeu Jesus: 'Se alguém me ama, obedecerá à minha palavra. Meu Pai o amará, nós viremos a ele e faremos morada nele.'",
    tema: "Amor",
    reflexao: "O amor a Jesus se manifesta em obediência. Quando O amamos, o Pai e o Filho fazem morada em nós.",
    imagem: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=400&fit=crop"
  },
  {
    id: 263,
    referencia: "Salmos 119:31",
    texto: "Apego-me aos teus testemunhos, Senhor; não permitas que eu seja humilhado.",
    tema: "Apego",
    reflexao: "Apegar-se aos testemunhos de Deus nos protege da humilhação e nos mantém firmes em nossa fé.",
    imagem: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&h=400&fit=crop"
  },
  {
    id: 264,
    referencia: "Provérbios 4:7",
    texto: "O princípio da sabedoria é: Adquire a sabedoria; sim, com tudo o que possuis adquire o entendimento.",
    tema: "Sabedoria",
    reflexao: "A sabedoria deve ser nossa maior busca. Vale a pena investir tudo para adquirir entendimento verdadeiro.",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: 265,
    referencia: "Mateus 5:17",
    texto: "Não pensem que vim abolir a Lei ou os Profetas; não vim abolir, mas cumprir.",
    tema: "Cumprimento",
    reflexao: "Jesus não veio destruir a lei, mas cumpri-la perfeitamente. Ele é o cumprimento de todas as profecias.",
    imagem: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop"
  },
  {
    id: 266,
    referencia: "Salmos 119:32",
    texto: "Correrei pelo caminho dos teus mandamentos, pois deste liberdade ao meu coração.",
    tema: "Liberdade",
    reflexao: "A verdadeira liberdade vem de seguir os mandamentos de Deus. Eles libertam nosso coração para correr com alegria.",
    imagem: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop"
  },
  {
    id: 267,
    referencia: "Romanos 8:25",
    texto: "Mas, se esperamos o que ainda não temos, aguardamo-lo pacientemente.",
    tema: "Paciência",
    reflexao: "A esperança verdadeira produz paciência. Aguardamos com confiança o que Deus prometeu, mesmo sem ver.",
    imagem: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop"
  },
  {
    id: 268,
    referencia: "Salmos 119:33",
    texto: "Ensina-me, Senhor, a seguir os teus decretos; então os obedecerei até o fim.",
    tema: "Obediência",
    reflexao: "Pedir que Deus nos ensine é o primeiro passo para a obediência duradoura. Precisamos de Sua instrução contínua.",
    imagem: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
  },
  {
    id: 269,
    referencia: "João 14:26",
    texto: "Mas o Conselheiro, o Espírito Santo, que o Pai enviará em meu nome, lhes ensinará todas as coisas.",
    tema: "Ensino",
    reflexao: "O Espírito Santo é nosso mestre divino. Ele nos ensina todas as coisas e nos lembra das palavras de Jesus.",
    imagem: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop"
  },
  {
    id: 270,
    referencia: "Salmos 119:34",
    texto: "Dá-me entendimento, para que eu guarde a tua lei e a ela obedeça de todo o coração.",
    tema: "Entendimento",
    reflexao: "O entendimento divino nos capacita a guardar a lei de Deus com todo nosso coração, não apenas externamente.",
    imagem: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=400&fit=crop"
  },
  {
    id: 271,
    referencia: "Isaías 55:11",
    texto: "Assim também ocorre com a palavra que sai da minha boca: Ela não voltará para mim vazia, mas fará o que desejo.",
    tema: "Palavra Eficaz",
    reflexao: "A Palavra de Deus sempre cumpre seu propósito. Ela é eficaz e realiza tudo aquilo para o qual foi enviada.",
    imagem: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&h=400&fit=crop"
  },
  {
    id: 272,
    referencia: "Mateus 5:18",
    texto: "Digo-lhes a verdade: Enquanto existirem céus e terra, de forma alguma desaparecerá da Lei a menor letra ou o menor traço.",
    tema: "Palavra Eterna",
    reflexao: "A Palavra de Deus é eterna e imutável. Cada detalhe permanecerá até que tudo se cumpra completamente.",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: 273,
    referencia: "Salmos 119:35",
    texto: "Dirige-me pela vereda dos teus mandamentos, pois nela encontro satisfação.",
    tema: "Satisfação",
    reflexao: "A verdadeira satisfação é encontrada em seguir os mandamentos de Deus. Eles nos levam ao caminho da plenitude.",
    imagem: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop"
  },
  {
    id: 274,
    referencia: "Provérbios 6:23",
    texto: "Pois estes mandamentos são uma lâmpada, este ensino é uma luz, e as correções da disciplina são o caminho para a vida.",
    tema: "Luz",
    reflexao: "Os mandamentos de Deus iluminam nosso caminho e a disciplina nos guia para a vida verdadeira.",
    imagem: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop"
  },
  {
    id: 275,
    referencia: "João 14:28",
    texto: "Vocês ouviram que eu disse: Vou, mas volto para vocês. Se vocês me amassem, ficariam contentes porque vou para o Pai.",
    tema: "Retorno",
    reflexao: "Jesus prometeu voltar. Enquanto isso, Ele está com o Pai preparando tudo para nossa eternidade com Ele.",
    imagem: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop"
  },
  {
    id: 276,
    referencia: "Salmos 119:36",
    texto: "Inclina o meu coração para os teus testemunhos e não para a ganância.",
    tema: "Coração",
    reflexao: "Precisamos pedir a Deus que incline nosso coração para Ele, protegendo-nos da ganância e do materialismo.",
    imagem: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
  },
  {
    id: 277,
    referencia: "Romanos 8:27",
    texto: "E aquele que sonda os corações conhece a intenção do Espírito, porque o Espírito intercede pelos santos de acordo com a vontade de Deus.",
    tema: "Intercessão",
    reflexao: "O Espírito Santo intercede por nós de acordo com a vontade de Deus. Ele conhece nosso coração e ora perfeitamente.",
    imagem: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop"
  },
  {
    id: 278,
    referencia: "Salmos 119:37",
    texto: "Desvia os meus olhos das coisas inúteis; preserva a minha vida conforme a tua palavra.",
    tema: "Foco",
    reflexao: "Precisamos pedir a Deus que desvie nossos olhos das distrações inúteis e nos mantenha focados no que realmente importa.",
    imagem: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=400&fit=crop"
  },
  {
    id: 279,
    referencia: "Mateus 5:19",
    texto: "Todo aquele que desobedecer a um desses mandamentos, ainda que dos menores, e ensinar os outros a fazerem o mesmo, será chamado menor no Reino dos céus.",
    tema: "Obediência",
    reflexao: "Cada mandamento de Deus é importante. Nossa obediência e ensino determinam nossa posição no Reino.",
    imagem: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&h=400&fit=crop"
  },
  {
    id: 280,
    referencia: "Salmos 119:38",
    texto: "Cumpre a tua promessa ao teu servo, para que tu sejas temido.",
    tema: "Promessa",
    reflexao: "Deus é fiel em cumprir Suas promessas. Quando Ele age, Seu nome é honrado e Ele é temido com reverência.",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: 281,
    referencia: "Isaías 60:1",
    texto: "Levante-se, resplandece, porque já chegou a sua luz, e a glória do Senhor raiou sobre você.",
    tema: "Glória",
    reflexao: "A glória de Deus brilha sobre nós. Somos chamados a nos levantar e refletir Sua luz para o mundo.",
    imagem: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop"
  },
  {
    id: 282,
    referencia: "João 15:1",
    texto: "Eu sou a videira verdadeira, e meu Pai é o agricultor.",
    tema: "Videira",
    reflexao: "Jesus é a videira verdadeira e nós somos os ramos. Permanecer Nele é essencial para dar fruto.",
    imagem: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop"
  },
  {
    id: 283,
    referencia: "Salmos 119:39",
    texto: "Afasta de mim o opróbrio que temo, pois as tuas ordenanças são boas.",
    tema: "Bondade",
    reflexao: "As ordenanças de Deus são boas e nos protegem do opróbrio. Confiar Nele nos livra do que tememos.",
    imagem: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop"
  },
  {
    id: 284,
    referencia: "Provérbios 8:17",
    texto: "Amo aqueles que me amam, e aqueles que me procuram me encontram.",
    tema: "Amor",
    reflexao: "Deus ama aqueles que O amam. Quando O buscamos sinceramente, Ele se deixa encontrar.",
    imagem: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
  },
  {
    id: 285,
    referencia: "Mateus 5:20",
    texto: "Pois eu lhes digo que, se a justiça de vocês não for muito superior à dos fariseus e mestres da lei, de modo nenhum entrarão no Reino dos céus.",
    tema: "Justiça",
    reflexao: "A justiça que Deus busca vai além da religiosidade externa. Ele deseja transformação genuína do coração.",
    imagem: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop"
  },
  {
    id: 286,
    referencia: "Salmos 119:40",
    texto: "Como anseio pelos teus preceitos! Preserva a minha vida na tua justiça.",
    tema: "Anseio",
    reflexao: "Ansiar pelos preceitos de Deus demonstra um coração que deseja viver em Sua justiça e retidão.",
    imagem: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=400&fit=crop"
  },
  {
    id: 287,
    referencia: "Romanos 8:29",
    texto: "Pois aqueles que de antemão conheceu, também os predestinou para serem conformes à imagem de seu Filho.",
    tema: "Conformidade",
    reflexao: "Deus nos predestinou para sermos semelhantes a Jesus. Ele está nos moldando à imagem de Cristo.",
    imagem: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&h=400&fit=crop"
  },
  {
    id: 288,
    referencia: "Salmos 119:41",
    texto: "Venha a mim o teu amor infalível, Senhor, a tua salvação, conforme a tua promessa.",
    tema: "Salvação",
    reflexao: "O amor infalível de Deus e Sua salvação vêm a nós conforme Suas promessas fiéis e verdadeiras.",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: 289,
    referencia: "João 15:4",
    texto: "Permaneçam em mim, e eu permanecerei em vocês. Nenhum ramo pode dar fruto por si mesmo, se não permanecer na videira.",
    tema: "Permanência",
    reflexao: "Permanecer em Cristo é essencial para dar fruto. Separados Dele, nada podemos fazer de valor eterno.",
    imagem: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop"
  },
  {
    id: 290,
    referencia: "Salmos 119:42",
    texto: "Então poderei responder àquele que me insulta, pois confio na tua palavra.",
    tema: "Confiança",
    reflexao: "Confiar na Palavra de Deus nos dá resposta para aqueles que nos insultam. Ela é nosso fundamento seguro.",
    imagem: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop"
  },
  {
    id: 291,
    referencia: "Isaías 61:10",
    texto: "Eu me regozijo muito no Senhor! A minha alma se alegra em meu Deus!",
    tema: "Alegria",
    reflexao: "A alegria verdadeira vem de nos regozijarmos no Senhor. Nossa alma encontra satisfação completa Nele.",
    imagem: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop"
  },
  {
    id: 292,
    referencia: "Mateus 5:21-22",
    texto: "Vocês ouviram o que foi dito aos seus antepassados: 'Não matarás', e 'quem matar estará sujeito a julgamento.'",
    tema: "Mandamentos",
    reflexao: "Jesus aprofunda os mandamentos, mostrando que Deus se importa não apenas com nossas ações, mas com nosso coração.",
    imagem: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
  },
  {
    id: 293,
    referencia: "Salmos 119:43",
    texto: "Não tires jamais da minha boca a palavra da verdade, pois tenho posto a minha esperança nas tuas ordenanças.",
    tema: "Verdade",
    reflexao: "A palavra da verdade deve estar sempre em nossa boca. Nossa esperança está firmada nas ordenanças de Deus.",
    imagem: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop"
  },
  {
    id: 294,
    referencia: "Provérbios 9:10",
    texto: "O temor do Senhor é o princípio da sabedoria, e o conhecimento do Santo é entendimento.",
    tema: "Sabedoria",
    reflexao: "Toda sabedoria começa com o temor do Senhor. Conhecer o Santo é o fundamento do verdadeiro entendimento.",
    imagem: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=400&fit=crop"
  },
  {
    id: 295,
    referencia: "João 15:7",
    texto: "Se vocês permanecerem em mim, e as minhas palavras permanecerem em vocês, pedirão o que quiserem, e lhes será concedido.",
    tema: "Oração",
    reflexao: "Permanecer em Cristo e em Sua Palavra alinha nossos desejos com os Dele. Nossas orações se tornam eficazes.",
    imagem: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&h=400&fit=crop"
  },
  {
    id: 296,
    referencia: "Salmos 119:44",
    texto: "Obedecerei sempre à tua lei, para todo o sempre.",
    tema: "Obediência",
    reflexao: "O compromisso de obedecer a Deus não é temporário, mas eterno. É uma decisão para toda a vida.",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: 297,
    referencia: "Romanos 8:30",
    texto: "E aos que predestinou, também chamou; aos que chamou, também justificou; aos que justificou, também glorificou.",
    tema: "Glorificação",
    reflexao: "A obra de Deus em nós é completa - Ele nos predestinou, chamou, justificou e glorificará. Nossa salvação é segura.",
    imagem: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop"
  },
  {
    id: 298,
    referencia: "Salmos 119:45",
    texto: "Viverei em plena liberdade, pois tenho buscado os teus preceitos.",
    tema: "Liberdade",
    reflexao: "A verdadeira liberdade vem de buscar e seguir os preceitos de Deus. Eles nos libertam para viver plenamente.",
    imagem: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop"
  },
  {
    id: 299,
    referencia: "Mateus 5:23-24",
    texto: "Portanto, se você estiver apresentando sua oferta diante do altar e ali se lembrar de que seu irmão tem algo contra você, deixe sua oferta ali.",
    tema: "Reconciliação",
    reflexao: "A reconciliação com nossos irmãos é tão importante que deve preceder nossa adoração a Deus.",
    imagem: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop"
  },
  {
    id: 300,
    referencia: "Salmos 119:46",
    texto: "Falarei dos teus testemunhos na presença de reis e não serei envergonhado.",
    tema: "Testemunho",
    reflexao: "Quando conhecemos os testemunhos de Deus, podemos falar deles com confiança, sem vergonha, diante de qualquer pessoa.",
    imagem: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
  },
  {
    id: 301,
    referencia: "Isaías 64:8",
    texto: "Contudo, Senhor, tu és o nosso Pai. Nós somos o barro; tu és o oleiro. Todos nós somos obra das tuas mãos.",
    tema: "Criação",
    reflexao: "Somos obra das mãos de Deus. Como barro nas mãos do oleiro, Ele nos molda com amor e propósito.",
    imagem: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop"
  },
  {
    id: 302,
    referencia: "João 15:8",
    texto: "Meu Pai é glorificado pelo fato de vocês darem muito fruto; e assim serão meus discípulos.",
    tema: "Fruto",
    reflexao: "Dar fruto glorifica ao Pai e confirma nosso discipulado. Somos conhecidos pelos frutos que produzimos.",
    imagem: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=400&fit=crop"
  },
  {
    id: 303,
    referencia: "Salmos 119:47",
    texto: "Tenho prazer nos teus mandamentos, porque os amo.",
    tema: "Amor",
    reflexao: "Amar os mandamentos de Deus transforma obediência em prazer. Não é fardo, mas deleite.",
    imagem: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&h=400&fit=crop"
  },
  {
    id: 304,
    referencia: "Provérbios 10:22",
    texto: "A bênção do Senhor traz riqueza, e não inclui dor alguma.",
    tema: "Bênção",
    reflexao: "As bênçãos de Deus são puras e completas. Elas trazem prosperidade verdadeira sem as dores do mundo.",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: 305,
    referencia: "Mateus 5:25-26",
    texto: "Entre em acordo depressa com seu adversário que pretende levá-lo ao tribunal.",
    tema: "Acordo",
    reflexao: "Resolver conflitos rapidamente é sabedoria. Não devemos deixar que disputas se prolonguem desnecessariamente.",
    imagem: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop"
  },
  {
    id: 306,
    referencia: "Salmos 119:48",
    texto: "Ergo as mãos para os teus mandamentos, que amo, e medito nos teus decretos.",
    tema: "Meditação",
    reflexao: "Erguer as mãos em adoração e meditar nos decretos de Deus são expressões de amor e reverência.",
    imagem: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop"
  },
  {
    id: 307,
    referencia: "Romanos 8:34",
    texto: "Quem os condenará? Foi Cristo Jesus que morreu; e mais, que ressuscitou e está à direita de Deus, e também intercede por nós.",
    tema: "Intercessão",
    reflexao: "Cristo intercede por nós à direita de Deus. Ninguém pode nos condenar quando Ele é nosso advogado.",
    imagem: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop"
  },
  {
    id: 308,
    referencia: "Salmos 119:49",
    texto: "Lembra-te da palavra que deste ao teu servo, na qual me fizeste esperar.",
    tema: "Esperança",
    reflexao: "Podemos lembrar a Deus de Suas promessas. Nossa esperança está fundamentada em Sua Palavra fiel.",
    imagem: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
  },
  {
    id: 309,
    referencia: "João 15:9",
    texto: "Como o Pai me amou, assim eu os amei; permaneçam no meu amor.",
    tema: "Amor",
    reflexao: "O amor de Jesus por nós é do mesmo calibre do amor do Pai por Ele. Somos chamados a permanecer nesse amor.",
    imagem: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop"
  },
  {
    id: 310,
    referencia: "Salmos 119:52",
    texto: "Lembro-me, Senhor, das tuas ordenanças antigas, e nelas encontro consolo.",
    tema: "Consolo",
    reflexao: "As ordenanças antigas de Deus continuam sendo fonte de consolo. Sua Palavra é atemporal e sempre relevante.",
    imagem: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=400&fit=crop"
  },
  {
    id: 311,
    referencia: "Isaías 66:2",
    texto: "Não foram as minhas mãos que fizeram todas essas coisas? Foi assim que elas vieram a existir, declara o Senhor.",
    tema: "Criação",
    reflexao: "Deus é o Criador de todas as coisas. Tudo existe porque Ele falou e criou com Suas próprias mãos.",
    imagem: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&h=400&fit=crop"
  },
  {
    id: 312,
    referencia: "Mateus 5:27-28",
    texto: "Vocês ouviram o que foi dito: 'Não adulterarás'. Mas eu lhes digo: qualquer que olhar para uma mulher para desejá-la, já cometeu adultério com ela no seu coração.",
    tema: "Pureza",
    reflexao: "Jesus eleva o padrão de pureza. Não é apenas a ação que importa, mas também os pensamentos do coração.",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: 313,
    referencia: "Salmos 119:54",
    texto: "Os teus decretos são o tema da minha canção, onde quer que eu more.",
    tema: "Louvor",
    reflexao: "Os decretos de Deus devem ser nossa canção constante, independentemente de onde estejamos ou das circunstâncias.",
    imagem: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop"
  },
  {
    id: 314,
    referencia: "Provérbios 11:2",
    texto: "Quando vem a soberba, vem também a desonra, mas com os humildes está a sabedoria.",
    tema: "Humildade",
    reflexao: "A soberba leva à queda, mas a humildade atrai sabedoria. Escolher a humildade é escolher o caminho sábio.",
    imagem: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop"
  },
  {
    id: 315,
    referencia: "João 15:10",
    texto: "Se vocês obedecerem aos meus mandamentos, permanecerão no meu amor, assim como tenho obedecido aos mandamentos de meu Pai e em seu amor permaneço.",
    tema: "Obediência",
    reflexao: "A obediência é o caminho para permanecer no amor de Jesus. Ele nos mostra o exemplo obedecendo ao Pai.",
    imagem: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop"
  },
  {
    id: 316,
    referencia: "Salmos 119:55",
    texto: "De noite lembro-me do teu nome, Senhor, e obedecerei à tua lei.",
    tema: "Lembrança",
    reflexao: "Lembrar de Deus durante a noite demonstra que Ele está sempre em nossos pensamentos, guiando nossa obediência.",
    imagem: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
  },
  {
    id: 317,
    referencia: "Romanos 8:36",
    texto: "Como está escrito: 'Por amor de ti enfrentamos a morte todos os dias; somos considerados como ovelhas destinadas ao matadouro.'",
    tema: "Sacrifício",
    reflexao: "Seguir a Cristo pode exigir sacrifício diário. Mas em tudo isso, somos mais que vencedores por meio Dele.",
    imagem: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop"
  },
  {
    id: 318,
    referencia: "Salmos 119:57",
    texto: "Tu és a minha porção, Senhor; prometi obedecer às tuas palavras.",
    tema: "Porção",
    reflexao: "Deus é nossa porção - nossa herança e tesouro. Nada mais satisfaz como Ele satisfaz.",
    imagem: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=400&fit=crop"
  },
  {
    id: 319,
    referencia: "Mateus 5:29-30",
    texto: "Se o seu olho direito o fizer pecar, arranque-o e lance-o fora. É melhor perder uma parte do seu corpo do que ser todo ele lançado no inferno.",
    tema: "Santidade",
    reflexao: "Jesus usa linguagem radical para enfatizar a seriedade do pecado. Devemos fazer o que for necessário para viver em santidade.",
    imagem: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&h=400&fit=crop"
  },
  {
    id: 320,
    referencia: "Salmos 119:58",
    texto: "De todo o coração busco a tua face; tem misericórdia de mim conforme a tua promessa.",
    tema: "Misericórdia",
    reflexao: "Buscar a face de Deus de todo coração nos leva a experimentar Sua misericórdia conforme Suas promessas.",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: 321,
    referencia: "Isaías 66:13",
    texto: "Como uma mãe consola seu filho, assim eu os consolarei.",
    tema: "Consolo",
    reflexao: "O consolo de Deus é terno e amoroso como o de uma mãe. Ele nos conforta em toda tribulação.",
    imagem: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop"
  },
  {
    id: 322,
    referencia: "João 15:11",
    texto: "Tenho lhes dito estas palavras para que a minha alegria esteja em vocês e a alegria de vocês seja completa.",
    tema: "Alegria",
    reflexao: "Jesus deseja que Sua alegria esteja em nós e que nossa alegria seja completa. Ele é a fonte de alegria verdadeira.",
    imagem: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop"
  },
  {
    id: 323,
    referencia: "Salmos 119:59",
    texto: "Considerei os meus caminhos e voltei os meus passos para os teus testemunhos.",
    tema: "Arrependimento",
    reflexao: "Examinar nossos caminhos e voltar para Deus é o verdadeiro arrependimento. Ele sempre nos recebe de volta.",
    imagem: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop"
  },
  {
    id: 324,
    referencia: "Provérbios 12:15",
    texto: "O caminho do insensato parece certo aos seus próprios olhos, mas o sábio ouve os conselhos.",
    tema: "Sabedoria",
    reflexao: "A sabedoria se manifesta em ouvir conselhos. O insensato confia apenas em si mesmo, mas o sábio busca orientação.",
    imagem: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
  },
  {
    id: 325,
    referencia: "Mateus 5:31-32",
    texto: "Foi dito: 'Aquele que se divorciar de sua mulher deverá dar-lhe certidão de divórcio.'",
    tema: "Casamento",
    reflexao: "Jesus eleva o padrão do casamento, mostrando que Deus valoriza o compromisso e a fidelidade no matrimônio.",
    imagem: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop"
  },
  {
    id: 326,
    referencia: "Salmos 119:60",
    texto: "Apressei-me e não hesitei em obedecer aos teus mandamentos.",
    tema: "Prontidão",
    reflexao: "A obediência pronta, sem hesitação, demonstra um coração que ama a Deus e confia em Seus caminhos.",
    imagem: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=400&fit=crop"
  },
  {
    id: 327,
    referencia: "Romanos 8:39",
    texto: "Nem altura nem profundidade, nem qualquer outra coisa na criação será capaz de nos separar do amor de Deus que está em Cristo Jesus, nosso Senhor.",
    tema: "Amor Inseparável",
    reflexao: "Absolutamente nada pode nos separar do amor de Deus em Cristo. Esse amor é eterno, inabalável e completo.",
    imagem: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&h=400&fit=crop"
  },
  {
    id: 328,
    referencia: "Salmos 119:61",
    texto: "Embora os ímpios me tenham amarrado com cordas, não me esquecerei da tua lei.",
    tema: "Fidelidade",
    reflexao: "Mesmo em meio à perseguição e dificuldades, permanecemos fiéis à lei de Deus. Nada pode nos fazer esquecer Dele.",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: 329,
    referencia: "João 15:12",
    texto: "O meu mandamento é este: Amem-se uns aos outros como eu os amei.",
    tema: "Amor",
    reflexao: "O padrão do amor cristão é o amor de Jesus por nós - sacrificial, incondicional e transformador.",
    imagem: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop"
  },
  {
    id: 330,
    referencia: "Salmos 119:62",
    texto: "À meia-noite me levanto para te louvar por causa das tuas justas ordenanças.",
    tema: "Louvor",
    reflexao: "O louvor a Deus não conhece horários. Até à meia-noite, Suas ordenanças justas merecem nossa adoração.",
    imagem: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop"
  },
  {
    id: 331,
    referencia: "Jeremias 1:5",
    texto: "Antes de formá-lo no ventre eu o escolhi; antes de você nascer, eu o separei e o designei profeta às nações.",
    tema: "Chamado",
    reflexao: "Deus nos conhece e nos chama antes mesmo de nascermos. Ele tem um propósito específico para cada vida.",
    imagem: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop"
  },
  {
    id: 332,
    referencia: "Mateus 5:33-37",
    texto: "Vocês também ouviram o que foi dito aos seus antepassados: 'Não jure falsamente, mas cumpra os juramentos que você fez diante do Senhor.'",
    tema: "Integridade",
    reflexao: "Nossa palavra deve ser confiável. Sim deve ser sim, e não deve ser não. A integridade é essencial.",
    imagem: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
  },
  {
    id: 333,
    referencia: "Salmos 119:63",
    texto: "Sou companheiro de todos os que te temem e obedecem aos teus preceitos.",
    tema: "Comunhão",
    reflexao: "A comunhão verdadeira acontece entre aqueles que temem a Deus e obedecem aos Seus preceitos.",
    imagem: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop"
  },
  {
    id: 334,
    referencia: "Provérbios 13:20",
    texto: "Quem anda com os sábios será sábio, mas o companheiro dos tolos acabará mal.",
    tema: "Companhia",
    reflexao: "Nossas companhias influenciam quem nos tornamos. Escolher andar com os sábios é escolher crescer em sabedoria.",
    imagem: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=400&fit=crop"
  },
  {
    id: 335,
    referencia: "João 15:14",
    texto: "Vocês serão meus amigos, se fizerem o que eu lhes ordeno.",
    tema: "Amizade",
    reflexao: "A amizade com Jesus é demonstrada através da obediência. Ele nos chama de amigos quando seguimos Seus mandamentos.",
    imagem: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&h=400&fit=crop"
  },
  {
    id: 336,
    referencia: "Salmos 119:64",
    texto: "A terra está cheia do teu amor, Senhor; ensina-me os teus decretos.",
    tema: "Amor",
    reflexao: "O amor de Deus preenche toda a terra. Reconhecer isso nos leva a desejar aprender Seus decretos.",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: 337,
    referencia: "Romanos 9:25",
    texto: "Como ele diz em Oséias: 'Chamarei 'meu povo' aquele que não era meu povo; e chamarei 'minha amada' aquela que não era minha amada.'",
    tema: "Eleição",
    reflexao: "Deus nos escolheu e nos chamou de Seu povo. O que não era amado tornou-se amado por Sua graça.",
    imagem: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop"
  },
  {
    id: 338,
    referencia: "Salmos 119:65",
    texto: "Trata bem o teu servo, Senhor, conforme a tua palavra.",
    tema: "Bondade",
    reflexao: "Podemos confiar que Deus nos tratará bem conforme Sua palavra. Suas promessas são garantia de Sua bondade.",
    imagem: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop"
  },
  {
    id: 339,
    referencia: "Mateus 5:38-42",
    texto: "Vocês ouviram o que foi dito: 'Olho por olho e dente por dente'. Mas eu lhes digo: Não resistam ao perverso.",
    tema: "Não Resistência",
    reflexao: "Jesus nos ensina a responder ao mal com amor, não com vingança. Isso quebra o ciclo de violência.",
    imagem: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop"
  },
  {
    id: 340,
    referencia: "Salmos 119:66",
    texto: "Ensina-me bom juízo e conhecimento, pois creio nos teus mandamentos.",
    tema: "Conhecimento",
    reflexao: "Crer nos mandamentos de Deus nos leva a buscar Seu conhecimento e juízo para viver sabiamente.",
    imagem: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
  },
  {
    id: 341,
    referencia: "Jeremias 17:7-8",
    texto: "Bendito é o homem que confia no Senhor, cuja confiança nele está. Será como uma árvore plantada junto à água.",
    tema: "Confiança",
    reflexao: "Confiar no Senhor nos torna como árvores plantadas junto à água - firmes, frutíferas e sempre verdes.",
    imagem: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop"
  },
  {
    id: 342,
    referencia: "João 15:15",
    texto: "Já não os chamo servos, porque o servo não sabe o que o seu senhor faz. Em vez disso, eu os tenho chamado amigos.",
    tema: "Amizade",
    reflexao: "Jesus nos eleva de servos a amigos. Ele compartilha Seus planos conosco porque nos ama intimamente.",
    imagem: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=400&fit=crop"
  },
  {
    id: 343,
    referencia: "Salmos 119:67",
    texto: "Antes de ser castigado eu me desviei, mas agora obedeço à tua palavra.",
    tema: "Disciplina",
    reflexao: "A disciplina de Deus nos traz de volta ao caminho certo. Ela produz obediência e nos aproxima Dele.",
    imagem: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&h=400&fit=crop"
  },
  {
    id: 344,
    referencia: "Provérbios 14:26",
    texto: "Quem teme ao Senhor possui uma fortaleza segura, e para os seus filhos será refúgio.",
    tema: "Refúgio",
    reflexao: "O temor do Senhor não apenas nos protege, mas também se torna refúgio para nossos filhos e gerações futuras.",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: 345,
    referencia: "Mateus 5:43-48",
    texto: "Vocês ouviram o que foi dito: 'Ame o seu próximo e odeie o seu inimigo'. Mas eu lhes digo: Amem os seus inimigos.",
    tema: "Amor aos Inimigos",
    reflexao: "Amar os inimigos é o padrão mais alto de amor. Isso nos torna filhos do Pai celestial que ama a todos.",
    imagem: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop"
  },
  {
    id: 346,
    referencia: "Salmos 119:68",
    texto: "Tu és bom, e o que fazes é bom; ensina-me os teus decretos.",
    tema: "Bondade",
    reflexao: "A bondade de Deus se reflete em tudo o que Ele faz. Aprender Seus decretos é aprender a bondade em ação.",
    imagem: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop"
  },
  {
    id: 347,
    referencia: "Romanos 10:9",
    texto: "Se você confessar com a sua boca que Jesus é Senhor e crer em seu coração que Deus o ressuscitou dentre os mortos, será salvo.",
    tema: "Salvação",
    reflexao: "A salvação vem através da confissão e da fé. Confessar Jesus como Senhor e crer em Sua ressurreição nos salva.",
    imagem: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop"
  },
  {
    id: 348,
    referencia: "Salmos 119:69",
    texto: "Embora os arrogantes me tenham caluniado, eu guardo de todo o coração os teus preceitos.",
    tema: "Integridade",
    reflexao: "Mesmo diante de calúnias, mantemos nossa integridade guardando os preceitos de Deus de todo coração.",
    imagem: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
  },
  {
    id: 349,
    referencia: "João 15:17",
    texto: "Este é o meu mandamento: Amem-se uns aos outros.",
    tema: "Amor",
    reflexao: "O mandamento final de Jesus é simples mas profundo - amar uns aos outros como Ele nos amou.",
    imagem: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop"
  },
  {
    id: 350,
    referencia: "Salmos 119:72",
    texto: "Para mim, a lei que procede da tua boca é mais preciosa do que milhares de peças de prata e de ouro.",
    tema: "Valor",
    reflexao: "A Palavra de Deus é mais valiosa que todas as riquezas materiais. Ela é nosso tesouro mais precioso.",
    imagem: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=400&fit=crop"
  },
  {
    id: 351,
    referencia: "Jeremias 29:13",
    texto: "Vocês me procurarão e me acharão quando me procurarem de todo o coração.",
    tema: "Busca",
    reflexao: "Deus promete ser encontrado por aqueles que O buscam de todo coração. Ele não se esconde dos que O procuram sinceramente.",
    imagem: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&h=400&fit=crop"
  },
  {
    id: 352,
    referencia: "Mateus 6:1",
    texto: "Cuidado para não praticar suas 'obras de justiça' diante dos outros para serem vistos por eles.",
    tema: "Sinceridade",
    reflexao: "Nossa justiça deve ser genuína, não para impressionar outros. Deus vê o coração e recompensa a sinceridade.",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: 353,
    referencia: "Salmos 119:73",
    texto: "As tuas mãos me fizeram e me formaram; dá-me entendimento para aprender os teus mandamentos.",
    tema: "Criação",
    reflexao: "Reconhecer que Deus nos criou nos leva a buscar entendimento de Seus mandamentos. Ele nos formou com propósito.",
    imagem: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop"
  },
  {
    id: 354,
    referencia: "Provérbios 15:3",
    texto: "Os olhos do Senhor estão em todo lugar, observando os maus e os bons.",
    tema: "Onipresença",
    reflexao: "Deus vê tudo e está em todo lugar. Nada escapa de Sua visão - Ele observa tanto o bem quanto o mal.",
    imagem: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop"
  },
  {
    id: 355,
    referencia: "João 15:18",
    texto: "Se o mundo os odeia, tenham em mente que antes me odiou.",
    tema: "Perseguição",
    reflexao: "A oposição do mundo não deve nos surpreender. Se perseguiram Jesus, também nos perseguirão por segui-Lo.",
    imagem: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop"
  },
  {
    id: 356,
    referencia: "Salmos 119:74",
    texto: "Os que te temem alegram-se ao me ver, pois tenho posto a minha esperança na tua palavra.",
    tema: "Esperança",
    reflexao: "Nossa esperança na Palavra de Deus traz alegria aos que O temem. Somos encorajamento uns para os outros.",
    imagem: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
  },
  {
    id: 357,
    referencia: "Romanos 10:13",
    texto: "Porque 'todo aquele que invocar o nome do Senhor será salvo'.",
    tema: "Salvação",
    reflexao: "A salvação está disponível para todos que invocam o nome do Senhor. Não há exceções - todo aquele que invocar será salvo.",
    imagem: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop"
  },
  {
    id: 358,
    referencia: "Salmos 119:75",
    texto: "Sei, Senhor, que as tuas ordenanças são justas, e que com fidelidade me castigaste.",
    tema: "Justiça",
    reflexao: "Reconhecer a justiça de Deus, mesmo em Sua disciplina, demonstra maturidade espiritual e confiança em Seu amor.",
    imagem: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=400&fit=crop"
  },
  {
    id: 359,
    referencia: "Mateus 6:2-4",
    texto: "Portanto, quando você der esmola, não anuncie isso com trombetas, como fazem os hipócritas nas sinagogas e nas ruas.",
    tema: "Generosidade",
    reflexao: "A verdadeira generosidade é discreta. Deus recompensa o que é feito em secreto, não o que é exibido publicamente.",
    imagem: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&h=400&fit=crop"
  },
  {
    id: 360,
    referencia: "Salmos 119:77",
    texto: "Venha a mim a tua compaixão para que eu viva, pois a tua lei é o meu prazer.",
    tema: "Compaixão",
    reflexao: "A compaixão de Deus nos dá vida. Quando encontramos prazer em Sua lei, experimentamos Sua misericórdia.",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: 361,
    referencia: "Jeremias 31:3",
    texto: "O Senhor me apareceu no passado, dizendo: 'Eu o amei com amor eterno; com amor leal o atraí.'",
    tema: "Amor Eterno",
    reflexao: "O amor de Deus por nós é eterno e leal. Ele nos atrai com cordas de amor que nunca se rompem.",
    imagem: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop"
  },
  {
    id: 362,
    referencia: "João 15:19",
    texto: "Se vocês pertencessem ao mundo, ele os amaria como se fossem dele. Todavia, vocês não são do mundo, mas eu os escolhi.",
    tema: "Escolha",
    reflexao: "Fomos escolhidos por Jesus para não pertencer ao mundo. Isso explica por que o mundo nos rejeita, mas Ele nos ama.",
    imagem: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=400&fit=crop"
  },
  {
    id: 363,
    referencia: "Salmos 119:78",
    texto: "Sejam humilhados os arrogantes que me prejudicaram sem motivo; eu, porém, meditarei nos teus preceitos.",
    tema: "Meditação",
    reflexao: "Diante da injustiça, nossa resposta é meditar nos preceitos de Deus. Isso nos mantém focados no que realmente importa.",
    imagem: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop"
  },
  {
    id: 364,
    referencia: "Provérbios 16:20",
    texto: "Quem dá atenção ao ensino prospera, e como é feliz quem confia no Senhor!",
    tema: "Prosperidade",
    reflexao: "A verdadeira prosperidade vem de dar atenção ao ensino de Deus e confiar Nele. Isso traz felicidade genuína.",
    imagem: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
  },
  {
    id: 365,
    referencia: "Mateus 6:5-8",
    texto: "Quando vocês orarem, não sejam como os hipócritas. Eles gostam de ficar orando em pé nas sinagogas e nas esquinas.",
    tema: "Oração",
    reflexao: "A oração verdadeira é íntima e sincera, não um espetáculo público. Deus valoriza o coração, não a aparência.",
    imagem: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop"
  },
  {
    id: 366,
    referencia: "Salmos 119:81",
    texto: "A minha alma desfalece de saudade da tua salvação, mas ponho a minha esperança na tua palavra.",
    tema: "Esperança",
    reflexao: "Mesmo quando nossa alma desfalece, a esperança na Palavra de Deus nos sustenta e nos mantém firmes até a salvação completa.",
    imagem: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=400&fit=crop"
  }
];
