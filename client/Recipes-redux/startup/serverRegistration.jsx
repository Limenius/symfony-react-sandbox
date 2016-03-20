import ReactOnRails from 'react-on-rails';
import RecipesApp from './RecipesAppServer';
import configureStore from '../store/recipesStore';

var recipesStore = configureStore;

ReactOnRails.registerStore({recipesStore})
ReactOnRails.register({ RecipesApp });
