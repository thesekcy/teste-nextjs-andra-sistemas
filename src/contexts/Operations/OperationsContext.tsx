import { DhCadastrou, NatOperacao, Operacao } from '@/types'
import { createContext } from 'react'

export type OperationsContext = {
  operations: Operacao[]
  setOperations: React.Dispatch<React.SetStateAction<Operacao[]>>;
  nmNatOperationFilter: NatOperacao
  dhCadastrouFilter: DhCadastrou
  loading: boolean
  addOperation: (operation: Operacao) => Promise<void>
  attOperation: (operation: Operacao) => Promise<void>
  setNmNatOperationFilter: (filter: NatOperacao) => void
  setDhCadastrouFilter: (filter: DhCadastrou) => void
}

export const OperationsContext = createContext<OperationsContext>(null!)
