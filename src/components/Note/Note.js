import React from 'react'

const Note = (props) => {
  let {title, list} = props;
  let listItems = list.map(item => {
    return <p>item</p>
  })
  return(
    <div>
      <h1>{title}</h1>
      {listItems}
    </div>
  )
}

export default Note