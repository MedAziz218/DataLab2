import { forwardRef, useRef, createRef, useState, useEffect } from "react";
import { Table } from "@mantine/core";
import "./table1.css";
// import { createStyles } from "@mantine/core";
// const useStyles = createStyles((theme) => ({
//   th: {
//     backgroundColor: theme.fn.variant({
//       variant: "filled",
//       color: theme.primaryColor,
//     }).background,
//   },
//   th
// }));

const TitleList = [
  "1-Paquet (soudure/impression/date)",
  "2-Nombre de changes et pliage",
  "3-Vérification du pelage Adhésifs/Hook",
  "4-Résistance IOOP/TBS",
  "5-Polyéthylène/Back-sheet",
  "6-TNT de surface /Colle",
  "7-B.A.F/Colle/Soudure",
  "8-Lycras (BAF/CEJ)/Colle/Soudure",
  "9-High-loft/Colle",
  "10-Coussin/Pâte/Odeur",
  "11-Spun/Colle",
  "12-Présence de gaufrage",
  "13-Divers",
];

const Table1 = forwardRef((props, ref) => {
  const initialInputState = localStorage.getItem("table1")
    ? JSON.parse(localStorage.getItem("table1"))
    : Array.from({ length: TitleList.length }, () =>
        Array.from({ length: 4 }, () => false)
      );
  const [inputValues, setInputValues] = useState(initialInputState);
  const handleInputChange = (row, col, val) => {
    const newInputValues = [...inputValues];
    newInputValues[row][col] = val;
    setInputValues(newInputValues);
  };

  useEffect(() => {
    return () => {
      console.log(inputValues);
      saveState();
    };
  }, []);
  const saveState = () => {
    localStorage.setItem("table1", JSON.stringify(inputValues));
  };
  const ExclusiveCheckboxClassNames = [
    "checkboxWrapper critique",
    "checkboxWrapper ",
  ];
  const [critique_colspan, non_critique_colspan] = [1, 1];
  const title = "Defaut Visuels (QP1B0)";
  return (
    <div className="table1Wrapper">
      <Table
        className="table1"
        verticalSpacing="sm"
        highlightOnHover
        withBorder
        withColumnBorders
        striped
      >
        <tbody>
          <tr>
            <th>Heure Sur Paquet</th>
            <td colSpan={critique_colspan + non_critique_colspan}>{"Time1"}</td>
            <td colSpan={critique_colspan + non_critique_colspan}>{"Time2"}</td>
          </tr>
          <tr>
            <th>{title}</th>
            {Array.from({ length: 2 }).map(() => [
              <td
                colSpan={critique_colspan}
                className="center-content title critique"
              >
                Critique
              </td>,
              <td
                colSpan={non_critique_colspan}
                className="center-content title "
              >
                Non Critique
              </td>,
            ])}
          </tr>

          {inputValues.map((innerArray, outerIndex) => (
            <tr key={outerIndex}>
              <th>{TitleList[outerIndex]}</th>
              <ExclusiveCheckboxToggle
                classNames={ExclusiveCheckboxClassNames}
                isChecked1={innerArray[0]}
                isChecked2={innerArray[1]}
                setIsChecked1={(val) => handleInputChange(outerIndex, 0, val)}
                setIsChecked2={(val) => handleInputChange(outerIndex, 1, val)}
              />

              <ExclusiveCheckboxToggle
                classNames={ExclusiveCheckboxClassNames}
                isChecked1={innerArray[2]}
                isChecked2={innerArray[3]}
                setIsChecked1={(val) => handleInputChange(outerIndex, 2, val)}
                setIsChecked2={(val) => handleInputChange(outerIndex, 3, val)}
              />
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
});

export default Table1;

const ExclusiveCheckboxToggle = ({
  classNames,
  isChecked1,
  isChecked2,
  setIsChecked1,
  setIsChecked2,
}) => {
  //   const [isChecked1, setIsChecked1] = useState(false);
  //   const [isChecked2, setIsChecked2] = useState(false);

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
      style={{
        cursor: "pointer",
      }}
      onClick={handleToggle1}
      className={classNames[0]}
      data-checked={isChecked1}
    >
      <input
        type="checkbox"
        className="input-box"
        checked={isChecked1}
        onChange={() => {}}
      />
    </td>,
    <td
      style={{
        cursor: "pointer",
      }}
      onClick={handleToggle2}
      className={classNames[1]}
      data-checked={isChecked2}
    >
      <input
        type="checkbox"
        className="input-box"
        checked={isChecked2}
        onChange={() => {}}
      />
    </td>,
  ];
};
