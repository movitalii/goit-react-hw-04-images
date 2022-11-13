import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from'./Modal.module.css';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {

      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageUrl } = this.props;

    return (
    <div className={css.Overlay} onClick={this.handleBackdropClick}>
        <div className={css.Modal}>
          <img src={largeImageUrl} alt="" />
        </div>
    </div>
    );
  }
}

Modal.propTypes = {
  largeImageUrl: PropTypes.string.isRequired,
};