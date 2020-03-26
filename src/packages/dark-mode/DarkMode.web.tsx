import * as React from 'react'
import {Mode, State, Props} from './types'

interface MediaQueryMode {
  mode: Mode
  mediaQuery: MediaQueryList
}

interface MediaQueryListener {
  mediaQuery: MediaQueryList
  listener: ({matches}: {matches: boolean}) => any
}

const modes: MediaQueryMode[] | false = typeof window !== 'undefined' && [
  {mode: 'light', mediaQuery: window.matchMedia('(prefers-color-scheme: light)')},
  {mode: 'dark', mediaQuery: window.matchMedia('(prefers-color-scheme: dark)')},
  {mode: 'noPreference', mediaQuery: window.matchMedia('(prefers-color-scheme: no-preference)')},
]

const initialMode = modes && modes.find(({mediaQuery}) => mediaQuery.matches)?.mode
const supportsDarkMode = !!initialMode

const Context = React.createContext<State>({mode: 'noPreference'})

export class Provider extends React.PureComponent<Props, State> {
  private listeners: MediaQueryListener[]

  constructor(props: Readonly<Props>) {
    super(props)

    this.listeners = []

    this.state = {
      mode: initialMode || 'noPreference',
    }

    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    if (supportsDarkMode && modes) {
      modes.forEach(({mode, mediaQuery}) => {
        const listener = ({matches}: {matches: boolean}) => {
          if (matches) {
            this.onChange(mode)
          }
        }
        this.listeners.push({mediaQuery, listener})
        mediaQuery.addListener(listener)
      })
    }
  }

  componentWillUnmount() {
    if (supportsDarkMode) {
      this.listeners.forEach(({mediaQuery, listener}) => {
        mediaQuery.removeListener(listener)
      })
    }
  }

  onChange(mode: Mode) {
    this.setState({mode})
  }

  render() {
    return <Context.Provider value={this.state} {...this.props} />
  }
}

export const Consumer: React.Consumer<State> = Context.Consumer
