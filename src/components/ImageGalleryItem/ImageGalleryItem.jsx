import React from 'react';

const ImageGalleryItem = ({ image, onClick }) => (
  <li className="gallery-item" onClick={onClick}>
    <img
      src={image.webformatURL}
      alt={image.tags}
      className="gallery-item-image"
    />
  </li>
);

export default ImageGalleryItem;
