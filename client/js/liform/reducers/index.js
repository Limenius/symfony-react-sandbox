import tasksReducer from './tasksReducer'
import { initialState as tasksState } from './tasksReducer'
import { combineReducers }  from 'redux'
import { reducer as formReducer } from 'redux-form'

// Combine all reducers you may have here
export default combineReducers({
    tasksState: tasksReducer,
        form: formReducer
})

export const initialStates = {
    tasksState,
}
