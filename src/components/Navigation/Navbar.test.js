import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar Component', () => {
  const renderNavbar = () => {
    return render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
  };

  test('renders navbar with logo', () => {
    renderNavbar();
    expect(screen.getByText(/FitTracker/i)).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    renderNavbar();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Exercises')).toBeInTheDocument();
    expect(screen.getByText('Planner')).toBeInTheDocument();
    expect(screen.getByText('History')).toBeInTheDocument();
    expect(screen.getByText('Progress')).toBeInTheDocument();
  });

  test('all links are clickable', () => {
    renderNavbar();
    const homeLink = screen.getByText('Home').closest('a');
    expect(homeLink).toHaveAttribute('href', '/');
    
    const exercisesLink = screen.getByText('Exercises').closest('a');
    expect(exercisesLink).toHaveAttribute('href', '/exercises');
  });

  test('renders hamburger menu button', () => {
    const { container } = renderNavbar();
    const hamburger = container.querySelector('.hamburger');
    expect(hamburger).toBeInTheDocument();
  });

  test('toggles mobile menu when hamburger is clicked', () => {
    const { container } = renderNavbar();
    const hamburger = container.querySelector('.hamburger');
    fireEvent.click(hamburger);
    
    const navLinks = container.querySelector('.navLinks');
    expect(navLinks).toHaveClass('mobileMenuOpen');
  });

  test('logo is clickable and navigates to home', () => {
    renderNavbar();
    const logo = screen.getByText(/FitTracker/i).closest('a');
    expect(logo).toHaveAttribute('href', '/');
  });
});
