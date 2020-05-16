import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { captureException } from '~utils/sentry'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    try {
      const initialProps = await Document.getInitialProps(ctx)
      return { ...initialProps }
    } catch (err) {
      captureException(err, ctx)
      throw err
    }
  }
  render() {
    return (
      <html lang="ja">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

export default MyDocument
