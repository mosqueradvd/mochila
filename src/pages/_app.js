import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { useStore } from 'dux/store'

function MyApp ({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

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
