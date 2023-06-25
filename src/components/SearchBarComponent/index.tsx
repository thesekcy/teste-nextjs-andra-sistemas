import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { NatOperacao } from '@/types';

export interface SearchBarProps {
  nmNatOperationFilter: NatOperacao;
  setNmNatOperationFilter: React.Dispatch<React.SetStateAction<NatOperacao>>;
  searchOperation: () => void;
}

const SearchBarComponent = ({ nmNatOperationFilter, setNmNatOperationFilter, searchOperation }: SearchBarProps) => {
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
