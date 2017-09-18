import * as React from 'react'
import contextTypes from './context-types'
import Store from '../store'

export type ProviderProps = {
  store: Store<any>
}

export default class Provider extends React.Component<ProviderProps> {
  static childContextTypes = contextTypes

  getChildContext() {
    return { store: this.props.store }
  }

  render() {
    return React.Children.only(this.props.children)
  }
}
