import type { TurnoData } from './dados-base'
import { WIKIMEDIA_IMAGES } from './dados-base'

/* Turnos da FASE 2 — GUERRA, FUNDOS AUTÔNOMOS E COMÉRCIO GLOBAL (1990–2001)
   Textos verbatim do conselho-global.html (fonte da verdade na raiz) */
export const TURNOS_FASE_2: TurnoData[] = [
  // FASE 2 — TURNO 1 (1990) — tipo: "decisão" — Card "Programas e Fundos"
  {
    id: 7,
    ano: 1990,
    tipo: 'decisao',
    titulo: 'Como negociar apoio com programas e fundos?',
    texto:
      'Uma nova década começa. O Conselho precisa decidir como vai negociar apoio humanitário e de desenvolvimento com os programas e fundos que atuam no campo — afinal, eles não são agências da ONU.',
    piada:
      '🧑‍💼 Conselheiro: Tem Unicef, Pnud, ACNUR e mais uma lista de siglas que eu confundo até no sonho. Mas rendem boas parcerias.',
    card: {
      id: 'programas_fundos',
      titulo: 'Programas e Fundos',
      sigla: 'Unicef, Pnud, ACNUR',
      texto:
        'Unicef (Fundo das Nações Unidas para a Infância), Pnud (Programa das Nações Unidas para o Desenvolvimento) e ACNUR (Alto Comissariado das Nações Unidas para Refugiados) NÃO devem ser confundidos com agências da ONU. Eles são programas e fundos criados pelos órgãos da ONU, mas possuem autonomia financeira e administrativa.',
    },
    opcoes: [
      {
        id: 't7_a',
        texto: 'Cotar contribuições anuais fixas com cada programa e fundo',
        efeitos: [4, 2, 0],
        correta: true,
      },
      {
        id: 't7_b',
        texto: 'Negociar parcerias projeto a projeto, com metas conjuntas',
        efeitos: [0, 4, 3],
        correta: true,
      },
      {
        id: 't7_c',
        texto: 'Deixar que cada programa capte os próprios recursos, com autonomia total',
        efeitos: [-2, 0, 4],
        correta: true,
      },
    ],
  },

  // FASE 2 — TURNO 2 (1992) — tipo: "decisao" — CRISE (guerra civil)
  {
    id: 8,
    ano: 1992,
    tipo: 'decisao',
    titulo: 'Guerra civil pede ajuda humanitária',
    texto:
      'Uma guerra civil explode em um país membro e o pedido de ajuda humanitária chega ao Conselho. Mas a ajuda não sai das suas mãos: quem atua na linha de frente são os programas e fundos autônomos, e cabe ao Conselho negociar com eles.',
    piada:
      '🧑‍💼 Conselheiro: A linha de frente não obedece a este plenário. Mas os fundos, esses, respondem ao e-mail.',
    card: {
      id: 'crise_1992',
      titulo: 'Quem atua na linha de frente?',
      sigla: 'Fundos autônomos em crises',
      texto:
        'O Conselho Global não controla diretamente quem atua na linha de frente em uma crise. O atendimento em campo é feito por programas e fundos com autonomia financeira e administrativa, como o ACNUR e o Unicef. Cabe ao Conselho negociar com eles o envio e a coordenação da ajuda humanitária.',
    },
    opcoes: [
      {
        id: 't8_a',
        texto: 'Negociar com o ACNUR e o Unicef o envio imediato de equipes e suprimentos',
        efeitos: [0, 2, 8],
        correta: true,
      },
      {
        id: 't8_b',
        texto: 'Financiar a logística dos fundos, sem intervir na operação de campo',
        efeitos: [2, 0, 6],
        correta: true,
      },
      {
        id: 't8_c',
        texto: 'Centralizar a operação no plenário e comandar a linha de frente diretamente',
        efeitos: [-4, -2, -3],
        correta: true,
      },
    ],
  },

  // FASE 2 — TURNO 3 (1995) — tipo: "decisão" — Card "OMC"
  {
    id: 9,
    ano: 1995,
    tipo: 'decisao',
    titulo: 'Nova casa do comércio global',
    texto:
      'A rodada de fundação da OMC começa. O Conselho precisa decidir como se posicionar diante da nova organização que passa a ditar as regras do comércio mundial.',
    piada:
      '🧑‍💼 Conselheiro: Do GATT à OMC: mesmo assunto, mas agora com sede própria em Genebra e muito mais café.',
    card: {
      id: 'omc',
      titulo: 'OMC',
      sigla: 'Organização Mundial do Comércio',
      imagem: WIKIMEDIA_IMAGES.omcGenebra.url,
      fallbackEmoji: WIKIMEDIA_IMAGES.omcGenebra.emoji,
      fallbackCaption: WIKIMEDIA_IMAGES.omcGenebra.caption,
      texto:
        'A Organização Mundial do Comércio (OMC) não é uma agência da ONU, mas mantém estreitas relações com o Conselho de Segurança e o Ecosoc, reunindo-se duas vezes ao ano com o secretário-geral. Foi criada em 1995, em substituição ao Acordo Geral de Tarifas e Comércio (GATT), criado na Conferência de Bretton Woods. A OMC trata das regras globais de comércio entre os países e fornece um fórum para negociar acordos e resolver problemas comerciais. Essas reuniões são conhecidas como rodadas de negociação.',
    },
    opcoes: [
      {
        id: 't9_a',
        texto: 'Participar ativamente das rodadas de negociação',
        efeitos: [5, 2, 0],
        correta: true,
      },
      {
        id: 't9_b',
        texto: 'Apoiar países em desenvolvimento na formulação de propostas',
        efeitos: [2, 4, 0],
        correta: true,
      },
      {
        id: 't9_c',
        texto: 'Observar de fora e deixar o mercado se autorregular',
        efeitos: [-3, 0, 0],
        correta: true,
      },
    ],
  },

  // FASE 2 — TURNO 4 (1999) — tipo: "rotina" — Protestos antiglobalização
  {
    id: 10,
    ano: 1999,
    tipo: 'rotina',
    titulo: 'Protestos contra a globalização',
    texto:
      'As ruas das grandes cidades recebem manifestações contra a globalização. A pressão popular chega ao Conselho e exige um ajuste fino nas prioridades da governança global.',
    opcoes: [
      {
        id: 't10_a',
        texto: 'Abrir canais de diálogo com a sociedade civil',
        efeitos: [0, 6, 0],
        correta: true,
      },
      {
        id: 't10_b',
        texto: 'Rever regras de comércio para proteger indústrias locais',
        efeitos: [5, 1, 0],
        correta: true,
      },
      {
        id: 't10_c',
        texto: 'Ampliar redes de proteção social e humanitária',
        efeitos: [0, 2, 5],
        correta: true,
      },
    ],
  },

  // FASE 2 — TURNO 5 (2001) — tipo: "historica" — DECISÃO HISTÓRICA RODADA DE DOHA
  {
    id: 11,
    ano: 2001,
    tipo: 'historica',
    titulo: 'Rodada de Doha',
    texto:
      'Em Doha, os países ricos e os países em desenvolvimento chegam a um impasse sobre comércio agrícola, industrial e de serviços. O Conselho precisa decidir o rumo da negociação.',
    piada:
      '🧑‍💼 Conselheiro: Rodada de Doha: quando "impasse" virou a palavra mais escrita das minutas.',
    naVidaReal:
      '📌 Na vida real: a negociação seguiu aberta, com a pauta agrícola e o SSM reconhecidos, sem acordo fechado às pressas.',
    card: {
      id: 'rodada_doha',
      titulo: 'Rodada de Doha',
      sigla: 'OMC — Rodada de Doha (2001)',
      texto:
        'A Rodada de Doha (2001) resultou em um impasse entre os países ricos, que queriam que os países em desenvolvimento abrissem seus mercados para bens industriais e serviços, e os países em desenvolvimento, que queriam que os países ricos abrissem seus mercados agrícolas. A União Europeia, os Estados Unidos, o Canadá e o Japão discordaram dos países em desenvolvimento (Índia, Brasil, China e África do Sul) sobre o Mecanismo Especial de Salvaguarda (SSM). Esse mecanismo permitiria que os países em desenvolvimento elevassem temporariamente suas tarifas para lidar com surtos de importação ou queda de preços de commodities agrominerais.',
    },
    opcoes: [
      {
        id: 't11_a',
        texto:
          'Manter a negociação viva, reconhecendo a pauta agrícola e o SSM como legítimos, sem fechar acordo às pressas',
        efeitos: [6, 4, 0],
        correta: true,
      },
      {
        id: 't11_b',
        texto:
          'Ceder à pressão dos países ricos e abrir indústria e serviços sem contrapartida agrícola',
        efeitos: [-6, -4, 0],
        correta: false,
        consequencia: 'os países em desenvolvimento perdem proteção e a rodada trava de vez',
      },
      {
        id: 't11_c',
        texto: 'Abandonar a OMC e voltar ao GATT',
        efeitos: [-5, -2, 0],
        correta: false,
        consequencia:
          'o fórum global de comércio se esvazia e as disputas voltam à lei do mais forte',
      },
    ],
  },
]
