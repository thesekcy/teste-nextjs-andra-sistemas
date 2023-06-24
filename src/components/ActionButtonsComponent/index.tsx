import React from 'react';
import { Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Link from 'next/link';

const ActionButtonsComponent = ({ rowsToDelete, deleteOperation }: { rowsToDelete: number[], deleteOperation: (ids: number[]) => Promise<void> }) => {
  return (
    <div className="actions d-flex gap-2 align-items-center">
      {rowsToDelete.length > 0 && (
        <Button
          onClick={() => deleteOperation(rowsToDelete)}
          variant='contained'
          color="error"
          startIcon={<AddCircleOutlineIcon />}
        >
          Excluir {rowsToDelete.length} Itens
        </Button>
      )}
      <Link href='/create'>
        <Button variant='contained' startIcon={<AddCircleOutlineIcon />}>Incluir</Button>
      </Link>
    </div>
  );
};

export default ActionButtonsComponent;
