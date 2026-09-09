import { render, screen } from '@testing-library/react';
import { Header, Footer } from './HeaderFooter';

describe('Header Component', () => {
  test('renders title', () => {
    render(<Header title="Home" />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  test('renders subtitle when provided', () => {
    render(<Header title="Home" subtitle="Welcome back!" />);
    expect(screen.getByText('Welcome back!')).toBeInTheDocument();
  });

  test('does not render subtitle when not provided', () => {
    render(<Header title="Home" />);
    expect(screen.queryByText(/subtitle/i)).not.toBeInTheDocument();
  });

  test('applies correct styling to title', () => {
    const { container } = render(<Header title="Exercises" />);
    const titleElement = container.querySelector('h1');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('Exercises');
  });

  test('header has proper structure', () => {
    const { container } = render(<Header title="Test" subtitle="Subtitle" />);
    const header = container.querySelector('.header');
    expect(header).toBeInTheDocument();
  });
});

describe('Footer Component', () => {
  test('renders footer', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  test('displays copyright year dynamically', () => {
    const currentYear = new Date().getFullYear();
    render(<Footer />);
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
  });

  test('renders footer links', () => {
    render(<Footer />);
    expect(screen.getByText('Privacy')).toBeInTheDocument();
    expect(screen.getByText('Terms')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  test('displays tagline', () => {
    render(<Footer />);
    expect(screen.getByText(/Your fitness journey/i)).toBeInTheDocument();
  });

  test('footer links are clickable', () => {
    render(<Footer />);
    const privacyLink = screen.getByText('Privacy').closest('a');
    expect(privacyLink).toHaveAttribute('href');
  });

  test('footer has proper styling applied', () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector('.footer');
    expect(footer).toBeInTheDocument();
  });
});
