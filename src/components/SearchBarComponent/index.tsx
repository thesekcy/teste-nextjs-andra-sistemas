import React from 'react';
import { TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBarComponent = ({ nmNatOperationFilter, setNmNatOperationFilter, searchOperation }) => {
  return (
    <div className="filters d-flex gap-2">
      <div className="search d-flex">
        <TextField
          variant='standard'
          label="Pesquisa"
          value={nmNatOperationFilter.operandoValor}
          onChange={(e) => setNmNatOperationFilter(prev => ({ ...prev, operandoValor: e.target.value }))}
          type="text"
        />
        <Button onClick={searchOperation}><SearchIcon /></Button>
      </div>
    </div>
  );
};

export default SearchBarComponent;
