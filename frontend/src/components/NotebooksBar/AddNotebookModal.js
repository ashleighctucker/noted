import { useState } from 'react';

import { Modal } from '../../context/Modal';
import NotebookForm from './NotebookForm';
import './NotebooksBar.css';

const AddNotebookModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="add-note-div">
      <p>Add Notebook</p>
      <button className="add-note-button" onClick={() => setShowModal(true)}>
        <i className="far fa-plus"></i>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NotebookForm />
        </Modal>
      )}
    </div>
  );
};

export default AddNotebookModal;
