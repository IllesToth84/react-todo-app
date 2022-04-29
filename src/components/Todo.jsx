import React from 'react';

export default function Todo({ todo, toggleTodo }) {
  function handleTodoClick() {
    toggleTodo(todo.id);
  }

  return (
    <div>
      <label className="checkbox-container d-flex align-items-center">
        <input
          type="checkbox"
          checked={todo.complete}
          onChange={handleTodoClick}
        />
        {todo.name}
        <span class="checkmark mt-2"></span>
      </label>
    </div>
  );
}
