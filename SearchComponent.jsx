import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../style.css'; // Fișierul CSS pentru stilizare personalizată

const SearchComponent = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // Trimitem termenul de cautare în funcția parinte
    onSearch(searchTerm);
    // Ștergem termenul de căutare din input după ce s-a trimis la parinte
    setSearchTerm('');
  };

  const handleKeyPress = (e) => {
    // Verificăm dacă s-a apăsat tasta Enter
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-component">
      <Form.Group className="search-form ">
        <Form.Control
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress} // Adăugăm handler pentru tasta Enter
          placeholder="Introdu numele cărții"
          className="search-input modal-footer-button"
        />
        <Button variant="outline-primary modal-footer-button" onClick={handleSearch} className="search-button">
          Caută
        </Button>
      </Form.Group>
    </div>
  );
};

export default SearchComponent;
