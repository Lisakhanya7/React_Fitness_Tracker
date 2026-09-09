import PropTypes from 'prop-types';
import styles from './UI.module.css';

// Reusable Card component for displaying content
const Card = ({
  children,
  className = '',
  hover = true,
  onClick,
  ...props
}) => {
  const cardClass = `${styles.card} ${hover ? styles.cardHover : ''} ${className}`;

  return (
    <div
      className={cardClass}
      onClick={onClick}
      role={onClick ? 'button' : 'article'}
      tabIndex={onClick ? 0 : -1}
      {...props}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hover: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Card;
