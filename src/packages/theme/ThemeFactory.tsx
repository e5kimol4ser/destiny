import * as React from 'react'
import * as DarkMode from '../dark-mode'
import {BaseTheme, Context, State, Props} from './types'

export function ThemeFactory<T extends BaseTheme>(
  initialTheme: State<T>,
): {
  Provider: typeof React.Component
  Consumer: React.Consumer<Context<T>>
} {
  const Context = React.createContext<Context<T>>({theme: initialTheme.noPreference, setTheme: () => {}})

  return {
    Provider: class Provider extends React.Component<Props, State<T>> {
      constructor(props: Props) {
        super(props)

        this.state = initialTheme

        this.setTheme = this.setTheme.bind(this)
      }

      setTheme(theme: State<T>) {
        this.setState(theme)
      }

      render() {
        return (
          <DarkMode.Provider>
            <DarkMode.Consumer>
              {({mode}) => (
                <Context.Provider value={{theme: this.state[mode], setTheme: this.setTheme}} {...this.props} />
              )}
            </DarkMode.Consumer>
          </DarkMode.Provider>
        )
      }
    },
    Consumer: Context.Consumer,
  }
}
