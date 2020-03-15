import React from 'react'
import {StyleSheet, Text, View, Button} from 'react-native'
import {SafeArea} from 'destiny'

export default class App extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <SafeArea>
          <SafeArea.Consumer>
            {insets => <View style={{position: 'absolute', ...insets, backgroundColor: 'yellow'}}></View>}
          </SafeArea.Consumer>
        </SafeArea>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#03afda',
  },
})
