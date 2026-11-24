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
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/United_Nations_Headquarters_-_New_York_City.jpg',
    emoji: '🪶',
    caption: 'Sede da ONU em Nova York — Conferência Mundial sobre Povos Indígenas (2014)',
  },
  ods2015: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/United_Nations_Headquarters_-_New_York_City.jpg',
    emoji: '🌍',
    caption: 'Sede da ONU em Nova York — Cimeira de Desenvolvimento Sustentável (2015)',
  },
}

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
