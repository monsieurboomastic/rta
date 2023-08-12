import React, { useState, FormEvent } from 'react';
import './App.css';

import logo from './logo.svg';

type TodoData = {
  content: string,
  completed: boolean
};

type TodoCallbacks = {
  toggleChecked: (id: number) => void,
  remove: (id: number) => void
};

type TodoProps = {
  id: number,
  data: TodoData,
  callbacks: TodoCallbacks,
};

function Todo({ id, data, callbacks }: TodoProps) {
  const { content, completed } = data;
  const { toggleChecked, remove } = callbacks;
  const [checked, setChecked] = useState(completed);
  const handleChange = () => {
    setChecked(!checked);
    toggleChecked(id);
  }
  return (
    <div className="todo-item">
      <span className={"text " + (checked ? "checked" : "")}>
        {checked ? <s>{content}</s> : content}
      </span>
      <input type="checkbox" checked={checked} onChange={handleChange} />
      <button onClick={() => remove(id)}>X</button>
    </div>
  );
}

function TodoForm({ add }: { add: (content: string) => void }) {
  function addTodo(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const input = target.elements[0] as HTMLInputElement;
    const content = input.value.trim();
    if (content === '') return;
    add(content);
    input.value = '';
  }
  return (
    <form onSubmit={addTodo}>
      <input type="text" name="content" autoComplete="off" />
      <button type="submit">Add</button>
    </form>
  );
}

function App() {
  const [state, setState] = useState({
    todos: [] as TodoData[]
  });
  const addTodo = (content: string) => {
    state.todos.push({ content, completed: false });
    setState({ todos: state.todos });
  };
  const callbacks = {
    toggleChecked(id: number) {
      state.todos[id].completed = !state.todos[id].completed;
    },
    remove(id: number) {
      state.todos.splice(id, 1);
      setState({ todos: state.todos });
    },
  };
  const itemsTab = state.todos.length === 0 ? (
    <div className="welcome-tab">
      <h1>Hello world</h1>
      <h3>This is my todo app made with React</h3>
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Write in the text input below and press the add button to add a todo
        item.
      </p>
    </div>
  ) : (
    <div>
      {state.todos.map((todoData, i) => {
        return (
          <Todo
            key={i}
            id={i}
            data={todoData}
            callbacks={callbacks}
          />
        );
      })}
    </div>
  );
  return (
    <div className="App">
      {itemsTab}
      <TodoForm add={addTodo} />
    </div>
  );
}

export default App;
