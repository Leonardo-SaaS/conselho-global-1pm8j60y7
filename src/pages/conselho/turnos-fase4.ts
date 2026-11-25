import type { TurnoData } from './dados-base'
import { WIKIMEDIA_IMAGES } from './dados-base'

/* Turnos da FASE 4 — O DESAFIO FINAL: A CRISE GLOBAL DE REFUGIADOS (2024–2030)
   IMPORTANTE: sem cronômetro e sem decisão por tempo nesta fase —
   todas as escolhas seguem o padrão bloqueante das demais.
   Textos verbatim do conselho-global.html (fonte da verdade na raiz) */
export const TURNOS_FASE_4: TurnoData[] = [
  // FASE 4 — TURNO 1 (2024) — tipo: "decisão" — Card "Crise dos Refugiados"
  {
    id: 17,
    ano: 2024,
    tipo: 'decisao',
    titulo: 'Onde alocar o orçamento da crise global?',
    texto:
      'A crise global de refugiados chega ao plenário do Conselho. O orçamento é limitado e cada foco escolhido define o rumo da resposta internacional.',
    piada:
      '🧑‍💼 Conselheiro: 120 milhões de deslocados e um único orçamento. O café de hoje será bem amargo.',
    card: {
      id: 'crise_refugiados',
      titulo: 'Crise dos Refugiados',
      sigla: 'O Desafio Final (2024)',
      imagem: WIKIMEDIA_IMAGES.kutupalong.url,
      fallbackEmoji: WIKIMEDIA_IMAGES.kutupalong.emoji,
      fallbackCaption: WIKIMEDIA_IMAGES.kutupalong.caption,
      texto:
        'Em 2024, mais de 120 milhões de pessoas viviam fora de suas residências devido a conflitos armados, violência e violação dos direitos humanos. Mais da metade dos refugiados tem menos de 18 anos e tem origem em países como o Sudão, a Síria, o Afeganistão e a Ucrânia. Os países que mais acolhem são a Alemanha, a Turquia e o Paquistão. O Brasil tem um número crescente de refugiados da Venezuela, de Cuba e de Angola. Nos últimos dez anos o número de refugiados praticamente dobrou.',
    },
    opcoes: [
      {
        id: 't17_a',
        texto: 'Priorizar acolhimento emergencial nos países de primeira linha',
        efeitos: [0, 5, 7],
        correta: true,
      },
      {
        id: 't17_b',
        texto: 'Financiar programas de integração nos países de destino',
        efeitos: [3, 6, 0],
        correta: true,
      },
      {
        id: 't17_c',
        texto: 'Investir em causas raiz nos países de origem',
        efeitos: [5, 4, 0],
        correta: true,
      },
    ],
  },

  // FASE 4 — TURNO 2 (2025) — tipo: "decisão" — Card "ACNUR"
  {
    id: 18,
    ano: 2025,
    tipo: 'decisao',
    titulo: 'Distribuir recursos entre os focos de crise',
    texto:
      'Os relatórios do ACNUR apontam quatro focos críticos ao mesmo tempo. O Conselho precisa decidir como distribuir os recursos limitados entre eles.',
    piada: '🧑‍💼 Conselheiro: Quatro crises, uma planilha. Eu já peço mais café e menos planilha.',
    card: {
      id: 'acnur',
      titulo: 'ACNUR',
      sigla: 'Alto Comissariado das Nações Unidas para Refugiados',
      imagem: WIKIMEDIA_IMAGES.acnurOnu.url,
      fallbackEmoji: WIKIMEDIA_IMAGES.acnurOnu.emoji,
      fallbackCaption: WIKIMEDIA_IMAGES.acnurOnu.caption,
      texto:
        'O ACNUR é uma entidade da ONU, presente em 135 países e territórios, responsável por oferecer assistência e proteção aos refugiados que abandonaram tudo para salvar a própria vida. Em 2024, o Sudão do Sul se tornou o país com o maior número de refugiados e deslocados internos (14,3 milhões), superando a Síria (13,5 milhões), o Afeganistão (10,3 milhões) e a Ucrânia (8,8 milhões).',
    },
    opcoes: [
      {
        id: 't18_a',
        texto: 'Concentrar recursos no Sudão do Sul, o foco mais crítico',
        efeitos: [0, 4, 7],
        correta: true,
      },
      {
        id: 't18_b',
        texto: 'Distribuir igualmente entre os quatro focos de crise',
        efeitos: [3, 4, 4],
        correta: true,
      },
      {
        id: 't18_c',
        texto: 'Priorizar quem mais acolhe, como Alemanha, Turquia e Paquistão',
        efeitos: [5, 3, 0],
        correta: true,
      },
    ],
  },

  // FASE 4 — TURNO 3 (2026) — tipo: "decisão" — Card "Kutupalong"
  {
    id: 19,
    ano: 2026,
    tipo: 'decisao',
    titulo: 'Como lidar com a superlotação de Kutupalong?',
    texto:
      'O maior campo de refugiados do mundo está superlotado e as condições pioram a cada temporada de chuvas. O Conselho precisa decidir como responder.',
    piada:
      '🧑‍💼 Conselheiro: 800 mil pessoas num espaço feito para muito menos. A pauta é pesada; a solução, urgente.',
    card: {
      id: 'kutupalong',
      titulo: 'Kutupalong',
      sigla: "Cox's Bazar, Bangladesh",
      imagem: WIKIMEDIA_IMAGES.kutupalong.url,
      fallbackEmoji: WIKIMEDIA_IMAGES.kutupalong.emoji,
      fallbackCaption: WIKIMEDIA_IMAGES.kutupalong.caption,
      texto:
        "Kutupalong, localizado no distrito costeiro de Cox's Bazar, é atualmente o maior campo de refugiados do mundo. O chamado megacampo abriga cerca de 800 mil refugiados, predominantemente rohingyas, que fugiram da perseguição que sofriam em Mianmar, onde eram desprezados e considerados intrusos.",
    },
    opcoes: [
      {
        id: 't19_a',
        texto: 'Expandir infraestrutura e serviços básicos do megacampo',
        efeitos: [0, 6, 6],
        correta: true,
      },
      {
        id: 't19_b',
        texto: 'Reassentamento gradual em outras regiões e países',
        efeitos: [3, 5, 3],
        correta: true,
      },
      {
        id: 't19_c',
        texto: 'Negociar repatriação segura e voluntária com Mianmar',
        efeitos: [2, 5, 0],
        correta: true,
      },
    ],
  },

  // FASE 4 — TURNO 4 (2027) — tipo: "decisão" — Card "Apátridas"
  {
    id: 20,
    ano: 2027,
    tipo: 'decisao',
    titulo: 'Criar política de regularização dos apátridas',
    texto:
      'Millions seguem sem nacionalidade reconhecida em vários continentes. O Conselho debate uma política global de regularização.',
    piada:
      '🧑‍💼 Conselheiro: Nascer sem país é a única crise que a burocracia não inventou — mas pode resolver.',
    card: {
      id: 'apatridas',
      titulo: 'Apátridas',
      sigla: 'Pessoas sem nacionalidade',
      imagem: WIKIMEDIA_IMAGES.onuHq.url,
      fallbackEmoji: WIKIMEDIA_IMAGES.onuHq.emoji,
      fallbackCaption: WIKIMEDIA_IMAGES.onuHq.caption,
      texto:
        'Além dos refugiados, há também milhões de apátridas: pessoas que tiveram a nacionalidade negada e que não têm direitos básicos, como saúde, educação, liberdade e emprego.',
    },
    opcoes: [
      {
        id: 't20_a',
        texto: 'Campanha global de registro civil universal',
        efeitos: [0, 7, 2],
        correta: true,
      },
      {
        id: 't20_b',
        texto: 'Tratado de regularização com acesso a direitos básicos',
        efeitos: [2, 6, 0],
        correta: true,
      },
      {
        id: 't20_c',
        texto: 'Fundos para documentação e assistência jurídica',
        efeitos: [3, 4, 2],
        correta: true,
      },
    ],
  },

  // FASE 4 — TURNO 5 (2029) — tipo: "rotina" — Pressão sobre os países de acolhimento
  {
    id: 21,
    ano: 2029,
    tipo: 'rotina',
    titulo: 'Pressão sobre os países de acolhimento',
    texto:
      'Os países que mais acolhem refugiados pedem reforço. Sem apoio, o risco é fecharem suas fronteiras. O Conselho ajusta o rumo da governança.',
    opcoes: [
      {
        id: 't21_a',
        texto: 'Reforçar financiamento direto aos países de acolhimento',
        efeitos: [4, 2, 6],
        correta: true,
      },
      {
        id: 't21_b',
        texto: 'Criar cotas de redistribuição entre regiões',
        efeitos: [2, 5, 3],
        correta: true,
      },
      {
        id: 't21_c',
        texto: 'Programas de desenvolvimento nas regiões de fronteira',
        efeitos: [3, 4, 0],
        correta: true,
      },
    ],
  },

  // FASE 4 — TURNO 6 (2030) — tipo: "decisão" — FECHAMENTO (VITÓRIA/DERROTA AQUI)
  {
    id: 22,
    ano: 2030,
    tipo: 'decisao',
    titulo: 'Consolidação do legado global',
    texto:
      'O ciclo 2024–2030 se fecha. O Conselho decide como consolidar o sistema global de proteção construído desde 1944.',
    piada:
      '🧑‍💼 Conselheiro: De Bretton Woods a 2030. O anexo continua com 400 páginas — mas agora todo mundo leu.',
    opcoes: [
      {
        id: 't22_a',
        texto: 'Tornar permanentes os mecanismos de proteção aos refugiados',
        efeitos: [5, 6, 5],
        correta: true,
      },
      {
        id: 't22_b',
        texto: 'Integrar refugiados e apátridas às agendas nacionais de desenvolvimento',
        efeitos: [3, 6, 3],
        correta: true,
      },
      {
        id: 't22_c',
        texto: 'Fixar metas de longo prazo com financiamento garantido',
        efeitos: [6, 3, 4],
        correta: true,
      },
    ],
  },
]
