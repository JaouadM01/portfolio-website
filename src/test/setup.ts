import '@testing-library/jest-dom/vitest'
import { MotionGlobalConfig } from 'motion/react'

// Animaties direct afronden, zodat exit-animaties (modal, menu) tests niet laten wachten.
MotionGlobalConfig.skipAnimations = true

// ── jsdom mist een paar browser-API's die de app gebruikt ──

/** IntersectionObserver die elk element direct als "in beeld" meldt, zodat whileInView-animaties afronden. */
class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null
  readonly rootMargin = '0px'
  readonly scrollMargin = '0px'
  readonly thresholds = [0]
  private readonly callback: IntersectionObserverCallback

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback
  }

  observe(target: Element): void {
    const rect = target.getBoundingClientRect()
    const entry = {
      target,
      isIntersecting: true,
      intersectionRatio: 1,
      boundingClientRect: rect,
      intersectionRect: rect,
      rootBounds: null,
      time: 0,
    } satisfies IntersectionObserverEntry
    this.callback([entry], this)
  }

  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
}

Object.defineProperty(window, 'IntersectionObserver', { writable: true, value: MockIntersectionObserver })

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string): MediaQueryList => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }),
})

// Minimale <dialog>-ondersteuning (jsdom kent showModal/close niet).
if (typeof HTMLDialogElement.prototype.showModal !== 'function') {
  HTMLDialogElement.prototype.showModal = function showModal(this: HTMLDialogElement) {
    this.setAttribute('open', '')
  }
  HTMLDialogElement.prototype.close = function close(this: HTMLDialogElement) {
    this.removeAttribute('open')
    this.dispatchEvent(new Event('close'))
  }
}

window.scrollTo = () => {}
