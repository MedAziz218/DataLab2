import React, { useState } from 'react';
import { Modal, Input, Button } from '@mantine/core';

const ChangePasswordModal = ({ isOpen, onClose, onChangePassword }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = () => {
    // Validate passwords
    if (newPassword !== confirmPassword) {
      // Handle password mismatch
      console.error('New password and confirm password do not match');
      return;
    }

    // Send a request to change the password with oldPassword and newPassword
    onChangePassword(oldPassword, newPassword);

    // Close the modal
    onClose();
  };

  return (
    <Modal title="Change Password" isOpen={isOpen} onClose={onClose}>
      <div>
        <Input
          label="Old Password"
          type="password"
          value={oldPassword}
          onChange={(event) => setOldPassword(event.target.value)}
        />
        <Input
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
        />
        <Input
          label="Confirm New Password"
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
      </div>
      <Button onClick={handleChangePassword}>Change Password</Button>
    </Modal>
  );
};

export default ChangePasswordModal;
