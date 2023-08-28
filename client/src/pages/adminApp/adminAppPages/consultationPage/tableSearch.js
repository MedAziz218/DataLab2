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
      <h2>Recherche par Date et Poste</h2>
      <form className="search-form" onSubmit={handleSubmit}>
        <label htmlFor="date">Date :</label>
        <input
          type="date"
          id="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <label htmlFor="option">Sélectionnez une poste :</label>
        <select
          id="option"
          name="option"
          value={option}
          onChange={(e) => setOption(e.target.value)}
          required
        >
          <option value="">Sélectionnez une poste</option>
          <option value="matin">Matin</option>
          <option value="nuit">Nuit</option>
          <option value="soir">Soir</option>
        </select>
        <button type="submit">Rechercher</button>
      </form>
    </div>
  );
};

export default SearchForm;
