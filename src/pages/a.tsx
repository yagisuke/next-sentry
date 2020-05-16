import React from 'react'
import Head from '~client/components/layouts/head'
import View from '~client/components/views/a/view'

type Props = {
  title: string
}

class Page extends React.Component<Props> {
  static async getInitialProps({ query }): Promise<Props> {
    if (query.addError2) {
      throw new Error(`yagisuke's error2.`)
    }
    return {
      title: 'a',
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
