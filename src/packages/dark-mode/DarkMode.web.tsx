import * as React from 'react'
import {Mode, Props} from './types'

interface MediaQueryMode {
  mode: Mode
  mediaQuery: MediaQueryList
}

const Context = React.createContext<Mode>('noPreference')

const modes: MediaQueryMode[] = [
  {mode: 'light', mediaQuery: window.matchMedia('(prefers-color-scheme: light)')},
  {mode: 'dark', mediaQuery: window.matchMedia('(prefers-color-scheme: dark)')},
  {mode: 'noPreference', mediaQuery: window.matchMedia('(prefers-color-scheme: no-preference)')},
]

const initialMode = modes.find(({mediaQuery}) => mediaQuery.matches)?.mode

export const Provider = (props: Props) => {
  const [mode, setMode] = React.useState<Mode>(initialMode || 'noPreference')

  React.useEffect(() => {
    const removeCallbacks: (() => any)[] = []

    modes.forEach(({mode: mediaQueryMode, mediaQuery}) => {
      const listener = ({matches}: {matches: boolean}) => {
        if (matches) {
          setMode(mediaQueryMode)
        }
      }
      mediaQuery.addListener(listener)
      removeCallbacks.push(() => mediaQuery.removeListener(listener))
    })

    return () => {
      removeCallbacks.forEach(cb => cb())
    }
  })

  return <Context.Provider value={mode} {...props} />
}

export const Consumer: React.Consumer<Mode> = Context.Consumer
