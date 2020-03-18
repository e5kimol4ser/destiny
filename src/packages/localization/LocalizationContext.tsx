import * as React from 'react'
import * as RNLocalize from 'react-native-localize'
import {Props, State, Context, Language} from './types'

const getLocalization: (availableLanguages: string[], defaultLanguage: Language) => State = (
  availableLanguages,
  defaultLanguage,
) => ({
  ...RNLocalize.getNumberFormatSettings(),
  ...(RNLocalize.findBestAvailableLanguage(availableLanguages) ?? defaultLanguage),
  currencies: RNLocalize.getCurrencies(),
  temperatureUnit: RNLocalize.getTemperatureUnit(),
  usesMetricSystem: RNLocalize.usesMetricSystem(),
  calendar: RNLocalize.getCalendar(),
})

const LanguageContext = React.createContext<Context<any>>({
  settings: getLocalization([], {languageTag: 'en-US', isRTL: false}),
  translation: {'en-US': {}},
})

export class Provider<T> extends React.Component<Props<T>, State> {
  constructor(props: Props<T>) {
    super(props)

    this.state = getLocalization(Object.keys(props.translations), props.defaultLanguage)
    this.updateLocalization = this.updateLocalization.bind(this)
  }

  updateLocalization() {
    this.setState(getLocalization(Object.keys(this.props.translations), this.props.defaultLanguage))
  }

  componentDidMount() {
    RNLocalize.addEventListener('change', this.updateLocalization)
  }

  componentWillUnmount() {
    RNLocalize.removeEventListener('change', this.updateLocalization)
  }

  render() {
    return (
      <LanguageContext.Provider
        value={{settings: this.state, translation: this.props.translations[this.state.languageTag]}}
        {...this.props}
      />
    )
  }
}

export const {Consumer} = LanguageContext
