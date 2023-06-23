'use client'
import {Card, Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createOrEditFormValues, createOrEditSchema } from '@/schemas/createOrEditSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthContext } from '@/contexts/Auth/AuthContext';
import { useApi } from '@/hooks/useApi';
import Swal from 'sweetalert2'
import FormCreateOrEdit from '@/components/FormCreateOrEdit';

export const metadata = {
  title: 'App Next.js',
  description: 'Desc App Next.js',
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

    console.log(res)

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
        <h5>Tela de manutenção - Incluir</h5>
        <Card className='mt-4 p-4'>
          <FormCreateOrEdit
            defaultValues={values}
            onSubmit={createOperation}
            onLeave={leaveOperation}
          />
        </Card>
      </Container>
    </>
  )
}
