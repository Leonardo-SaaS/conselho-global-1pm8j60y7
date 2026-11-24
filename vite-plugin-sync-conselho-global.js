import fs from 'fs'
import path from 'path'

// Sincroniza public/conselho-global.html byte a byte com a raiz do projeto
// (fonte da verdade) antes de cada build/dev, garantindo que o Vite
// publique a versão completa do jogo (Fases 1, 2 e 3).
const RAIZ = 'conselho-global.html'
const DESTINO = path.join('public', 'conselho-global.html')

export default function syncConselhoGlobalPlugin() {
  return {
    name: 'vite-plugin-sync-conselho-global',
    buildStart() {
      try {
        const conteudo = fs.readFileSync(RAIZ)
        const atual = fs.existsSync(DESTINO) ? fs.readFileSync(DESTINO) : null
        if (!atual || !atual.equals(conteudo)) {
          fs.writeFileSync(DESTINO, conteudo)
          console.log(`[sync-conselho-global] ${DESTINO} atualizado a partir da raiz`)
        }
      } catch (e) {
        this.error(`[sync-conselho-global] falha ao sincronizar ${DESTINO}: ${e.message}`)
      }
    },
  }
}
