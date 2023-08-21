
import "./table4.css";
import { createRef, forwardRef, useRef, useEffect } from "react";
import { TextInput,Table } from "@mantine/core";
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
        {list1.map((x,index) => (
          <tr>
            <th>{index+1+"-"+x}</th>
            <td>
              <TextInput fullWidth size="sm" />
            </td>

            <td>
              <TextInput fullWidth size="sm" />
            </td>
          </tr>
        ))}

        <td colSpan={3} style={{backgroundColor:"rgb(209, 220, 255)",textAlign:"center", fontWeight:"bold"}}> Controle TNT</td>
        {list2.map((x,index) => (
          <tr>
            <th>{index+1+list1.length+"-"+x}</th>
            <td>
              <TextInput fullWidth size="sm" />
            </td>

            <td>
              <TextInput fullWidth size="sm" />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    </div>
  );
});
export default Table4;