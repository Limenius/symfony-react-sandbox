import React from 'react'
import { Provider } from 'react-redux'
require('../../../sass/layout.scss')
import Root from '../containers/root'
import { BrowserRouter } from 'react-router-dom'
import ReactOnRails from 'react-on-rails'

// See documentation for https://github.com/reactjs/react-redux.
// This is how you get props from the Rails view into the redux store.
// This code here binds your smart component to the redux store.
const mainNode = () => {
    const store = ReactOnRails.getStore('recipesStore')

    const reactComponent = (
        <Provider store={store}>
            <BrowserRouter>
                <Root/>
            </BrowserRouter>
        </Provider>
    )
    return reactComponent
}

export default mainNode
