export type Mode = 'noPreference' | 'light' | 'dark'

export interface Props {
  children?: React.ReactNode
}

export interface State {
  mode: Mode
}
