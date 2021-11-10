import { useState } from 'react';

import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import './LoginForm.css';

const LoginFormModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </div>
  );
};

export default LoginFormModal;
