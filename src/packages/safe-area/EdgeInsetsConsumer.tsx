import * as React from 'react'
import {SafeAreaConsumer, EdgeInsets} from 'react-native-safe-area-context'

export class Consumer extends React.Component<React.ConsumerProps<EdgeInsets>> {
  render() {
    const {children, ...rest} = this.props

    return (
      <SafeAreaConsumer {...rest}>
        {insets => children(insets ?? {top: 0, left: 0, bottom: 0, right: 0})}
      </SafeAreaConsumer>
    )
  }
}
