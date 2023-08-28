import React, { useState } from 'react';
import './SearchForm.css'; // Import your CSS file

const SearchForm = ({ onSearch }) => {
  const [date, setDate] = useState('');
  const [option, setOption] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ date, option });
  };

  return (
    <div className="container">
      <form className="search-form" onSubmit={handleSubmit}>
        <table className="search-table">
          <tbody>
            <tr>
              <td>
                <label htmlFor="date">Date:</label>
              </td>
              <td>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </td>
              <td>
                <label htmlFor="option"></label>
              </td>
              <td>
                <select
                  id="option"
                  name="option"
                  value={option}
                  onChange={(e) => setOption(e.target.value)}
                  required
                >
                  <option value="">Selectionner une poste</option>
                  <option value="matin">Matin</option>
                  <option value="nuit">Nuit</option>
                  <option value="soir">Soir</option>
                </select>
              </td>
              <td>
                <button type="submit">Chercher</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default SearchForm;
