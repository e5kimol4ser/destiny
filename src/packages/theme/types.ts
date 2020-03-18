import * as DarkMode from '../dark-mode'

export interface BaseTheme {
  primary: string
  secondary: string
  tertiary: string
}

export interface Props<T extends BaseTheme> {
  children?: React.ReactNode
  initialTheme: State<T>
}

export type State<T extends BaseTheme> = Record<DarkMode.Mode, T>

export interface Context<T extends BaseTheme> {
  theme: T
  setTheme: (theme: State<T>) => void
}
