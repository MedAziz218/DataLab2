import { forwardRef, useRef, createRef, useState, useEffect } from "react";
import { Table, TextInput } from "@mantine/core";
import { CustomTimePicker } from "components/customtimepicker";
import "./table5.css"
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
    "Ejecteur MP",
    "Balances électronique",
    "Detecteur de métaux",
    "Table de qualité"
  
];

const Table5 = forwardRef((props, ref) => {
    const tableName = "table5"
  const initialState = JSON.parse(localStorage.getItem(tableName)) || null;

  const initialInputValues =
    initialState && initialState.values
      ? initialState.values
      : Array.from({ length: TitleList.length }, () =>
          Array.from({ length: 2 }, () => false)
        );

  const initialHeureValues =
    initialState && initialState.heures ? initialState.heures : ["", ""];
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
    heureValueRef2.current =val
  };

  const handleInputChange = (row, col, val) => {
    const newInputValues = [...inputValues];
    newInputValues[row][col] = val;
    setInputValues(newInputValues);
    updateTotalColumn(col);


  };

  useEffect(() => {
    for (let col = 0; col < 4; col++) updateTotalColumn(col);
    handleInputChange1(initialHeureValues[0])
    handleInputChange2(initialHeureValues[1])
    return () => {
      saveState();
    };
  }, []);
  const saveState = () => {
    let heureValues = [heureValueRef1.current,heureValueRef2.current]
    
    const data = {
      heures: heureValues,
      values: inputValues,
    };
    // console.log("savinnnngg table5 ", JSON.stringify(data));
    localStorage.setItem(tableName, JSON.stringify(data));
    return data;
  };
  const ExclusiveCheckboxClassNames = [
    "checkboxWrapper ",
    "checkboxWrapper critique",
   
  ];
  const [critique_colspan, non_critique_colspan] = [1, 1];
  const [total, setTotal] = useState([0, 0]);
  const updateTotalColumn = (colIndex) => {
    let val = 0;
    for (let i = 0; i < inputValues.length; i++) {
      let ref = inputValues[i][colIndex];
      if (ref) val += 1;
    }
    setAtIndex(colIndex, val);
  };
  const setAtIndex = (index, val) => {
    setTotal((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = val;
      return newValues;
    });
  };
  const title = "Condition";
  return (
    <div className="table5Wrapper">
      <Table
        className="table5"
        verticalSpacing="sm"
        highlightOnHover
        withBorder
        withColumnBorders
        striped
      >
        <tbody>
          
          <tr>
            <th>{title}</th>
            {Array.from({ length: 1}).map(() => [
              <td
                colSpan={critique_colspan}
                className="center-content title "
              >
                Coforme
              </td>,
              <td
                colSpan={non_critique_colspan}
                className="center-content title critique "
              >
                Non Coforme
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

             
            </tr>
          ))}
          <tr>
            <th>{"Total défauts visuels"}</th>
            {Array.from({ length: 2 }).map((_, innerIndex) => (
              <td
                key={innerIndex}
                className={
                  "checkboxWrapper" + (innerIndex ==1 ? " critique" : "")
                }

                // data-checked={total[innerIndex] !== 0}
              >
                <span>{String(total[innerIndex])}</span>
              </td>
            ))}
          </tr>
        </tbody>
      </Table>
    </div>
  );
});

export default Table5;

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
