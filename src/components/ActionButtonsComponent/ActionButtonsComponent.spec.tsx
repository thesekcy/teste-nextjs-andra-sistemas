import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ActionButtonsComponent from '.';
import '@testing-library/jest-dom';

describe('ActionButtonsComponent', () => {
  const mockDeleteOperation = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Include button correctly', () => {
    render(<ActionButtonsComponent rowsToDelete={[]} deleteOperation={mockDeleteOperation} />);
    const addButton = screen.getByRole('button', { name: 'Incluir' });
    expect(addButton).toBeInTheDocument();
  });

  it('does not render the Delete button when rowsToDelete is empty', () => {
    render(<ActionButtonsComponent rowsToDelete={[]} deleteOperation={mockDeleteOperation} />);
    const deleteButton = screen.queryByText('Excluir');
    expect(deleteButton).not.toBeInTheDocument();
  });

  it('renders the Delete button and displays the correct item count when rowsToDelete is not empty', () => {
    render(<ActionButtonsComponent rowsToDelete={[1, 2, 3]} deleteOperation={mockDeleteOperation} />);
    const deleteButton = screen.getByText('Excluir 3 Itens');
    expect(deleteButton).toBeInTheDocument();
  });

  it('renders the Delete button and displays the correct item count when rowsToDelete length changes', () => {
    const { rerender } = render(<ActionButtonsComponent rowsToDelete={[1, 2, 3]} deleteOperation={mockDeleteOperation} />);
    rerender(<ActionButtonsComponent rowsToDelete={[1, 2, 3, 4]} deleteOperation={mockDeleteOperation} />);
    const deleteButton = screen.getByText('Excluir 4 Itens');
    expect(deleteButton).toBeInTheDocument();
  });

  it('calls deleteOperation with the correct ids when the Delete button is clicked', () => {
    render(<ActionButtonsComponent rowsToDelete={[1, 2, 3]} deleteOperation={mockDeleteOperation} />);
    const deleteButton = screen.getByText('Excluir 3 Itens');
    fireEvent.click(deleteButton);
    expect(mockDeleteOperation).toHaveBeenCalledWith([1, 2, 3]);
  });

  it('does not call deleteOperation when there are no items to delete', () => {
    render(<ActionButtonsComponent rowsToDelete={[]} deleteOperation={mockDeleteOperation} />);
    expect(mockDeleteOperation).not.toHaveBeenCalled();
  });
});
