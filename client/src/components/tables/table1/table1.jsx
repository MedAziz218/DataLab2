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
  useEffect(() => {
    loadArray();
    console.log("started", refArrays.current);
    
    return () => {
    //   console.log("stopped", refArrays.current);
      saveArray();
    };
  }, []);

  const refArrays = useRef(
    Array.from({ length: TitleList.length }).map(() =>
      Array.from({ length: 4 }).map(() => ({ val: false }))
    )
  );
  useEffect(()=>{
    
  },[refArrays])
  const loadArray = () => {
    let savedArr = JSON.parse(localStorage.getItem("table1")) || null;
    // console.log("................", savedArr);
    if (savedArr && refArrays.current.length == savedArr.length) {
      for (let i = 0; i < savedArr.length; i++) {
          for (let j = 0; j < savedArr[i].length; j++) {
              refArrays.current[i][j].val = savedArr[i][j];
            
              refArrays.current[i][j].current.checked = savedArr[i][j];
          
        }
      }
    }
  };
  const saveArray = () => {
    let arr = refArrays.current.map((line) => line.map((obj) => obj.val));
    localStorage.setItem("table1", JSON.stringify(arr));
  };
  const handleCheckboxChange = (i, j) => (val) => {
    refArrays.current[i][j].val = val;
    console.log(i, j, val, refArrays.current);
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

          {refArrays.current.map((innerArray, outerIndex) => (
            <tr key={outerIndex}>
              <th>{TitleList[outerIndex]}</th>
              <ExclusiveCheckboxToggle
                onchange1={handleCheckboxChange(outerIndex, 0)}
                onchange2={handleCheckboxChange(outerIndex, 1)}
                classNames={ExclusiveCheckboxClassNames}
                refs={innerArray.slice(0, 2)}
              />

              <ExclusiveCheckboxToggle
                onchange1={handleCheckboxChange(outerIndex, 2)}
                onchange2={handleCheckboxChange(outerIndex, 3)}
                classNames={ExclusiveCheckboxClassNames}
                refs={innerArray.slice(2, 4)}
              />
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
});

export default Table1;

const ExclusiveCheckboxToggle = ({ classNames, onchange1, onchange2,refs }) => {
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  const handleToggle1 = () => {
    onchange1(!isChecked1);
    onchange2(false);
    setIsChecked1(!isChecked1);
    setIsChecked2(false);
  };

  const handleToggle2 = () => {
    onchange1(false);
    onchange2(!isChecked2);
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
        ref={refs[0]}
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
        ref={refs[1]}

        onChange={() => {}}
      />
    </td>,
  ];
};
