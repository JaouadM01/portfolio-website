import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Fonts lokaal gehost: geen request naar Google Fonts (sneller en privacyvriendelijker).
import '@fontsource-variable/syne'
import '@fontsource-variable/jetbrains-mono'
import './styles/global.css'
import App from './App'

const root = document.getElementById('root')
if (!root) throw new Error('Element #root ontbreekt in index.html')

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
