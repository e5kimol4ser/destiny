import * as React from 'react'
import {Provider as Localization, Props as LocalizationProps} from './packages/localization'
import {Provider as DarkMode} from './packages/dark-mode'
import {Provider as SafeArea} from './packages/safe-area'
import {Provider as Theme, Props as ThemeProps, BaseTheme} from './packages/theme'

type Props<L, T extends BaseTheme> = LocalizationProps<L> &
  ThemeProps<T> & {
    children?: React.ReactNode
  }

export class DestinyApp<L, T extends BaseTheme> extends React.Component<Props<L, T>, {}> {
  render() {
    const {translations, defaultLanguage, initialTheme, children} = this.props

    return (
      <Localization {...{translations, defaultLanguage}}>
        <SafeArea>
          <DarkMode>
            <Theme {...{initialTheme}}>{children}</Theme>
          </DarkMode>
        </SafeArea>
      </Localization>
    )
  }
}
