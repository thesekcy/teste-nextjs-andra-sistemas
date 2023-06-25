import React, { createContext, useState, useEffect, useContext } from 'react';
import { useApi } from '@/hooks/useApi';
import { AuthContext } from '../Auth/AuthContext';
import { OperationsContext } from './OperationsContext';
import dayjs from 'dayjs';
import { Operacao } from '@/types';


export const OperationsProvider = ({ children }: { children: JSX.Element }) => {
  const today = new Date();
  const priorDate = new Date(new Date().setDate(today.getDate() - 30));
  const [loading, setLoading] = useState<boolean>(true)
  const [operations, setOperations] = useState<Operacao[]>([]);
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
  const api = useApi();
  const auth = useContext(AuthContext)


  useEffect(() => {
    const token = auth.getToken();
    const fetchOperations = async () => {
      const res = await api.getNatOperations(token!, nmNatOperationFilter, dhCadastrouFilter);
      setOperations(res.retorno);
      setLoading(false)
    }

    fetchOperations();
  }, [dhCadastrouFilter]);

  const addOperation = async (operation: Operacao) => {
    setOperations(prev => [...prev, operation]);
  };

  const attOperation = async (operation: Operacao) => {
    setOperations(prevOperations => prevOperations.map(op =>
      op.id === operation.id ? operation : op
    ));
  };


  return (
    <OperationsContext.Provider value={{
      operations,
      setOperations,
      loading,
      nmNatOperationFilter,
      setNmNatOperationFilter,
      dhCadastrouFilter,
      setDhCadastrouFilter,
      addOperation,
      attOperation
    }}>
      {children}
    </OperationsContext.Provider>
  );
};
