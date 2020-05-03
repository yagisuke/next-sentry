import React from 'react'

type Props = {
  className?: string
}

const View: React.FC<Props> = props => (
  <div className={props.className}>
    a
  </div>
)

export default View
