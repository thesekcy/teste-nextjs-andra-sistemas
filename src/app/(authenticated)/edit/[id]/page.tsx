'use client'
import { useContext, useEffect, useState } from 'react';
import { Card, Container, Typography } from '@mui/material';
import { useRouter, useParams } from 'next/navigation';
import { createOrEditFormValues } from '@/schemas/createOrEditSchema';
import { AuthContext } from '@/contexts/Auth/AuthContext';
import { useApi } from '@/hooks/useApi';
import Swal from 'sweetalert2'
import FormCreateOrEditComponent from '@/components/FormCreateOrEditComponent';

export const metadata = {
  title: 'Andra Sistemas - Teste | Editar',
}

export default function RootLayout() {
  const [values, setValues] = useState<any>({})
  const auth = useContext(AuthContext)
  const api = useApi()
  const token = auth.getToken()
  const { push } = useRouter();
  const params = useParams();

  useEffect(() => {
    let idOperationFilter = {
      operandoTipo: "0",
      operandoValor: params.id,
      operador: "4"
    }

    const getOperation = async () => {
      const res = await api.getNatOperationById(token!, idOperationFilter)
      setValues({
        "nmNatOperacao": res.retorno[0].nmNatOperacao,
        "tpEstoque": res.retorno[0].tpEstoque,
        "tpFinanceiro": res.retorno[0].tpFinanceiro
      })
    }

    getOperation()
  }, [])

  async function updateOperation(dataForm: createOrEditFormValues) {
    let dataOperation = {
      "idLista": 1,
      "id": params.id,
      ...dataForm
    }

    const token = auth.getToken();
    const res = await api.updateNatOperations(token!, dataOperation)

    if (res[0].status === 200) {
      Swal.fire({
        title: 'Sucesso!',
        text: 'Operação editada com sucesso.',
        icon: 'success',
        confirmButtonText: 'Fechar'
      })
    } else {
      Swal.fire({
        title: 'Erro!',
        text: 'Erro ao tentar ediar a Operação, tente novamente.',
        icon: 'error',
        confirmButtonText: 'Fechar'
      })
    }
    push('/');
  }

  function leaveOperation() {
    Swal.fire({
      title: 'Cancelar operação?',
      text: "Deseja voltar? Todos os dados serão perdidos.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'Continuar editando',
      confirmButtonText: 'Cancelar edição'
    }).then((result) => {
      if (result.isConfirmed) {
        push('/')
      }
    })
  }

  if (values)
    return (
      <>
        <Container>
        <Typography variant="h5">Tela de manutenção - Editando <strong>{values.nmNatOperacao}</strong></Typography>
          <Card className='mt-4 p-4'>
            <FormCreateOrEditComponent
              defaultValues={values}
              onSubmit={updateOperation}
              onLeave={leaveOperation}
            />
          </Card>
        </Container>
      </>
    )
}
