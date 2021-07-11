import React, { useRef } from 'react';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';

import './../../App.css';

const SearchLayout = styled.div``;

const SearchContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 5px;
  width: 500px;
`;

const SearchInput = styled.div`
  display: flex;
  width: auto;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid lightgray;
  border-radius: 30px;
  color: gray;
  padding-left: 15px;
`;

const Input = styled.input`
  border: none;
  flex: 1;
  margin-left: 10px;
  outline-width: 0;
  font-weight: 600;
`;

const Search = props => {
  const searchInput = useRef('');
  //Pushing the user input values to the parent component.
  const getSearchTerm = () => {
    props.searchKeyword(searchInput.current.value);
  };

  return (
    <SearchLayout>
      <SearchContainer>
        <SearchInput>
          <SearchIcon />
          <Input
            ref={searchInput}
            type="text"
            placeholder="Enter the Pet's Name"
            className="prompt"
            value={props.term}
            onChange={getSearchTerm}
          />
        </SearchInput>
      </SearchContainer>
    </SearchLayout>
  );
};

export default Search;
