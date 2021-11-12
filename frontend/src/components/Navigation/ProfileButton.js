import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditProfileForm from './EditProfileForm';

const ProfileButton = ({ user }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div id="profile-nav">
      <i
        className="fas
         fa-user-circle fa-lg"
        onClick={() => setShowModal(true)}
      />
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditProfileForm user={user} close={() => setShowModal(false)} />
        </Modal>
      )}
    </div>
  );
};

export default ProfileButton;
