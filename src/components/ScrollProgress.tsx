/**
 * Dunne voortgangsbalk bovenaan die laat zien hoe ver je op de pagina bent.
 * Puur CSS (scroll-driven animation, zie Navbar.css): geen JavaScript dat elk frame
 * de scrollpositie meet. Browsers zonder ondersteuning tonen de balk simpelweg niet.
 */
export default function ScrollProgress() {
  return <div className="scroll-progress" aria-hidden="true" />
}
