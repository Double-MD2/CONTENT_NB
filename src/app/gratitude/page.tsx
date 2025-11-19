'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Share2, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';

// 365 agradecimentos diferentes (um para cada dia do ano)
const gratitudeMessages = [
  // Janeiro (1-31)
  "Agradeço a Deus pela dádiva de um novo ano, repleto de oportunidades e bênçãos que ainda estão por vir.",
  "Agradeço por cada amanhecer que me permite recomeçar e renovar minhas forças em Ti, Senhor.",
  "Obrigado, Deus, pela saúde que me permite viver plenamente cada momento deste dia.",
  "Agradeço pela família que me acolhe e me ama incondicionalmente, reflexo do Teu amor.",
  "Senhor, agradeço pelos amigos verdadeiros que caminham ao meu lado nesta jornada.",
  "Obrigado por cada desafio que me fortalece e me aproxima mais de Ti.",
  "Agradeço pelo trabalho que me dignifica e me permite servir ao próximo.",
  "Senhor, obrigado pela paz que habita em meu coração mesmo em meio às tempestades.",
  "Agradeço pela natureza exuberante que revela Tua grandeza e criatividade.",
  "Obrigado, Deus, pelas pequenas alegrias que iluminam meus dias.",
  "Agradeço pela fé que me sustenta e me guia em todos os momentos.",
  "Senhor, obrigado pelas lições aprendidas com os erros e acertos do passado.",
  "Agradeço pelo amor que preenche minha vida e me transforma a cada dia.",
  "Obrigado pela esperança que renova minha alma e me faz acreditar no amanhã.",
  "Agradeço pelas oportunidades de crescimento pessoal e espiritual.",
  "Senhor, obrigado pela proteção divina que me cerca em todo tempo.",
  "Agradeço pelos momentos de silêncio que me permitem ouvir Tua voz.",
  "Obrigado pela sabedoria que me concedes para tomar decisões acertadas.",
  "Agradeço pelas bênçãos materiais que suprem minhas necessidades diárias.",
  "Senhor, obrigado pela capacidade de amar e ser amado.",
  "Agradeço pelos sonhos que me motivam a seguir em frente com determinação.",
  "Obrigado pela coragem que me dás para enfrentar meus medos.",
  "Agradeço pela alegria que transborda em meu coração ao contemplar Tua bondade.",
  "Senhor, obrigado pelas pessoas que cruzam meu caminho e enriquecem minha vida.",
  "Agradeço pela paciência que me ensinas a ter comigo mesmo e com os outros.",
  "Obrigado pela misericórdia que me acolhe sempre que erro.",
  "Agradeço pela força interior que me impulsiona a superar obstáculos.",
  "Senhor, obrigado pela graça que me transforma dia após dia.",
  "Agradeço pelas memórias felizes que aquecem meu coração.",
  "Obrigado pela vida, o maior presente que poderia receber de Ti.",
  "Agradeço, Senhor, por este ano que se encerra, repleto de aprendizados e bênçãos que moldaram minha jornada.",
  
  // Fevereiro (32-59)
  "Agradeço pelo amor incondicional que me envolve e me fortalece.",
  "Senhor, obrigado pela capacidade de perdoar e recomeçar.",
  "Agradeço pelas oportunidades de servir ao próximo com amor.",
  "Obrigado pela música que alegra minha alma e eleva meu espírito.",
  "Agradeço pelos livros que expandem minha mente e meu coração.",
  "Senhor, obrigado pela criatividade que me permite expressar minha essência.",
  "Agradeço pela liberdade de escolher meu próprio caminho.",
  "Obrigado pela compaixão que me ensinas a ter pelos outros.",
  "Agradeço pelos momentos de contemplação que renovam minha fé.",
  "Senhor, obrigado pela humildade que me aproxima de Ti.",
  "Agradeço pela generosidade que flui através de mim.",
  "Obrigado pela bondade que encontro em cada gesto simples.",
  "Agradeço pela perseverança que me mantém firme em meus propósitos.",
  "Senhor, obrigado pela serenidade que acalma minha mente inquieta.",
  "Agradeço pelas risadas que iluminam meus dias mais difíceis.",
  "Obrigado pela empatia que me conecta com o sofrimento alheio.",
  "Agradeço pela gratidão que transforma minha perspectiva de vida.",
  "Senhor, obrigado pela confiança que depositas em mim.",
  "Agradeço pelos milagres cotidianos que testemunho a cada dia.",
  "Obrigado pela beleza que me cerca e inspira minha alma.",
  "Agradeço pela simplicidade que me ensina o verdadeiro valor das coisas.",
  "Senhor, obrigado pela abundância que supera minhas expectativas.",
  "Agradeço pelos desafios que me fazem crescer e evoluir.",
  "Obrigado pela resiliência que me permite superar adversidades.",
  "Agradeço pela luz que guia meus passos na escuridão.",
  "Senhor, obrigado pela paz interior que me sustenta.",
  "Agradeço pelas segundas chances que me concedes.",
  "Obrigado pela renovação que experimento a cada novo dia.",
  
  // Março (60-90)
  "Agradeço pela primavera da vida que floresce em meu coração.",
  "Senhor, obrigado pela transformação que operas em minha vida.",
  "Agradeço pelos recomeços que me permitem reescrever minha história.",
  "Obrigado pela esperança que nunca se apaga em meu peito.",
  "Agradeço pela fidelidade de Deus que permanece para sempre.",
  "Senhor, obrigado pela provisão que nunca falta.",
  "Agradeço pelos sonhos realizados que superam minhas expectativas.",
  "Obrigado pela sabedoria ancestral que me guia.",
  "Agradeço pela comunhão com outros crentes que fortalece minha fé.",
  "Senhor, obrigado pela Palavra que ilumina meu caminho.",
  "Agradeço pela oração que me conecta contigo.",
  "Obrigado pelo louvor que eleva minha alma.",
  "Agradeço pela adoração que me transforma.",
  "Senhor, obrigado pela presença constante em minha vida.",
  "Agradeço pelos anjos que me protegem invisíveis.",
  "Obrigado pela salvação que me liberta.",
  "Agradeço pela redenção que me restaura.",
  "Senhor, obrigado pela santificação que me purifica.",
  "Agradeço pela justificação que me declara justo.",
  "Obrigado pela glorificação que me aguarda.",
  "Agradeço pelo Espírito Santo que me guia.",
  "Senhor, obrigado por Jesus Cristo, meu Salvador.",
  "Agradeço pela cruz que me reconciliou contigo.",
  "Obrigado pela ressurreição que me dá vida eterna.",
  "Agradeço pela ascensão que me garante um lugar no céu.",
  "Senhor, obrigado pela segunda vinda que aguardo com esperança.",
  "Agradeço pelo Reino de Deus que já está entre nós.",
  "Obrigado pela Igreja que me acolhe como família.",
  "Agradeço pelos sacramentos que me fortalecem.",
  "Senhor, obrigado pela comunhão dos santos.",
  "Agradeço pela vida eterna que me prometes.",
  
  // Abril (91-120)
  "Obrigado pela ressurreição que celebramos e vivemos.",
  "Agradeço pela renovação espiritual que experimento.",
  "Senhor, obrigado pela alegria pascal que enche meu coração.",
  "Agradeço pelas flores que desabrocham e embelezam a criação.",
  "Obrigado pela chuva que rega a terra e traz vida.",
  "Agradeço pelo sol que aquece e ilumina meus dias.",
  "Senhor, obrigado pela lua que guia na escuridão.",
  "Agradeço pelas estrelas que revelam Tua imensidão.",
  "Obrigado pelos rios que fluem e saciam a sede.",
  "Agradeço pelas montanhas que me elevam mais perto de Ti.",
  "Senhor, obrigado pelos vales que me ensinam humildade.",
  "Agradeço pelos oceanos que revelam Tua profundidade.",
  "Obrigado pelas árvores que me dão sombra e frutos.",
  "Agradeço pelos pássaros que cantam louvores ao Criador.",
  "Senhor, obrigado pelos animais que compartilham a criação.",
  "Agradeço pelas crianças que me ensinam pureza e alegria.",
  "Obrigado pelos idosos que me transmitem sabedoria.",
  "Agradeço pelos jovens que me inspiram com sua energia.",
  "Senhor, obrigado pelos adultos que constroem o presente.",
  "Agradeço pela diversidade humana que enriquece o mundo.",
  "Obrigado pelas diferentes culturas que revelam Tua criatividade.",
  "Agradeço pelas línguas que nos permitem comunicar.",
  "Senhor, obrigado pelas artes que expressam o divino.",
  "Agradeço pela ciência que desvenda Teus mistérios.",
  "Obrigado pela tecnologia que nos conecta.",
  "Agradeço pela educação que nos liberta da ignorância.",
  "Senhor, obrigado pela medicina que cura e alivia.",
  "Agradeço pela justiça que restaura a ordem.",
  "Obrigado pela paz que constrói pontes.",
  "Agradeço pelo amor que tudo transforma.",
  
  // Maio (121-151)
  "Senhor, obrigado pelas mães que nos dão vida e amor.",
  "Agradeço pela maternidade divina que nos acolhe.",
  "Obrigado pela ternura maternal que reflete Teu cuidado.",
  "Agradeço pelo mês das flores que celebra a beleza.",
  "Senhor, obrigado pela primavera que renova a natureza.",
  "Agradeço pelos frutos que nascem da terra fértil.",
  "Obrigado pelas sementes que plantamos com fé.",
  "Agradeço pela colheita que virá no tempo certo.",
  "Senhor, obrigado pela paciência de esperar o crescimento.",
  "Agradeço pelo trabalho que dignifica e transforma.",
  "Obrigado pela dedicação que produz resultados.",
  "Agradeço pelo esforço que me fortalece.",
  "Senhor, obrigado pela recompensa que vem após a luta.",
  "Agradeço pela disciplina que me mantém no caminho.",
  "Obrigado pela constância que me faz perseverar.",
  "Agradeço pela determinação que me impulsiona.",
  "Senhor, obrigado pela coragem de seguir em frente.",
  "Agradeço pela ousadia de sonhar grande.",
  "Obrigado pela humildade de reconhecer minhas limitações.",
  "Agradeço pela confiança em Tua providência.",
  "Senhor, obrigado pela certeza de que não estou sozinho.",
  "Agradeço pela companhia divina em todos os momentos.",
  "Obrigado pela presença que me conforta.",
  "Agradeço pelo abraço invisível que me acolhe.",
  "Senhor, obrigado pelo olhar amoroso que me sustenta.",
  "Agradeço pela voz suave que me acalma.",
  "Obrigado pela mão que me levanta quando caio.",
  "Agradeço pelo coração que bate em sintonia com o meu.",
  "Senhor, obrigado pela alma que se une à minha.",
  "Agradeço pelo espírito que me vivifica.",
  "Obrigado pela vida que pulsa em cada célula.",
  
  // Junho (152-181)
  "Agradeço pelo mês de junho que traz alegria e celebração.",
  "Senhor, obrigado pelas festas juninas que nos unem.",
  "Agradeço pela fogueira que aquece e ilumina.",
  "Obrigado pelas danças que celebram a vida.",
  "Agradeço pelas comidas típicas que nutrem corpo e alma.",
  "Senhor, obrigado pela tradição que nos conecta às raízes.",
  "Agradeço pela cultura popular que enriquece nossa identidade.",
  "Obrigado pela música folclórica que alegra o coração.",
  "Agradeço pelas cores vibrantes que embelezam a vida.",
  "Senhor, obrigado pela simplicidade das coisas genuínas.",
  "Agradeço pela autenticidade que me liberta.",
  "Obrigado pela verdade que me orienta.",
  "Agradeço pela honestidade que me dignifica.",
  "Senhor, obrigado pela integridade que me fortalece.",
  "Agradeço pela transparência que me aproxima dos outros.",
  "Obrigado pela sinceridade que constrói confiança.",
  "Agradeço pela lealdade que sustenta relacionamentos.",
  "Senhor, obrigado pela fidelidade que me mantém firme.",
  "Agradeço pela constância do Teu amor.",
  "Obrigado pela eternidade da Tua misericórdia.",
  "Agradeço pela infinitude da Tua graça.",
  "Senhor, obrigado pela imensidão da Tua bondade.",
  "Agradeço pela profundidade da Tua sabedoria.",
  "Obrigado pela altura da Tua glória.",
  "Agradeço pela largura do Teu perdão.",
  "Senhor, obrigado pela extensão do Teu amor.",
  "Agradeço pela magnitude da Tua criação.",
  "Obrigado pela grandeza dos Teus planos.",
  "Agradeço pela perfeição da Tua vontade.",
  "Senhor, obrigado pela beleza da Tua santidade.",
  
  // Julho (182-212)
  "Agradeço pelo mês de julho que traz reflexão e gratidão.",
  "Senhor, obrigado pelas férias que renovam as energias.",
  "Agradeço pelo descanso que restaura corpo e mente.",
  "Obrigado pelo lazer que alegra a vida.",
  "Agradeço pelas viagens que ampliam horizontes.",
  "Senhor, obrigado pelos novos lugares que descubro.",
  "Agradeço pelas novas pessoas que conheço.",
  "Obrigado pelas novas experiências que vivo.",
  "Agradeço pelos novos aprendizados que adquiro.",
  "Senhor, obrigado pelas novas perspectivas que ganho.",
  "Agradeço pela renovação mental que experimento.",
  "Obrigado pela renovação emocional que recebo.",
  "Agradeço pela renovação espiritual que vivencio.",
  "Senhor, obrigado pela renovação física que sinto.",
  "Agradeço pela saúde mental que preservo.",
  "Obrigado pela saúde emocional que cultivo.",
  "Agradeço pela saúde espiritual que fortaleço.",
  "Senhor, obrigado pela saúde física que mantenho.",
  "Agradeço pelo equilíbrio que busco em todas as áreas.",
  "Obrigado pela harmonia que encontro em Ti.",
  "Agradeço pela paz interior que me preenche.",
  "Senhor, obrigado pela tranquilidade que me envolve.",
  "Agradeço pela serenidade que me acalma.",
  "Obrigado pela quietude que me restaura.",
  "Agradeço pelo silêncio que me permite ouvir.",
  "Senhor, obrigado pela meditação que me centra.",
  "Agradeço pela contemplação que me eleva.",
  "Obrigado pela reflexão que me transforma.",
  "Agradeço pela introspecção que me conhece.",
  "Senhor, obrigado pelo autoconhecimento que me liberta.",
  "Agradeço pela autoconsciência que me guia.",
  
  // Agosto (213-243)
  "Obrigado pela autodisciplina que me fortalece.",
  "Agradeço pelo autocontrole que me equilibra.",
  "Senhor, obrigado pela autoestima que me valoriza.",
  "Agradeço pela autoconfiança que me impulsiona.",
  "Obrigado pela autoaceitação que me pacifica.",
  "Agradeço pelo amor próprio que me dignifica.",
  "Senhor, obrigado pelo autocuidado que me preserva.",
  "Agradeço pela autenticidade que me define.",
  "Obrigado pela originalidade que me distingue.",
  "Agradeço pela singularidade que me torna único.",
  "Senhor, obrigado pela individualidade que me caracteriza.",
  "Agradeço pela personalidade que me expressa.",
  "Obrigado pela identidade que me constitui.",
  "Agradeço pela essência que me fundamenta.",
  "Senhor, obrigado pela alma que me anima.",
  "Agradeço pelo espírito que me vivifica.",
  "Obrigado pela consciência que me ilumina.",
  "Agradeço pela razão que me orienta.",
  "Senhor, obrigado pela emoção que me humaniza.",
  "Agradeço pela intuição que me guia.",
  "Obrigado pela sensibilidade que me conecta.",
  "Agradeço pela empatia que me aproxima.",
  "Senhor, obrigado pela compaixão que me move.",
  "Agradeço pela solidariedade que me une.",
  "Obrigado pela fraternidade que me irmana.",
  "Agradeço pela comunidade que me acolhe.",
  "Senhor, obrigado pela sociedade que me forma.",
  "Agradeço pela humanidade que me inclui.",
  "Obrigado pela cidadania que me responsabiliza.",
  "Agradeço pela democracia que me representa.",
  "Senhor, obrigado pela liberdade que me dignifica.",
  
  // Setembro (244-273)
  "Agradeço pela independência que celebramos.",
  "Obrigado pela pátria que nos acolhe.",
  "Agradeço pela nação que nos une.",
  "Senhor, obrigado pelo país que nos abriga.",
  "Agradeço pela terra que nos sustenta.",
  "Obrigado pelo solo que nos alimenta.",
  "Agradeço pela natureza que nos cerca.",
  "Senhor, obrigado pelo meio ambiente que nos mantém.",
  "Agradeço pela ecologia que nos ensina.",
  "Obrigado pela sustentabilidade que nos preserva.",
  "Agradeço pela biodiversidade que nos enriquece.",
  "Senhor, obrigado pelos ecossistemas que nos equilibram.",
  "Agradeço pelas florestas que nos oxigenam.",
  "Obrigado pelos mares que nos nutrem.",
  "Agradeço pelos rios que nos dessedentam.",
  "Senhor, obrigado pelas nascentes que nos refrescam.",
  "Agradeço pelo ar que respiramos.",
  "Obrigado pela água que bebemos.",
  "Agradeço pela terra que cultivamos.",
  "Senhor, obrigado pelo fogo que nos aquece.",
  "Agradeço pelos elementos que nos compõem.",
  "Obrigado pela matéria que nos constitui.",
  "Agradeço pela energia que nos move.",
  "Senhor, obrigado pela vida que nos anima.",
  "Agradeço pela primavera que chega renovando tudo.",
  "Obrigado pelas flores que desabrocham.",
  "Agradeço pelos frutos que amadurecem.",
  "Senhor, obrigado pelas sementes que germinam.",
  "Agradeço pela renovação da natureza.",
  "Obrigado pela beleza que se manifesta.",
  
  // Outubro (274-304)
  "Agradeço pelo mês das crianças que nos alegra.",
  "Senhor, obrigado pela inocência infantil.",
  "Agradeço pela pureza dos pequeninos.",
  "Obrigado pela alegria contagiante das crianças.",
  "Agradeço pela espontaneidade que nos ensina.",
  "Senhor, obrigado pela simplicidade que nos liberta.",
  "Agradeço pela curiosidade que nos move.",
  "Obrigado pela criatividade que nos inspira.",
  "Agradeço pela imaginação que nos transporta.",
  "Senhor, obrigado pelos sonhos que nos motivam.",
  "Agradeço pelas brincadeiras que nos divertem.",
  "Obrigado pelos jogos que nos ensinam.",
  "Agradeço pelas risadas que nos curam.",
  "Senhor, obrigado pela leveza que nos alivia.",
  "Agradeço pela descontração que nos relaxa.",
  "Obrigado pela espontaneidade que nos liberta.",
  "Agradeço pela autenticidade que nos define.",
  "Senhor, obrigado pela verdade que nos orienta.",
  "Agradeço pela honestidade que nos dignifica.",
  "Obrigado pela transparência que nos aproxima.",
  "Agradeço pela sinceridade que nos une.",
  "Senhor, obrigado pela confiança que nos fortalece.",
  "Agradeço pela fé que nos sustenta.",
  "Obrigado pela esperança que nos anima.",
  "Agradeço pela caridade que nos transforma.",
  "Senhor, obrigado pelo amor que nos preenche.",
  "Agradeço pela paz que nos acalma.",
  "Obrigado pela alegria que nos contagia.",
  "Agradeço pela bondade que nos eleva.",
  "Senhor, obrigado pela generosidade que nos expande.",
  "Agradeço pela gratidão que nos completa.",
  
  // Novembro (305-334)
  "Obrigado pelo mês da consciência negra.",
  "Agradeço pela diversidade que nos enriquece.",
  "Senhor, obrigado pela igualdade que buscamos.",
  "Agradeço pela justiça que construímos.",
  "Obrigado pela equidade que praticamos.",
  "Agradeço pela inclusão que promovemos.",
  "Senhor, obrigado pelo respeito que cultivamos.",
  "Agradeço pela tolerância que exercitamos.",
  "Obrigado pela aceitação que oferecemos.",
  "Agradeço pelo acolhimento que praticamos.",
  "Senhor, obrigado pela empatia que desenvolvemos.",
  "Agradeço pela compaixão que manifestamos.",
  "Obrigado pela solidariedade que expressamos.",
  "Agradeço pela fraternidade que vivemos.",
  "Senhor, obrigado pela união que fortalecemos.",
  "Agradeço pela comunhão que celebramos.",
  "Obrigado pela partilha que realizamos.",
  "Agradeço pela doação que fazemos.",
  "Senhor, obrigado pela entrega que praticamos.",
  "Agradeço pelo serviço que prestamos.",
  "Obrigado pela missão que cumprimos.",
  "Agradeço pelo propósito que nos guia.",
  "Senhor, obrigado pelo sentido que nos move.",
  "Agradeço pela direção que nos orienta.",
  "Obrigado pelo caminho que nos conduz.",
  "Agradeço pela jornada que percorremos.",
  "Senhor, obrigado pela trajetória que construímos.",
  "Agradeço pela história que escrevemos.",
  "Obrigado pela memória que preservamos.",
  "Agradeço pelo legado que deixamos.",
  "Senhor, obrigado pela herança que transmitimos.",
  "Agradeço pela tradição que mantemos.",
  "Obrigado pela cultura que cultivamos.",
  "Agradeço pela identidade que afirmamos.",
  
  // Dezembro (335-365)
  "Senhor, obrigado pelo Advento que nos prepara.",
  "Agradeço pela espera que nos ensina paciência.",
  "Obrigado pela expectativa que nos anima.",
  "Agradeço pela preparação que nos transforma.",
  "Senhor, obrigado pela vigilância que nos mantém alertas.",
  "Agradeço pela prontidão que nos dispõe.",
  "Obrigado pela disponibilidade que nos abre.",
  "Agradeço pela receptividade que nos acolhe.",
  "Senhor, obrigado pelo Natal que celebramos.",
  "Agradeço pelo nascimento de Jesus que nos salva.",
  "Obrigado pela encarnação que nos redime.",
  "Agradeço pela humanização de Deus que nos dignifica.",
  "Senhor, obrigado pela proximidade divina.",
  "Agradeço pela intimidade com o Criador.",
  "Obrigado pela comunhão com o Pai.",
  "Agradeço pela união com o Filho.",
  "Senhor, obrigado pela presença do Espírito.",
  "Agradeço pela Trindade que nos envolve.",
  "Obrigado pelo mistério que nos fascina.",
  "Agradeço pela revelação que nos ilumina.",
  "Senhor, obrigado pela Palavra que nos guia.",
  "Agradeço pela Escritura que nos ensina.",
  "Obrigado pela Bíblia que nos forma.",
  "Agradeço pelos Evangelhos que nos transformam.",
  "Senhor, obrigado pelas cartas que nos instruem.",
  "Agradeço pelos salmos que nos consolam.",
  "Obrigado pelos provérbios que nos orientam.",
  "Agradeço pelos profetas que nos desafiam.",
  "Senhor, obrigado pela Lei que nos direciona.",
  "Agradeço pela Graça que nos liberta.",
  "Obrigado pelo ano que se encerra, repleto de bênçãos incontáveis e aprendizados preciosos que levarei para sempre em meu coração.",
];

