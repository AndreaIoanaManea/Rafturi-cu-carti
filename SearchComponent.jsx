import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../style.css'; 

const SearchComponent = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
    setSearchTerm('');
  };

  const handleKeyPress = (e) => {
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
          onKeyPress={handleKeyPress} 
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
