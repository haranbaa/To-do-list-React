import React, { useState, useRef, useEffect } from "react";

const App = () => {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef();

  // Load todos from local storage
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  // Save todos to local storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    const newTodo = inputRef.current.value;
    if (newTodo.trim()) {
      setTodos([...todos, { text: newTodo, completed: false }]);
      inputRef.current.value = "";
    }
  };

  const toggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-lg w-80">
        <h1 className="mb-4 text-2xl font-bold text-center">To-Do List</h1>
        <input
          ref={inputRef}
          type="text"
          placeholder="Add a new task"
          className="w-full p-2 mb-2 border rounded"
        />
        <button
          onClick={addTodo}
          className="w-full py-2 mb-4 text-white bg-blue-500 rounded"
        >
          Add
        </button>
        <ul className="space-y-2">
          {todos.map((todo, index) => (
            <li
              key={index}
              className={`flex justify-between p-2 rounded ${
                todo.completed ? "line-through text-gray-500" : ""
              }`}
            >
              <span onClick={() => toggleComplete(index)}>{todo.text}</span>
              <button
                onClick={() => deleteTodo(index)}
                className="text-red-500"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
