import React from 'react'
import { Atom } from 'react-loading-indicators'

function Loading() {
  return (
    <div className='loading-effect'>
      <Atom color="#cc3131" size="large" text="loading..." textColor="" />
    </div>
  )
}

export default Loading
