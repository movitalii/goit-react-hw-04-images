import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css'


export default class ImageGalleryItem extends Component {
    render() {
        const { id, webformatURL, largeImageURL, onGettingImage } = this.props;

        return (
            <li key={id} className={css.ImageGalleryItem} >
                <img
                    className={css.ImageGalleryItem__Image}
                    src={webformatURL}
                    alt={id}                    
                    onClick={() => onGettingImage(largeImageURL)}
                />
            </li>    
    )}      
    
}    

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onGettingImage: PropTypes.func.isRequired,
};