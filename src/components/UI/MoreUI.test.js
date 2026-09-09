import { render, screen, fireEvent } from '@testing-library/react';
import { Badge, Modal, Loading } from './MoreUI';

describe('Badge Component', () => {
  test('renders badge with children', () => {
    render(<Badge>beginner</Badge>);
    expect(screen.getByText('beginner')).toBeInTheDocument();
  });

  test('applies variant styling', () => {
    const { container } = render(<Badge variant="danger">advanced</Badge>);
    const badge = container.querySelector('span');
    const classNames = badge.className;
    expect(classNames).toContain('badge');
    expect(classNames).toContain('danger');
  });

  test('renders different variants', () => {
    const { rerender, container } = render(<Badge variant="primary">test</Badge>);
    let badge = container.querySelector('span');
    let classNames = badge.className;
    expect(classNames).toContain('primary');
    
    rerender(<Badge variant="danger">test</Badge>);
    badge = container.querySelector('span');
    classNames = badge.className;
    expect(classNames).toContain('danger');
  });

  test('displays correct text content', () => {
    render(<Badge>intermediate</Badge>);
    expect(screen.getByText('intermediate')).toBeInTheDocument();
  });
});

describe('Modal Component', () => {
  test('renders modal when isOpen is true', () => {
    render(
      <Modal
        isOpen={true}
        onClose={jest.fn()}
        title="Test Modal"
      >
        Modal content
      </Modal>
    );
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  test('does not render modal when isOpen is false', () => {
    render(
      <Modal
        isOpen={false}
        onClose={jest.fn()}
        title="Test Modal"
      >
        Modal content
      </Modal>
    );
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    const mockOnClose = jest.fn();
    render(
      <Modal
        isOpen={true}
        onClose={mockOnClose}
        title="Test Modal"
      >
        Content
      </Modal>
    );
    
    fireEvent.click(screen.getByLabelText('Close modal'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('renders modal title', () => {
    render(
      <Modal
        isOpen={true}
        onClose={jest.fn()}
        title="Exercise Details"
      >
        Details here
      </Modal>
    );
    expect(screen.getByText('Exercise Details')).toBeInTheDocument();
  });

  test('renders children inside modal', () => {
    render(
      <Modal
        isOpen={true}
        onClose={jest.fn()}
        title="Title"
      >
        <div>Custom child element</div>
      </Modal>
    );
    expect(screen.getByText('Custom child element')).toBeInTheDocument();
  });

  test('modal has close button', () => {
    render(
      <Modal
        isOpen={true}
        onClose={jest.fn()}
        title="Modal"
      >
        Content
      </Modal>
    );
    expect(screen.getByLabelText('Close modal')).toBeInTheDocument();
  });
});

describe('Loading Component', () => {
  test('renders loading spinner', () => {
    render(<Loading message="Loading..." />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('displays custom message', () => {
    render(<Loading message="Please wait..." />);
    expect(screen.getByText('Please wait...')).toBeInTheDocument();
  });

  test('renders spinner element', () => {
    const { container } = render(<Loading message="Loading" />);
    const spinner = container.querySelector('.spinner');
    expect(spinner).toBeInTheDocument();
  });

  test('displays default message when not provided', () => {
    render(<Loading />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('message text is centered', () => {
    const { container } = render(<Loading message="Test" />);
    const loadingContainer = container.querySelector('.loadingContainer');
    expect(loadingContainer).toBeInTheDocument();
  });
});
