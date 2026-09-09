import PropTypes from 'prop-types';
import styles from './UI.module.css';
import Button from './Button';

// Reusable SearchBar component
const SearchBar = ({
  searchTerm = '',
  onSearch,
  onClear,
  placeholder = 'Search exercises...',
  ...props
}) => {
  return (
    <div className={styles.searchBarContainer}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearch && onSearch(e.target.value)}
        {...props}
      />
      {searchTerm && (
        <Button
          variant="secondary"
          size="small"
          onClick={onClear}
          className={styles.clearButton}
        >
          Clear
        </Button>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  searchTerm: PropTypes.string,
  onSearch: PropTypes.func,
  onClear: PropTypes.func,
  placeholder: PropTypes.string,
};

export default SearchBar;
