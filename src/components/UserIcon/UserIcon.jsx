// UserIcon.js
import React, { useState } from 'react';
import Login from '../Login/Login';
import AuthPage from '../AuthPage/AuthPage';

const UserIcon = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button onClick={openModal}>User Icon</button>
      {showModal && (
        <div className="modal">
          <button onClick={closeModal}>Close</button>
          <AuthPage />
          <Login/>
        </div>
      )}
    </div>
  );
};

export default UserIcon;
