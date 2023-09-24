import React, { useState } from 'react';

import {
  SearchbarEl,
  SearchForm,
  SearchFormInput,
} from 'components/Searchbar/Searchbar.styled';
import IconButtonStyle from 'components/IconButton/IconButton';

import { ReactComponent as SearchIcon } from 'Icons/searchIcon.svg';

const Searchbar = ({ onSubmit }) => {
  const [searchRequest, setsearchRequest] = useState('');

  const handleChange = ({ target: { value } }) => {
    setsearchRequest(value);
  };

  const сreateRequest = e => {
    e.preventDefault();
    onSubmit(searchRequest);
    resetForm();
  };

  const resetForm = () => {
    setsearchRequest('');
  };

  return (
    <SearchbarEl className="searchbar">
      <SearchForm className="form" onSubmit={сreateRequest}>
        <IconButtonStyle type="submit" className="button">
          <SearchIcon width="24px" height="24px" />
        </IconButtonStyle>
        <SearchFormInput
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={searchRequest}
        />
      </SearchForm>
    </SearchbarEl>
  );
};

export default Searchbar;
