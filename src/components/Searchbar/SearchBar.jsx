import { useState } from 'react';

import PropTypes from 'prop-types';

import { FcSearch } from 'react-icons/fc';

import css from './SearchBar.module.module.css';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = event => {
    setQuery(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css['SearchForm']} onSubmit={handleSubmit}>
        <button type="submit" className={css['SearchForm-button']}>
          <span className="button-label">
            <FcSearch className={css['search-icon']} />
          </span>
        </button>

        <input
          className={css['SearchForm-input']}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
