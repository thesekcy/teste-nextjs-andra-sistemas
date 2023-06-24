import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { DhCadastrou } from '@/types';

const CustomDatePickerComponent = ({ dhCadastrouFilter, setDhCadastrouFilter }: { dhCadastrouFilter: DhCadastrou, setDhCadastrouFilter: React.Dispatch<React.SetStateAction<DhCadastrou>>; }) => {
  return (
    <div className="datePicker d-flex gap-2">
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br'>
        <DatePicker
          maxDate={dayjs().subtract(1, 'day')}
          onChange={(newDate) => {
            setDhCadastrouFilter(prev => ({
              ...prev,
              operandoValor: {
                ...prev.operandoValor,
                dataIni: dayjs(newDate).format("YYYY-MM-DD HH:mm:ss")
              }
            }))
          }}
          label="De"
          defaultValue={dayjs(dhCadastrouFilter.operandoValor.dataIni)}
        />

        <DatePicker
          onChange={(newDate) => {
            setDhCadastrouFilter(prev => ({
              ...prev,
              operandoValor: {
                ...prev.operandoValor,
                dataFin: dayjs(newDate).format("YYYY-MM-DD HH:mm:ss")
              }
            }))
          }}
          label="Até"
          defaultValue={dayjs(dhCadastrouFilter.operandoValor.dataFin)}
        />
      </LocalizationProvider>
    </div>
  );
};

export default CustomDatePickerComponent;
