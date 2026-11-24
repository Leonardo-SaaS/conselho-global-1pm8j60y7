import { useMemo } from 'react'
import { buildObj169Lines, ODS_LISTA } from './dados-base'

export type Obj169Stage = 'aguardando' | 'rodando' | 'fala' | 'concluido'

/* Piada do turno 2015 (Fase 3): rolagem GIGANTE dos "169 objetivos" →
   fala do jogador → lista dos 17 ODS. Reproduz o conselho-global.html. */
export function Obj169Joke({ stage }: { stage: Obj169Stage }) {
  const linhas = useMemo(() => buildObj169Lines(), [])

  return (
    <>
      {/* Estilos da rolagem (equivalente ao CSS do conselho-global.html) */}
      <style>{`
        @keyframes obj169Scroll {
          from { transform: translateY(0); }
          to { transform: translateY(-88%); }
        }
        .obj169-rolling .obj169-tape {
          animation: obj169Scroll 5s linear forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .obj169-rolling .obj169-tape { animation: none; }
        }
      `}</style>

      {(stage === 'aguardando' || stage === 'rodando') && (
        <div
          aria-hidden="true"
          className={`absolute inset-0 z-20 overflow-hidden rounded-xl bg-[#fbf8f1] cursor-wait ${
            stage === 'rodando' ? 'obj169-rolling' : ''
          }`}
        >
          <div className="obj169-tape px-6 py-6 pb-12 text-xs leading-relaxed text-slate-600 text-justify">
            {linhas.map((linha, i) => (
              <div key={i} className="mb-[3px]">
                {linha}
              </div>
            ))}
          </div>
        </div>
      )}

      {stage === 'fala' && (
        <div className="bg-[#C9A227]/15 border-l-4 border-[#C9A227] p-3 rounded-r-lg text-sm md:text-base text-[#4A3E1D] italic mb-5 leading-normal">
          Tá, tá. Em resumo: 17 objetivos.
        </div>
      )}

      {stage === 'concluido' && (
        <div className="mb-5">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#5A6B7C] font-bold mb-3">
            <span>Os 17 Objetivos de Desenvolvimento Sustentável</span>
            <span className="flex-1 h-px bg-[#D9CFBA]" />
          </div>
          <ul className="list-none flex flex-col gap-2 mb-6">
            {ODS_LISTA.map((ods, i) => (
              <li
                key={i}
                className="bg-white border border-[#D9CFBA] rounded-lg px-3 py-2 text-base text-[#1E2A38] flex items-baseline gap-2.5"
              >
                <span className="bg-[#009EDB] text-white text-[13px] font-extrabold min-w-[26px] h-[26px] rounded-full inline-flex items-center justify-center shrink-0 translate-y-[2px]">
                  {i + 1}
                </span>
                {ods}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
