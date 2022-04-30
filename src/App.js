import React, { useState, useRef, useEffect } from 'react';
import TodoList from './components/TodoList';
import { v4 as uuidv4 } from 'uuid';
import { Button } from 'react-bootstrap';

const LOCAL_STORAGE_KEY = 'todoApp.todos';

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === '') return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
    });
    todoNameRef.current.value = null;
  }

  function handleClearTodos() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }

  function handleClearAllTodos() {
    const clearAllTodos = [];
    setTodos(clearAllTodos);
  }

  return (
    <div className="main-wrapper d-flex justify-content-center">
      <div className="todo-container">
        <div className="input-wrapper">
          <div className="add-todo">
            <h1 className="text-bold text-center mb-5">To Do List</h1>
            <input ref={todoNameRef} className="todo-input w-100" type="text" />
            <div className="button-wrapper mt-3 d-flex justify-content-end">
              <Button
                className="btn btn-block add-todo-btn"
                onClick={handleAddTodo}
              >
                ADD TODO
              </Button>
            </div>
          </div>
          <div className="left-to-do d-flex align-items-center justify-content-between">
            <h2>
              <span className="todos-length">
                {todos.filter((todo) => !todo.complete).length}
              </span>{' '}
              left to do
            </h2>
            <div className="clear-buttons">
              <Button
                className="ms-3 clear-comp-btn"
                onClick={handleClearTodos}
              >
                CLEAR COMPLETE
              </Button>
              <Button
                className="ms-3 clear-all-btn"
                onClick={handleClearAllTodos}
              >
                CLEAR ALL
              </Button>
            </div>
          </div>
        </div>

        <div className="todo-list-wrapper mt-3">
          <TodoList className="todos" todos={todos} toggleTodo={toggleTodo} />
        </div>
      </div>
    </div>
  );
}

export default App;
