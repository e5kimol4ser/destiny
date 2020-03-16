import * as React from 'react'
import {initialMode, eventEmitter, supportsDarkMode} from 'react-native-dark-mode'
import {Mode, State, Props} from './types'

const Context = React.createContext<State>({mode: 'noPreference'})

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
    return <Context.Provider value={this.state} {...this.props} />
  }
}

export const Consumer: React.Consumer<State> = Context.Consumer