export default function GratitudePage() {
  const router = useRouter();
  const [currentGratitude, setCurrentGratitude] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Determinar qual agradecimento mostrar baseado na data
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    
    // Dias especiais: 31 de dezembro (dia 365) e 1 de janeiro (dia 1)
    const isNewYearsEve = today.getMonth() === 11 && today.getDate() === 31;
    const isNewYearsDay = today.getMonth() === 0 && today.getDate() === 1;
    
    let gratitudeIndex;
    
    if (isNewYearsEve) {
      gratitudeIndex = 364; // Último agradecimento (índice 364)
    } else if (isNewYearsDay) {
      gratitudeIndex = 0; // Primeiro agradecimento
    } else {
      // Para outros dias, usar ordem aleatória mas consistente para o dia
      const seed = dayOfYear;
      const randomIndex = (seed * 9301 + 49297) % 233280;
      gratitudeIndex = randomIndex % gratitudeMessages.length;
    }
    
    setCurrentGratitude(gratitudeMessages[gratitudeIndex]);
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Agradecimento a Deus',
          text: currentGratitude,
        });
      } catch (err) {
        console.log('Erro ao compartilhar:', err);
      }
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Aqui você pode salvar no localStorage ou backend
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            
            <h1 className="text-xl font-bold text-gray-800">Agradecimento a Deus</h1>

            <div className="flex gap-2">
              <button
                onClick={toggleFavorite}
                className={`p-2 rounded-lg transition-all ${
                  isFavorite
                    ? 'bg-amber-100 text-amber-600'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={handleShare}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Share2 className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Decorative Element */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full shadow-lg mb-4">
            <Heart className="w-12 h-12 text-white fill-current" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Gratidão do Dia
          </h2>
          <p className="text-gray-600 text-sm">
            Um agradecimento especial para hoje
          </p>
        </div>

        {/* Gratitude Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed text-center italic">
              "{currentGratitude}"
            </p>
          </div>
        </div>

        {/* Reflection Section */}
        <div className="bg-gradient-to-br from-green-50 to-amber-50 rounded-3xl p-6 shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Momento de Reflexão
          </h3>
          <p className="text-gray-700 mb-4 text-sm">
            Reserve alguns minutos para refletir sobre as bênçãos que Deus tem derramado em sua vida hoje.
          </p>
          
          <div className="space-y-3">
            <div className="bg-white/60 rounded-xl p-4">
              <p className="text-sm text-gray-700">
                💭 <span className="font-medium">Pelo que você é grato hoje?</span>
              </p>
            </div>
            <div className="bg-white/60 rounded-xl p-4">
              <p className="text-sm text-gray-700">
                🙏 <span className="font-medium">Como você pode demonstrar gratidão através de suas ações?</span>
              </p>
            </div>
            <div className="bg-white/60 rounded-xl p-4">
              <p className="text-sm text-gray-700">
                ✨ <span className="font-medium">Que bênção você pode compartilhar com alguém hoje?</span>
              </p>
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 italic text-sm">
            "Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco."
          </p>
          <p className="text-amber-600 font-semibold text-sm mt-1">
            1 Tessalonicenses 5:18
          </p>
        </div>
      </main>
    </div>
  );
}
