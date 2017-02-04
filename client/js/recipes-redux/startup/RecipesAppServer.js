import React from 'react'
import { Provider } from 'react-redux'
import Root from '../containers/root'
import { StaticRouter } from 'react-router'
import ReactOnRails from 'react-on-rails'

// See documentation for https://github.com/reactjs/react-redux.
// This is how you get props from the Rails view into the redux store.
// This code here binds your smart component to the redux store.
const mainNode = () => {
    const store = ReactOnRails.getStore('recipesStore')

    const { location } = store.getState().recipesState

    const context = {}

    const reactComponent = (
        <Provider store={store}>
            <StaticRouter location={location} context={context}>
                <Root/>
            </StaticRouter>
        </Provider>
    )
    return reactComponent
}

export default mainNode
