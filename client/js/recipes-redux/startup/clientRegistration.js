import ReactOnRails from 'react-on-rails'
import RecipesAppRedux from './RecipesAppClient'
import configureStore from '../store/recipesStore'

const recipesStore = configureStore

ReactOnRails.registerStore({ recipesStore })
ReactOnRails.register({ RecipesAppRedux })
