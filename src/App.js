import './App.css';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrash, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');
  const [editModeIndex, setEditModeIndex] = useState(-1);
  const [editText, setEditText] = useState(''); // New state for temporary edit text

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

  const handleEditTodo = (index) => {
    setEditModeIndex(index);
    setEditText(todos[index].text); // Initialize the temporary edit text with the current todo text
  };

  const handleSaveTodo = (index, newText) => {
    const newTodos = [...todos];
    newTodos[index].text = newText;
    setTodos(newTodos);
    setEditModeIndex(-1); // Turn off edit mode after saving
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
      <div className='todohead'>
        <h1>Todo App</h1> Completed: {getCompletedTodoCount()}/{getTotalTodoCount()}{' '}
      </div>

      <form onSubmit={handleAddTodo}>
        <button type='submit'>
          <FontAwesomeIcon icon={faPlus} style={{ marginRight: '5px' }} />
        </button>
        <input
          type='text'
          value={todoText}
          onChange={(event) => setTodoText(event.target.value)}
          placeholder='Add a todo...'
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
            <div key={index}>
              <li style={{ display: 'flex', alignItems: 'center' }}>
                {editModeIndex === index ? (
                  <>
                    <input
                      type='text'
                      value={editText}
                      onChange={(event) => setEditText(event.target.value)}
                      autoFocus // Automatically focus on the input when in edit mode
                    />
                    <button onClick={() => handleSaveTodo(index, editText)}>
                      <FontAwesomeIcon icon={faSave} style={{ color: 'green' }} />
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      type='checkbox'
                      checked={todo.completed}
                      onChange={() => handleToggleCompleted(index)}
                    />
                    <label
                      style={{ textDecoration: todo.completed ? 'line-through' : 'none', flexGrow: 1 }}
                    >
                      {todo.text}
                    </label>
                    <button onClick={() => handleEditTodo(index)}>
                      <FontAwesomeIcon icon={faEdit} style={{ color: 'blue' }} />
                    </button>
                    <button onClick={() => handleDeleteTodo(index)}>
                      <FontAwesomeIcon icon={faTrash} style={{ color: 'red' }} />
                    </button>
                  </>
                )}
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
