// Tipos, imagens e constantes compartilhadas do jogo "Conselho Global"
// Textos verbatim do conselho-global.html (fonte da verdade na raiz)

export interface CardData {
  id: string
  titulo: string
  sigla?: string
  imagem?: string
  fallbackEmoji?: string
  fallbackCaption?: string
  texto: string
}

export interface OpcaoData {
  id: string
  texto: string
  efeitos?: [number, number, number]
  correta?: boolean
  consequencia?: string
}

export interface TurnoData {
  id: number
  ano: number
  tipo: 'decisao' | 'historica' | 'rotina'
  titulo: string
  texto: string
  piada?: string
  naVidaReal?: string
  card?: CardData
  opcoes: OpcaoData[]
}

export interface FaseInfo {
  id: number
  titulo: string
  endTitle: string
  endSubtitle: string
  endBalanceTitle: string
  proximaAviso: string
  turnos: TurnoData[]
}

// Constantes de imagens públicas do Wikimedia Commons (com fallback via onerror)
export const WIKIMEDIA_IMAGES = {
  brettonWoods: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Mount_Washington_Hotel_Resort_Bretton_Woods_New_Hampshire.JPG',
    emoji: '🏨',
    caption: 'Hotel Mount Washington — Bretton Woods (1944)',
  },
  omcGenebra: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Cwr_aerial_2001.jpg',
    emoji: '🏛️',
    caption: 'Centre William Rappard — Sede da OMC em Genebra',
  },
  kutupalong: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Kutupalong_rohingya_camp_view.jpg',
    emoji: '🏕️',
    caption: 'Campo de refugiados de Kutupalong',
  },
  viena1993: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Wien_-_Hofburgburg_-_Heldenplatz.JPG',
    emoji: '🤝',
    caption: 'Hofburg, Viena — sede da Conferência Mundial de Direitos Humanos (1993)',
  },
  indigenas2014: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/United_Nations_Headquarters_in_New_York_City%2C_view_from_Roosevelt_Island.jpg',
    emoji: '🪶',
    caption: 'Sede da ONU em Nova York — Conferência Mundial sobre Povos Indígenas (2014)',
  },
  ods2015: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/United_Nations_Headquarters_in_New_York_City%2C_view_from_Roosevelt_Island.jpg',
    emoji: '🌍',
    caption: 'Sede da ONU em Nova York — Cimeira de Desenvolvimento Sustentável (2015)',
  },
  onuHq: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/United_Nations_Headquarters_in_New_York_City%2C_view_from_Roosevelt_Island.jpg',
    emoji: '🕊️',
    caption: 'Sede da ONU em Nova York',
  },
  acnurOnu: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/United_Nations_Headquarters_in_New_York_City%2C_view_from_Roosevelt_Island.jpg',
    emoji: '🕊️',
    caption: 'Sede da ONU em Nova York — Alto Comissariado das Nações Unidas para Refugiados',
  },
}

/* Bloco de estudo da tela final — 12 bullets, verbatim do conselho-global.html */
export const ESTUDO_BULLETS = [
  'O Sistema das Nações Unidas reúne 15 agências especializadas, 7 organizações relacionadas e diversos fundos e programas, coordenados pelo Ecosoc, com orçamento próprio vindo de contribuições.',
  'FAO, OMS, Unesco e OIT são agências com grande impacto na defesa dos Direitos Humanos no dia a dia.',
  'A Conferência de Bretton Woods (1944) criou o FMI e o Bird (Banco Mundial) e adotou o padrão dólar/ouro, com o objetivo de garantir estabilidade econômica como base da paz.',
  'O câmbio fixo durou quase 30 anos; na década de 1970 passou-se ao câmbio flutuante, definido pela oferta e demanda de moeda estrangeira.',
  'Unicef, Pnud e ACNUR não são agências, mas programas e fundos com autonomia financeira e administrativa.',
  'A OMC substituiu o GATT em 1995 e regula o comércio global por meio de rodadas de negociação.',
  'A Rodada de Doha (2001) travou no impasse entre abertura industrial e abertura agrícola, com o SSM como ponto central de divergência.',
  'A ONU realizou conferências sobre Direitos Humanos: Viena (1993), as Conferências sobre as Mulheres, Povos Indígenas (2014) e a Cimeira de Nova York (2015).',
  'A Agenda 2030 definiu 17 ODS e 169 metas a serem atingidas até 2030.',
  'Em 2024, mais de 120 milhões de pessoas estavam deslocadas; mais da metade tem menos de 18 anos.',
  "O ACNUR atua em 135 países; Kutupalong, em Cox's Bazar, é o maior campo de refugiados do mundo, com cerca de 800 mil rohingyas.",
  'Apátridas são pessoas sem nacionalidade, sem acesso a direitos básicos como saúde, educação e emprego.',
]

// Lista dos 17 ODS (nomes curtos oficiais, pt-BR)
export const ODS_LISTA = [
  'Erradicação da pobreza',
  'Fome zero',
  'Saúde e bem-estar',
  'Educação de qualidade',
  'Igualdade de gênero',
  'Água potável e saneamento',
  'Energia limpa e acessível',
  'Trabalho decente e crescimento econômico',
  'Indústria, inovação e infraestrutura',
  'Redução das desigualdades',
  'Cidades e comunidades sustentáveis',
  'Consumo e produção responsáveis',
  'Ação contra a mudança global do clima',
  'Vida na água',
  'Vida terrestre',
  'Paz, justiça e instituições eficazes',
  'Parcerias e meios de implementação',
]

// Piada do turno 2015: rolagem GIGANTE das "169 metas" (17 ODS x 10 linhas)
export function buildObj169Lines(): string[] {
  const linhas: string[] = []
  let meta = 1
  for (let i = 1; i <= 17; i++) {
    for (let m = 0; m < 10; m++) {
      linhas.push(
        `${ODS_LISTA[i - 1]} — meta ${meta} de 169: indicadores de acompanhamento, financiamento e prestação de contas.`,
      )
      meta++
    }
  }
  return linhas
}
