import "./table4.css";
import { createRef, forwardRef, useRef, useEffect } from "react";
import { TextInput, Table } from "@mantine/core";
import { useState } from "react";
const list1 = [
  "Pâte",
  "SAP",
  "Non tissé SMS",
  "Non tissé surface",
  "Non tissé Loft",
  "The Superab (SAP) Safety",
  "TBS",
  "Film élastique",
  "FrontEars",
  "BackEars",
  "Hook",
  "Loop",
  "Elastique entre jambes",
  "Elastique BAF",
  "Colle de Construction",
  "Colle des Elastiques",
  "NW spun Light",
  "Emballage",
];
const list2 = [
  "*Nom du conducteur",

  "*Nombre des échantillons",

  "*Laize(mm)&Grammage(g/m²):",
  "*Numéro du lot:",
  "*Date de la production du lot",
  "*Nom du fournisseur",
];

// "Ejecteur MP",
// "Balances électronique",
// "Balances électronique:",
// "Detecteur des métaux",
// "Table de qualité",
// "Valeur prise dose",
const Table4 = forwardRef((props, ref) => {
  const tableName = "table4";
  const initialState = JSON.parse(localStorage.getItem(tableName)) || null;

  const initialInputValues =
    initialState && initialState.values
      ? initialState.values
      : Array.from({ length: list1.length + list2.length }, () =>
          Array.from({ length: 2 }, (_, i) => "")
        );
  const [inputValues, setInputValues] = useState(initialInputValues);
  const handleInputChange = (row, col, val) => {
    const newInputValues = [...inputValues];
    newInputValues[row][col] = val;
    setInputValues(newInputValues);
  };
  const saveState = () => {
    
    const data = {
        
        values: inputValues,
    };
    console.log(data,"<<<<<<<<<<<<",tableName,)
    // console.log("savinnnngg table1 ", JSON.stringify(data));
    localStorage.setItem(tableName, JSON.stringify(data));
    return data;
  };
  useEffect(()=>{
    return ()=>{
      saveState()
    }
    },[])
  return (
    <div className="table4Wrapper">
      <Table className="table4">
        <thead>
          <tr>
            <th>Matiere</th>
            <th>Fournisseur</th>
            <th>Reference</th>
          </tr>
        </thead>
        <tbody>
          {list1.map((x, index) => (
            <tr>
              <th>{index + 1 + "-" + x}</th>
              <td>
                <TextInput
                  fullWidth
                  size="sm"
                  value={inputValues[index][0]}
                  onChange={(e) => handleInputChange(index, 0, e.target.value)}
                />
              </td>

              <td>
                <TextInput
                  fullWidth
                  size="sm"
                  value={inputValues[index][1]}
                  onChange={(e) => handleInputChange(index, 1, e.target.value)}
                />
              </td>
            </tr>
          ))}

          <td
            colSpan={3}
            style={{
              backgroundColor: "rgb(209, 220, 255)",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {" "}
            Controle TNT
          </td>
          {list2.map((x, index) => (
            <tr>
              <th>{index + 1 + list1.length + "-" + x}</th>
              <td>
                <TextInput
                  fullWidth
                  size="sm"
                  value={inputValues[index+list1.length][0]}
                  onChange={(e) => handleInputChange(index+list1.length, 0, e.target.value)}
                />
              </td>

              <td>
                <TextInput
                  fullWidth
                  size="sm"
                  value={inputValues[index+list1.length][1]}
                  onChange={(e) => handleInputChange(index+list1.length, 1, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
});
export default Table4;
