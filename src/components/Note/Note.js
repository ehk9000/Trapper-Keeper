import React from 'react';
import {Link} from 'react-router-dom'

const Note = (props) => {
  let { title, list, id} = props;
  let listItems = list.map(item => {
    return <p key={item.id} className={item.completed ? 'completed-view' : 'note-item'}>{item.item}</p>
  });

  return (
    <section className="note-card">
      <Link to={`/notes/${id}`} className="noteLink"> 
        <article>
          <h3>{title}</h3>
          {listItems}
        </article>
      </Link>
      <i className="far fa-trash-alt delete-btn" onClick={() => props.fetchDeleteNote(id)} ></i>
    </section>
  );
}

export default Note;