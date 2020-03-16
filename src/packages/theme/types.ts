import * as DarkMode from '../dark-mode'

export interface BaseTheme {
  primary: string
  secondary: string
  tertiary: string
}

export interface Props {
  children?: React.ReactNode
}

export type State<T> = Record<DarkMode.Mode, T>

export interface Context<T> {
  theme: T
  setTheme: (theme: State<T>) => void
}
