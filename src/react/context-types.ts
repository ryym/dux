import * as PropTypes from 'prop-types'
import Store from '../store'

export default {
  store: PropTypes.instanceOf(Store).isRequired,
}
