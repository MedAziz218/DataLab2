import React, { useEffect, useState } from "react";
import { Select, Button, Popover, Modal, Title, Alert } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
const tailleOptions = ["T2", "T3", "T4", "T5", "T6"];
const posteOptions = ["NUIT", "MATIN", "SOIR"];
const ligneOptions = ["FAM2"];
const getCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = `${now.getMonth() + 1}`.padStart(2, "0");
  const day = `${now.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
const PosteSelection = () => {
  const tableName = "PosteSelection";
  const initialState = JSON.parse(localStorage.getItem(tableName)) || null;
  const [opened, setOpened] = useState(false);
  const [selectedTaille, setSelectedTaille] = useState(
    initialState ? initialState.selectedTaille : tailleOptions[0]
  );
  const [selectedPoste, setSelectedPoste] = useState(
    initialState ? initialState.selectedPoste : posteOptions[0]
  );
  const [selectedDate, setSelectedDate] = useState(
    initialState ? initialState.selectedDate : getCurrentDate()
  );
  const [goodToSend, setGoodToSend] = useState(false);
  const saveState = ()=>{
    localStorage.setItem(tableName,JSON.stringify({selectedPoste,selectedTaille,selectedDate}))
  }
  useEffect(() => {
    return () => {
      saveState()
    };
  });
  const handleEnregistrerClick = () => {
    // Handle saving and sending data here
    const table1 = JSON.parse(localStorage.getItem("table1")) || null;
    const table2 = JSON.parse(localStorage.getItem("table2")) || null;
    const table30 = JSON.parse(localStorage.getItem("table3-0")) || null;
    const table31 = JSON.parse(localStorage.getItem("table3-1")) || null;
    const table32 = JSON.parse(localStorage.getItem("table3-2")) || null;
    const table33 = JSON.parse(localStorage.getItem("table3-3")) || null;
    const table4 = JSON.parse(localStorage.getItem("table4")) || null;
    const table5 = JSON.parse(localStorage.getItem("table5")) || null;
    const observation = JSON.parse(localStorage.getItem("observation")) || null;
    const notes = JSON.parse(localStorage.getItem("notes")) || null;

    setGoodToSend(
      table1 && table2 && table30 && table31 && table32 && table32 && table33,
      table4 && table5
    );
    
    setOpened(true);
  };

  return (
    <div>
      <Popover zIndex={999} position="bottom" withArrow shadow="md">
        <Popover.Target>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p> Date</p>
            <Button>{String(selectedDate)}</Button>
          </div>
        </Popover.Target>
        <Popover.Dropdown>
          <DatePicker
            zIndex={999}
            label="Date Selection"
            value={selectedDate}
            onChange={(val) => setSelectedDate(formatDate(val))}
          />
        </Popover.Dropdown>
      </Popover>

      <Select
        withAsterisk
        label="Selection Taille "
        data={tailleOptions}
        value={selectedTaille}
        onChange={setSelectedTaille}
      />
      <Select
        withAsterisk
        label="Selection Poste "
        data={posteOptions}
        value={selectedPoste}
        onChange={setSelectedPoste}
      />
      <Select
        withAsterisk
        label="Selection Ligne "
        data={ligneOptions}
        value={ligneOptions[0]}
        disabled
      />
      <Button onClick={handleEnregistrerClick} style={{ marginTop: "1rem" }}>
        Enregistrer et Envoyer
      </Button>
      <Modal opened={opened} onClose={() => setOpened(false)}>
        <Title order={5}>Notification</Title>
        {goodToSend ? (
          <Alert
            title="Succès !"
            description={`La date  a été enregistrée avec succès.`}
            color="green"
            style={{ marginTop: "1rem" }}
          />
        ) : (
          <Alert title="Echec !" color="red" style={{ marginTop: "1rem" }} />
        )}
        <Button variant="filled" onClick={() => setOpened(false)}>
          ok
        </Button>
      </Modal>
    </div>
  );
};

export default PosteSelection;
