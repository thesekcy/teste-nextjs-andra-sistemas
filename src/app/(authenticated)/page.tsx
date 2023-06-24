'use client';
import React, { useContext, useEffect, useState } from 'react';
import { Container, Card, Typography } from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { useApi } from '@/hooks/useApi';
import { AuthContext } from '@/contexts/Auth/AuthContext';
import Swal from 'sweetalert2';
import { formatDeleteObject } from '@/functions';
import SearchBarComponent from '@/components/SearchBarComponent';
import CustomDatePickerComponent from '@/components/DatePickerComponent';
import ActionButtonsComponent from '@/components/ActionButtonsComponent';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Operacao } from '@/types';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { TP_ESTOQUE_CONVERT } from './../../constants/tpEstoqueConvert';
import { TP_FINANCEIRO_CONVERT } from '@/constants/tpFinanceiroConvert';
import Link from 'next/link';


const Home = () => {
  const today = new Date();
  const priorDate = new Date(new Date().setDate(today.getDate() - 30));

  const [operations, setOperations] = useState<Operacao[]>([]);
  const [rowsToDelete, setRowsToDelete] = useState<number[]>([]);
  const [nmNatOperationFilter, setNmNatOperationFilter] = useState({
    operandoTipo: "0",
    operandoValor: "",
    operador: "2"
  });

  const [dhCadastrouFilter, setDhCadastrouFilter] = useState({
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
      const res = await api.getNatOperations(token!, nmNatOperationFilter, dhCadastrouFilter);
      setOperations(res.retorno);
    };

    getOperations();
  }, [dhCadastrouFilter]);


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

  async function deleteOperation(ids: number[]) {

    Swal.fire({
      title: 'Deseja realmente excluir?',
      text: "Todos os dados excluidos serão perdidos.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Excluir mesmo assim'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await api.deleteNatOperations(token!, formatDeleteObject(ids));

        if (res.every((item: { status: number; }) => item.status === 200)) {
          setOperations(prevOperations => {
            const updatedOperations = prevOperations.filter(op => {
              return op.id !== undefined && !ids.includes(op.id);
            });
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
    })


  }

  async function searchOperation() {
    const res = await api.getNatOperations(token!, nmNatOperationFilter, dhCadastrouFilter);
    setOperations(res.retorno);
  }


  const handleSelectionChange = (selectionModel: any) => {
    setRowsToDelete(selectionModel);
  };


  return (
    <Container>
      <Typography variant="h5">Tela de Pesquisa</Typography>

      <Card className='mt-4 mb-5 p-4'>
        <div className="d-flex justify-content-between mb-4">
          <div className="filters d-flex gap-2">
            <SearchBarComponent
              nmNatOperationFilter={nmNatOperationFilter}
              setNmNatOperationFilter={setNmNatOperationFilter}
              searchOperation={searchOperation}
            />

            <CustomDatePickerComponent
              dhCadastrouFilter={dhCadastrouFilter}
              setDhCadastrouFilter={setDhCadastrouFilter}
            />
          </div>
          <ActionButtonsComponent
            rowsToDelete={rowsToDelete}
            deleteOperation={deleteOperation}
          />
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
