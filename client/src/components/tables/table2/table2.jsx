import { useState, useRef, useEffect } from "react";
import { Table, TextInput } from "@mantine/core";
import { CustomTimePicker } from "components/customtimepicker";
import { CiblePicker } from "components/ciblepicker";
import "./table2.css";
import { v4 } from "uuid";
const TitleList = [
  "1-Controle poids & Statistique (g)",
  "",
  "2-Controle S.A.P (g)",
  "3-Scallage central & Statistiques (N)",
  "4-Resistance au cisailement (shear) (N)",
  "5-Resistance au pealge (peel) (N)",
  "6-Accrochage de dents de Hook",
  "7-Fluage lycra BAF ext (%)",
  "8-Fluage lycra BAF int (%)",
  "9-Fluage lycra EJ ext (%)",
  "10-Fluage lycra EJ int (%)",
  "11-Tension lycra BAF (%)",
  "12-Tension lycra EJ (%)",
];

const Table2DefaultValues = [
  // {tbody0}
  // [null, null], // time
  // {tbody1}
  [
    ["", "cible", "", "cible"], // line1 th
    ["", ""], // line2 td
    ["", ""], // line3 td
    ["", ""], // line4 td
  ],
  [
    ["", "cible", "", "cible"], // line5 th
  ],
  // {tbody2}
  [
    ["3", "cible", "3", "cible"], // line6 th

    ["", ""], // line7 td
    ["", ""], // line8 td
    ["", ""], // line9 td
  ],
  // {tbody3}
  [
    ["3", "1.5 ≤ 2.5 ≤ 5", "3", "1.5 ≤ 2.5 ≤ 5"], // line6 th

    ["", ""], // line7 td
    ["", ""], // line8 td
    ["", ""], // line9 td
  ],
  // {tbody4}
  [
    ["3", "Loop", "≥ 25 N"], // line10 th
    [""], // line11 td
    [""], // line12 td
    [""], // line13 td
  ],
  // {tbody5}
  [
    ["3", "Hook", "≥ 1.5N"], // line14 th
    [""], // line15 td
    [""], // line16 td
    [""], // line17 td
  ],
  // {tbody6}
  [[false, false]], // line18th
  // {tbody7}
  [
    ["X1", "cible", "X1", "cible"], // line19 th
    ["X1", "X1"], // line20 td
    ["X1", "X1"], // line21 td
    ["X1", "X1"], // line22 td
  ],
  // {tbody8}
  [["X", ".± 50", "X", ".± 50"]], // line23 th
  [
    ["X", ".± 50", "X", ".± 50"], // line24 td
  ],
];
const Table2Structure = [
  // {tbody0}
  //[null, null], // time
  // {tbody1}
  [
    ["N=", null, "N=", null], // line1 th
    ["X̅=", "X̅="], // line2 td
    ["Max=", "Max="], // line3 td
    ["Min=", "Min="], // line4 td
  ],
  [
    ["S=", null, "S=", null], // line5 th
  ],
  // {tbody2}
  [
    ["N=", null, "N=", null], // line6 th
    ["X1=", "X1="], // line7 td
    ["X2=", "X2="], // line8 td
    ["X3=", "X3="], // line9 td
  ],
  // {tbody3}
  [
    ["N=", null, "N=", null], // line6 th
    ["X1=", "X1="], // line7 td
    ["X2=", "X2="], // line8 td
    ["X3=", "X3="], // line9 td
  ],
  // {tbody4}
  [
    ["N=", "Loop", null], // line10 th
    ["X1="], // line11 td
    ["X2="], // line12 td
    ["X3="], // line13 td
  ],
  // {tbody5}
  [
    ["N=", "Hook", null], // line14 th
    ["X1="], // line15 td
    ["X2="], // line16 td
    ["X3="], // line17 td
  ],
  // {tbody6}
  [[null, null]], // line18th
  // {tbody7}
  [
    ["X1", null, "X1", null], // line19 th
    ["X1", "X1"], // line20 td
    ["X1", "X1"], // line21 td
    ["X1", "X1"], // line22 td
  ],
  // {tbody8}
  [["X", null, "X", null]], // line23 th
  [
    ["X", null, "X", null], // line24 td
  ],
];

