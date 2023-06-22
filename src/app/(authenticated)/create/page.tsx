'use client'
import { Inter } from 'next/font/google'
import NavComponent from '@/components/NavComponent';
import Link from 'next/link';
import { Button, Card, Container, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useState } from 'react';

export const metadata = {
  title: 'App Next.js',
  description: 'Desc App Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [tipoOperacao, setTipoOperacao] = useState(0)
  const [financeiro, setFinanceiro] = useState(0)

  return (
    <>
      <Container>
        <h6>Tela de Pesquisa</h6>

        <hr />

        <Card className='mt-4 p-4'>
          <div className="d-flex gap-2 justify-content-between mb-3">
            <TextField
              variant='filled'
              label="Descrição"
              type="email"
              fullWidth
            />

            <FormControl variant='filled' fullWidth>
              <InputLabel id="tpOperacao">Tipo de Operação</InputLabel>
              <Select
                labelId="tpOperacao"
                id="tp_operacao"
                value={tipoOperacao}
                label="Tipo de Operação"
                onChange={(e) => setTipoOperacao(Number(e.target.value))}
              >
                <MenuItem selected={tipoOperacao === 0} value={0}>Nenhum</MenuItem>
                <MenuItem selected={tipoOperacao === 1} value={1}>Saída</MenuItem>
                <MenuItem selected={tipoOperacao === 2} value={2}>Entrada</MenuItem>
              </Select>
            </FormControl>

            <FormControl variant='filled' fullWidth>
              <InputLabel id="tpFinanceiro">Financeiro</InputLabel>
              <Select
                labelId="tpFinanceiro"
                id="tp_financeiro"
                value={financeiro}
                label="Financeiro"
                onChange={(e) => setFinanceiro(Number(e.target.value))}
              >
                <MenuItem selected={financeiro === 0} value={0}>Nenhum</MenuItem>
                <MenuItem selected={financeiro === 1} value={1}>Receber</MenuItem>
                <MenuItem selected={financeiro === 2} value={2}>Pagar</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="actions d-flex gap-3 justify-content-end">
            <Button variant='contained' color='success' startIcon={<CheckCircleOutlineIcon />}>Incluir</Button>
            <Link href="/"><Button variant='contained' color='error' startIcon={<CheckCircleOutlineIcon />}>Cancelar</Button></Link>
          </div>


        </Card>
      </Container>
    </>
  )
}
