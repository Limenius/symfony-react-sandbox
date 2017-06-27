import ReactOnRails from 'react-on-rails'
import LiformExample from './LiformExample'
import configureStore from '../store/configureStore'

const recipesStore = configureStore

ReactOnRails.register({ LiformExample })
ReactOnRails.registerStore({ recipesAdminStore: recipesStore })
