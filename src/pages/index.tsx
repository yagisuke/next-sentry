import React from 'react'
import Head from '~client/components/layouts/head'
import View from '~client/components/views/index/view'

type Props = {
  title: string
}

class Page extends React.Component<Props> {
  static async getInitialProps(): Promise<Props> {
    return {
      title: 'title',
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
