import React from 'react';
import {Link} from 'react-router-dom'

const Note = (props) => {
  let {title, list, id} = props;
  let listItems = list.map(item => {
    return <p>{item.item}</p>
  })
  return(
      <Link to={`/notes/${id}`} > 
        <article>
          <h1>{title}</h1>
          {listItems}
        </article>
      </Link>
  )
}

export default Note