import React from 'react';

import Box from './Box';
import Input from './Input';

const Search = (props) => (
  <div className="search">
    <Box title="Wyszukiwarka" size={100}>
      <Input type="text" placeholder="Szukaj" linestyle="true" onChange={props.filterMethod}/>
    </Box>
  </div>
);

export default Search;