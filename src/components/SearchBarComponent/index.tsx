import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { NatOperacao } from '@/types';

interface SearchBarProps {
  nmNatOperationFilter: NatOperacao;
  setNmNatOperationFilter: React.Dispatch<React.SetStateAction<NatOperacao>>;
  searchOperation: () => void;
}

const SearchBarComponent = ({
  nmNatOperationFilter,
  setNmNatOperationFilter,
  searchOperation
}: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleButtonClick = () => {
    setNmNatOperationFilter(prev => ({
      ...prev,
      operandoValor: searchTerm
    }));
    searchOperation();
  };

  return (
    <div className="filters d-flex gap-2">
      <div className="search d-flex">
        <TextField
          variant='standard'
          label="Pesquisa"
          value={searchTerm}
          onChange={handleInputChange}
          type="text"
        />
        <Button onClick={handleButtonClick}><SearchIcon /></Button>
      </div>
    </div>
  );
};

export default SearchBarComponent;
