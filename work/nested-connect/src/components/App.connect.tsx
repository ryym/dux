import * as React from 'react'
import { connect } from '../dux-react'
import { Dispatch } from '../dux'
import { State, Add, AddAfter } from '../store'

// やはりmapProps は child で 2回走っちゃうけど、render はparent,childで
// 1回ずつしか走らない。同期的な処理はReactが上手くまとめてくれるからか。
// ConnectorのPropsが空でも親コンポーネントがrenderされたら
// componentWillReceivePropsが走るからそのせいっぽい。

const { Component } = React

type GrandChildProps = {
  count: number,
  dispatch: Dispatch<State>
}

class GrandChild extends Component<ChildProps, {}> {
  render() {
    console.log('[RENDER] Grand Child')
    return (
      <div>
        <h2>Grand Child</h2>
        <p>GrandChild count: {this.props.count}</p>
      </div>
    )
  }
}

const GrandChildC = connect(GrandChild, {
  mapProps: dispatch => (s: State, wp: {}): GrandChildProps => {
    return {
      count: s.count,
      dispatch,
    }
  }
})

type ChildProps = {
  count: number,
  text: string,
  dispatch: Dispatch<State>
}


class Child extends Component<ChildProps, {}> {
  render() {
    console.log('[RENDER] Child')
    return (
      <div>
        <h2>Child</h2>
        <p>Child count: {this.props.count}</p>
        <p>Text: {this.props.text}</p>
        <GrandChildC />
      </div>
    )
  }
}

const ChildC = connect(Child, {
  mapProps: dispatch => (s: State, wp: { text: string }): ChildProps => {
    return {
      count: s.count,
      dispatch,
      text: wp.text,
    }
  }
})

export type ParentProps = {
  count: number,
  dispatch: Dispatch<State>
}

class Parent extends Component<ParentProps> {
  render() {
    console.log('[RENDER] Parent')
    const { dispatch, count } = this.props
    return (
      <div>
        <h1>Parent</h1>
        <p>Parent count: {count}</p>
        <ChildC text={`from parent ${count}`} />
        <button onClick={() => dispatch(Add(2))}>
          Add 2
        </button>
        <button onClick={() => dispatch(AddAfter({ time: 300, n: 3 }))}>
          Add 3 after 300 ms
        </button>
      </div>
    )
  }
}

const ParentC = connect(Parent, {
  mapProps: dispatch => (s: State, wp: {}): ParentProps => {
    return {
      dispatch,
      count: s.count
    }
  }
})


export default class App extends Component<{}, {}> {
  render() {
    return <ParentC />
  }
}
