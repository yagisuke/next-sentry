import React from 'react'
import { captureException } from '~utils/sentry'
import Head from '~client/components/layouts/head'
import View from '~client/components/views/b/view'

type Props = {
  title: string
}

class Page extends React.Component<Props> {
  static async getInitialProps(ctx): Promise<Props> {
    if (ctx.query.addError2) {
      try {
        throw new Error(`yagisuke's error2.`)
      } catch (err) {
        captureException(err, ctx)
      }
    }
    return {
      title: 'b',
    }
  }
  render() {
    return (
      <>
        <Head title={this.props.title} />
        <View />
      </>
    )
  }
}

export default Page
