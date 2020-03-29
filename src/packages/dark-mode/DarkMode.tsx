import * as React from 'react'
import {initialMode, eventEmitter, supportsDarkMode} from 'react-native-dark-mode'
import {Mode, Props} from './types'

/*const Context = React.createContext<Mode>('noPreference')

export class Provider extends React.PureComponent<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props)

    this.state = {
      mode: supportsDarkMode ? initialMode : 'noPreference',
    }

    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    if (supportsDarkMode) {
      eventEmitter.addListener('currentModeChanged', this.onChange)
    }
  }

  componentWillUnmount() {
    if (supportsDarkMode) {
      eventEmitter.removeListener('currentModeChanged', this.onChange)
    }
  }

  onChange(mode: Mode) {
    this.setState({mode})
  }

  render() {
    return <Context.Provider value={this.state.mode} {...this.props} />
  }
}

export const Consumer: React.Consumer<Mode> = Context.Consumer*/

const Context = React.createContext<Mode>('noPreference')

export const Provider = (props: Props) => {
  const [mode, setMode] = React.useState<Mode>(supportsDarkMode ? initialMode : 'noPreference')

  if (supportsDarkMode) {
    React.useEffect(() => {
      eventEmitter.addListener('currentModeChanged', setMode)

      return () => {
        eventEmitter.removeListener('currentModeChanged', setMode)
      }
    })
  }

  return <Context.Provider value={mode} {...props} />
}

export const Consumer: React.Consumer<Mode> = Context.Consumer
