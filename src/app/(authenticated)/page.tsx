'use client'
import React, { useContext, useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Container, Button, TextField, Card } from '@mui/material';
import { useApi } from '@/hooks/useApi';
import { AuthContext } from '@/contexts/Auth/AuthContext';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Link from 'next/link';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function Home() {
  const [operacoes, setOperacoes] = useState()
  const auth = useContext(AuthContext)

  const api = useApi()

  let nmNatOperacaoFilter = {
    operandoTipo: "0",
    operandoValor: "ven",
    operador: "2"
  }

  useEffect(() => {
    const token = auth.getToken()
    const res = api.getNatOperations(token!, nmNatOperacaoFilter)

    console.log(res)
  }, [])

  return (
    <Container>
      <h6>Tela de Pesquisa</h6>
      
      <hr />

      <Card className='mt-4 p-4'>
        <div className="d-flex justify-content-between mb-3">
          <TextField
            variant='standard'
            label="Pesquisa"
            type="email"
          />
          <Link href='/create'>
            <Button variant='contained' startIcon={<AddCircleOutlineIcon />}>Incluir</Button>
          </Link>
        </div>

        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 25, 50]}
          checkboxSelection
        />
      </Card>
    </Container>
  );
}