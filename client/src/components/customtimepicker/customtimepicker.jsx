import { Popover, Button, TextInput, Select } from "@mantine/core";
import { useEffect, useState } from "react";
import { IconClock } from "@tabler/icons-react";
export function CustomTimePicker({ value, setValue }) {
  // const [value, setValue] = useState(null);
  const [opened, setOpened] = useState(false);
  const timeOptions = ["01:00", "05:00", "09:00", "13:00", "17:00", "21:00"];
  const [data, setData] = useState(timeOptions);
  const [searchValue, onSearchChange] = useState("");
  const [timeValue, setTimeValue] = useState("");
  const error = !isValidTimeFormat(timeValue);
  const handleTimeChange = (event) => {
    const inputValue = event.target.value;

    setTimeValue(formatTimeInput(inputValue));
  };
  const setCustomValue = (val) => {
    let d = data;
    if (data.length > timeOptions.length) {
      d = d.slice(0, d.length - 1);
    }
    setData([...d, val]);
    setValue(val);
  };
  useEffect(()=>{setCustomValue(value)},[])
  
  useEffect(() => setTimeValue(""), [opened]);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Select
        data={data}
        placeholder="Select Time"
        mr="sm"
        value={value}
        onChange={(val)=>{console.log("heure: ",val);setValue(val)}}
      />
      <Popover
        width={300}
        trapFocus
        position="bottom"
        withArrow
        shadow="lg"
        opened={opened}
        onChange={setOpened}
      >
        <Popover.Target>
          <Button onClick={() => setOpened((o) => !o)}><IconClock/></Button>
        </Popover.Target>
        <Popover.Dropdown
          sx={(theme) => ({
            background:
              theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
          })}
        >
          <form>
            <div style={{ display: "flex" }}>
              <TextInput
                mr="sm"
                placeholder="Enter time in HH:mm format"
                value={timeValue}
                onChange={handleTimeChange}
                // description="Time format: HH:mm"
                error={error && timeValue.length > 0}
              />
              <Button
                type="submit"
                disabled={error}
                onClick={(e) => {
                  e.preventDefault();
                  setCustomValue(timeValue);
                  setOpened(false);
                }}
              >
                ok
              </Button>
            </div>
          </form>
        </Popover.Dropdown>
      </Popover>
    </div>
  );
}

function formatTimeInput(input) {
  // Remove non-digit characters
  const digitsOnly = input.replace(/\D/g, "");
  // Insert colon after 2nd character if length > 2
  if (digitsOnly.length > 2) {
    return digitsOnly.slice(0, 2) + ":" + digitsOnly.slice(2, 4);
  }
  return digitsOnly;
}
function isValidTimeFormat(value) {
  const timeRegex = /^(?:2[0-3]|[01][0-9]):[0-5][0-9]$/;
  return timeRegex.test(value);
}
