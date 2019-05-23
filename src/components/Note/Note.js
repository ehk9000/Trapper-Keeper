import React from 'react';
import {Link} from 'react-router-dom'

const Note = (props) => {
  let {title, list} = props;
  let listItems = list.map(item => {
    return <p>{item.item}</p>
  })
  return(
      <Link to="/note/:id"> 
        <article>
          <h1>{title}</h1>
          {listItems}
        </article>
      </Link>
  )
}

export default Note