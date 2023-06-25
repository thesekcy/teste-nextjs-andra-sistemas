import React, { useContext, useState } from 'react';
import { TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { NatOperacao } from '@/types';
import { OperationsContext } from '@/contexts/Operations/OperationsContext';

export interface SearchBarProps {
  searchOperation: () => void;
}

const SearchBarComponent = ({ searchOperation }: SearchBarProps) => {
  const {
    nmNatOperationFilter,
    setNmNatOperationFilter
  } = useContext(OperationsContext)

  return (
    <div className="filters d-flex gap-2">
      <div className="search d-flex">
        <TextField
          variant='standard'
          label="Pesquisa"
          value={nmNatOperationFilter.operandoValor}
          onChange={(e) => setNmNatOperationFilter({ ...nmNatOperationFilter, operandoValor: e.target.value })}
          type="text"
        />
        <Button onClick={searchOperation}><SearchIcon /></Button>
      </div>
    </div>
  );
};

export default SearchBarComponent;
