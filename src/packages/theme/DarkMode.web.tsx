import * as React from 'react'

type Mode = 'noPreference' | 'light' | 'dark'

interface MediaQueryMode {
  mode: Mode
  mediaQuery: MediaQueryList
}

interface MediaQueryListener {
  mediaQuery: MediaQueryList
  listener: ({matches}: {matches: Boolean}) => any
}

interface Props {
  children?: React.ReactNode
}

interface State {
  mode: Mode
}

const modes: Array<MediaQueryMode> = [
  {mode: 'light', mediaQuery: window.matchMedia('(prefers-color-scheme: light)')},
  {mode: 'dark', mediaQuery: window.matchMedia('(prefers-color-scheme: dark)')},
  {mode: 'noPreference', mediaQuery: window.matchMedia('(prefers-color-scheme: no-preference)')},
]
const initialMode = modes.find(({mediaQuery}) => mediaQuery.matches)?.mode
const supportsDarkMode = !!initialMode

const {Provider, Consumer} = React.createContext<State>({mode: 'noPreference'})

export class DarkMode extends React.PureComponent<Props, State> {
  static Consumer: React.Consumer<State> = Consumer
  private listeners: Array<MediaQueryListener>

  constructor(props: Readonly<Props>) {
    super(props)

    this.listeners = []

    this.state = {
      mode: initialMode ?? 'noPreference',
    }

    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    if (supportsDarkMode) {
      modes.forEach(({mode, mediaQuery}) => {
        const listener = ({matches}: {matches: Boolean}) => {
          matches && this.onChange(mode)
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
    return <Provider value={this.state} {...this.props} />
  }
}
