import React from 'react'
import Head from '~/components/layouts/head'
import View from '~/components/views/index/view'

type Props = {
  title: string
}

class Page extends React.Component<Props> {
  static async getInitialProps(): Promise<Props> {
    return {
      title: 'title'
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
