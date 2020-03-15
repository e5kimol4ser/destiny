import * as React from 'react'
import {
  SafeAreaProvider,
  SafeAreaConsumer,
  initialWindowSafeAreaInsets,
  EdgeInsets,
} from 'react-native-safe-area-context'

interface Props {
  children?: React.ReactNode
}

interface State {}

class ConsumerNotNull extends React.Component<React.ConsumerProps<EdgeInsets>> {
  render() {
    const {children, ...rest} = this.props

    return (
      <SafeAreaConsumer {...rest}>
        {insets => children(insets ?? {top: 0, left: 0, bottom: 0, right: 0})}
      </SafeAreaConsumer>
    )
  }
}

export class SafeArea extends React.Component<Props, State> {
  static Consumer = ConsumerNotNull

  render() {
    return <SafeAreaProvider initialSafeAreaInsets={initialWindowSafeAreaInsets} {...this.props} />
  }
}
