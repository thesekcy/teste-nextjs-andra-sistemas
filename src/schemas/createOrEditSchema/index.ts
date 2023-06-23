import zod from 'zod';

export const createOrEditSchema = zod.object({
  nmNatOperacao: zod.string().min(1, 'O campo descrição é obrigatório e deve conter no minimo 3 caracteres.').max(70, 'A descrição não pode ultrapassar 70 caracteres.'),
  tpFinanceiro: zod.string(),
  tpEstoque: zod.string(),
});

export type createOrEditFormValues = zod.infer<typeof createOrEditSchema>