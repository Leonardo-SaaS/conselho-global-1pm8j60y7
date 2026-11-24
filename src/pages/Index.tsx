import React, { useState, useEffect } from 'react'

// Constantes de Imagens do Wikimedia Commons com fallbacks
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
}

interface CardData {
  id: string
  titulo: string
  sigla?: string
  imagem?: string
  fallbackEmoji?: string
  fallbackCaption?: string
  texto: string
}

interface OpcaoData {
  id: string
  texto: string
  efeitos?: [number, number, number]
  correta?: boolean
  consequencia?: string
}

interface TurnoData {
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

export const TURNOS: TurnoData[] = [
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

const STORAGE_KEY = 'conselho_global_save_v1'

function clampBar(val: number) {
  return Math.max(0, Math.min(100, Math.round(val)))
}

function getBarColor(type: 'econ' | 'dir' | 'hum', val: number) {
  if (val <= 25) return '#D64545'
  if (val >= 75) {
    if (type === 'econ') return '#4DA3FF'
    if (type === 'dir') return '#3FCF8E'
    if (type === 'hum') return '#FFA94D'
  }
  if (type === 'econ') return '#2E7DD1'
  if (type === 'dir') return '#2E9E5B'
  return '#E8871E'
}

export default function Index() {
  const [view, setView] = useState<'intro' | 'turn' | 'consequence' | 'phase_end'>('intro')
  const [turnIndex, setTurnIndex] = useState(0)
  const [bars, setBars] = useState({ econ: 50, dir: 50, hum: 50 })
  const [unlockedCardIds, setUnlockedCardIds] = useState<string[]>([])
  const [preWrongSnapshot, setPreWrongSnapshot] = useState<{
    turnIndex: number
    bars: { econ: number; dir: number; hum: number }
  } | null>(null)
  const [disabledOptionIds, setDisabledOptionIds] = useState<Record<number, string[]>>({})
  const [pendingConsequence, setPendingConsequence] = useState<{
    turnId: number
    opcaoId: string
    textoConsequencia: string
    naVidaReal: string
  } | null>(null)
  const [feedbackNotice, setFeedbackNotice] = useState<string | null>(null)

  // Modais
  const [activeCardModal, setActiveCardModal] = useState<CardData | null>(null)
  const [isCardModalBlocking, setIsCardModalBlocking] = useState(false)
  const [isArchiveOpen, setIsArchiveOpen] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)
  const [phase2ToastVisible, setPhase2ToastVisible] = useState(false)

  // Carregar do localStorage na montagem
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed && typeof parsed.turnIndex === 'number') {
          if (parsed.view) setView(parsed.view)
          setTurnIndex(parsed.turnIndex)
          if (parsed.bars) setBars(parsed.bars)
          if (parsed.unlockedCardIds) setUnlockedCardIds(parsed.unlockedCardIds)
          if (parsed.disabledOptionIds) setDisabledOptionIds(parsed.disabledOptionIds)
          if (parsed.preWrongSnapshot) setPreWrongSnapshot(parsed.preWrongSnapshot)
          if (parsed.pendingConsequence) setPendingConsequence(parsed.pendingConsequence)
          if (parsed.feedbackNotice) setFeedbackNotice(parsed.feedbackNotice)
        }
      }
    } catch {
      // Ignora falhas de localStorage
    }
  }, [])

  // Salvar no localStorage quando o estado mudar
  useEffect(() => {
    try {
      const payload = {
        view,
        turnIndex,
        bars,
        unlockedCardIds,
        disabledOptionIds,
        preWrongSnapshot,
        pendingConsequence,
        feedbackNotice,
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    } catch {
      // Ignora
    }
  }, [
    view,
    turnIndex,
    bars,
    unlockedCardIds,
    disabledOptionIds,
    preWrongSnapshot,
    pendingConsequence,
    feedbackNotice,
  ])

  // Checar card inédito ao entrar em um turno
  const checkAndOpenTurnCard = (tIndex: number, currentUnlocked: string[]) => {
    const curTurn = TURNOS[tIndex]
    if (curTurn && curTurn.card) {
      if (!currentUnlocked.includes(curTurn.card.id)) {
        // Inédito: abre bloqueante
        const nextUnlocked = [...currentUnlocked, curTurn.card.id]
        setUnlockedCardIds(nextUnlocked)
        setImageFailed(false)
        setActiveCardModal(curTurn.card)
        setIsCardModalBlocking(true)
      }
    }
  }

  const handleStartGame = () => {
    setView('turn')
    checkAndOpenTurnCard(turnIndex, unlockedCardIds)
  }

  const handleResetGame = () => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // Ignora
    }
    setView('intro')
    setTurnIndex(0)
    setBars({ econ: 50, dir: 50, hum: 50 })
    setUnlockedCardIds([])
    setPreWrongSnapshot(null)
    setDisabledOptionIds({})
    setPendingConsequence(null)
    setFeedbackNotice(null)
    setActiveCardModal(null)
    setIsCardModalBlocking(false)
    setIsArchiveOpen(false)
    setPhase2ToastVisible(false)
  }

  const handleChoiceClick = (opcaoIndex: number) => {
    const currentTurn = TURNOS[turnIndex]
    if (!currentTurn) return
    const chosenOption = currentTurn.opcoes[opcaoIndex]
    if (!chosenOption) return

    if (currentTurn.tipo === 'historica' && chosenOption.correta === false) {
      // Guardar snapshot anterior
      setPreWrongSnapshot({
        turnIndex,
        bars: { ...bars },
      })

      setPendingConsequence({
        turnId: currentTurn.id,
        opcaoId: chosenOption.id,
        textoConsequencia:
          chosenOption.consequencia || 'A decisão resultou em instabilidade global severa.',
        naVidaReal: currentTurn.naVidaReal || '',
      })

      setFeedbackNotice('A proposta avança...')

      // Aplica temporariamente
      if (chosenOption.efeitos) {
        setBars({
          econ: clampBar(bars.econ + chosenOption.efeitos[0]),
          dir: clampBar(bars.dir + chosenOption.efeitos[1]),
          hum: clampBar(bars.hum + chosenOption.efeitos[2]),
        })
      }

      setView('consequence')
      return
    }

    // Escolha correta ou rotina
    if (chosenOption.efeitos) {
      setBars({
        econ: clampBar(bars.econ + chosenOption.efeitos[0]),
        dir: clampBar(bars.dir + chosenOption.efeitos[1]),
        hum: clampBar(bars.hum + chosenOption.efeitos[2]),
      })
    }

    setFeedbackNotice(null)

    if (turnIndex + 1 < TURNOS.length) {
      const nextTurnIdx = turnIndex + 1
      setTurnIndex(nextTurnIdx)
      setView('turn')
      checkAndOpenTurnCard(nextTurnIdx, unlockedCardIds)
    } else {
      setView('phase_end')
    }
  }

  const handleGameOverBack = () => {
    if (!pendingConsequence) return

    if (preWrongSnapshot) {
      setBars({ ...preWrongSnapshot.bars })
      setTurnIndex(preWrongSnapshot.turnIndex)
    }

    setDisabledOptionIds((prev) => {
      const currentList = prev[pendingConsequence.turnId] || []
      if (!currentList.includes(pendingConsequence.opcaoId)) {
        return {
          ...prev,
          [pendingConsequence.turnId]: [...currentList, pendingConsequence.opcaoId],
        }
      }
      return prev
    })

    setPendingConsequence(null)
    setFeedbackNotice(null)
    setPreWrongSnapshot(null)
    setView('turn')
  }

  const handleCloseCardModal = () => {
    setActiveCardModal(null)
    setIsCardModalBlocking(false)
  }

  const currentTurn = TURNOS[turnIndex]
  const disabledForThisTurn = (currentTurn && disabledOptionIds[currentTurn.id]) || []
  const hasDisabledWrongOptions = disabledForThisTurn.length > 0

  return (
    <div
      className="min-h-screen text-white font-sans selection:bg-[#C9A227] selection:text-[#0A1A2F]"
      style={{
        background: 'radial-gradient(circle at 50% 20%, #132E52 0%, #0A1A2F 50%, #0E2440 100%)',
      }}
    >
      {/* TOPO FIXO */}
      <header className="sticky top-0 z-50 bg-[#0A1A2F]/95 backdrop-blur-md border-b border-[#C9A227]/35 shadow-[0_4px_20px_rgba(0,0,0,0.5)] px-4 py-3">
        <div className="max-w-6xl mx-auto flex flex-col gap-3">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#009EDB] to-[#0A3C6B] border-2 border-[#C9A227] flex items-center justify-center text-2xl shadow-[0_0_12px_rgba(201,162,39,0.4)] shrink-0">
                🌐
              </div>
              <div>
                <h1
                  className="text-2xl font-bold tracking-wide text-white leading-tight"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  Conselho Global
                </h1>
                <p className="text-xs text-[#F4E8C1] tracking-wider uppercase font-semibold">
                  Coordenador do Conselho Global
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-[#C9A227]/15 border border-[#C9A227] text-[#F4E8C1] px-3.5 py-1.5 rounded-full text-sm font-bold tracking-wide shadow-[inset_0_0_8px_rgba(201,162,39,0.2)] whitespace-nowrap">
                {view === 'intro'
                  ? 'Preparação do Conselho'
                  : view === 'phase_end'
                    ? 'Fim da Fase 1 — 1970'
                    : `Turno ${currentTurn?.id || 1} — Ano ${currentTurn?.ano || 1944}`}
              </div>

              <button
                type="button"
                onClick={() => setIsArchiveOpen(true)}
                className="bg-white/10 hover:bg-white/20 border border-white/25 hover:border-[#C9A227] text-white px-3.5 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer"
                title="Abrir Arquivo de Enciclopédia"
              >
                📁 Arquivo{' '}
                <span className="bg-[#C9A227] text-[#0A1A2F] text-xs font-extrabold rounded-full px-2 py-0.5 leading-none">
                  {unlockedCardIds.length}
                </span>
              </button>
            </div>
          </div>

          {/* 3 BARRAS DE STATUS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Barra 1: Estabilidade Econômica */}
            <div className="bg-[#0E2440]/70 p-2.5 px-3 rounded-lg border border-white/10">
              <div className="flex justify-between items-center mb-1 text-xs font-semibold">
                <span className="text-slate-200 truncate">Estabilidade Econômica</span>
                <span className="font-extrabold tabular-nums ml-2">{clampBar(bars.econ)}</span>
              </div>
              <div className="w-full h-3.5 bg-black/45 rounded-full overflow-hidden border border-white/10 inset-shadow">
                <div
                  className="h-full rounded-full transition-all duration-600 ease-out"
                  style={{
                    width: `${clampBar(bars.econ)}%`,
                    backgroundColor: getBarColor('econ', clampBar(bars.econ)),
                  }}
                />
              </div>
            </div>

            {/* Barra 2: Direitos Humanos & Desenv. */}
            <div className="bg-[#0E2440]/70 p-2.5 px-3 rounded-lg border border-white/10">
              <div className="flex justify-between items-center mb-1 text-xs font-semibold">
                <span className="text-slate-200 truncate">Direitos Humanos & Desenv.</span>
                <span className="font-extrabold tabular-nums ml-2">{clampBar(bars.dir)}</span>
              </div>
              <div className="w-full h-3.5 bg-black/45 rounded-full overflow-hidden border border-white/10 inset-shadow">
                <div
                  className="h-full rounded-full transition-all duration-600 ease-out"
                  style={{
                    width: `${clampBar(bars.dir)}%`,
                    backgroundColor: getBarColor('dir', clampBar(bars.dir)),
                  }}
                />
              </div>
            </div>

            {/* Barra 3: Capacidade Humanitária */}
            <div className="bg-[#0E2440]/70 p-2.5 px-3 rounded-lg border border-white/10">
              <div className="flex justify-between items-center mb-1 text-xs font-semibold">
                <span className="text-slate-200 truncate">Capacidade Humanitária</span>
                <span className="font-extrabold tabular-nums ml-2">{clampBar(bars.hum)}</span>
              </div>
              <div className="w-full h-3.5 bg-black/45 rounded-full overflow-hidden border border-white/10 inset-shadow">
                <div
                  className="h-full rounded-full transition-all duration-600 ease-out"
                  style={{
                    width: `${clampBar(bars.hum)}%`,
                    backgroundColor: getBarColor('hum', clampBar(bars.hum)),
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ÁREA CENTRAL */}
      <main className="max-w-4xl mx-auto my-7 mb-16 px-4">
        {/* VIEW 1: INTRO */}
        {view === 'intro' && (
          <div className="relative bg-[#F6F1E7] border border-[#D9CFBA] rounded-2xl p-8 md:p-12 text-[#1E2A38] shadow-[0_10px_30px_rgba(0,0,0,0.45)] text-center">
            <div className="absolute inset-1.5 border border-dashed border-[#C9A227]/40 rounded-xl pointer-events-none" />
            <div className="text-5xl mb-3 drop-shadow">🏛️</div>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#0A1A2F] mb-2"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Conselho Global
            </h2>
            <div className="text-base md:text-lg text-[#55677B] uppercase tracking-widest font-bold mb-6">
              Coordenador do Conselho Global
            </div>
            <p className="text-base md:text-lg text-[#2D3D4E] max-w-2xl mx-auto leading-relaxed mb-8">
              Você assumiu a coordenação do Conselho Global no momento mais decisivo do século XX.
              Suas escolhas moldarão a reconstrução do pós-guerra, os direitos humanos e a
              estabilidade mundial. Tome decisões históricas reais, consulte a enciclopédia das
              agências e mantenha o equilíbrio das nações.
            </p>
            <div className="flex flex-col items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleStartGame}
                className="bg-[#009EDB] hover:bg-[#0084B8] text-white font-bold text-lg px-9 py-3.5 rounded-lg shadow-[0_4px_12px_rgba(0,158,219,0.35)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                Assumir a Coordenação
              </button>
              {unlockedCardIds.length > 0 && (
                <button
                  type="button"
                  onClick={handleResetGame}
                  className="text-sm font-semibold text-[#5A6B7C] hover:text-[#0A1A2F] mt-2 underline cursor-pointer"
                >
                  ↺ Recomeçar do Turno 1
                </button>
              )}
            </div>
          </div>
        )}

        {/* VIEW 2: TURNO */}
        {view === 'turn' && currentTurn && (
          <div>
            {feedbackNotice && (
              <div className="bg-[#0E2440]/95 border border-[#C9A227] text-[#F4E8C1] p-3 rounded-lg text-center font-semibold text-base mb-4 shadow-lg animate-in fade-in">
                🕊️ {feedbackNotice}
              </div>
            )}

            <div className="relative bg-[#F6F1E7] border border-[#D9CFBA] rounded-2xl p-6 md:p-8 text-[#1E2A38] shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
              <div className="absolute inset-1.5 border border-dashed border-[#C9A227]/40 rounded-xl pointer-events-none" />

              {/* Badge de tipo */}
              <div className="mb-3">
                {currentTurn.tipo === 'historica' && (
                  <span className="inline-flex items-center gap-1.5 bg-[#FEF3C7] text-[#92400E] border border-[#FCD34D] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    ⭐ Decisão Histórica
                  </span>
                )}
                {currentTurn.tipo === 'decisao' && (
                  <span className="inline-flex items-center gap-1.5 bg-[#E2ECF7] text-[#1A4971] border border-[#B0CDED] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Decisão do Conselho
                  </span>
                )}
                {currentTurn.tipo === 'rotina' && (
                  <span className="inline-flex items-center gap-1.5 bg-[#E8F5E9] text-[#2E7D32] border border-[#A5D6A7] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Ajuste de Governança
                  </span>
                )}
              </div>

              {/* Título */}
              <h2
                className="text-2xl md:text-3xl font-bold text-[#0A1A2F] mb-3 leading-tight"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {currentTurn.titulo}
              </h2>

              {/* Narrativa com Clamp de 4 linhas */}
              <p
                className="text-base md:text-lg text-[#2D3D4E] leading-relaxed mb-4 overflow-hidden"
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: 'vertical',
                  lineClamp: 4,
                }}
              >
                {currentTurn.texto}
              </p>

              {/* Linha "Na vida real" ao voltar */}
              {hasDisabledWrongOptions && currentTurn.naVidaReal && (
                <div className="bg-[#FEF3C7] border-l-4 border-[#D97706] p-3 rounded-r-lg text-sm md:text-base text-[#78350F] italic font-semibold mb-4">
                  {currentTurn.naVidaReal}
                </div>
              )}

              {/* Fala do conselheiro */}
              {currentTurn.piada && (
                <div className="bg-[#C9A227]/15 border-l-4 border-[#C9A227] p-3 rounded-r-lg text-sm md:text-base text-[#4A3E1D] italic mb-5 leading-normal">
                  {currentTurn.piada}
                </div>
              )}

              {/* Opções de escolha */}
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#5A6B7C] font-bold mb-3">
                <span>Opções em Votação no Plenário</span>
                <span className="flex-1 h-px bg-[#D9CFBA]" />
              </div>

              <div className="flex flex-col gap-3">
                {currentTurn.opcoes.map((opcao, idx) => {
                  const isWrongAndDisabled = disabledForThisTurn.includes(opcao.id)
                  const isBlockedByCard =
                    isCardModalBlocking ||
                    (currentTurn.card && !unlockedCardIds.includes(currentTurn.card.id))

                  let dominantBorder = 'border-l-[#2E7DD1]'
                  if (opcao.efeitos) {
                    const maxEff = Math.max(...opcao.efeitos)
                    if (opcao.efeitos[1] === maxEff && opcao.efeitos[1] > 0) {
                      dominantBorder = 'border-l-[#2E9E5B]'
                    } else if (opcao.efeitos[2] === maxEff && opcao.efeitos[2] > 0) {
                      dominantBorder = 'border-l-[#E8871E]'
                    }
                  }

                  if (isWrongAndDisabled) {
                    return (
                      <button
                        key={opcao.id}
                        type="button"
                        disabled
                        className="w-full text-left bg-[#EAE6DF] border border-[#C8C2B6] border-l-8 border-l-gray-400 rounded-xl p-4 text-[#828C96] line-through font-semibold text-base md:text-lg cursor-not-allowed opacity-75 shadow-none"
                      >
                        {opcao.texto}
                      </button>
                    )
                  }

                  return (
                    <button
                      key={opcao.id}
                      type="button"
                      disabled={Boolean(isBlockedByCard)}
                      onClick={() => handleChoiceClick(idx)}
                      className={`w-full text-left bg-white hover:bg-[#FCFBF9] border border-[#D6D0C4] border-l-8 ${dominantBorder} rounded-xl p-4 text-[#1E2A38] font-semibold text-base md:text-lg shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50`}
                    >
                      {opcao.texto}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: CONSEQUÊNCIA */}
        {view === 'consequence' && pendingConsequence && (
          <div className="relative bg-gradient-to-br from-[#30171D] via-[#1A0D11] to-[#0F0609] border-2 border-[#84232F] rounded-2xl p-7 md:p-10 text-white shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
            <div className="inline-block bg-[#B23A48]/30 border border-[#B23A48] text-[#FFB3BA] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
              ⚠️ Desdobramento Negativo
            </div>
            <h2
              className="text-2xl md:text-3xl font-bold text-[#FFD4D8] mb-4 leading-tight"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Consequência
            </h2>
            <p className="text-lg md:text-xl text-[#F1D9DC] leading-relaxed mb-8 max-w-3xl">
              {pendingConsequence.textoConsequencia}
            </p>
            <div>
              <button
                type="button"
                onClick={handleGameOverBack}
                className="bg-[#B23A48] hover:bg-[#962F3C] border border-[#D64545] text-white text-base md:text-lg font-bold px-7 py-3.5 rounded-lg shadow-[0_4px_16px_rgba(178,58,72,0.4)] transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
              >
                Game Over — Voltar à decisão
              </button>
            </div>
          </div>
        )}

        {/* VIEW 4: FIM DA FASE 1 */}
        {view === 'phase_end' && (
          <div className="relative bg-[#F6F1E7] border border-[#D9CFBA] rounded-2xl p-8 md:p-12 text-[#1E2A38] shadow-[0_10px_30px_rgba(0,0,0,0.45)] text-center">
            <div className="absolute inset-1.5 border border-dashed border-[#C9A227]/40 rounded-xl pointer-events-none" />
            <div className="text-5xl mb-3">🕊️</div>
            <h2
              className="text-3xl font-bold text-[#0A1A2F] mb-2"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Fim da Fase 1
            </h2>
            <p className="text-base md:text-lg text-[#55677B] mb-7">
              De Bretton Woods ao câmbio flutuante: 26 anos de decisões que moldaram a economia
              mundial.
            </p>

            <div className="bg-white border border-[#D9CFBA] rounded-xl p-5 max-w-md mx-auto mb-7 text-left">
              <h3 className="text-base font-bold text-[#0A1A2F] border-b border-[#D9CFBA] pb-2 mb-3">
                Balanço Final da Gestão (1944–1970)
              </h3>
              <div className="flex justify-between py-1.5 border-b border-gray-100 text-sm md:text-base">
                <span className="text-[#2E7DD1] font-bold">Estabilidade Econômica</span>
                <span className="font-extrabold">{clampBar(bars.econ)} / 100</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100 text-sm md:text-base">
                <span className="text-[#2E9E5B] font-bold">Direitos Humanos & Desenv.</span>
                <span className="font-extrabold">{clampBar(bars.dir)} / 100</span>
              </div>
              <div className="flex justify-between py-1.5 text-sm md:text-base">
                <span className="text-[#E8871E] font-bold">Capacidade Humanitária</span>
                <span className="font-extrabold">{clampBar(bars.hum)} / 100</span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={() => setPhase2ToastVisible(true)}
                className="bg-[#009EDB] hover:bg-[#0084B8] text-white font-bold text-lg px-8 py-3.5 rounded-lg shadow-md cursor-pointer"
              >
                {phase2ToastVisible ? 'A Fase 2 vem a seguir.' : 'Continuar'}
              </button>

              {phase2ToastVisible && (
                <div className="bg-[#0A1A2F] text-[#F4E8C1] border border-[#C9A227] px-4 py-2.5 rounded-lg font-semibold text-sm animate-in fade-in">
                  A Fase 2 vem a seguir.
                </div>
              )}

              <button
                type="button"
                onClick={handleResetGame}
                className="text-sm font-semibold text-[#5A6B7C] hover:text-[#0A1A2F] underline mt-3 cursor-pointer"
              >
                Jogar Novamente do Início
              </button>
            </div>
          </div>
        )}
      </main>

      {/* MODAL BLOQUEANTE PARA CARD DE ENCICLOPÉDIA */}
      {activeCardModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#050E1A]/85 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-[#F6F1E7] border-2 border-[#C9A227] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 text-[#1E2A38] shadow-[0_20px_50px_rgba(0,0,0,0.65),0_0_30px_rgba(201,162,39,0.3)]">
            <div className="inline-flex items-center gap-2 bg-[#FEF3C7] border border-[#C9A227] text-[#8D5B05] text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
              📖 Card de Enciclopédia
            </div>
            <h2
              className="text-2xl md:text-3xl font-bold text-[#0A1A2F] mb-1 leading-tight"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {activeCardModal.titulo}
            </h2>
            {activeCardModal.sigla && (
              <div className="text-sm font-bold text-[#55677B] uppercase tracking-wider mb-4">
                {activeCardModal.sigla}
              </div>
            )}

            {activeCardModal.imagem && !imageFailed ? (
              <div className="w-full h-52 md:h-64 rounded-xl overflow-hidden mb-4 border border-[#D9CFBA] bg-[#E5E0D4]">
                <img
                  src={activeCardModal.imagem}
                  alt={activeCardModal.titulo}
                  onError={() => setImageFailed(true)}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : activeCardModal.imagem ? (
              <div className="w-full h-44 rounded-xl mb-4 border border-[#D9CFBA] bg-gradient-to-br from-[#1A365D] to-[#0E2440] flex flex-col items-center justify-center p-4 text-center">
                <span className="text-4xl mb-1">{activeCardModal.fallbackEmoji || '🏛️'}</span>
                <span className="text-xs text-slate-300 font-medium">
                  {activeCardModal.fallbackCaption || activeCardModal.titulo}
                </span>
              </div>
            ) : null}

            <p className="text-base md:text-lg text-[#2D3D4E] leading-relaxed mb-6 text-justify">
              {activeCardModal.texto}
            </p>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleCloseCardModal}
                className="bg-[#009EDB] hover:bg-[#0084B8] text-white font-bold text-base px-6 py-3 rounded-lg shadow-md cursor-pointer transition-colors"
              >
                Entendi, continuar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DO ARQUIVO */}
      {isArchiveOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Arquivo de Enciclopédia"
          className="fixed inset-0 z-50 bg-[#050E1A]/85 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-[#F6F1E7] border-2 border-[#C9A227] rounded-2xl max-w-xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 text-[#1E2A38] shadow-2xl">
            <div className="inline-flex items-center gap-2 bg-[#FEF3C7] border border-[#C9A227] text-[#8D5B05] text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
              📁 Memória Institucional
            </div>
            <h2
              className="text-2xl font-bold text-[#0A1A2F] mb-1"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Arquivo de Enciclopédia
            </h2>
            <p className="text-sm text-[#5A6B7C] mb-4">
              Documentos e cards já revelados pelo Conselho Global. Clique para reler.
            </p>

            <div className="flex flex-col gap-2.5 my-4">
              {unlockedCardIds.length === 0 ? (
                <div className="text-center py-6 text-[#718096] italic text-sm">
                  Nenhum card de enciclopédia foi desbloqueado ainda. Avance os turnos do Conselho
                  para registrar documentos.
                </div>
              ) : (
                unlockedCardIds.map((cardId) => {
                  const cardData = TURNOS.find((t) => t.card?.id === cardId)?.card
                  if (!cardData) return null
                  return (
                    <button
                      key={cardId}
                      type="button"
                      onClick={() => {
                        setIsArchiveOpen(false)
                        setImageFailed(false)
                        setActiveCardModal(cardData)
                        setIsCardModalBlocking(false)
                      }}
                      className="w-full text-left bg-white hover:bg-[#FAF7F0] border border-[#D9CFBA] hover:border-[#C9A227] rounded-xl p-3.5 flex items-center justify-between transition-all cursor-pointer group"
                    >
                      <div>
                        <div className="font-bold text-[#0A1A2F] text-base group-hover:text-[#009EDB]">
                          📖 {cardData.titulo}
                        </div>
                        {cardData.sigla && (
                          <div className="text-xs text-[#64748B] mt-0.5 font-semibold">
                            {cardData.sigla}
                          </div>
                        )}
                      </div>
                      <span className="text-[#C9A227] font-bold text-lg">→</span>
                    </button>
                  )
                })
              )}
            </div>

            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={() => setIsArchiveOpen(false)}
                className="border border-[#D9CFBA] hover:bg-[#EAE5D9] text-[#4A5B6C] font-semibold text-sm px-5 py-2 rounded-lg cursor-pointer transition-colors"
              >
                Fechar Arquivo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
