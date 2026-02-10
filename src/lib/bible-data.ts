interface BibleVerse {
  number: number;
  text: string;
}

interface BibleChapter {
  number: number;
  verses: BibleVerse[];
}

interface BibleBook {
  name: string;
  chapters: BibleChapter[];
}

const bibleData: BibleBook[] = [
  {
    "name": "Gênesis",
    "chapters": [
      {
        "number": 1,
        "verses": [
          {
            "number": 1,
            "text": "No princípio, criou Deus os céus e a terra."
          },
          {
            "number": 2,
            "text": "E a terra era sem forma e vazia; e havia trevas sobre a face do abismo; e o Espírito de Deus se movia sobre a face das águas."
          },
          {
            "number": 3,
            "text": "E disse Deus: Haja luz. E houve luz."
          }
        ]
      }
    ]
  },
  {
    "name": "Êxodo",
    "chapters": [
      {
        "number": 1,
        "verses": [
          {
            "number": 1,
            "text": "Estes, pois, são os nomes dos filhos de Israel que entraram no Egito com Jacó; cada um entrou com sua casa:"
          }
        ]
      }
    ]
  }
];

export default bibleData;
