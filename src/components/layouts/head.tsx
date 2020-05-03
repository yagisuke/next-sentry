import React from 'react'
import Head from 'next/head'

// ______________________________________________________
//
// @ Types
type Props = {
  className?: string
  title: string
  description?: string
}

// ______________________________________________________
//
// @ View
const Component: React.FC<Props> = (props) => {
  const description = props.description || 'yagisuke'
  return (
    <Head>
      <title>{props.title}</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=no"
      />
      <meta name="author" content="yagisuke" />
      <meta name="description" content={description} />
      {props.children}
    </Head>
  )
}

export default Component
