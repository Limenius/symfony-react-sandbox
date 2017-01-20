import recipesReducer from './recipesReducer';
import { initialState as recipesState } from './recipesReducer';
import { combineReducers }  from 'redux';

// Combine all reducers you may have here
export default combineReducers({
    recipes: recipesReducer,

});

export const initialStates = {
    recipesState,
};
