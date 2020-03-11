import React from 'react'
import {StyleSheet, Text, View, Button} from 'react-native'
import {DarkMode} from 'destiny'

export default class App extends React.Component<{}, {visible: Boolean}> {
  constructor(props: {}) {
    super(props)

    this.state = {
      visible: true,
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {!!this.state.visible && (
          <DarkMode>
            <DarkMode.Consumer>{({mode}) => <Text>{mode}</Text>}</DarkMode.Consumer>
          </DarkMode>
        )}
        <Button title={'Hide'} onPress={() => this.setState({visible: false})}></Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#03afda',
  },
})
