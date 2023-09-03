import {
  Button,
  Popover,
  Tabs,
  TextInput,
  Title,
  FocusTrap,
} from "@mantine/core";
import { useEffect, useState } from "react";

function isValidCible(str) {
  if (str.split("≤").length - 1 == 2) {
    let arr = str.split("≤");
    return "≤";
  } else if (str.split("±").length - 1 == 1) {
    let arr = str.split("±");

    return "±";
  }
  return false;
}
function CiblePicker({
  value,
  onChange,
  defaultMode = "incertitude", // "incertitude" || "intervalle",
}) {
  const [opened, setOpened] = useState(false);
  const [mode, setMode] = useState(defaultMode);
  const [error, setError] = useState(false);
  const [incertValues, _setIncertValues] = useState(["", ""]);
  const [intervValues, _setIntervtValues] = useState(["", "", ""]);
  const setIncertValues = (index, val) => {
    _setIncertValues((prev) => {
      const newVals = [...prev];
      newVals[index] = val;
      return newVals;
    });
  };
  const setIntervtValues = (index, val) => {
    _setIntervtValues((prev) => {
      const newVals = [...prev];
      newVals[index] = val;
      return newVals;
    });
  };
  useEffect(() => {
    if (String(value).split(lt).length == 3) {
      setMode("intervalle");
      _setIntervtValues(String(value).split(lt));
    }
    if (String(value).split(plm).length == 2) {
      setMode("incertitude");
      _setIncertValues(String(value).split(plm));
    }
    if (String(value).split("≥").length){

    }
  }, []);
  const valid =
    (incertValues[0] && incertValues[1] && mode == "incertitude") ||
    (intervValues[0] &&
      intervValues[1] &&
      intervValues[2] &&
      mode == "intervalle") || String(value).includes("≥");

  const onValidate = () => {
    console.log(mode);
    if (mode === "incertitude") {
      let res = incertValues[0] + " " + plm + " " + incertValues[1];
      console.log(res);
      onChange(res);
    }
    if (mode === "intervalle") {
      let res =
        intervValues[0] +
        " " +
        lt +
        " " +
        intervValues[1] +
        " " +
        lt +
        " " +
        intervValues[2];
      console.log(res);
      onChange(res);
    }
  };
  const lt = "≤";
  const plm = "±";
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
          color={valid ? "teal" : "red"}
          onClick={() => setOpened((o) => !o)}
        >
          {value}
        </Button>
      </Popover.Target>
      <Popover.Dropdown
        sx={(theme) => ({
          border: "1px solid #000",
          background:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        })}
      >
        <form>
          <Tabs trapFocus variant="pills" value={mode} onTabChange={setMode}>
            <Tabs.List>
              <Tabs.Tab value="incertitude" icon={plm}>
                incertitude
              </Tabs.Tab>
              <Tabs.Tab value="intervalle" icon={lt}>
                intervalle
              </Tabs.Tab>
              <Button
                type="submit"
                variant="filled"
                color="green"
                disabled={!valid}
                onClick={(e) => {
                  e.preventDefault();
                  onValidate();
                  setOpened(false);
                }}
              >
                ok
              </Button>
            </Tabs.List>

            <Tabs.Panel value="incertitude" pt="xs">
              <FocusTrap active={true}>
                <div style={{ display: "flex" }}>
                  <TextInput
                    type="number"
                    value={incertValues[0]}
                    onChange={(e) => setIncertValues(0, e.target.value)}
                  />
                  <Title order={3} px={3}>
                    {plm}
                  </Title>
                  <TextInput
                    type="number"
                    value={incertValues[1]}
                    onChange={(e) => setIncertValues(1, e.target.value)}
                  />
                </div>
              </FocusTrap>
            </Tabs.Panel>

            <Tabs.Panel value="intervalle" pt="xs">
              <FocusTrap active={true}>
                <div style={{ display: "flex" }}>
                  <TextInput
                    type="number"
                    value={intervValues[0]}
                    onChange={(e) => setIntervtValues(0, e.target.value)}
                  />
                  <Title order={3} px={3}>
                    {plm}
                  </Title>
                  <TextInput
                    type="number"
                    value={intervValues[1]}
                    onChange={(e) => setIntervtValues(1, e.target.value)}
                  />
                  <Title order={3} px={3}>
                    {lt}
                  </Title>
                  <TextInput
                    type="number"
                    value={intervValues[2]}
                    onChange={(e) => setIntervtValues(2, e.target.value)}
                  />{" "}
                </div>
              </FocusTrap>
            </Tabs.Panel>
          </Tabs>
        </form>
      </Popover.Dropdown>
    </Popover>
  );
}

export default CiblePicker;
