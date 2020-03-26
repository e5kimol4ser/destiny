import * as React from 'react'
import * as DarkMode from '../dark-mode'
import {BaseTheme, Context, State, Props} from './types'
import defaultTheme from './default.json'

const Context = React.createContext<Context<any>>({theme: defaultTheme.noPreference, setTheme: () => {}})

export class Provider<T extends BaseTheme> extends React.Component<Props<T>, State<T>> {
  constructor(props: Props<T>) {
    super(props)

    this.state = props.initialTheme

    this.setTheme = this.setTheme.bind(this)
  }

  setTheme(theme: State<T>) {
    this.setState(theme)
  }

  render() {
    return (
      <DarkMode.Provider>
        <DarkMode.Consumer>
          {mode => <Context.Provider value={{theme: this.state[mode], setTheme: this.setTheme}} {...this.props} />}
        </DarkMode.Consumer>
      </DarkMode.Provider>
    )
  }
}

export const {Consumer} = Context
