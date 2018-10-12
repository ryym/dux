import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from './dux-react'
import { makeStore } from './store'
import App from './components/App'

const store = makeStore()

store.subscribe((state: any, c: any) => {
  console.log(state, c)
})

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

