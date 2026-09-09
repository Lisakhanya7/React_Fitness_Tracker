import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from './SearchBar';

describe('SearchBar Component', () => {
  test('renders input field with placeholder', () => {
    render(<SearchBar placeholder="Search exercises..." />);
    expect(screen.getByPlaceholderText('Search exercises...')).toBeInTheDocument();
  });

  test('calls onChange when user types', async () => {
    const mockOnChange = jest.fn();
    render(<SearchBar onChange={mockOnChange} />);
    
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'push');
    
    expect(mockOnChange).toHaveBeenCalled();
  });

  test('displays clear button when input has value', () => {
    const { container } = render(<SearchBar onChange={jest.fn()} />);
    const input = container.querySelector('input');
    fireEvent.change(input, { target: { value: 'push-ups' } });
    
    expect(screen.getByText('✕')).toBeInTheDocument();
  });

  test('clears input when clear button is clicked', () => {
    const mockOnChange = jest.fn();
    const { container } = render(<SearchBar onChange={mockOnChange} />);
    
    const input = container.querySelector('input');
    fireEvent.change(input, { target: { value: 'push-ups' } });
    fireEvent.click(screen.getByText('✕'));
    
    expect(input.value).toBe('');
  });

  test('does not show clear button when input is empty', () => {
    render(<SearchBar onChange={jest.fn()} />);
    expect(screen.queryByText('✕')).not.toBeInTheDocument();
  });

  test('accepts default value', () => {
    const { container } = render(
      <SearchBar onChange={jest.fn()} defaultValue="squats" />
    );
    const input = container.querySelector('input');
    expect(input.value).toBe('squats');
  });
});
