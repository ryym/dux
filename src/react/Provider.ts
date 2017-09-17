import * as React from 'react'
import contextTypes from './context-types'
import Store from '../store'

type Props = {
  store: Store<any>
}

export default class Provider extends React.Component<Props, void> {
  static childContextTypes = contextTypes

  getChildContext() {
    return { store: this.props.store }
  }

  render() {
    return React.Children.only(this.props.children)
  }
}
