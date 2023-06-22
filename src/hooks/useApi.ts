import { NatOperacao } from '@/types';
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://andraerp-backend-sp-dev-vagas.rj.r.appspot.com',
})

export const useApi = () => ({
  signin: async (email: string, password: string) => {
    const res = await api.post('/auth/login', { usuEMailLogin: email, usuSenhaLogin: password })
    return res;
  },
  getNatOperations: async (token: string, nmNatOperacao: NatOperacao) => {
    const res = await api.post('/natoperacao/pesquisar', {
      nmNatOperacao: [nmNatOperacao],
    }, {
      headers: {
        'x-token': token,
      },
    });
    return res.data
  },
})






