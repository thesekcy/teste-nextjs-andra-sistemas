import { NatOperacao } from '@/types';
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://andraerp-backend-sp-dev-vagas.rj.r.appspot.com',
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken')
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export const useApi = () => ({
  signin: async (email: string, password: string) => {
    const res = await api.post('/auth/login', { usuEMailLogin: email, usuSenhaLogin: password })
    return res;
  },
  getNatOperations: async (token: string, nmNatOperacao: NatOperacao, dhCadastrou = []) => {
    const res = await api.post('/natoperacao/pesquisar', {
      nmNatOperacao: [nmNatOperacao],
      dhCadastrou: [dhCadastrou]
    }, {
      headers: {
        'x-token': token,
        'Content-Type': 'application/json'
      },
    });
    return res.data
  },
  getNatOperationById: async (token: string, idNatOperacao: NatOperacao) => {
    const res = await api.post('/natoperacao/pesquisar', {
      id: [idNatOperacao],
    }, {
      headers: {
        'x-token': token,
        'Content-Type': 'application/json'
      },
    });
    return res.data
  },
  createNatOperations: async (token: string, dataOperation: any) => {
    const res = await api.post('/natoperacao/incluir', {
      lista: [dataOperation],
    }, {
      headers: {
        'x-token': token,
        'Content-Type': 'application/json'
      },
    });
    return res.data
  },
  updateNatOperations: async (token: string, dataOperation: any) => {

    console.log('dataOperation: ', dataOperation)

    const res = await api.put('/natoperacao/alterar', {
      lista: [dataOperation],
    }, {
      headers: {
        'x-token': token,
        'Content-Type': 'application/json'
      },
    });
    return res.data
  },
  deleteNatOperations: async (token: string, list: any) => {
    const res = await api.delete(`/natoperacao/excluir`, {
      data: list, headers: {
        'x-token': token,
        'Content-Type': 'application/json'
      }
    });
    return res.data
  },
})






