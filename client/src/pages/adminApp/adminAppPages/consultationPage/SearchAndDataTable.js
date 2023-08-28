import React, { useState } from 'react';
import './SearchAndDataTable.css'; // Import your CSS file
import SearchForm from './SearchForm';
import { AiFillRightSquare } from 'react-icons/ai'; // Import AiFillRightSquare from react-icons
const SearchAndDataTable = ({ data }) => {
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (searchOptions) => {
    // Implement your search/filter logic here based on the searchOptions
    // Update the filteredData state with the filtered results
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
              <th>Visualizer les résultats</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={index}>
                <td>{row.date}</td>
                <td>{row.poste}</td>
                <td>{row.nomPrenom}</td>
                <td>
                  <button>
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
