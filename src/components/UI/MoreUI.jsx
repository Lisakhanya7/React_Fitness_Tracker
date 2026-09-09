import PropTypes from 'prop-types';
import styles from './UI.module.css';

// Badge component for displaying labels
const Badge = ({ children, variant = 'default', ...props }) => {
  const badgeClass = `${styles.badge} ${styles[`badge${variant}`]}`;

  return (
    <span className={badgeClass} {...props}>
      {children}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'primary', 'danger', 'success']),
};

// Modal component
const Modal = ({
  children,
  isOpen = false,
  onClose,
  title,
  ...props
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose} {...props}>
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        {title && <h2 className={styles.modalTitle}>{title}</h2>}
        {children}
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
};

// Loading component
const Loading = ({ message = 'Loading...' }) => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p>{message}</p>
    </div>
  );
};

Loading.propTypes = {
  message: PropTypes.string,
};

export { Badge, Modal, Loading };
