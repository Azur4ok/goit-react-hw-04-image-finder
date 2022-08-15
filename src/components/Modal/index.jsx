import React from 'react';
import PropTypes from 'prop-types';

import styles from './Modal.module.css';

export const Modal = ({ onClose, largeImage }) => {
  const overlayRef = React.useRef(null);

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    //eslint-disable-next-line
  }, []);

  const handleKeyDown = e => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleCLose = e => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    <div ref={overlayRef} className={styles.overlay} onClick={handleCLose}>
      <div className={styles.modal}>
        <img src={largeImage.url} alt={largeImage.alt} loading="lazy" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImage: PropTypes.shape({
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }).isRequired,
};
