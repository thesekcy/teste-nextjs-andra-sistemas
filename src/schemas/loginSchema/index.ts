import zod from 'zod';

export const loginSchema = zod.object({
  email: zod.string().min(1, 'O email é um campo obrigatório').email('Insira um email válido'),
  password: zod.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

export type loginFormValues = zod.infer<typeof loginSchema>