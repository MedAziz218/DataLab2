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
  const clearErrors = () => {
    setOldPasError("");
    setConfirmPasError("");
    setNewPasError("");
  }
  useEffect(() => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setSuccessMessage("");
    clearErrors();
  }, []);
  const onChangePassword = (oldPass, newPass) => {};
  const handleChangePassword = (e) => {

    e.preventDefault();
    setSuccessMessage("");
    clearErrors();
    // Valider les mots de passe
    if (newPassword !== confirmPassword) {
      // Gérer la non-concordance des mots de passe
      setConfirmPasError("Le nouveau mot de passe et la confirmation ne correspondent pas");
      return;
    }
    if (!oldPassword){
      setOldPasError("Veuillez entrer votre mot de passe actuel");
      return;
    }
    if (!newPassword){
      setNewPasError("Le mot de passe ne peut pas être vide");
      return;
    }
    
    changePass(email, oldPassword, newPassword).then((res) => {
      console.log(res);
      if (res.error) {
        setOldPasError(res.error);
      } else if (res.success) {
        setSuccessMessage("Votre mot de passe a été modifié avec succès.");
      }
    });
    // Envoyer une demande pour changer le mot de passe avec oldPassword et newPassword
    onChangePassword(oldPassword, newPassword);

    // Fermer la fenêtre modale
    // onClose();
  };

  return (
    <Modal title="Changer le mot de passe" opened={opened} onClose={onClose}>
      <div>
        {successMessage && <Alert title={successMessage} color="green"></Alert>}
        <form>
          <PasswordInput
            placeholder="Ancien mot de passe"
            label="Ancien mot de passe"
            withAsterisk={!oldPassword&&true}
            value={oldPassword}
            error={oldpassError}
            onChange={(event) => setOldPassword(event.currentTarget.value)}
            required
          />
          <PasswordInput
            placeholder="Nouveau mot de passe"
            label="Nouveau mot de passe"
            withAsterisk={!newPassword&&true}
            error={newpassError}
            value={newPassword}
            onChange={(event) => setNewPassword(event.currentTarget.value)}
            required
          />
          <PasswordInput
            placeholder="Confirmer le nouveau mot de passe"
            label="Confirmer le nouveau mot de passe"
            
            error={confirmpassError}
            withAsterisk={!confirmPassword&&true}
            onChange={(event) => setConfirmPassword(event.currentTarget.value)}
            required
          />
          <Button mt={10} onClick={handleChangePassword} type="submit">
            Changer le mot de passe
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default ChangePasswordModal;
