import * as React from 'react'
import { ComponentClass, StatelessComponent } from 'react'
import shallowEqual from './utils/shallow-equal'
import Store, { Dispatch } from '../store'
import contextTypes from './context-types'

type ReactComponent<P> = ComponentClass<P> | StatelessComponent<P>;

type ConnectConfig<S, P, WP> = {
  mapProps: (dispatch: Dispatch<S>) => (state: S, wrapperProps: WP) => P
}

type ComponentState<P> = {
  mappedProps: P
}

export default function connect<S, P, WP>(
  component: ReactComponent<P>,
  config: ConnectConfig<S, P, WP>
): ComponentClass<WP> {
  const { mapProps: makeMapProps } = config

  class Connected extends React.Component<WP, ComponentState<P>> {
    static contextTypes = contextTypes

    private store: Store<S>
    private mapProps: (state: S, wrapperProps: WP) => P
    private unsubscribe: (() => void) | null = null

    constructor(props: WP, context: any) {
      super(props, context)
      this.store = context.store
      this.mapProps = makeMapProps(this.store.dispatch)
      this.updateMappedProps()
    }

    componentWillMount() {
      if (!this.unsubscribe) {
        this.unsubscribe = this.store.subscribe(() => this.updateMappedProps())
      }
    }

    componentWillUnmount() {
      if (this.unsubscribe) {
        this.unsubscribe()
        this.unsubscribe = null
      }
    }

    componentWillRecieveProps(nextProps: WP) {
      this.updateMappedProps()
    }

    shouldComponentUpdate(nextProps: WP, nextState: ComponentState<P>) {
      return !shallowEqual(this.state.mappedProps, nextState.mappedProps)
    }

    updateMappedProps() {
      const mappedProps = this.mapProps(this.store.getState(), this.props)
      this.setState({ mappedProps })
    }
  }

  return Connected
}
