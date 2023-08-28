import React, { useEffect, useState } from "react";
import { Select, Button, Popover, Modal, Title, Alert } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { parseTables, loadTables } from "apiCalls";
import { sleep } from "apiCalls";
import { isValidDatePoste } from "apiCalls";

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
  const [selectedLigne, setSelectedLigne] = useState(
    initialState ? initialState.selectedLigne : ligneOptions[0]
  );
  const [error, setError] = useState("");

  const [goodToSend, setGoodToSend] = useState(false);
  const saveState = () => {
    localStorage.setItem(
      tableName,
      JSON.stringify({
        selectedPoste,
        selectedTaille,
        selectedDate,
        selectedLigne,
      })
    );
  };
  const updateButton = () => {
    isValidDatePoste({ selectedDate, selectedPoste }).then((val) => {
      console.log(val);
      setGoodToSend(val);
    });
  };
  useEffect(() => {
    saveState();
    updateButton();
  }, [selectedPoste, selectedTaille, selectedDate, selectedLigne]);
  useEffect(() => {
    return () => {
      saveState();
    };
  });
  const handleEnregistrerClick = async () => {
    // Handle saving and sending data here
    setError("");
    const parseResult = await parseTables(
      selectedDate,
      selectedPoste,
      selectedTaille,
      selectedLigne
    );
    if (parseResult) setError(parseResult);
    updateButton();
    // await loadTables({selectedDate,selectedPoste})
    // isValidDatePoste({ selectedDate, selectedPoste }).then((val) => {
    //   console.log(val);
    //   setGoodToSend(val);
    // });

    setOpened(true);
  };

  return (
    <div>
      {!goodToSend && <Alert
        title={
          "Attention : Le formulaire que vous souhaitez remplir a déjà été complété. Veuillez choisir une autre date ou un autre poste. Si vous pensez qu'il s'agit d'une erreur, veuillez contacter l'administrateur."
        }
        color="orange"
        style={{ marginTop: "1rem" }}
      ></Alert>}
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
      <Button
        disabled={!goodToSend}
        onClick={handleEnregistrerClick}
        style={{ marginTop: "1rem" }}
      >
        Enregistrer et Envoyer
      </Button>
      <Modal opened={opened} onClose={() => setOpened(false)}>
        <Title order={5}>Notification</Title>
        {!error ? (
          <Alert
            title="Succès !"
            description={"succès"}
            color="green"
            style={{ marginTop: "1rem" }}
          >
            `enregistrée avec succès.`
          </Alert>
        ) : (
          <Alert
            title="Echec !"
            color="red"
            style={{ marginTop: "1rem" }}
            description={error}
          >
            `{error}`
          </Alert>
        )}
        <Button variant="filled" onClick={() => setOpened(false)}>
          ok
        </Button>
      </Modal>
    </div>
  );
};

export default PosteSelection;
