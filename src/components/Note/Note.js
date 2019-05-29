import React from 'react';
import { Link } from 'react-router-dom'

const Note = (props) => {
  let { title, list, id} = props;
  let incompleteItems = list.filter(item => !item.completed);

  incompleteItems = incompleteItems.map(item => {
    return <p key={item.id} className="note-item">{item.item}</p>
  });

  let completedItems = list.filter(item => item.completed);

  completedItems = completedItems.map(item => {
    return <p key={item.id} className="completed-view">{item.item}</p>
  });

  return (
    <section className="note-card" style={{backgroundColor: props.background}}>
      <Link to={`/notes/${id}`} className="noteLink"> 
        <article>
          <h3>{title}</h3>
          {incompleteItems}
          {completedItems.length ? <hr /> : null}
          {completedItems}
        </article>
      </Link>
      <button className="delete-btn"><i className="far fa-trash-alt" onClick={() => props.fetchDeleteNote(id)}></i></button>
    </section>
  );
}

export default Note;