export default function Table2() {
  const ExclusiveCheckboxClassNames = [
    "checkboxWrapper critique",
    "checkboxWrapper ",
  ];
  const initialState = JSON.parse(localStorage.getItem("table2")) || null;
  const initialHeureValues =
    initialState && initialState.heures ? initialState.heures : ["", ""];

  const initialInputValues =
    initialState && initialState.values
      ? initialState.values
      : Table2DefaultValues;

  const handleInputChange = (row, col, z) => {
    return (val) => {
      //   console.log(row, col, z, val.target.value, "<<<<<<<<<<<<<");
     const newInputValues = [...inputValues];
      newInputValues[row][col][z] = val.target.value;
      setInputValues(newInputValues);
      
    };
  };
  const _handleInputChangeVal = (row, col, z) => {
    return (val) => {
      console.log(val, "vvvvvvvvvvvvvvvvvvvvvvv");
      //   console.log(row, col, z, val, "<<<<<<<<<<<<<");
      const newInputValues = [...inputValues];
      newInputValues[row][col][z] = val;
      setInputValues(newInputValues);
    };
  };

  const [inputValues, setInputValues] = useState(initialInputValues);

  const [heureValue1, setHeureValue1] = useState(initialHeureValues[0]);
  const [heureValue2, setHeureValue2] = useState(initialHeureValues[1]);
  const heureValueRef1 = useRef("");
  const heureValueRef2 = useRef("");

  const handleInputChange1 = (val) => {
    setHeureValue1(val);
    heureValueRef1.current = val;
  };

  const handleInputChange2 = (val) => {
    setHeureValue2(val);
    heureValueRef2.current = val;
  };
  const saveState = () => {
    let heureValues = [heureValueRef1.current, heureValueRef2.current];

    const data = {
      heures: heureValues,
      values: inputValues,
    };
    // console.log("savinnnngg table2 ", JSON.stringify(data));
    localStorage.setItem("table2", JSON.stringify(data));
    return data;
  };
  useEffect(() => {
    return () => {
      saveState();
      //   console.log(inputValues);
    };
  }, []);
  return (
    <div className="table2Wrapper">
      <Table
        className="table2"
        verticalSpacing="sm"
        highlightOnHover
        withBorder
        withColumnBorders
        striped
      >
        <tbody>
          <tr>
            <th>Heure Sur Paquet</th>
            <td colSpan={2}>
              <CustomTimePicker
                value={heureValue1}
                setValue={handleInputChange1}
              />
            </td>
            <td colSpan={2}>
              <CustomTimePicker
                value={heureValue2}
                setValue={handleInputChange2}
              />
            </td>
          </tr>
        </tbody>
        {/* 0000000000000000000000000000000000000 */}

        {[0, 1, 2, 3, 4, 5].map((tbodyIndex) => (
          <tbody>
            {Table2Structure[tbodyIndex].map((tb, index) => (
              <tr>
                {index == 0 && (
                  <th rowSpan={Table2Structure[tbodyIndex].length}>
                    {TitleList[tbodyIndex]}
                  </th>
                )}
                {tb.map((el, innerIndex) =>
                  index == 0 && el == null ? (
                    <td rowSpan={Table2Structure[tbodyIndex].length}>
                      <CiblePicker
                        value={inputValues[tbodyIndex][index][innerIndex]}
                        onChange={_handleInputChangeVal(
                          tbodyIndex,
                          index,
                          innerIndex
                        )}
                      />
                    </td>
                  ) : index == 0 && (el == "Loop" || el == "Hook") ? (
                    <td
                      rowSpan={Table2Structure[tbodyIndex].length}
                      colSpan={2}
                    >
                      <div style={{ textAlign: "left" }}>
                        {el}
                        <TextInput
                          value={inputValues[tbodyIndex][index][innerIndex]}
                          onChange={handleInputChange(
                            tbodyIndex,
                            index,
                            innerIndex
                          )}
                        />
                      </div>
                    </td>
                  ) : (
                    <td>
                      <MakeInput
                        text={el}
                        value={inputValues[tbodyIndex][index][innerIndex]}
                        onChange={handleInputChange(
                          tbodyIndex,
                          index,
                          innerIndex
                        )}
                      />
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        ))}
        {/* 666666666666666666666666666666666666666 */}
        <tbody>
          <tr>
            <th>{TitleList[6]}</th>
            <ExclusiveCheckboxTogglee
              classNames={ExclusiveCheckboxClassNames}
              isChecked1={inputValues[6][0][0]}
              isChecked2={inputValues[6][0][1]}
              setIsChecked1={_handleInputChangeVal(6, 0, 0)}
              setIsChecked2={_handleInputChangeVal(6, 0, 1)}
            />
          </tr>
        </tbody>

        {/* 777777777777777777777777777777777 */}

        <tbody>
          {[7].map((tbodyIndex) =>
            Table2Structure[tbodyIndex].map((tb, index) => (
              <tr>
                <th>{TitleList[tbodyIndex + index]}</th>
                {tb.map((el, innerIndex) =>
                  el == null ? (
                    <td rowSpan={Table2Structure[tbodyIndex].length}>
                      <CiblePicker
                        value={inputValues[tbodyIndex][index][innerIndex]}
                        onChange={_handleInputChangeVal(
                          tbodyIndex,
                          index,
                          innerIndex
                        )}
                      />
                    </td>
                  ) : (
                    <td>
                      <MakeInput
                        text={el}
                        value={inputValues[tbodyIndex][index][innerIndex]}
                        onChange={handleInputChange(
                          tbodyIndex,
                          index,
                          innerIndex
                        )}
                      />
                    </td>
                  )
                )}
              </tr>
            ))
          )}
        </tbody>
        {/* 8888888888888888888888888 */}
        {[8, 9].map((tbodyIndex) => (
          <tbody>
            {Table2Structure[tbodyIndex].map((tb, index) => (
              <tr>
                {index == 0 && (
                  <th rowSpan={Table2Structure[tbodyIndex].length}>
                    {TitleList[tbodyIndex + 3]}
                  </th>
                )}
                {tb.map((el, innerIndex) =>
                  index == 0 && el == null ? (
                    <td rowSpan={Table2Structure[tbodyIndex].length}>
                      <CiblePicker
                        value={inputValues[tbodyIndex][index][innerIndex]}
                        onChange={_handleInputChangeVal(
                          tbodyIndex,
                          index,
                          innerIndex
                        )}
                      />
                    </td>
                  ) : index == 0 && (el == "Loop" || el == "Hook") ? (
                    <td
                      rowSpan={Table2Structure[tbodyIndex].length}
                      colSpan={2}
                    >
                      <div style={{ textAlign: "left" }}>
                        {el}
                        <TextInput
                          value={inputValues[tbodyIndex][index][innerIndex]}
                          onChange={handleInputChange(
                            tbodyIndex,
                            index,
                            innerIndex
                          )}
                        />
                      </div>
                    </td>
                  ) : (
                    <td>
                      <MakeInput
                        text={el}
                        value={inputValues[tbodyIndex][index][innerIndex]}
                        onChange={handleInputChange(
                          tbodyIndex,
                          index,
                          innerIndex
                        )}
                      />
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        ))}
      </Table>
    </div>
  );
}

function MakeInput({
  text,
  defaultValue = null,
  value,
  onChange,
  disabled = false,
  inputRef = null,
}) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span style={{ flex: "1" }}>{text}</span>
      <span style={{ flex: "5" }}>
        {disabled ? (
          <TextInput disabled type="number" value={value} />
        ) : (
          <TextInput type="number" value={value} onChange={onChange} />
        )}
      </span>
    </div>
  );
}

const ExclusiveCheckboxTogglee = ({
  classNames,
  isChecked1,
  isChecked2,
  setIsChecked1,
  setIsChecked2,
}) => {
  //   const [isChecked1, setIsChecked1] = useState(false);
  //   const [isChecked2, setIsChecked2] = useState(false);
useEffect(()=>{
  console.log("ccccccc",isChecked1,isChecked2)
  
    setIsChecked1(JSON.parse(isChecked1));
    setIsChecked2(JSON.parse(isChecked2));
  
 
},[])
  const handleToggle1 = () => {
    setIsChecked1(!isChecked1);
    setIsChecked2(false);
  };

  const handleToggle2 = () => {
    setIsChecked2(!isChecked2);
    setIsChecked1(false);
  };

  return [
    <td
      colSpan={2}
      style={{
        cursor: "pointer",
      }}
      onClick={handleToggle1}
      className={classNames[0]}
      data-checked={String(isChecked1)}
    >
      <span style={{ paddingRight: 10 }}>{"Critique"}</span>

      <input
        type="checkbox"
        className="input-box"
        checked={isChecked1}
        onChange={() => {}}
      />
    </td>,
    <td
      colSpan={2}
      style={{
        cursor: "pointer",
      }}
      onClick={handleToggle2}
      className={classNames[1]}
      data-checked={String(isChecked2)}
    >
      <span style={{ paddingRight: 10 }}>{"Non Critique"}</span>
      <input
        type="checkbox"
        className="input-box"
        checked={isChecked2}
        onChange={() => {}}
      />
    </td>,
  ];
};
