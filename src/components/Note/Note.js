import React from 'react';
import {Link} from 'react-router-dom'

const Note = (props) => {
  let {title, list, id} = props;
  let listItems = list.map(item => {
    return <p key={item.id}>{item.item}</p>
  });

  return (
    <section className="note-card">
      <span className='delete-x' onClick={() => props.fetchDeleteNote(id)}>X</span>
      <Link to={`/notes/${id}`} className="noteLink"> 
        <article>
          <h3>{title}</h3>
          {listItems}
        </article>
      </Link>
    </section>
  );
}

export default Note;