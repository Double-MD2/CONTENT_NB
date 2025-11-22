'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, Calendar, Church } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface LiturgicalReading {
  date: string;
  liturgicalDay: string;
  liturgicalColor: string;
  firstReading: {
    reference: string;
    text: string;
  };
  psalm: {
    reference: string;
    text: string;
  };
  secondReading?: {
    reference: string;
    text: string;
  };
  gospel: {
    reference: string;
    text: string;
  };
}

export default function LeituraDoDialPage() {
  const router = useRouter();
  const [reading, setReading] = useState<LiturgicalReading | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento da leitura do dia baseada no calendário litúrgico
    // Em produção, isso seria uma chamada à API do Vaticano ou serviço similar
    const loadTodayReading = () => {
      const today = new Date();
      const formattedDate = today.toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      // Dados mockados - em produção viriam de uma API
      const mockReading: LiturgicalReading = {
        date: formattedDate,
        liturgicalDay: 'Tempo Comum - Semana I',
        liturgicalColor: 'Verde',
        firstReading: {
          reference: 'Hebreus 2,5-12',
          text: 'Leitura da Carta aos Hebreus.\n\nIrmãos: Não foi a anjos que Deus submeteu o mundo futuro, do qual estamos falando. Pelo contrário, alguém declarou solenemente na Escritura: "Que é o homem, para dele te lembrares? Ou o filho do homem, para que o consideres? Tu o fizeste um pouco menor que os anjos, coroaste-o de glória e de honra, tudo submeteste debaixo de seus pés."\n\nAo submeter-lhe todas as coisas, Deus nada deixou que não lhe estivesse sujeito. Agora, porém, ainda não vemos todas as coisas submetidas ao homem. Mas vemos Jesus, que foi feito um pouco menor que os anjos, coroado de glória e de honra, por ter sofrido a morte, a fim de que, pela graça de Deus, experimentasse a morte em favor de todos.\n\nConvinha, com efeito, que aquele por quem e para quem tudo existe, conduzindo muitos filhos à glória, tornasse perfeito, por meio de sofrimentos, o autor da salvação deles. Pois tanto aquele que santifica como os que são santificados têm todos a mesma origem. Por isso, Jesus não se envergonha de chamá-los irmãos, dizendo: "Anunciarei o teu nome aos meus irmãos, no meio da assembleia te louvarei".\n\nPalavra do Senhor.'
        },
        psalm: {
          reference: 'Salmo 8',
          text: 'Ó Senhor, nosso Deus, quão admirável é vosso nome!\n\nÓ Senhor, nosso Deus, quão admirável é vosso nome por toda a terra! Vossa majestade se eleva acima dos céus.\n\nQuando contemplo os céus, obra de vossos dedos, a lua e as estrelas que fixastes, que é o homem, para dele vos lembrardes, o filho de Adão, para o visitardes?\n\nVós o fizestes um pouco menor que os anjos, de glória e honra o coroastes. Destes-lhe poder sobre as obras de vossas mãos, sob seus pés tudo colocastes.'
        },
        gospel: {
          reference: 'Marcos 1,21-28',
          text: 'Proclamação do Evangelho de Jesus Cristo segundo Marcos.\n\nNaquele tempo, Jesus e seus discípulos foram a Cafarnaum. No sábado, Jesus entrou na sinagoga e começou a ensinar. Todos ficavam admirados com seu ensinamento, pois ensinava como quem tem autoridade e não como os mestres da Lei.\n\nNa sinagoga estava um homem possuído por um espírito mau. Ele gritou: "Que queres de nós, Jesus Nazareno? Vieste para nos destruir? Sei quem tu és: tu és o Santo de Deus!"\n\nJesus o ameaçou, dizendo: "Cala-te e sai desse homem!" O espírito mau agitou o homem com violência, deu um grande grito e saiu. Todos ficaram admirados e comentavam: "O que é isto? Um ensinamento novo, dado com autoridade: ele manda até nos espíritos maus e eles lhe obedecem!"\n\nE a fama de Jesus logo se espalhou por toda a região da Galileia.\n\nPalavra da Salvação.'
        }
      };

      setReading(mockReading);
      setLoading(false);
    };

    loadTodayReading();
  }, []);

  const getColorClass = (color: string) => {
    const colors: { [key: string]: string } = {
      'Verde': 'from-green-500 to-green-600',
      'Roxo': 'from-purple-500 to-purple-600',
      'Branco': 'from-gray-100 to-gray-200',
      'Vermelho': 'from-red-500 to-red-600',
      'Rosa': 'from-pink-400 to-pink-500'
    };
    return colors[color] || 'from-green-500 to-green-600';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando leitura do dia...</p>
        </div>
      </div>
    );
  }

  if (!reading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Não foi possível carregar a leitura.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-800">Leitura do Dia</h1>
              <p className="text-sm text-gray-500">{reading.date}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-3xl">
        {/* Liturgical Info Card */}
        <div className={`bg-gradient-to-br ${getColorClass(reading.liturgicalColor)} rounded-2xl shadow-lg p-6 mb-6 text-white`}>
          <div className="flex items-center gap-3 mb-3">
            <Church className="w-8 h-8" />
            <div>
              <h2 className="text-2xl font-bold">{reading.liturgicalDay}</h2>
              <p className="text-white/90 text-sm">Cor Litúrgica: {reading.liturgicalColor}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-white/90 text-sm">
            <Calendar className="w-4 h-4" />
            <span>Calendário Romano Geral - Santa Sé</span>
          </div>
        </div>

        {/* First Reading */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Primeira Leitura</h3>
              <p className="text-sm text-gray-500">{reading.firstReading.reference}</p>
            </div>
          </div>
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {reading.firstReading.text}
            </p>
          </div>
        </div>

        {/* Psalm */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Salmo Responsorial</h3>
              <p className="text-sm text-gray-500">{reading.psalm.reference}</p>
            </div>
          </div>
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {reading.psalm.text}
            </p>
          </div>
        </div>

        {/* Second Reading (if exists) */}
        {reading.secondReading && (
          <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-500 rounded-full flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">Segunda Leitura</h3>
                <p className="text-sm text-gray-500">{reading.secondReading.reference}</p>
              </div>
            </div>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                {reading.secondReading.text}
              </p>
            </div>
          </div>
        )}

        {/* Gospel */}
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl shadow-md p-6 mb-6 border-2 border-amber-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Evangelho</h3>
              <p className="text-sm text-gray-600">{reading.gospel.reference}</p>
            </div>
          </div>
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-800 whitespace-pre-line leading-relaxed font-medium">
              {reading.gospel.text}
            </p>
          </div>
        </div>

        {/* Info Footer */}
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">Fonte:</span> As leituras seguem o Calendário Romano Geral estabelecido pela Santa Sé (Vaticano) para a Igreja Católica Apostólica Romana.
          </p>
        </div>
      </div>
    </div>
  );
}
