import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import FormModal from './FormModal.js';

const Form = ({ input, setInput, todos, setTodos, editTodo, setEditTodo }) => {
  const [dateInput, setDateInput] = useState('');
  const [timeInput, setTimeInput] = useState('');
  const [category, setCategory] = useState('home');

  const updateTodo = (title, id, completed, dateTime, category) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { title, id, completed, date: dateTime, category } : todo
    );
    setTodos(updatedTodos);
    setEditTodo(null);
  };

  useEffect(() => {
    if (editTodo) {
      setInput(editTodo.title);
      const [editDate, editTime] = editTodo.date.split(' ');
      setDateInput(editDate);
      setTimeInput(editTime || '');
      setCategory(editTodo.category || 'home');
      
      const modalElement = document.getElementById('todoModal');
      const modalInstance = new window.bootstrap.Modal(modalElement);
      modalInstance.show();
    } else {
      setInput('');
      setDateInput('');
      setTimeInput('');
      setCategory('home');
    }
  }, [editTodo, setInput, setDateInput, setTimeInput, setCategory]);

  useEffect(() => {
    const modalElement = document.getElementById('todoModal');

    const handleModalClose = () => {
      setInput('');
      setDateInput('');
      setTimeInput('');
      setCategory('home');
      setEditTodo(null);
    };

    modalElement.addEventListener('hidden.bs.modal', handleModalClose);

    return () => {
      modalElement.removeEventListener('hidden.bs.modal', handleModalClose);
    };
  }, [setInput, setDateInput, setTimeInput, setCategory, setEditTodo]);

  const onFormSubmit = (event) => {
    event.preventDefault();
    const dateTime = `${dateInput} ${timeInput}`;
    if (!editTodo) {
      setTodos([...todos, { id: uuidv4(), title: input, completed: false, date: dateTime, category }]);
      setInput('');
      setDateInput('');
      setTimeInput('');
      setCategory('home');
    } else {
      updateTodo(input, editTodo.id, editTodo.completed, dateTime, category);
    }

    const modalElement = document.getElementById('todoModal');
    const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
  };

  return (
    <>
      <h1>Gotta new task? Add in your todo list!!</h1>
      <button
        type="button"
        className="btn btn-primary mb-3"
        data-bs-toggle="modal"
        data-bs-target="#todoModal"
      >
        Add Todo
      </button>

      <FormModal
        input={input}
        setInput={setInput}
        dateInput={dateInput}
        setDateInput={setDateInput}
        timeInput={timeInput}
        setTimeInput={setTimeInput}
        category={category}
        setCategory={setCategory}
        onFormSubmit={onFormSubmit}
        editTodo={editTodo}
      />
    </>
  );
};

export default Form;