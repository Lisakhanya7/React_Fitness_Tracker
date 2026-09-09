import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../components/UI/Button';

// Test Button component
describe('Button Component', () => {
  test('renders button with children', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  test('applies primary variant by default', () => {
    const { container } = render(<Button>Primary Button</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveClass('primary');
  });

  test('applies secondary variant when specified', () => {
    const { container } = render(<Button variant="secondary">Secondary Button</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveClass('secondary');
  });

  test('applies danger variant when specified', () => {
    const { container } = render(<Button variant="danger">Danger Button</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveClass('danger');
  });

  test('calls onClick handler when clicked', () => {
    const mockOnClick = jest.fn();
    render(<Button onClick={mockOnClick}>Click</Button>);
    fireEvent.click(screen.getByText('Click'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('disables button when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByText('Disabled')).toBeDisabled();
  });

  test('does not call onClick when disabled', () => {
    const mockOnClick = jest.fn();
    render(<Button onClick={mockOnClick} disabled>Disabled</Button>);
    fireEvent.click(screen.getByText('Disabled'));
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  test('applies correct size class', () => {
    const { container } = render(<Button size="large">Large Button</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveClass('large');
  });

  test('sets button type to submit', () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByText('Submit')).toHaveAttribute('type', 'submit');
  });
});
