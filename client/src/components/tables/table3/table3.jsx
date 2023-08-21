import "./table3.css";
import { createRef, forwardRef, useRef, useEffect, useState } from "react";

import { Table, TextInput } from "@mantine/core";

import { CiblePicker } from "components/ciblepicker";
import { CustomTimePicker } from "components/customtimepicker";
const Table3 = forwardRef((props, ref) => {
    const tableName = "table3-" + props.index
  const initialState =
    JSON.parse(localStorage.getItem(tableName)) || null;
  const initialHeureValues =
    initialState && initialState.heures ? initialState.heures : "";

  const initialInputValues =
    initialState && initialState.values
      ? initialState.values
      : Array.from({ length: 6 }, () =>
          Array.from({ length: 11 }, (_, i) => (i == 10 ? "cible" : ""))
        );
  const [inputValues, setInputValues] = useState(initialInputValues);


  const [heureValue1, setHeureValue1] = useState(initialHeureValues);
  const heureValueRef1 = useRef("");

  
  const handleInputChange1 = (val) => {
    setHeureValue1(val);
    heureValueRef1.current = val;
  };
  const handleInputChange = (row, col, val) => {
    const newInputValues = [...inputValues];
    newInputValues[row][col] = val;
    setInputValues(newInputValues);
  };
  const saveState = () => {
    let heureValues = heureValueRef1.current;
    const data = {
        heures: heureValues,
        values: inputValues,
    };
    console.log(data,"<<<<<<<<<<<<",tableName,)
    // console.log("savinnnngg table1 ", JSON.stringify(data));
    localStorage.setItem(tableName, JSON.stringify(data));
    return data;
  };
  useEffect(() => {
    
    return () => {
      saveState();
    };
  }, []);

  return (
    <div className="table3Wrapper">
      <CustomTimePicker
                value={heureValue1}
                setValue={handleInputChange1}
              />
      <Table className="table3">
        <tbody>
          <tr>
            <th>{"heure sur paquet " + heureValue1} </th>
            <th colSpan={2}>{"Parametres"}</th>

            <MakeNTH />
          </tr>
        </tbody>

        <tbody>
          <tr>
            <th rowSpan={4}>{"Dynamic Shear(N)"}</th>
            <th rowSpan={2}>{"Back ears"}</th>
            <th rowSpan={1}>{"OS"}</th>

            {inputValues[0].map((_, i) => (
              <td>
                {i !== 10 ? (
                  <span className="input">
                    <TextInput
                      size="md"
                      value={inputValues[0][i]}
                      onChange={(e) => {
                        handleInputChange(0, i, e.target.value);
                      }}
                      type="number"
                    />
                  </span>
                ) : (
                  <td
                    rowSpan={2}
                    className="cible time1 "
                    style={{ borderBottom: "4px solid var(--teal)" }}
                  >
                    <CiblePicker
                      value={inputValues[0][i]}
                      onChange={(val) => handleInputChange(0, i, val)}
                    />
                  </td>
                )}
              </td>
            ))}
          </tr>
          <tr>
            <th rowSpan={1}>{"MS"}</th>
            {inputValues[0].map((_, i) => (
              <td>
                {i < 10 && (
                  <span className="input">
                    <TextInput
                      size="md"
                      value={inputValues[1][i]}
                      onChange={(e) => {
                        handleInputChange(1, i, e.target.value);
                      }}
                      type="number"
                    />
                  </span>
                )}
              </td>
            ))}
          </tr>
          <tr>
            <th rowSpan={2}>{"Front ears"}</th>
            <th rowSpan={1}>{"OS"}</th>
            {inputValues[2].map((_, i) => (
              <td>
                {i !== 10 ? (
                  <span className="input">
                    <TextInput
                      size="md"
                      value={inputValues[2][i]}
                      onChange={(e) => {
                        handleInputChange(2, i, e.target.value);
                      }}
                      type="number"
                    />
                  </span>
                ) : (
                  <td
                    rowSpan={2}
                    className="cible time1 "
                    style={{ borderBottom: "4px solid var(--teal)" }}
                  >
                    <CiblePicker
                      value={inputValues[2][i]}
                      onChange={(val) => handleInputChange(2, i, val)}
                    />
                  </td>
                )}
              </td>
            ))}
          </tr>
          <tr>
            <th rowSpan={1}>{"MS"}</th>
            {inputValues[0].map((_, i) => (
              <td>
                {i < 10 && (
                  <span className="input">
                    <TextInput
                      size="md"
                      value={inputValues[3][i]}
                      onChange={(e) => {
                        handleInputChange(3, i, e.target.value);
                      }}
                      type="number"
                    />
                  </span>
                )}
              </td>
            ))}
          </tr>
        </tbody>

        <tbody>
          <tr>
            <th rowSpan={2}>{"Static Shear(mn)"}</th>
            <th rowSpan={2}>{"Back ears"}</th>
            <th rowSpan={1}>{"OS"}</th>
            {inputValues[0].map((_, i) => (
              <td>
                {i !== 10 ? (
                  <span className="input">
                    <TextInput
                      size="md"
                      value={inputValues[4][i]}
                      onChange={(e) => {
                        handleInputChange(4, i, e.target.value);
                      }}
                      type="number"
                    />
                  </span>
                ) : (
                  <td
                    rowSpan={2}
                    className="cible time1 "
                    style={{ borderBottom: "4px solid var(--teal)" }}
                  >
                    <CiblePicker
                      value={inputValues[4][i]}
                      onChange={(val) => handleInputChange(4, i, val)}
                    />
                  </td>
                )}
              </td>
            ))}
          </tr>
          <tr>
            <th rowSpan={1}>{"MS"}</th>
            {inputValues[5].map((_, i) => (
              <td>
                {i < 10 && (
                  <span className="input">
                    <TextInput
                      size="md"
                      value={inputValues[5][i]}
                      onChange={(e) => {
                        handleInputChange(5, i, e.target.value);
                      }}
                      type="number"
                    />
                  </span>
                )}
              </td>
            ))}
          </tr>
        </tbody>
      </Table>
    </div>
  );
});
export default Table3;
function MakeNTH({ N = 5, td, refs, ...restProps }) {
  let comp = [];
  for (let i = 0; i < N; i++) {
    comp.push(<th>{"Essai N̊" + (i + 1)}</th>);
    comp.push(<th>{"Nature de la rupture"}</th>);
  }
  comp.push(<th>{"Nature de la rupture"}</th>);
  return comp;
}

function MakeNTd({
  N = 5,
  td,
  refs,
  borderBot,
  cible,
  inputValues,
  ...restProps
}) {
  let comp = [];
  for (let i = 0; i < N; i++) {
    comp.push(
      <td className={"label " + (borderBot ? "border-bot" : "")} colSpan={1}>
        <MakeInput />
      </td>
    );
    comp.push(
      <td
        className={"label border-right " + (borderBot ? "border-bot" : "")}
        colSpan={1}
      >
        <MakeInput />
      </td>
    );
  }
  if (cible) {
    comp.push(
      <td
        rowSpan={2}
        className="cible time1 "
        style={{ borderBottom: "4px solid var(--teal)" }}
      >
        <CiblePicker />
      </td>
    );
  }
  return comp;
}

function MakeInput({
  text,
  defaultValue = null,
  disabled = false,
  inputRef = null,
}) {
  return (
    <div>
      <span className="input">
        <TextInput
          size="md"
          // inputProps={{ ref: inputRef }}
          type="number"
        />
      </span>
    </div>
  );
}
