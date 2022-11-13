import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from'./Modal.module.css';

export const Modal = ({ largeImageUrl, onModalClose }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onModalClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onModalClose]);  

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

    return (
    <div className={css.Overlay} onClick={handleBackdropClick}>
        <div className={css.Modal}>
          <img src={largeImageUrl} alt="" />
        </div>
    </div>
    );
  }

Modal.propTypes = {
  largeImageUrl: PropTypes.string.isRequired,
};