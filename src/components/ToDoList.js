import React, { useState, useEffect } from 'react';

const TodoList = ({ todos, setTodos, setEditTodo, searchTerm }) => {
  const [filteredCategory, setFilteredCategory] = useState('all');
  const [searchInput, setSearchInput] = useState('');
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [currentPage, setPage] = useState('')

  const handleDeleteClick = (todo) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      handleDelete(todo);
    }
  };
  
  const handleDelete = ({ id }) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleComplete = (todo) => {
    console.log(todo);
    setTodos(
      todos.map((item) => (item.id === todo.id ? { ...item, completed: !item.completed } : item))
    );
  };

  const handleEdit = ({ id }) => {
    const findTodo = todos.find((todo) => todo.id === id);
    setEditTodo(findTodo);
  };

  const filterByCategory = (category) => {
    setFilteredCategory(category);
  };

  useEffect(() => {
    const searchedTodos = todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchInput.toLowerCase())
    );
    
    const categoryFilteredTodos = filteredCategory === 'all' ? todos : todos.filter((todo) => todo.category === filteredCategory);

    if (searchInput) {
      setFilteredTodos(searchedTodos);
    }
    else{
      setFilteredTodos(categoryFilteredTodos);
    }
  }, [todos, filteredCategory, searchInput]);


  const countTodosByCategory = (category) => {
    return category === 'all' ? todos.length : todos.filter((todo) => todo.category === category).length;
  };

  return (
    <div className="mt-2">
      <div className="d-flex justify-content-between mb-3">
        <div className="d-grid gap-2 d-md-block">
          <button className="btn btn-outline-primary me-2" onClick={() => filterByCategory('all')}>
            All ({countTodosByCategory('all')})
          </button>
          <button className="btn btn-outline-success me-2" onClick={() => filterByCategory('home')}>
            Home ({countTodosByCategory('home')})
          </button>
          <button className="btn btn-outline-danger me-2" onClick={() => filterByCategory('personal')}>
            Personal ({countTodosByCategory('personal')})
          </button>
          <button className="btn btn-outline-warning me-2" onClick={() => filterByCategory('office')}>
            Office ({countTodosByCategory('office')})
          </button>
          <button className="btn btn-outline-info me-2" onClick={() => filterByCategory('other')}>
            Other ({countTodosByCategory('other')})
          </button>
        </div>

        <div className="d-flex">
          <input className="form-control form-control-sm me-2" type="search" placeholder="Search" aria-label="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)} />
          <button className="btn btn-outline-primary" type="submit">Search</button>
        </div>
      </div>

      <ul className="list-group">
        {filteredTodos.map((todo) => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={todo.id}>
            <div className={`w-75 ${todo.completed ? "text-decoration-line-through text-muted" : ""}`}>
              <div>{todo.title}</div>
              <small className="text-muted">{todo.date} - {todo.category}</small>
            </div>
            <div className="d-flex">
              <button
                className="btn btn-success me-2"
                onClick={() => handleComplete(todo)}
                data-bs-toggle="tooltip"
                title="Mark as Complete"
              >
                <i className="fas fa-check-circle"></i>
              </button>
              <button
                className="btn btn-warning me-2"
                onClick={() => handleEdit(todo)}
                data-bs-toggle="tooltip"
                title="Edit Todo"
              >
                <i className="fas fa-edit"></i>
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteClick(todo)}
                data-bs-toggle="tooltip"
                title="Delete Todo"
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;