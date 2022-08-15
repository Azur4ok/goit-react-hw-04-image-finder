import React from 'react';
import PropTypes from 'prop-types';

import styles from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [pictureName, setPictureName] = React.useState('');

  const handleChange = event => setPictureName(event.target.value);

  const handelSubmit = event => {
    event.preventDefault();
    if (!pictureName) {
      return alert('Type a word');
    }
    onSubmit(pictureName);
    setPictureName('');
  };

  return (
    <header className={styles.searchbar}>
      <form className={styles.searchForm} onSubmit={handelSubmit}>
        <button className={styles.searchForm_button} type="submit">
          <span className={styles.searchForm_button_label}>search</span>
        </button>
        <input
          className={styles.searchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={pictureName}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
