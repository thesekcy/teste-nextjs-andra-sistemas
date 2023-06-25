import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SearchBarComponent, { SearchBarProps } from './';
import '@testing-library/jest-dom';

describe('SearchBarComponent', () => {
  const mockSearchOperation = jest.fn();
  const mockSetNmNatOperationFilter = jest.fn();

  const createDefaultProps = (): SearchBarProps => ({
    nmNatOperationFilter: {
      operandoTipo: '0',
      operandoValor: '',
      operador: '2'
    },
    setNmNatOperationFilter: mockSetNmNatOperationFilter,
    searchOperation: mockSearchOperation
  });

  it('renders the search bar correctly', () => {
    render(<SearchBarComponent {...createDefaultProps()} />);

    // Verifica se o campo de pesquisa está renderizado corretamente
    const searchInput = screen.getByLabelText('Pesquisa') as HTMLInputElement;
    expect(searchInput).toBeInTheDocument();
    expect(searchInput.value).toBe('');

    // Verifica se o botão de pesquisa está renderizado corretamente
    const searchButton = screen.getByRole('button');
    expect(searchButton).toBeInTheDocument();
  });


  it('updates the search value when typing in the input field', () => {
    render(<SearchBarComponent {...createDefaultProps()} />);
    const searchInput = screen.getByLabelText('Pesquisa') as HTMLInputElement;

    fireEvent.change(searchInput, { target: { value: 'example' } });

    // Aguarda a próxima renderização do componente
    setTimeout(() => {
      // Verifica se o valor do campo de pesquisa foi atualizado corretamente
      expect(searchInput.value).toBe('example');

      // Verifica se o estado foi atualizado corretamente
      expect(mockSetNmNatOperationFilter).toHaveBeenCalledWith({
        ...createDefaultProps().nmNatOperationFilter,
        operandoValor: 'example'
      });
    }, 0);
  });


  it('calls the searchOperation function when clicking the search button', () => {
    render(<SearchBarComponent {...createDefaultProps()} />);
    const searchButton = screen.getByRole('button');

    fireEvent.click(searchButton);
    expect(mockSearchOperation).toHaveBeenCalled();
  });

  it('calls the setNmNatOperationFilter function with the correct value when typing in the input field', () => {
    const defaultProps = createDefaultProps();
    render(<SearchBarComponent {...defaultProps} />);
    const searchInput = screen.getByLabelText('Pesquisa') as HTMLInputElement;

    fireEvent.change(searchInput, { target: { value: 'example' } });

    // Espera a próxima renderização do componente
    setTimeout(() => {
      // Verifica se o valor do campo de pesquisa foi atualizado corretamente
      expect(searchInput.value).toBe('example');

      // Verifica se a função setNmNatOperationFilter foi chamada corretamente
      expect(defaultProps.setNmNatOperationFilter).toHaveBeenCalledWith({
        ...defaultProps.nmNatOperationFilter,
        operandoValor: 'example'
      });
    }, 0);
  });

  it('updates the nmNatOperationFilter state with the correct value when typing in the input field', () => {
    const defaultProps = createDefaultProps();
    render(<SearchBarComponent {...defaultProps} />);
    const searchInput = screen.getByRole('textbox', { name: 'Pesquisa' }) as HTMLInputElement;

    fireEvent.change(searchInput, { target: { value: 'example' } });

    // Aguarda a próxima renderização do componente
    setTimeout(() => {
      // Verifica se o valor do campo de pesquisa foi atualizado corretamente
      expect(searchInput.value).toBe('example');

      // Verifica se a função mockSetNmNatOperationFilter foi chamada corretamente
      expect(mockSetNmNatOperationFilter.mock.calls[0][0]).toEqual({
        ...defaultProps.nmNatOperationFilter,
        operandoValor: 'example'
      });
    }, 0);
  });
});
