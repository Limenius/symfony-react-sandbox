import React from 'react'
import ReactOnRails from 'react-on-rails'

import { Provider } from 'react-redux'
import Liform, { processSubmitErrors, DefaultTheme } from 'liform-react'
import TaskList from '../components/TaskList'
import Constants from '../constants/tasksConstants'

const submit = (values, dispatch) =>
{
    return fetch('/liform/tasks', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( values )
    }).then( (response) => {
        return response.json()
    }).then( (data) => {
        processSubmitErrors(data)
        dispatch({ type: Constants.TASK_ADDED, task: data })
    })
}

const mainNode = (props) => {

    const store = ReactOnRails.getStore('tasksStore')

    const reactComponent = (
        <Provider store={store}>
            <div>
                <Liform schema={props.schema} onSubmit={submit} initialValues={props.initialValues}/>
                <TaskList/>
            </div>
        </Provider>
    )
    return reactComponent
}

export default mainNode
