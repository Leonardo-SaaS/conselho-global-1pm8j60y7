import type { FaseInfo, TurnoData } from './dados-base'
import { WIKIMEDIA_IMAGES } from './dados-base'
import { TURNOS_FASE_2 } from './turnos-fase2'
import { TURNOS_FASE_3 } from './turnos-fase3'
import { TURNOS_FASE_4 } from './turnos-fase4'

/* Turnos da FASE 1 — 1944–1970 (textos verbatim do conselho-global.html) */
export const TURNOS_FASE_1: TurnoData[] = [
  // TURNO 1 (1944) — tipo: "decisão"
  {
    id: 1,
    ano: 1944,
    tipo: 'decisao',
    titulo: 'Como organizar o orçamento das agências?',
    texto:
      'A guerra na Europa ainda não acabou, mas os países aliados já desenham o mundo de depois dela. A primeira grande tarefa do Conselho: definir como as agências do Sistema das Nações Unidas serão financiadas.',
    piada:
      '🧑‍💼 Conselheiro: O anexo tem 400 páginas e ninguém leu. Como sempre, decidimos pelo clima da sala.',
    card: {
      id: 'onu_sistema',
      titulo: 'Sistema das Nações Unidas',
      sigla: 'ONU / Sistema ONU',
      texto:
        'A ONU faz parte do Sistema das Nações Unidas, que reúne 15 agências especializadas, 7 organizações relacionadas e diversos fundos e programas. Algumas agências já existiam antes da Primeira Guerra Mundial. Elas são coordenadas pelo Ecosoc e têm orçamento próprio, também por meio de contribuição. O Sistema existe para promover os direitos humanos, combater as mudanças climáticas e reduzir a desigualdade entre os povos.',
    },
    opcoes: [
      {
        id: 't1_a',
        texto: 'Contribuições obrigatórias, proporcionais à economia de cada país',
        efeitos: [5, 3, 0],
        correta: true,
      },
      {
        id: 't1_b',
        texto: 'Orçamento igual para todos os países, grandes ou pequenos',
        efeitos: [0, 5, 0],
        correta: true,
      },
      {
        id: 't1_c',
        texto: 'Depender de doações voluntárias dos países mais ricos',
        efeitos: [-3, 0, 5],
        correta: true,
      },
    ],
  },

  // TURNO 2 (1944) — tipo: "decisão"
  {
    id: 2,
    ano: 1944,
    tipo: 'decisao',
    titulo: 'Qual área priorizar neste primeiro momento?',
    texto:
      'O Sistema das Nações Unidas está de pé. Agora o Conselho precisa escolher onde concentrar os primeiros esforços das agências.',
    piada:
      '🧑‍💼 Conselheiro: O café do plenário acabou de novo. Se isso continuar, teremos nossa primeira crise diplomática interna.',
    card: {
      id: 'agencias_dh',
      titulo: 'Agências de Direitos Humanos',
      sigla: 'FAO, OMS, Unesco, OIT',
      texto:
        'Quatro agências têm grande impacto na defesa dos Direitos Humanos no dia a dia: a FAO (Organização das Nações Unidas para a Alimentação e Cultura), a OMS (Organização Mundial de Saúde), a Unesco (Organização das Nações Unidas para a Educação, Ciência e Cultura) e a OIT (Organização Internacional do Trabalho).',
    },
    opcoes: [
      {
        id: 't2_a',
        texto: 'FAO — combate à fome e segurança alimentar',
        efeitos: [0, 4, 6],
        correta: true,
      },
      {
        id: 't2_b',
        texto: 'OMS — campanhas de saúde e vacinação',
        efeitos: [0, 6, 4],
        correta: true,
      },
      {
        id: 't2_c',
        texto: 'Unesco e OIT — educação, ciência e trabalho digno',
        efeitos: [3, 6, 0],
        correta: true,
      },
    ],
  },

  // TURNO 3 (1944) — tipo: "historica" — DECISÃO HISTÓRICA BRETTON WOODS
  {
    id: 3,
    ano: 1944,
    tipo: 'historica',
    titulo: 'Conferência de Bretton Woods',
    texto:
      'Representantes de 44 nações aliadas reúnem-se em New Hampshire para desenhar a ordem econômica global do pós-guerra e evitar os erros que levaram à Grande Depressão.',
    naVidaReal: '📌 Na vida real: os países criaram o FMI e o Bird e adotaram o padrão dólar/ouro.',
    card: {
      id: 'bretton_woods',
      titulo: 'Conferência de Bretton Woods',
      sigla: 'FMI & BIRD (Banco Mundial)',
      imagem: WIKIMEDIA_IMAGES.brettonWoods.url,
      fallbackEmoji: WIKIMEDIA_IMAGES.brettonWoods.emoji,
      fallbackCaption: WIKIMEDIA_IMAGES.brettonWoods.caption,
      texto:
        'A Conferência de Bretton Woods (1944) foi uma conferência monetária e financeira das Nações Unidas, realizada na cidade de mesmo nome no nordeste dos Estados Unidos. Ela criou as regras para o sistema monetário internacional do pós-Segunda Guerra Mundial, entre elas a adoção do padrão dólar/ouro. O principal objetivo era garantir estabilidade econômica, fundamental para a paz. As instituições criadas passariam a fornecer empréstimos para países com dificuldades financeiras.',
    },
    opcoes: [
      {
        id: 't3_a',
        texto:
          'Criar o FMI e o Bird (Banco Mundial) e adotar o padrão dólar/ouro, com empréstimos a países em dificuldade e assistência financeira para reconstruir nações devastadas pela guerra',
        efeitos: [10, 5, 5],
        correta: true,
      },
      {
        id: 't3_b',
        texto: 'Manter cada país com sua própria moeda, sem instituição comum de empréstimo',
        efeitos: [-10, 0, 0],
        correta: false,
        consequencia:
          'Sem credor comum, as moedas se desvalorizam em cascata e a reconstrução trava.',
      },
      {
        id: 't3_c',
        texto: 'Criar um banco apenas europeu, sem alcance global',
        efeitos: [-5, 0, -5],
        correta: false,
        consequencia:
          'Países fora da Europa ficam sem financiamento e a estabilidade não se globaliza.',
      },
    ],
  },

  // TURNO 4 (1950) — tipo: "rotina"
  {
    id: 4,
    ano: 1950,
    tipo: 'rotina',
    titulo: 'A reconstrução em curso',
    texto:
      'As decisões do Conselho começam a surtir efeito. Fábricas reabrem na Europa, portos voltam a operar e os primeiros acordos comerciais são assinados. Resta ajustar o rumo para o próximo semestre.',
    opcoes: [
      {
        id: 't4_a',
        texto: 'Reforçar acordos de comércio internacional',
        efeitos: [6, 0, 0],
        correta: true,
      },
      {
        id: 't4_b',
        texto: 'Ampliar programas sociais de reconstrução',
        efeitos: [0, 6, 0],
        correta: true,
      },
      {
        id: 't4_c',
        texto: 'Formar estoques de suprimentos humanitários',
        efeitos: [0, 0, 6],
        correta: true,
      },
    ],
  },

  // TURNO 5 (1960) — tipo: "rotina"
  {
    id: 5,
    ano: 1960,
    tipo: 'rotina',
    titulo: 'Descolonização',
    texto:
      'Uma nova onda de países independentes chega à Assembleia Geral. As novas nações pedem investimento em desenvolvimento, não apenas empréstimos de emergência. O Conselho precisa reequilibrar as prioridades.',
    opcoes: [
      {
        id: 't5_a',
        texto: 'Créditos para industrialização das novas nações',
        efeitos: [6, 2, 0],
        correta: true,
      },
      {
        id: 't5_b',
        texto: 'Educação e saúde básica em larga escala',
        efeitos: [0, 6, 2],
        correta: true,
      },
      {
        id: 't5_c',
        texto: 'Rede humanitária de resposta rápida',
        efeitos: [0, 0, 6],
        correta: true,
      },
    ],
  },

  // TURNO 6 (1970) — tipo: "historica" — DECISÃO HISTÓRICA FIM DO CÂMBIO FIXO
  {
    id: 6,
    ano: 1970,
    tipo: 'historica',
    titulo: 'Fim do câmbio fixo',
    texto:
      'A pressão sobre o padrão dólar/ouro atinge níveis insustentáveis. Os principais bancos centrais não conseguem mais sustentar a paridade fixa e o Conselho debate a transição do sistema.',
    piada:
      '🧑‍💼 Conselheiro: Se mais um país pedir reunião extraordinária, eu mesmo peço asilo à Unesco.',
    naVidaReal: '📌 Na vida real: na década de 1970, o mundo adotou o câmbio flutuante.',
    card: {
      id: 'fim_cambio_fixo',
      titulo: 'Fim do câmbio fixo',
      sigla: 'Câmbio Flutuante',
      texto:
        'O regime de câmbio fixo durou quase 30 anos. Na década de 1970, adotou-se o câmbio flutuante, utilizado desde então. Câmbio flutuante é um sistema no qual a taxa de câmbio de uma moeda é definida pela oferta e pela demanda de moeda estrangeira no mercado, que variam em função da inflação, da taxa de juros e do crescimento econômico de cada país.',
    },
    opcoes: [
      {
        id: 't6_a',
        texto: 'Adotar o câmbio flutuante',
        efeitos: [10, 0, 0],
        correta: true,
      },
      {
        id: 't6_b',
        texto: 'Insistir no câmbio fixo',
        efeitos: [-10, 0, 0],
        correta: false,
        consequencia: 'As reservas se esgotam e a crise de inflação e juros se aprofunda.',
      },
      {
        id: 't6_c',
        texto: 'Congelar todas as moedas ao dólar sem ajuste',
        efeitos: [-8, -2, 0],
        correta: false,
        consequencia: 'O desequilíbrio comercial explode.',
      },
    ],
  },
]

