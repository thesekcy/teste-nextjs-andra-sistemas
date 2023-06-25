'use client'
import { Card, Container, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { createOrEditFormValues } from '@/schemas/createOrEditSchema';
import { AuthContext } from '@/contexts/Auth/AuthContext';
import { useApi } from '@/hooks/useApi';
import Swal from 'sweetalert2'
import FormCreateOrEditComponent from '@/components/FormCreateOrEditComponent';

export const metadata = {
  title: 'Andra Sistemas - Teste | Criar',
}

export default function RootLayout() {
  const [values, setValues] = useState<any>({})
  const auth = useContext(AuthContext)
  const api = useApi()
  const { push } = useRouter();

  async function createOperation(dataForm: createOrEditFormValues) {
    let dataOperation = {
      "idLista": 1,
      ...dataForm
    }

    const token = auth.getToken();
    const res = await api.createNatOperations(token!, dataOperation)

    if (res[0].status === 200) {
      Swal.fire({
        title: 'Sucesso!',
        text: 'Operação incluida com sucesso.',
        icon: 'success',
        confirmButtonText: 'Fechar'
      })
    } else {
      Swal.fire({
        title: 'Erro!',
        text: 'Erro ao tentar incluir a Operação, tente novamente.',
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

  return (
    <>
      <Container>
        <Typography variant="h5">Tela de manutenção - Incluir</Typography>
        <Card className='mt-4 p-4'>
          <FormCreateOrEditComponent
            defaultValues={values}
            onSubmit={createOperation}
            onLeave={leaveOperation}
          />
        </Card>
      </Container>
    </>
  )
}
