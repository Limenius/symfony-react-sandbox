import React from 'react'
import { Provider } from 'react-redux'
import Root from '../containers/root'
import { StaticRouter } from 'react-router'
import ReactOnRails from 'react-on-rails'

// See documentation for https://github.com/reactjs/react-redux.
// This code here binds your smart component to the redux store.
const mainNode = (_initialProps, context) => {
    const store = ReactOnRails.getStore('recipesStore')

    const { location, base } = context

    const reactComponent = (
        <Provider store={store}>
            <StaticRouter basename={base + '/redux'} location={location} context={{}}>
                <Root/>
            </StaticRouter>
        </Provider>
    )
    return reactComponent
}

export default mainNode
