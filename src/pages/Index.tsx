import { useEffect, useRef, useState } from 'react'
import type { CardData, TurnoData } from './conselho/dados-base'
import { ESTUDO_BULLETS } from './conselho/dados-base'
import { FASES } from './conselho/turnos-fase1'
import { Obj169Joke, type Obj169Stage } from './conselho/Obj169Joke'

const STORAGE_KEY = 'conselho_global_save_v2'

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

type View = 'intro' | 'turn' | 'consequence' | 'phase_end' | 'collapse' | 'endgame'

type Endgame = 'vitoria_plena' | 'vitoria_parcial'

interface Snapshot {
  faseIdx: number
  turnIdx: number
  bars: { econ: number; dir: number; hum: number }
}

interface PendingConsequence {
  turnoId: number
  opcaoId: string
  textoConsequencia: string
}

export default function Index() {
  const [view, setView] = useState<View>('intro')
  const [faseIdx, setFaseIdx] = useState(0)
  const [turnIdx, setTurnIdx] = useState(0)
  const [bars, setBars] = useState({ econ: 50, dir: 50, hum: 50 })
  const [unlockedCardIds, setUnlockedCardIds] = useState<string[]>([])
  const [preWrongSnapshot, setPreWrongSnapshot] = useState<Snapshot | null>(null)
  const [preCollapseSnapshot, setPreCollapseSnapshot] = useState<Snapshot | null>(null)
  const [endgame, setEndgame] = useState<Endgame>('vitoria_parcial')
  const [turnosJogados, setTurnosJogados] = useState(0)
  const [disabledOptionIds, setDisabledOptionIds] = useState<Record<number, string[]>>({})
  const [pendingConsequence, setPendingConsequence] = useState<PendingConsequence | null>(null)
  const [feedbackNotice, setFeedbackNotice] = useState<string | null>(null)
  const [activeCardModal, setActiveCardModal] = useState<CardData | null>(null)
  const [isCardModalBlocking, setIsCardModalBlocking] = useState(false)
  const [isArchiveOpen, setIsArchiveOpen] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)
  const [obj169Stage, setObj169Stage] = useState<Obj169Stage>('aguardando')
  const obj169TimerRef = useRef<number | null>(null)

  const fase = FASES[faseIdx]
  const currentTurn: TurnoData | undefined = fase.turnos[turnIdx]
  const isTurn169 = currentTurn?.card?.id === 'agenda_2030'
  const disabledForThisTurn = (currentTurn && disabledOptionIds[currentTurn.id]) || []
  const hasDisabledWrongOptions = disabledForThisTurn.length > 0

  // ── Persistência em localStorage ──────────────────────────────────────────
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (!saved) return
      const parsed = JSON.parse(saved)
      if (!parsed || typeof parsed !== 'object') return
      if (parsed.view) setView(parsed.view)
      if (typeof parsed.faseIdx === 'number') setFaseIdx(parsed.faseIdx)
      if (typeof parsed.turnIdx === 'number') setTurnIdx(parsed.turnIdx)
      if (parsed.bars) setBars(parsed.bars)
      if (Array.isArray(parsed.unlockedCardIds)) setUnlockedCardIds(parsed.unlockedCardIds)
      if (parsed.disabledOptionIds) setDisabledOptionIds(parsed.disabledOptionIds)
      if (parsed.preWrongSnapshot) setPreWrongSnapshot(parsed.preWrongSnapshot)
      if (parsed.preCollapseSnapshot) setPreCollapseSnapshot(parsed.preCollapseSnapshot)
      if (parsed.obj169Stage) setObj169Stage(parsed.obj169Stage)
      // Saves antigos não tinham endgame: recalcula ao reabrir a tela final
      if (parsed.view === 'endgame' && parsed.bars) {
        const b = parsed.bars
        setEndgame(b.econ >= 60 && b.dir >= 60 && b.hum >= 60 ? 'vitoria_plena' : 'vitoria_parcial')
      }
      // Saves antigos sem view de colapso (ou colapso sem snapshot): volta ao turno
      if (parsed.view === 'collapse' && !parsed.preCollapseSnapshot) setView('turn')
      // Save no fim da Fase 4 (antes de existir a tela final): leva ao desfecho
      if (
        parsed.view === 'phase_end' &&
        typeof parsed.faseIdx === 'number' &&
        parsed.faseIdx === FASES.length - 1 &&
        parsed.bars
      ) {
        const b = parsed.bars
        setEndgame(b.econ >= 60 && b.dir >= 60 && b.hum >= 60 ? 'vitoria_plena' : 'vitoria_parcial')
        setView('endgame')
      }
    } catch {
      // ignora falhas de localStorage
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          view,
          faseIdx,
          turnIdx,
          bars,
          unlockedCardIds,
          disabledOptionIds,
          preWrongSnapshot,
          preCollapseSnapshot,
          endgame,
          obj169Stage,
          turnosJogados,
        }),
      )
    } catch {
      // ignora
    }
  }, [
    view,
    faseIdx,
    turnIdx,
    bars,
    unlockedCardIds,
    disabledOptionIds,
    preWrongSnapshot,
    preCollapseSnapshot,
    endgame,
    obj169Stage,
    turnosJogados,
  ])

  // Limpa o timer da piada dos 169 ao desmontar
  useEffect(() => {
    return () => {
      if (obj169TimerRef.current) window.clearTimeout(obj169TimerRef.current)
    }
  }, [])

  // ── Ações ─────────────────────────────────────────────────────────────────
  const checkAndOpenTurnCard = (fIdx: number, tIdx: number, currentUnlocked: string[]) => {
    const turno = FASES[fIdx].turnos[tIdx]
    if (turno && turno.card && !currentUnlocked.includes(turno.card.id)) {
      setUnlockedCardIds([...currentUnlocked, turno.card.id])
      setImageFailed(false)
      setActiveCardModal(turno.card)
      setIsCardModalBlocking(true)
    }
  }

  const handleStartGame = () => {
    setView('turn')
    checkAndOpenTurnCard(faseIdx, turnIdx, unlockedCardIds)
  }

  const handleResetGame = () => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignora
    }
    setView('intro')
    setFaseIdx(0)
    setTurnIdx(0)
    setBars({ econ: 50, dir: 50, hum: 50 })
    setUnlockedCardIds([])
    setPreWrongSnapshot(null)
    setPreCollapseSnapshot(null)
    setEndgame('vitoria_parcial')
    setTurnosJogados(0)
    setDisabledOptionIds({})
    setPendingConsequence(null)
    setFeedbackNotice(null)
    setActiveCardModal(null)
    setIsCardModalBlocking(false)
    setIsArchiveOpen(false)
    setObj169Stage('aguardando')
  }

  const checkDefeat = (b: { econ: number; dir: number; hum: number }) =>
    b.econ <= 0 || b.dir <= 0 || b.hum <= 0

  const totalCards = FASES.reduce((acc, f) => acc + f.turnos.filter((t) => t.card).length, 0)

  // Índice global do turno atual (1-based), somando os turnos das fases anteriores
  const turnoGlobal =
    FASES.slice(0, faseIdx).reduce((acc, f) => acc + f.turnos.length, 0) + turnIdx + 1

  const handleChoiceClick = (opcaoIndex: number) => {
    if (!currentTurn) return
    const chosen = currentTurn.opcoes[opcaoIndex]
    if (!chosen) return

    if (currentTurn.tipo === 'historica' && chosen.correta === false) {
      setPreWrongSnapshot({ faseIdx, turnIdx, bars: { ...bars } })
      setPendingConsequence({
        turnoId: currentTurn.id,
        opcaoId: chosen.id,
        textoConsequencia:
          chosen.consequencia || 'A decisão resultou em instabilidade global severa.',
      })
      setFeedbackNotice('A proposta avança...')

      // Snapshot pré-escolha (para o "Voltar ao último turno" do colapso)
      const snapshot: Snapshot = { faseIdx, turnIdx, bars: { ...bars } }
      const novasBars = chosen.efeitos
        ? {
            econ: clampBar(bars.econ + chosen.efeitos[0]),
            dir: clampBar(bars.dir + chosen.efeitos[1]),
            hum: clampBar(bars.hum + chosen.efeitos[2]),
          }
        : bars

      // DERROTA: barra zerada com a opção errada → tela de colapso
      if (checkDefeat(novasBars)) {
        setBars(novasBars)
        setPreCollapseSnapshot(snapshot)
        setView('collapse')
        return
      }

      if (chosen.efeitos) setBars(novasBars)
      setView('consequence')
      return
    }

    // Escolha correta ou rotina
    // Snapshot das barras ANTES de aplicar efeitos (para o colapso)
    const preChoiceSnapshot: Snapshot = { faseIdx, turnIdx, bars: { ...bars } }
    if (chosen.efeitos) {
      setBars({
        econ: clampBar(bars.econ + chosen.efeitos[0]),
        dir: clampBar(bars.dir + chosen.efeitos[1]),
        hum: clampBar(bars.hum + chosen.efeitos[2]),
      })
    }
    setFeedbackNotice(null)
    setTurnosJogados((prev) => Math.max(prev, turnoGlobal))

    // Cálculo das barras após os efeitos, para checar derrota
    const novasBars = chosen.efeitos
      ? {
          econ: clampBar(bars.econ + chosen.efeitos[0]),
          dir: clampBar(bars.dir + chosen.efeitos[1]),
          hum: clampBar(bars.hum + chosen.efeitos[2]),
        }
      : bars

    // DERROTA: qualquer barra a 0 em qualquer momento → colapso
    if (checkDefeat(novasBars)) {
      setBars(novasBars)
      setPreCollapseSnapshot(preChoiceSnapshot)
      setView('collapse')
      return
    }

    if (turnIdx + 1 < fase.turnos.length) {
      const nextTurnIdx = turnIdx + 1
      setTurnIdx(nextTurnIdx)
      setObj169Stage('aguardando')
      setView('turn')
      checkAndOpenTurnCard(faseIdx, nextTurnIdx, unlockedCardIds)
    } else if (faseIdx + 1 < FASES.length) {
      setView('phase_end')
    } else {
      // Fim da Fase 4 (última): desfecho final
      setBars(novasBars)
      setEndgame(
        novasBars.econ >= 60 && novasBars.dir >= 60 && novasBars.hum >= 60
          ? 'vitoria_plena'
          : 'vitoria_parcial',
      )
      setView('endgame')
    }
  }

  const handleCollapseBack = () => {
    if (preCollapseSnapshot) {
      setBars({ ...preCollapseSnapshot.bars })
      setFaseIdx(preCollapseSnapshot.faseIdx)
      setTurnIdx(preCollapseSnapshot.turnIdx)
    } else {
      // Sem snapshot (ex.: barras zeradas por save antigo): volta ao turno 1
      setFaseIdx(0)
      setTurnIdx(0)
      setBars({ econ: 50, dir: 50, hum: 50 })
    }
    setPreCollapseSnapshot(null)
    setView('turn')
    // Reabrir o card do turno (já desbloqueado), sem bloquear
    const turno = FASES[faseIdx].turnos[turnIdx]
    if (turno?.card) {
      setImageFailed(false)
      setActiveCardModal(turno.card)
      setIsCardModalBlocking(false)
    }
  }

  const handleGameOverBack = () => {
    if (!pendingConsequence) return
    if (preWrongSnapshot) {
      setBars({ ...preWrongSnapshot.bars })
      setFaseIdx(preWrongSnapshot.faseIdx)
      setTurnIdx(preWrongSnapshot.turnIdx)
    }
    setDisabledOptionIds((prev) => {
      const currentList = prev[pendingConsequence.turnoId] || []
      if (!currentList.includes(pendingConsequence.opcaoId)) {
        return {
          ...prev,
          [pendingConsequence.turnoId]: [...currentList, pendingConsequence.opcaoId],
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
    // Card da Agenda 2030: ao fechar, inicia a rolagem dos "169 objetivos"
    if (isTurn169 && obj169Stage === 'aguardando') {
      setObj169Stage('rodando')
      obj169TimerRef.current = window.setTimeout(() => {
        setObj169Stage('fala')
        obj169TimerRef.current = window.setTimeout(() => {
          setObj169Stage('concluido')
        }, 2400)
      }, 5000)
    }
  }

  const handlePhaseContinue = () => {
    if (faseIdx + 1 < FASES.length) {
      const nextFase = faseIdx + 1
      setFaseIdx(nextFase)
      setTurnIdx(0)
      setObj169Stage('aguardando')
      setView('turn')
      checkAndOpenTurnCard(nextFase, 0, unlockedCardIds)
    }
    // Na Fase 3 (última), o aviso "A Fase 4 vem a seguir." é exibido e não há avanço.
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div
      className="min-h-dvh text-white font-sans selection:bg-[#C9A227] selection:text-[#0A1A2F]"
      style={{
        background: 'radial-gradient(circle at 50% 20%, #132E52 0%, #0A1A2F 50%, #0E2440 100%)',
      }}
    >
      {/* TOPO FIXO */}
      <header className="sticky top-0 z-40 bg-[#0A1A2F]/95 backdrop-blur-md border-b border-[#C9A227]/35 shadow-[0_4px_20px_rgba(0,0,0,0.5)] px-4 py-3">
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
                    ? `${fase.endTitle} — ${fase.turnos[turnIdx]?.ano ?? ''}`
                    : `${fase.titulo} — Turno ${currentTurn?.id ?? 1} · Ano ${currentTurn?.ano ?? 1944}`}
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
            {(
              [
                { type: 'econ', label: 'Estabilidade Econômica' },
                { type: 'dir', label: 'Direitos Humanos & Desenv.' },
                { type: 'hum', label: 'Capacidade Humanitária' },
              ] as const
            ).map(({ type, label }) => (
              <div
                key={type}
                className="bg-[#0E2440]/70 p-2.5 px-3 rounded-lg border border-white/10"
              >
                <div className="flex justify-between items-center mb-1 text-xs font-semibold">
                  <span className="text-slate-200 truncate">{label}</span>
                  <span className="font-extrabold tabular-nums ml-2">{clampBar(bars[type])}</span>
                </div>
                <div className="w-full h-3.5 bg-black/45 rounded-full overflow-hidden border border-white/10">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: `${clampBar(bars[type])}%`,
                      backgroundColor: getBarColor(type, clampBar(bars[type])),
                    }}
                  />
                </div>
              </div>
            ))}
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
              <div className="bg-[#0E2440]/95 border border-[#C9A227] text-[#F4E8C1] p-3 rounded-lg text-center font-semibold text-base mb-4 shadow-lg">
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

              <h2
                className="text-2xl md:text-3xl font-bold text-[#0A1A2F] mb-3 leading-tight"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {currentTurn.titulo}
              </h2>

              <p className="text-base md:text-lg text-[#2D3D4E] leading-relaxed mb-4">
                {currentTurn.texto}
              </p>

              {/* Linha "Na vida real" ao voltar de erro */}
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

              {/* Piada dos 169 objetivos → fala → 17 ODS (turno da Agenda 2030) */}
              {isTurn169 && <Obj169Joke stage={obj169Stage} />}

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
                    (currentTurn.card && !unlockedCardIds.includes(currentTurn.card.id)) ||
                    (isTurn169 && obj169Stage !== 'concluido')

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
                        aria-label={`Opção descartada: ${opcao.texto}`}
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
                      className={`w-full text-left bg-white hover:bg-[#FCFBF9] border border-[#D6D0C4] border-l-8 ${dominantBorder} rounded-xl p-4 text-[#1E2A38] font-semibold text-base md:text-lg shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transform-none`}
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
          <div className="bg-gradient-to-br from-[#30171D] via-[#1A0D11] to-[#0F0609] border-2 border-[#84232F] rounded-2xl p-7 md:p-10 text-white shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
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
            <button
              type="button"
              onClick={handleGameOverBack}
              className="bg-[#B23A48] hover:bg-[#962F3C] border border-[#D64545] text-white text-base md:text-lg font-bold px-7 py-3.5 rounded-lg shadow-[0_4px_16px_rgba(178,58,72,0.4)] transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2 motion-reduce:transform-none"
            >
              Game Over — Voltar à decisão
            </button>
          </div>
        )}

        {/* VIEW 4: FIM DA FASE */}
        {view === 'phase_end' && (
          <div className="relative bg-[#F6F1E7] border border-[#D9CFBA] rounded-2xl p-8 md:p-12 text-[#1E2A38] shadow-[0_10px_30px_rgba(0,0,0,0.45)] text-center">
            <div className="absolute inset-1.5 border border-dashed border-[#C9A227]/40 rounded-xl pointer-events-none" />
            <div className="text-5xl mb-3">🕊️</div>
            <h2
              className="text-3xl font-bold text-[#0A1A2F] mb-2"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {fase.endTitle}
            </h2>
            <p className="text-base md:text-lg text-[#55677B] mb-7">{fase.endSubtitle}</p>

            <div className="bg-white border border-[#D9CFBA] rounded-xl p-5 max-w-md mx-auto mb-7 text-left">
              <h3 className="text-base font-bold text-[#0A1A2F] border-b border-[#D9CFBA] pb-2 mb-3">
                {fase.endBalanceTitle}
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
              {faseIdx + 1 < FASES.length ? (
                <button
                  type="button"
                  onClick={handlePhaseContinue}
                  className="bg-[#009EDB] hover:bg-[#0084B8] text-white font-bold text-lg px-8 py-3.5 rounded-lg shadow-md cursor-pointer"
                >
                  Continuar
                </button>
              ) : (
                <div className="bg-[#0A1A2F] text-[#F4E8C1] border border-[#C9A227] px-4 py-2.5 rounded-lg font-semibold text-sm">
                  {fase.proximaAviso}
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

        {/* VIEW 5: COLAPSO */}
        {view === 'collapse' && (
          <div className="bg-gradient-to-br from-[#30171D] via-[#1A0D11] to-[#0F0609] border-2 border-[#84232F] rounded-2xl p-7 md:p-10 text-white shadow-[0_10px_40px_rgba(0,0,0,0.8)] text-center">
            <div className="text-5xl mb-3" aria-hidden="true">
              📉
            </div>
            <h2
              className="text-2xl md:text-3xl font-bold text-[#FFD4D8] mb-4 leading-tight"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Colapso do Conselho
            </h2>
            <p className="text-lg md:text-xl text-[#F1D9DC] leading-relaxed mb-8 max-w-3xl mx-auto">
              Uma das barras de equilíbrio chegou a zero e o sistema global não resistiu. Mas toda
              decisão pode ser refeita.
            </p>
            <button
              type="button"
              onClick={handleCollapseBack}
              className="bg-[#B23A48] hover:bg-[#962F3C] border border-[#D64545] text-white text-base md:text-lg font-bold px-7 py-3.5 rounded-lg shadow-[0_4px_16px_rgba(178,58,72,0.4)] transition-all transform hover:-translate-y-0.5 cursor-pointer motion-reduce:transform-none"
            >
              Voltar ao último turno
            </button>
          </div>
        )}

        {/* VIEW 6: TELA FINAL (vitória plena ou parcial) */}
        {view === 'endgame' && (
          <div className="relative bg-[#F6F1E7] border border-[#D9CFBA] rounded-2xl p-8 md:p-12 text-[#1E2A38] shadow-[0_10px_30px_rgba(0,0,0,0.45)] text-center">
            <div className="absolute inset-1.5 border border-dashed border-[#C9A227]/40 rounded-xl pointer-events-none" />
            <div className="text-5xl mb-3" aria-hidden="true">
              {endgame === 'vitoria_plena' ? '🏆' : '🕊️'}
            </div>
            <h2
              className="text-2xl md:text-3xl font-bold text-[#0A1A2F] mb-2"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {endgame === 'vitoria_plena'
                ? 'Vitória Plena — 2030'
                : 'Você chegou a 2030 — mas não com tudo resolvido'}
            </h2>
            <p className="text-base md:text-lg text-[#55677B] mb-7 max-w-2xl mx-auto leading-relaxed">
              {endgame === 'vitoria_plena'
                ? 'As três barras terminaram acima de 60: estabilidade econômica, direitos humanos e capacidade humanitária garantidos até 2030.'
                : 'Nenhuma barra zerou e o sistema global seguiu de pé — ainda há desafios em aberto, e é isso que mantém o Conselho reunido. A construção continua.'}
            </p>

            {/* Bloco de estudo — 12 bullets verbatim de dados-base.ts */}
            <div className="bg-white border border-[#D9CFBA] rounded-xl p-5 md:p-6 max-w-2xl mx-auto mb-7 text-left">
              <h3 className="text-base font-bold text-[#0A1A2F] border-b border-[#D9CFBA] pb-2 mb-3">
                📚 O que você estudou neste jogo
              </h3>
              <ul className="flex flex-col gap-2 text-sm md:text-[15px] leading-relaxed text-[#0A1A2F] list-disc pl-5">
                {ESTUDO_BULLETS.map((bullet) => (
                  <li key={bullet.slice(0, 40)}>{bullet}</li>
                ))}
              </ul>
            </div>

            {/* Estatísticas do jogo */}
            <div className="bg-white border border-[#D9CFBA] rounded-xl p-5 max-w-md mx-auto mb-7 text-left">
              <div className="flex justify-between py-1.5 border-b border-gray-100 text-sm md:text-base">
                <span className="font-bold text-[#0A1A2F]">Turnos jogados</span>
                <span className="font-extrabold">{turnosJogados}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100 text-sm md:text-base">
                <span className="font-bold text-[#0A1A2F]">Cards desbloqueados</span>
                <span className="font-extrabold">
                  {unlockedCardIds.length} de {totalCards} cards
                </span>
              </div>
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

            <button
              type="button"
              onClick={handleResetGame}
              className="bg-[#009EDB] hover:bg-[#0084B8] text-white font-bold text-lg px-8 py-3.5 rounded-lg shadow-md cursor-pointer"
            >
              Jogar Novamente do Início
            </button>
          </div>
        )}
      </main>

      {/* MODAL BLOQUEANTE PARA CARD DE ENCICLOPÉDIA */}
      {activeCardModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Card de enciclopédia: ${activeCardModal.titulo}`}
          className="fixed inset-0 z-50 bg-[#050E1A]/85 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-[#F6F1E7] border-2 border-[#C9A227] rounded-2xl max-w-2xl w-full max-h-[90dvh] overflow-y-auto p-6 md:p-8 text-[#1E2A38] shadow-[0_20px_50px_rgba(0,0,0,0.65),0_0_30px_rgba(201,162,39,0.3)]">
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
                  width={640}
                  height={256}
                  onError={() => setImageFailed(true)}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : activeCardModal.imagem ? (
              <div className="w-full h-44 rounded-xl mb-4 border border-[#D9CFBA] bg-gradient-to-br from-[#1A365D] to-[#0E2440] flex flex-col items-center justify-center p-4 text-center">
                <span className="text-4xl mb-1" aria-hidden="true">
                  {activeCardModal.fallbackEmoji || '🏛️'}
                </span>
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
          <div className="bg-[#F6F1E7] border-2 border-[#C9A227] rounded-2xl max-w-xl w-full max-h-[85dvh] overflow-y-auto p-6 md:p-8 text-[#1E2A38] shadow-2xl">
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
                  const cardData = FASES.flatMap((f) => f.turnos).find(
                    (t) => t.card?.id === cardId,
                  )?.card
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
                      <span className="text-[#C9A227] font-bold text-lg" aria-hidden="true">
                        →
                      </span>
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
