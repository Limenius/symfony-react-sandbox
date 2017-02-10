import Constants from '../constants/tasksConstants'

export const initialState = {
    tasks: [],
}

export default function tasksReducer(state = initialState, action) {
    switch (action.type) {
    case Constants.TASK_ADDED:
        return { ...state, tasks: [ action.task, ...state.tasks ] }
    default:
        return state
    }
}
