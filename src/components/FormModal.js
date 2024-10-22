import React from 'react';

const FormModal = ({ input,setInput,dateInput,setDateInput,timeInput, setTimeInput, category, setCategory, onFormSubmit, editTodo,})=> {

	const onInputChange = (event) => setInput(event.target.value);
  const onDateChange = (event) => setDateInput(event.target.value);
  const onTimeChange = (event) => setTimeInput(event.target.value);
  const onCategoryChange = (event) => setCategory(event.target.value);

  return(
	<div className="modal fade" id="todoModal" tabIndex="-1" aria-labelledby="todoModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="todoModalLabel">
              {editTodo ? 'Edit Todo' : 'Add New Todo'}
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={onFormSubmit}>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter a ToDo..."
                  value={input}
                  required
                  onChange={onInputChange}
                />
              </div>
              <div className="form-group mb-3">
                <input
                  type="date"
                  className="form-control"
                  value={dateInput}
                  required
                  onChange={onDateChange}
                />
              </div>
              <div className="form-group mb-3">
                <input
                  type="time"
                  className="form-control"
                  value={timeInput}
                  required
                  onChange={onTimeChange}
                />
              </div>
              <div className="form-group mb-3">
                <select className="form-control" value={category} onChange={onCategoryChange}>
                  <option value="home">Home</option>
                  <option value="personal">Personal</option>
                  <option value="office">Office</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">
                {editTodo ? 'Update' : 'Add'}
              </button>
            </form>
          </div>
        </div>
      </div>
  </div>
  );
}

export default FormModal;


