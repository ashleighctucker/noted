import { useState } from 'react';

import { Modal } from '../../context/Modal';
import EditNotebookForm from './EditNotebookForm';
import './NotebooksBar.css';

const EditNotebookModal = ({ notebook }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        className="edit-notebook-button"
        onClick={() => setShowModal(true)}
      >
        <i className="far fa-pencil"></i> Edit
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditNotebookForm
            close={() => setShowModal(false)}
            notebook={notebook}
          />
        </Modal>
      )}
    </>
  );
};

export default EditNotebookModal;
