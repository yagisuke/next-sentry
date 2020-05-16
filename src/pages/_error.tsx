import * as React from 'react'
import { captureException } from '~utils/sentry'
import Head from '~client/components/layouts/head'

type InitialProps = {
  statusCode: number
}

class Error extends React.Component<InitialProps> {
  static getInitialProps(ctx) {
    const { res, err } = ctx
    const statusCode =
      (res && res.statusCode) || (err && err.statusCode) || null

    if (![400, 404].includes(statusCode)) {
      captureException(err, ctx)
    }

    return {
      statusCode: statusCode || 500,
    }
  }
  render() {
    return (
      <>
        <Head title={'THIS IS AN ERROR.'} />
        <h1>{this.props.statusCode}: THIS IS AN ERROR.</h1>
      </>
    )
  }
}

export default Error
