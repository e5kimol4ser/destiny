import React from 'react'
import {StyleSheet, Text, View, Button} from 'react-native'
import {Theme} from 'destiny'

const defaultTheme = {
  primary: '',
  secondary: '',
  tertiary: '',
}

const {Provider, Consumer} = Theme.ThemeFactory({light: defaultTheme, dark: defaultTheme, noPreference: defaultTheme})

export default class App extends React.Component<{}, {mounted: Boolean}> {
  constructor(props: {}) {
    super(props)

    this.state = {
      mounted: true,
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{position: 'absolute', top: 40, bottom: 40, left: 40, right: 40}}>
          <Button title={'Toggle'} onPress={() => this.setState({mounted: !this.state.mounted})} />
        </View>
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
