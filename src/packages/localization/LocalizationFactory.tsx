import * as React from 'react'
import * as RNLocalize from 'react-native-localize'
import {Props, State, Context, Translations} from './types'

export function LocalizationFactory<T>(
  translations: Translations<T>,
  defaultLanguage: {languageTag: string; isRTL: boolean},
): {
  Provider: typeof React.Component
  Consumer: React.Consumer<Context<T>>
} {
  const availableLanguages = Object.keys(translations)
  const getLocalization: () => State = () => ({
    ...RNLocalize.getNumberFormatSettings(),
    ...(RNLocalize.findBestAvailableLanguage(availableLanguages) ?? defaultLanguage),
    currencies: RNLocalize.getCurrencies(),
    temperatureUnit: RNLocalize.getTemperatureUnit(),
    usesMetricSystem: RNLocalize.usesMetricSystem(),
    calendar: RNLocalize.getCalendar(),
  })

  const initialState: State = getLocalization()

  const Context = React.createContext<Context<T>>({
    settings: initialState,
    translation: translations[initialState.languageTag],
  })

  return {
    Provider: class Provider extends React.Component<Props, State> {
      constructor(props: Props) {
        super(props)

        this.state = initialState
        this.updateLocalization = this.updateLocalization.bind(this)
      }

      updateLocalization() {
        this.setState(getLocalization())
      }

      componentDidMount() {
        RNLocalize.addEventListener('change', this.updateLocalization)
      }

      componentWillUnmount() {
        RNLocalize.removeEventListener('change', this.updateLocalization)
      }

      render() {
        return (
          <Context.Provider
            value={{settings: this.state, translation: translations[this.state.languageTag]}}
            {...this.props}
          />
        )
      }
    },
    Consumer: Context.Consumer,
  }
}
