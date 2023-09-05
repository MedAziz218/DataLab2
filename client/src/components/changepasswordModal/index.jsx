import React, { useEffect, useState } from "react";
import { Modal, Input, Button, Alert } from "@mantine/core";
import { PasswordInput } from "@mantine/core";
import { changePass } from "apiCalls";
const ChangePasswordModal = ({ email, opened, onClose }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [oldpassError, setOldPasError] = useState(null);
  const [newpassError, setNewPasError] = useState(null);
  const [confirmpassError, setConfirmPasError] = useState(null);

  const [successMessage, setSuccessMessage] = useState(null);
  useEffect(()=>{
    setOldPassword("");setNewPassword("");setConfirmPassword("");setOldPasError("");setConfirmPasError("")
    setNewPasError("")
  },[])
  const onChangePassword = (oldPass, newPass) => {};
  const handleChangePassword = (e) => {
    e.preventDefault();
    setOldPasError(null);
    setConfirmPasError(null);
    // Validate passwords
    if (newPassword !== confirmPassword) {
      // Handle password mismatch
      setConfirmPasError("New password and confirm password do not match");
      return;
    }
    changePass(email, oldPassword, newPassword).then((res) => {
      console.log(res);
      if (res.error){
        setOldPasError(res.error)
      }
      else if (res.success){
        setSuccessMessage(res.success)
      }
    });
    // Send a request to change the password with oldPassword and newPassword
    onChangePassword(oldPassword, newPassword);

    // Close the modal
    // onClose();
  };

  return (
    <Modal title="Change Password" opened={opened} onClose={onClose}>
      <div>
        { successMessage&&<Alert title={successMessage} color="green"></Alert>}
        <PasswordInput
          placeholder="Old Password"
          label="Old Password"
          withAsterisk
          value={oldPassword}
          error={oldpassError}
          onChange={(event) => setOldPassword(event.currentTarget.value)}
        />
        <PasswordInput
          placeholder="New Password"
          label="New Password"
          withAsterisk
          value={newPassword}
          onChange={(event) => setNewPassword(event.currentTarget.value)}
        />
        <PasswordInput
          placeholder="Confirm New Password"
          label="Confirm New Password"
          withAsterisk
          error={confirmpassError}
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.currentTarget.value)}
        />
      </div>
      <Button mt={10} onClick={handleChangePassword}>
        Change Password
      </Button>
    </Modal>
  );
};

export default ChangePasswordModal;
