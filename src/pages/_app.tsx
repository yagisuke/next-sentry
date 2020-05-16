import React from 'react'
import NextApp, { AppContext } from 'next/app'
import sentryInit, { captureException } from '~utils/sentry'

sentryInit()

class App extends NextApp<{ pageProps: any }> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    let pageProps = {}
    try {
      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx)
      }
      return { pageProps }
    } catch (err) {
      captureException(err, ctx)
      return { pageProps }
    }
  }

  render() {
    const { pageProps, Component } = this.props
    return <Component {...pageProps} />
  }
}

export default App
