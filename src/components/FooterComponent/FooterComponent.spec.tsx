import { render, screen } from '@testing-library/react';
import FooterComponent from '.';
import '@testing-library/jest-dom';

describe('FooterComponent', () => {
  it('renders the footer', () => {
    render(<FooterComponent />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });
});