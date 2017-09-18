import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from './dux-react'
import store from './store'
import App from './components/App.connect'

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

