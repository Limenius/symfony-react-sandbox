import ReactOnRails from 'react-on-rails'
import RecipesApp from './recipes/startup/RecipesAppServer'
import RecipesAppRedux from './recipes-redux/startup/RecipesAppServer'
import LiformExample from './liform/startup/LiformExample'
import configureStore from './recipes-redux/store/RecipesStore'

ReactOnRails.register({ RecipesApp })

// For the redux version
ReactOnRails.registerStore({ recipesStore: configureStore })
ReactOnRails.register({ RecipesAppRedux })

// Liform example
ReactOnRails.register({ LiformExample })
