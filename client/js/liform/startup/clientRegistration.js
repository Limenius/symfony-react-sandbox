import ReactOnRails from 'react-on-rails'
import LiformExample from './LiformExample'
import configureStore from '../store/configureStore'

const tasksStore = configureStore

ReactOnRails.register({ LiformExample })
ReactOnRails.registerStore({ tasksStore })
