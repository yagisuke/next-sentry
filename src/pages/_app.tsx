import React from 'react'
import NextApp from 'next/app'
import sentryInit from '~utils/sentry'

sentryInit()

class App extends NextApp<{ pageProps: any }> {
  render() {
    const { pageProps, Component } = this.props
    return <Component {...pageProps} />
  }
}

export default App
