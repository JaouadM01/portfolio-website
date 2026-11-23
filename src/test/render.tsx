import type { ReactElement } from 'react'
import { render, type RenderResult } from '@testing-library/react'
import userEvent, { type UserEvent } from '@testing-library/user-event'
import { LazyMotion, domAnimation } from 'motion/react'

export interface RenderWithUserResult extends RenderResult {
  user: UserEvent
}

/** Rendert binnen dezelfde LazyMotion-provider als de app en geeft een userEvent-instantie terug. */
export function renderWithMotion(ui: ReactElement): RenderWithUserResult {
  const user = userEvent.setup()
  const result = render(
    <LazyMotion features={domAnimation} strict>
      {ui}
    </LazyMotion>,
  )
  return { ...result, user }
}
