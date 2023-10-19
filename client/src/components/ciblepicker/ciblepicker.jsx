import React, { useState, useRef, useEffect } from "react";
import { Button, Popover, TextInput, Title } from "@mantine/core";

function CiblePicker({ value, onChange }) {
  const [opened, setOpened] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef(null); // Ref to hold the input element reference
  useEffect(() => {
    if (inputValue == "cible") {
      setInputValue("");
    }
  }, []);
  const handleButtonPress = (text) => {
    setInputValue((prevValue) => prevValue + text);
    if (inputRef.current) {
      inputRef.current.focus(); // Focus the input element after button press
    }
  };

  const handleValidate = () => {
    if (!inputValue) {
      onChange("cible");
    } else {
      onChange(inputValue);
    }
    setOpened(false);
  };

  return (
    <Popover
      opened={opened}
      onChange={setOpened}
      width={300}
      trapFocus
      position="bottom"
      withArrow
      shadow="xl"
    >
      <Popover.Target>
        <Button
          size="md"
          variant="outline"
          color="teal"
          onClick={() => setOpened((o) => !o)}
        >
          {value}
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <form>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <TextInput
              ref={inputRef} // Attach the ref to the input element
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={{ marginRight: "8px" }}
            />
            <Button
              type="submit"
              variant="filled"
              color="green"
              onClick={(e) => {
                e.preventDefault();
                handleValidate();
              }}
            >
              ok
            </Button>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={() => handleButtonPress("≤")}
              style={{ marginRight: "8px" }}
            >
              ≤
            </Button>
            <Button
              onClick={() => handleButtonPress("±")}
              style={{ marginRight: "8px" }}
            >
              ±
            </Button>
            <Button onClick={() => handleButtonPress("≥")}>≥</Button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "8px",
            }}
          ></div>
        </form>
      </Popover.Dropdown>
    </Popover>
  );
}

export default CiblePicker;
