import { useNavigate } from 'react-router-dom';
import styles from './Pages.module.css';
import Button from '../components/UI/Button';

// NotFound page - 404 error page
const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.notFoundPage}>
      <div className={styles.notFoundContainer}>
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.errorTitle}>Page Not Found</h2>
        <p className={styles.errorMessage}>
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <div className={styles.errorActions}>
          <Button
            variant="primary"
            size="large"
            onClick={() => navigate('/')}
          >
            Go Home
          </Button>
          <Button
            variant="secondary"
            size="large"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
