import { render, screen } from '@testing-library/react';
import Card from '../components/UI/Card';

// Test Card component
describe('Card Component', () => {
  test('renders children content', () => {
    render(<Card>Card Content</Card>);
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  test('applies card class', () => {
    const { container } = render(<Card>Test</Card>);
    expect(container.querySelector('.card')).toBeInTheDocument();
  });

  test('applies hover class when hover prop is true', () => {
    const { container } = render(<Card hover={true}>Hoverable Card</Card>);
    const card = container.firstChild;
    expect(card).toHaveClass('cardHover');
  });

  test('does not apply hover class when hover prop is false', () => {
    const { container } = render(<Card hover={false}>Not Hoverable</Card>);
    const card = container.firstChild;
    expect(card).not.toHaveClass('cardHover');
  });

  test('renders children prop with multiple elements', () => {
    render(
      <Card>
        <h2>Title</h2>
        <p>Description</p>
      </Card>
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  test('applies custom className', () => {
    const { container } = render(<Card className="custom-class">Test</Card>);
    const card = container.firstChild;
    expect(card).toHaveClass('custom-class');
  });
});
