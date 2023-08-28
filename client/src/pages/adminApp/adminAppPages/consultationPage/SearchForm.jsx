import React, { useState } from "react";
import "./SearchForm.css"; // Import your CSS file
import { DatePickerInput } from "@mantine/dates";

const SearchForm = ({ onSearch }) => {
  const currentDate = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(currentDate.getDate() - 7);

  const [date, setDate] = useState([currentDate, oneWeekAgo]);
  const [option, setOption] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const dateA = date[0]
    const dateB =  date[1]
    onSearch(dateA,dateB);
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
                <DatePickerInput
                  type="range"
                  placeholder="Pick dates range"
                  value={date}
                  onChange={setDate}
                  mx="auto"
                  maw={400}
                />
              </td>
              <td>
                <label htmlFor="option"></label>
              </td>
              {/* <td>
                <select
                  id="option"
                  name="option"
                  value={option}
                  onChange={(e) => setOption(e.target.value)}
                  required
                >
                  <option value="">Selectionner une poste</option>
                  <option value="MATIN">MATIN</option>
                  <option value="NUIT">NUIT</option>
                  <option value="SOIR">SOIR</option>
                </select>
              </td> */}
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
