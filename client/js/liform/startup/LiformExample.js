import React from 'react'
import ReactOnRails from 'react-on-rails'

import { Provider } from 'react-redux'
import Liform, { processSubmitErrors, DefaultTheme } from 'liform-react'
import TaskList from '../components/TaskList'
import Constants from '../constants/tasksConstants'

///
import { Field } from 'redux-form'
import classNames from 'classnames'


const processFile = (onChange, e) => {
    const files = e.target.files
    return new Promise(() => {
        let reader  = new FileReader()
        reader.addEventListener('load', () => {
            onChange(reader.result)
        }, false)
        reader.readAsDataURL(files[0])
    })
}

const File = field => {
    const className = classNames([
        'form-group',
        { 'has-error' : field.meta.touched && field.meta.error }
    ])
    return (
        <div className={className}>
            <label className="control-label" htmlFor={field.id}>{field.label}</label>
            <input name={field.name} onBlur={field.onBlur} onChange={processFile.bind(this, field.input.onChange)} className="form-control" type="file"/>
            {field.meta.touched && field.meta.error && <span className="help-block">{field.meta.error}</span>}
            {field.description && <span>{field.description}</span>}
            <img width="200px" style={{ marginTop: '1em' }} src={field.input.value}/>
        </div>
    )
}

const FileWidget = (props) => {
    // You can remove stuff from here like placeholder or description if you don't need it
    return (
        <Field
            component={File}
            label={props.label}
            name={props.fieldName}
            required={props.required}
            id={'field-'+props.fieldName}
            placeholder={props.schema.default}
            description={props.schema.description}
            type={props.type}
        />
    )
}


const myTheme = { ...DefaultTheme, 'file': FileWidget }

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
                <Liform schema={props.schema} onSubmit={submit} initialValues={props.initialValues} theme={myTheme}/>
                <TaskList/>
            </div>
        </Provider>
    )
    return reactComponent
}

export default mainNode
