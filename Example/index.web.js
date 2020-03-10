import 'resize-observer-polyfill/dist/ResizeObserver.global'
import {AppRegistry} from 'react-native'
import App from './App'

AppRegistry.registerComponent('Example', () => App)
AppRegistry.runApplication('Example', {
  initialProps: {},
  rootTag: document.getElementById('app-root'),
})
