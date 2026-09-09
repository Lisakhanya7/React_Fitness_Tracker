import styles from './common.module.css';

// Header component
const Header = ({ title, subtitle }) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <h1 className={styles.headerTitle}>{title}</h1>
        {subtitle && <p className={styles.headerSubtitle}>{subtitle}</p>}
      </div>
    </header>
  );
};

// Footer component
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerContent}>
          <p>
            © {currentYear} FitTracker. All rights reserved. | Track your fitness journey with us!
          </p>
          <div className={styles.footerLinks}>
            <a href="#privacy">Privacy Policy</a>
            <span>•</span>
            <a href="#terms">Terms of Service</a>
            <span>•</span>
            <a href="#contact">Contact</a>
          </div>
        </div>
        <p className={styles.footerTagline}>
          💪 Stay Fit, Stay Strong!
        </p>
      </div>
    </footer>
  );
};

export { Header, Footer };
