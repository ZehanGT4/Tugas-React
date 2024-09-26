import './TodoList.css';
import React from 'react';

const DataTodoList = [ 
  {
    id: 1,
    title: "Membuat Komponen",
    completed: true,
  },
  {
    id: 2,
    title: "Unit Testing",
    completed: false,
  },
  {
    id: 3,
    title: "Setup Development Environment",
    completed: true,
  },
  {
    id: 4,
    title: "Deploy ke server",
    completed: false,
  },
]


const TodoList = () => {
   return (
    <>
      {DataTodoList.map(({ id, title ,completed}) => (
        completed?<p className="card" key={id} >{title}</p>:<p className="card" key={id} ><s>{title}</s></p>
      ))}
    </>
  );
}

export default TodoList;
