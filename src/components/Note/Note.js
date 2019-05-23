import React from 'react'

const Note = (props) => {
  let {title, list} = props;
  let listItems = list.map(item => {
    return <p>item</p>
  })
  return(
    <article className="note-card">
      <h1>{title}</h1>
      {listItems}
    </article>
  )
}

export default Note