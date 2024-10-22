import React, {useState, useEffect} from "react";
import Header from './components/Header.js';
import ToDoList from './components/ToDoList.js';
import Form from './components/Form.js';
import NotificationPopup from './components/NotificationPopup.js'

function App() {

  const intialState = JSON.parse(localStorage.getItem("todos")) || [];
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState(intialState);
  const [editTodo, setEditTodo] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="d-flex justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="container my-5">
        <div className="app-wrapper">
          <Header />
          <div className="card shadow-lg p-3">
            <div className="card-body">
              <Form 
                input={input} 
                setInput={setInput} 
                todos={todos}  
                setTodos={setTodos} 
                editTodo={editTodo} 
                setEditTodo={setEditTodo} 
              />
              <ToDoList
                todos={todos} 
                setTodos={setTodos} 
                setEditTodo={setEditTodo} 
              />
              {todos.map(todo => (
                !todo.completed && 
                <NotificationPopup key={todo.id} todo={todo} />
              ))}
            </div>
          </div>
        </div>  
      </div>
    </div>
  );
}

export default App;
