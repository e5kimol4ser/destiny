import * as React from 'react'

const Context = React.createContext({})

export class Provider extends React.Component<{}, {}> {
  render() {
    return <Context.Provider value={this.state} />
  }
}
