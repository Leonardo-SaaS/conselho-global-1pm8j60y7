import type { TurnoData } from './dados-base'
import { WIKIMEDIA_IMAGES } from './dados-base'

/* Turnos da FASE 3 — CONFERÊNCIAS E A AGENDA 2030 (1993–2015)
   IMPORTANTE: sem cronômetro e sem decisão por tempo nesta fase —
   todas as escolhas seguem o padrão bloqueante das demais.
   Textos verbatim do conselho-global.html (fonte da verdade na raiz) */
export const TURNOS_FASE_3: TurnoData[] = [
  // FASE 3 — TURNO 1 (1993) — tipo: "decisão" — Card "Conferência de Viena"
  {
    id: 12,
    ano: 1993,
    tipo: 'decisao',
    titulo: 'Conferência de Viena',
    texto:
      'A Conferência Mundial sobre Direitos Humanos se reúne em Viena. O Conselho precisa decidir como conduzir a pauta de direitos humanos para as próximas décadas.',
    piada:
      '🧑‍💼 Conselheiro: Viena é famosa por música e por decisões históricas. A pauta de hoje é só a segunda opção.',
    card: {
      id: 'conferencia_viena',
      titulo: 'Conferência de Viena',
      sigla: 'Conferência Mundial sobre Direitos Humanos (1993)',
      texto:
        'A Conferência Mundial sobre Direitos Humanos, realizada em Viena em 1993, foi um dos encontros organizados pela ONU para discutir temas de grande importância para os Direitos Humanos. Desde sua criação, a ONU organizou diversos tipos de conferências com esse objetivo.',
    },
    opcoes: [
      {
        id: 't12_a',
        texto: 'Firmar um compromisso global de proteção aos Direitos Humanos',
        efeitos: [0, 7, 0],
        correta: true,
      },
      {
        id: 't12_b',
        texto: 'Priorizar relatórios anuais de monitoramento',
        efeitos: [2, 4, 0],
        correta: true,
      },
      {
        id: 't12_c',
        texto: 'Deixar cada país definir sua própria política de direitos humanos',
        efeitos: [0, -3, 0],
        correta: true,
      },
    ],
  },

  // FASE 3 — TURNO 2 (1995) — tipo: "decisão" — Card "Conferências sobre as Mulheres"
  {
    id: 13,
    ano: 1995,
    tipo: 'decisao',
    titulo: 'Conferências sobre as Mulheres',
    texto:
      'A pauta das mulheres chega ao centro das conferências da ONU. O Conselho precisa decidir como apoiar esse esforço global.',
    piada:
      '🧑‍💼 Conselheiro: Quatro conferências depois, o tema finalmente ganhou o plenário inteiro — e a pauta definitiva.',
    card: {
      id: 'conferencias_mulheres',
      titulo: 'Conferências sobre as Mulheres',
      sigla: 'Quatro Conferências Mundiais sobre as Mulheres',
      texto:
        'As Quatro Conferências Mundiais sobre as Mulheres foram encontros organizados pela ONU para discutir direitos e condições de vida das mulheres em escala global, parte do esforço da organização em torno dos Direitos Humanos.',
    },
    opcoes: [
      {
        id: 't13_a',
        texto: 'Apoiar políticas públicas de igualdade de gênero',
        efeitos: [0, 7, 0],
        correta: true,
      },
      {
        id: 't13_b',
        texto: 'Investir em educação e saúde das mulheres',
        efeitos: [2, 5, 0],
        correta: true,
      },
      {
        id: 't13_c',
        texto: 'Tratar o tema como assunto interno de cada país',
        efeitos: [0, -3, 0],
        correta: true,
      },
    ],
  },

  // FASE 3 — TURNO 3 (2007) — tipo: "rotina" — Pressão por metas mensuráveis
  {
    id: 14,
    ano: 2007,
    tipo: 'rotina',
    titulo: 'Pressão por metas mensuráveis',
    texto:
      'Relatórios exigem metas claras e mensuráveis para os compromissos globais. O Conselho ajusta o rumo da governança.',
    opcoes: [
      {
        id: 't14_a',
        texto: 'Adotar indicadores quantitativos de acompanhamento',
        efeitos: [4, 3, 0],
        correta: true,
      },
      {
        id: 't14_b',
        texto: 'Criar painéis de auditoria internacional',
        efeitos: [2, 2, 0],
        correta: true,
      },
      {
        id: 't14_c',
        texto: 'Ampliar financiamento de programas sociais',
        efeitos: [0, 3, 3],
        correta: true,
      },
    ],
  },

  // FASE 3 — TURNO 4 (2014) — tipo: "decisão" — Card "Povos Indígenas"
  {
    id: 15,
    ano: 2014,
    tipo: 'decisao',
    titulo: 'Povos Indígenas',
    texto:
      'Nova York recebe a Conferência Mundial sobre Povos Indígenas. O Conselho precisa definir como apoiar essa pauta.',
    piada:
      '🧑‍💼 Conselheiro: A sala nunca esteve tão cheia de sabedoria ancestral — e de tradutores simultâneos.',
    card: {
      id: 'povos_indigenas',
      titulo: 'Povos Indígenas',
      sigla: 'Conferência Mundial sobre Povos Indígenas (2014)',
      imagem: WIKIMEDIA_IMAGES.indigenas2014.url,
      fallbackEmoji: WIKIMEDIA_IMAGES.indigenas2014.emoji,
      fallbackCaption: WIKIMEDIA_IMAGES.indigenas2014.caption,
      texto:
        'A Conferência Mundial sobre Povos Indígenas foi realizada em Nova York, em 2014, e integra o conjunto de conferências da ONU voltadas à defesa dos Direitos Humanos.',
    },
    opcoes: [
      {
        id: 't15_a',
        texto: 'Garantir participação indígena nos órgãos de decisão',
        efeitos: [0, 7, 0],
        correta: true,
      },
      {
        id: 't15_b',
        texto: 'Proteger territórios e modos de vida tradicionais',
        efeitos: [0, 5, 3],
        correta: true,
      },
      {
        id: 't15_c',
        texto: 'Apenas documentar as reuniões, sem compromisso concreto',
        efeitos: [0, -3, 0],
        correta: true,
      },
    ],
  },

  // FASE 3 — TURNO 5 (2015) — tipo: "historica" — DECISÃO HISTÓRICA AGENDA 2030
  {
    id: 16,
    ano: 2015,
    tipo: 'historica',
    titulo: 'Cimeira de Nova York / Agenda 2030',
    texto:
      'A Cimeira das Nações Unidas para um Desenvolvimento Sustentável se reúne em Nova York para definir a agenda global das próximas décadas.',
    piada:
      '🧑‍💼 Conselheiro: 169 metas, 17 objetivos, 1 café. A matemática do Conselho é implacável.',
    naVidaReal: '📌 Na vida real: a Agenda 2030 foi adotada com os 17 ODS e as 169 metas.',
    card: {
      id: 'agenda_2030',
      titulo: 'Cimeira de Nova York / Agenda 2030',
      sigla: 'ODS e 169 metas até 2030',
      imagem: WIKIMEDIA_IMAGES.ods2015.url,
      fallbackEmoji: WIKIMEDIA_IMAGES.ods2015.emoji,
      fallbackCaption: WIKIMEDIA_IMAGES.ods2015.caption,
      texto:
        'A Cimeira das Nações Unidas para um Desenvolvimento Sustentável, realizada em Nova York em 2015, definiu os 17 Objetivos de Desenvolvimento Sustentável (ODS) e 169 metas concretas que todos os países devem atingir até 2030. Esse conjunto é conhecido como Agenda 2030.',
    },
    opcoes: [
      {
        id: 't16_a',
        texto: 'Adotar a Agenda 2030 com os 17 ODS e as 169 metas',
        efeitos: [5, 8, 2],
        correta: true,
      },
      {
        id: 't16_b',
        texto: 'Adotar só metas econômicas, sem os ODS sociais e ambientais',
        efeitos: [6, -6, 0],
        correta: false,
        consequencia:
          'os indicadores sociais e ambientais ficam sem referência e a barra de Direitos Humanos cai',
      },
      {
        id: 't16_c',
        texto: 'Deixar cada país definir suas próprias metas, sem acordo comum',
        efeitos: [0, -4, -2],
        correta: false,
        consequencia: 'sem metas comuns não há como comparar progresso e a agenda se dilui',
      },
    ],
  },
]
