import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem"
import css from './ImageGallery.module.css'

export default function ImageGallery({ gallery, onModalOpen }) {
    return (
        <ul className={css.ImageGallery}>
            {gallery.map(({ id, webformatURL, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                id={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                onGettingImage={onModalOpen}
            />
            ))}
        </ul>
    );
};

ImageGallery.propTypes = {
  onModalOpen: PropTypes.func.isRequired,
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};