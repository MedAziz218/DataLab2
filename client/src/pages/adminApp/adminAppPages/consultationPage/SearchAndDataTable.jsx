import React, { useEffect, useState } from "react";
import "./SearchAndDataTable.css"; // Import your CSS file
import SearchForm from "./SearchForm";
import { AiFillRightSquare } from "react-icons/ai"; // Import AiFillRightSquare from react-icons

import { getAllForms } from "apiCalls";
import { loadTables } from "apiCalls";
import { useNavigate } from "react-router-dom";

const SearchAndDataTable = ({ data }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [fullData, setFullData] = useState([]);
const navigate = useNavigate()
  const handleSearch = (dateA, dateB) => {
    const filtered = fullData.filter((item) => {
      const currentDate = new Date(item.date);
      return currentDate >= dateA && currentDate <= dateB;
    });

    console.log(filtered, dateA, dateB);
    if (dateA && dateB) {
      setFilteredData(filtered);
    }else {
      setFilteredData(fullData);
    }
  };
  useEffect(() => {
    getAllForms().then((val) => {
      console.log("valueeee", val);
      val.sort((a, b) => new Date(b.date) - new Date(a.date));
      setFullData(val);
      setFilteredData(val);
    });
  }, []);

  const handleVisClick = async (date, poste) => {

   await loadTables(date,poste)
   navigate("/viewData/controle")

  };

  return (
    <div className="search-and-data-table-container">
      <SearchForm onSearch={handleSearch} />

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Poste</th>
              <th>Nom et Prénom</th>
              <th>Matricule</th>
              <th>Visualizer les résultats</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={index}>
                <td>{row.date}</td>
                <td>{row.poste}</td>
                <td>{row.username}</td>
                <td>{row.email}</td>

                <td>
                  <button onClick={() => handleVisClick(row.date, row.poste)}>
                    <AiFillRightSquare />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchAndDataTable;
