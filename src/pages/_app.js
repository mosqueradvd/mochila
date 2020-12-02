import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { useStore } from 'dux/store'

function MyApp ({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object
}

export default MyApp
