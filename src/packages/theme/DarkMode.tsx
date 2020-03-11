import * as React from 'react'
import {initialMode, eventEmitter, supportsDarkMode} from 'react-native-dark-mode'

type Mode = 'noPreference' | 'light' | 'dark'

interface Props {
  children?: React.ReactNode
}

interface State {
  mode: Mode
}

const {Provider, Consumer} = React.createContext<State>({mode: 'noPreference'})

export class DarkMode extends React.PureComponent<Props, State> {
  static Consumer: React.Consumer<State> = Consumer

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
    return <Provider value={this.state} {...this.props} />
  }
}
