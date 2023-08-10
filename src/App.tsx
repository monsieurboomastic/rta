import React, { useState, useRef } from 'react';
import './App.css';

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
      <span>{checked ? <s>{content}</s> : content}</span>
      <input type="checkbox" checked={checked} onChange={handleChange} />
      <button onClick={() => remove(id)}>X</button>
    </div>
  );
}

function App() {
  const [state, setState] = useState({
    todos: [{ content: 'Creat todo app', completed: false } as TodoData]
  });
  //                      like man wtf but whatever
  const inputRef = useRef(null as unknown as HTMLInputElement);
  const addTodo = () => {
    const content = inputRef.current.value.trim();
    if (content === '') return;
    state.todos.push({ content, completed: false });
    setState({ todos: state.todos });
    inputRef.current.value = '';
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
  return (
    <div className="App">
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
      <input type="text" ref={inputRef} />
      <button onClick={addTodo}>Add</button>
    </div>
  );
}

export default App;
