import React, { useEffect, useState } from 'react';

const NotificationPopup = ({ todo }) => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const todoTime = new Date(todo.date).getTime();
    const notificationTime = todoTime - 5 * 60 * 1000;
    const currentTime = new Date().getTime();

    if (notificationTime > currentTime) {
      const timer = setTimeout(() => setShowPopup(true), notificationTime - currentTime);
      return () => clearTimeout(timer);
    }
  }, [todo.date]);

  return (
    showPopup && (
      <div className="modal show" style={{ display: 'block' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Reminder</h5>
              <button type="button" className="btn-close" onClick={() => setShowPopup(false)}></button>
            </div>
            <div className="modal-body">
              <p>Your task "{todo.title}" is due in 5 minutes!</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowPopup(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default NotificationPopup;
