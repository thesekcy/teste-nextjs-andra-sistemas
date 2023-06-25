import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { createOrEditSchema } from '@/schemas/createOrEditSchema';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const FormCreateOrEdit = ({ defaultValues, onSubmit, onLeave }: { defaultValues: any, onSubmit: any, onLeave: any }) => {
  const { handleSubmit, register, control, formState: { errors }, setValue } = useForm({
    resolver: zodResolver(createOrEditSchema),
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) {
      Object.keys(defaultValues).forEach((key) => {
        setValue(key, defaultValues[key]);
      });
    }
  }, [defaultValues, setValue])

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="fields d-flex gap-2 justify-content-between mb-3">
        <TextField
          required
          label="Descrição"
          data-testid="descricao"
          fullWidth
          {...register('nmNatOperacao')}
          error={!!errors.descricao}
          InputLabelProps={{ shrink: true }}
        />

        <Controller
          name="tpEstoque"
          control={control}
          defaultValue={defaultValues?.tpEstoque || '0'}
          render={({ field }) => (

            <FormControl fullWidth>
              <InputLabel data-testid="estoque" id="tpEstoque">Estoque</InputLabel>
              <Select
                label="Estoque"
                {...register('tpEstoque')}
                {...field}
              >
                <MenuItem value="0">Nenhum</MenuItem>
                <MenuItem value="1">Saída</MenuItem>
                <MenuItem value="2">Entrada</MenuItem>
              </Select>
            </FormControl>
          )}
        />

        <Controller
          name="tpFinanceiro"
          control={control}
          defaultValue={defaultValues?.tpFinanceiro || '0'}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel id="tpFinanceiro">Financeiro</InputLabel>
              <Select
                data-testid="financeiro"
                label="Financeiro"
                {...register('tpFinanceiro')}
                {...field}
              >
                <MenuItem value="0">Nenhum</MenuItem>
                <MenuItem value="1">Receber</MenuItem>
                <MenuItem value="2">Pagar</MenuItem>
              </Select>
            </FormControl>
          )}
        />

      </div>
      <div className="errors">
        {errors.nmNatOperacao && (
          <Typography color="error" variant="body2">
            {`${errors.nmNatOperacao.message}`}
          </Typography>
        )}
      </div>

      <div className="actions">
        <div className="actions d-flex gap-3 justify-content-end">
          <Button type="submit" variant='contained' color='success' startIcon={<CheckCircleOutlineIcon />}>Salvar</Button>
          <Button onClick={onLeave} variant='contained' color='error' startIcon={<CheckCircleOutlineIcon />}>Cancelar</Button>
        </div>
      </div>
    </form>
  );
};

export default FormCreateOrEdit;
