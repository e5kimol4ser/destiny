import React from 'react'
import {StyleSheet, Text, View} from 'react-native'

const App = () => {
  return (
    <View style={styles.container}>
      <Text>It Works!!!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#03afda',
  },
})

export default App