/* Estrutura de fases — Fase 1 (1944–1970), Fase 2 (1990–2001), Fase 3 (1993–2015), Fase 4 (2024–2030) */
export const FASES: FaseInfo[] = [
  {
    id: 1,
    titulo: 'Fase 1',
    endTitle: 'Fim da Fase 1',
    endSubtitle:
      'De Bretton Woods ao câmbio flutuante: 26 anos de decisões que moldaram a economia mundial.',
    endBalanceTitle: 'Balanço Final da Gestão (1944–1970)',
    proximaAviso: 'A Fase 2 vem a seguir.',
    turnos: TURNOS_FASE_1,
  },
  {
    id: 2,
    titulo: 'Fase 2',
    endTitle: 'Fim da Fase 2',
    endSubtitle:
      'Dos fundos autônomos à Rodada de Doha: o Conselho negociou guerra, comércio e ajuda humanitária em um mundo globalizado.',
    endBalanceTitle: 'Balanço da Gestão (1990–2001)',
    proximaAviso: 'A Fase 3 vem a seguir.',
    turnos: TURNOS_FASE_2,
  },
  {
    id: 3,
    titulo: 'Fase 3',
    endTitle: 'Fim da Fase 3',
    endSubtitle:
      'De Viena à Agenda 2030: as conferências da ONL consolidaram os Direitos Humanos e as metas globais do século.',
    endBalanceTitle: 'Balanço da Gestão (1993–2015)',
    proximaAviso: 'A Fase 4 vem a seguir.',
    turnos: TURNOS_FASE_3,
  },
  {
    id: 4,
    titulo: 'Fase 4',
    endTitle: 'Fim da Fase 4',
    endSubtitle:
      'Da crise global de refugiados à consolidação: o Conselho fechou o ciclo 2024–2030 das decisões globais.',
    endBalanceTitle: 'Balanço da Gestão (2024–2030)',
    proximaAviso: '',
    turnos: TURNOS_FASE_4,
  },
]
