import React from 'react';
import {Link} from 'react-router-dom'

const Note = (props) => {
  let {title, list, id} = props;
  let listItems = list.map(item => {
    return <p key={item.id}>{item.item}</p>
  });

  return (
    <Link to={`/notes/${id}`} className='note-card'> 
      <article>
        <h3>{title}</h3>
        {listItems}
      </article>
    </Link>
  );
}

export default Note;