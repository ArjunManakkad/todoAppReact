import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function App() {

  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');

  const handleAddTodo = (event) => {
    event.preventDefault();
    if (todoText.trim() !== '') {
      setTodos([...todos, { text: todoText, completed: false }]);
      setTodoText('');
    }
  };

  const handleToggleCompleted = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const getCompletedTodoCount = () => {
    return todos.filter((todo) => todo.completed).length;
  };

  const getTotalTodoCount = () => {
    return todos.length;
  };

   // Load todos from local storage on component mount
   useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // Save todos to local storage whenever the todos state changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <div className='todohead'><h1>Todo App</h1>  Completed: {getCompletedTodoCount()}/{getTotalTodoCount()} </div>
      
      <form onSubmit={handleAddTodo}>
      <button type="submit">  <FontAwesomeIcon icon={faPlus} style={{ marginRight: '5px' }} /></button>
        <input
          type="text"
          value={todoText}
          onChange={(event) => setTodoText(event.target.value)}
          placeholder="Add a todo..."
        />
      </form>
      {todos.length === 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <label style={{ textAlign: 'center' }}>Add your First todo:)</label>
        <hr style={{ flexGrow: 1, margin: '5px 0', border: '0.5px solid #ccc' }} />
      </div>      
      ) : (
      <ul>
        {todos.map((todo, index) => (
          <div>
            <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleCompleted(index)}
            />
            <label style={{ textDecoration: todo.completed ? 'line-through' : 'none', flexGrow: 1 }}>
              {todo.text}
            </label>
              {/* <button> */}
              <FontAwesomeIcon icon={faTrash} style={{ color: 'red' }}  onClick={() => handleDeleteTodo(index)} />
              {/* </button> */}
          </li>
              <hr style={{ flexGrow: 1, margin: '5px 0', border: '0.5px solid #ccc' }} />
          </div>
        ))}
      </ul>
      )}
    </>
  );
}

export default App;
