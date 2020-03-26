import React from 'react'
import {StyleSheet, Text, View, Button} from 'react-native'
import {DarkMode} from 'destiny'

const {Provider} = Localization.LocalizationFactory({'de-DE': {}}, {languageTag: 'de_DE', isRTL: false})

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
          <DarkMode.Consumer>
            {mode => <Button title={mode} onPress={() => this.setState(({mounted}) => ({mounted: !mounted}))} />}
          </DarkMode.Consumer>
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
