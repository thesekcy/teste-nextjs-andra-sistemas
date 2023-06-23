'use client';
import React, { useContext, useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Container, Button, TextField, Card } from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useApi } from '@/hooks/useApi';
import { AuthContext } from '@/contexts/Auth/AuthContext';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import { TP_ESTOQUE_CONVERT } from './../../constants/tpEstoqueConvert';
import { TP_FINANCEIRO_CONVERT } from '@/constants/tpFinanceiroConvert';
import { formatDeleteObject } from '@/functions';
import Swal from 'sweetalert2';

const Home = () => {
  const today = new Date();
  const priorDate = new Date(new Date().setDate(today.getDate() - 30));

  const [operations, setOperations] = useState<{ id: number }[]>([]);
  const [rowsToDelete, setRowsToDelete] = useState<[]>([]);
  const [nmNatOperationFilter, setNmNatOperationFilter] = useState({
    operandoTipo: "0",
    operandoValor: "",
    operador: "2"
  });

  const [dataPicker, setDataPicker] = useState({
    operandoTipo: "1",
    operandoValor: {
      dataIni: dayjs(priorDate).format("YYYY-MM-DD HH:mm:ss"),
      dataFin: dayjs(today).format("YYYY-MM-DD HH:mm:ss")
    },
    operador: "1"
  });

  const auth = useContext(AuthContext);
  const api = useApi();
  const token = auth.getToken();

  useEffect(() => {
    const getOperations = async () => {
      const res = await api.getNatOperations(token!, nmNatOperationFilter, dataPicker);
      setOperations(res.retorno);
      console.log(res.retorno);
    };

    getOperations();
  }, [dataPicker]);

  async function deleteOperation(ids: number[]) {
    const res = await api.deleteNatOperations(token!, formatDeleteObject(ids));

    if (res.every((item: { status: number; }) => item.status === 200)) {
      setOperations(prevOperations => {
        const updatedOperations = prevOperations.filter(op => !ids.includes(op.id));
        return updatedOperations;
      });

      Swal.fire({
        title: 'Sucesso!',
        text: 'Operação excluída com sucesso.',
        icon: 'success',
        confirmButtonText: 'Fechar'
      });
    } else {
      const failedItems = res.filter((item: { status: number }) => item.status !== 200);
      const failedCount = failedItems.length;

      setOperations(prevOperations => {
        const updatedOperations = prevOperations.filter(op => {
          return failedItems.findIndex((item: { id: number; }) => item.id === op.id) === -1;
        });
        return updatedOperations;
      });

      Swal.fire({
        title: 'Houve algum problema!',
        text: `Houve um problema na exclusão de ${failedCount} item(s). Atualize a página e tente novamente.`,
        icon: 'warning',
        confirmButtonText: 'Fechar'
      });
    }
  }

  async function searchOperation() {
    const res = await api.getNatOperations(token!, nmNatOperationFilter);
    setOperations(res.retorno);
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'nmNatOperacao', headerName: 'Descrição', flex: 1 },
    {
      field: 'tpEstoque',
      headerName: 'Estoque',
      description: 'This column has a value getter and is not sortable.',
      flex: 1,
      valueGetter: (params: GridValueGetterParams) => TP_ESTOQUE_CONVERT[Number(params.row.tpEstoque)]
    },
    {
      field: 'tpFinanceiro',
      headerName: 'Financeiro',
      description: 'This column has a value getter and is not sortable.',
      flex: 1,
      valueGetter: (params: GridValueGetterParams) => TP_FINANCEIRO_CONVERT[Number(params.row.tpFinanceiro)]
    },
    {
      field: 'part_actions',
      headerName: 'Ações',
      sortable: false,
      flex: 1,
      disableColumnMenu: true,
      disableReorder: true,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <div className="d-flex gap-2">
            <Link href={`/edit/${params.row.id}`}><EditIcon color="primary" /></Link>
            <button onClick={() => deleteOperation([Number(params.row.id)])}><DeleteIcon color="error" /></button>
          </div>
        );
      }
    },
  ];

  const handleSelectionChange = (selectionModel: any) => {
    setRowsToDelete(selectionModel);
  };

  return (
    <Container>
      <h5>Tela de Pesquisa</h5>

      <Card className='mt-4 p-4'>
        <div className="d-flex justify-content-between mb-3">
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

            <div className="datePicker d-flex gap-2">
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br'>
                <DatePicker
                  maxDate={dayjs().subtract(1, 'day')}
                  onChange={(newDate) => {
                    setDataPicker(prev => ({
                      ...prev,
                      operandoValor: {
                        ...prev.operandoValor,
                        dataIni: dayjs(newDate).format("YYYY-MM-DD HH:mm:ss")
                      }
                    }))
                  }} label="De" defaultValue={dayjs(dataPicker.operandoValor.dataIni)} />

                <DatePicker onChange={(newDate) => {
                  setDataPicker(prev => ({
                    ...prev,
                    operandoValor: {
                      ...prev.operandoValor,
                      dataFin: dayjs(newDate).format("YYYY-MM-DD HH:mm:ss")
                    }
                  }))
                }} label="Até" defaultValue={dayjs(dataPicker.operandoValor.dataFin)} />
              </LocalizationProvider>
            </div>
          </div>

          <div className="actions d-flex gap-2 align-items-center">
            {rowsToDelete.length > 0 && (
              <Button onClick={() => deleteOperation(rowsToDelete)} variant='contained' color="error" startIcon={<AddCircleOutlineIcon />}>
                Excluir {rowsToDelete.length} Itens
              </Button>
            )}
            <Link href='/create'>
              <Button variant='contained' startIcon={<AddCircleOutlineIcon />}>Incluir</Button>
            </Link>
          </div>
        </div>

        <DataGrid
          rows={operations ? operations : []}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 20 },
            },
          }}
          pageSizeOptions={[10, 20, 50, 100]}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={handleSelectionChange}
        />
      </Card>
    </Container>
  );
};

export default Home;
