import ReactOnRails from 'react-on-rails';
import RecipesApp from './recipes/startup/RecipesAppServer';
import RecipesAppRedux from './recipes-redux/startup/RecipesAppServer';
import configureStore from './recipes-redux/store/recipesStore';

ReactOnRails.register({ RecipesApp });

// For the redux version
ReactOnRails.registerStore({recipesStore: configureStore})
ReactOnRails.register({ RecipesAppRedux });
