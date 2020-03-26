import {Calendar, TemperatureUnit} from 'react-native-localize'

export interface Props<T> {
  children?: React.ReactNode
  translations: Translations<T>
  defaultLanguage: Language
}

export interface State {
  languageTag: string
  decimalSeparator: string
  groupingSeparator: string
  currencies: Array<string>
  temperatureUnit: TemperatureUnit
  usesMetricSystem: boolean
  calendar: Calendar
  isRTL: boolean
}

export interface Language {
  languageTag: string
  isRTL: boolean
}

export type Translations<T> = {
  [key: string]: T
}

export interface Context<T> {
  settings: State
  translation: T
}

export {Calendar, TemperatureUnit}
