import React, { useState, useEffect } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';

function ImageGallery({ query }) {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');

  useEffect(() => {
    const fetchImages = async page => {
      if (query) {
        setIsLoading(true);

        try {
          const apiKey = '38911992-4282f3ea184d2afaa0285965b';
          const response = await fetch(
            `https://pixabay.com/api/?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal`
          );

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          setImages(prevImages => [...prevImages, ...data.hits]);
        } catch (error) {
          console.error('Error fetching images:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    setImages([]);
    fetchImages(currentPage);
  }, [query, currentPage]);

  const loadMoreImages = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const openModal = imageURL => {
    setShowModal(true);
    setModalImage(imageURL);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalImage('');
  };

  const uniqueImages = images.filter(
    (image, index, self) => index === self.findIndex(img => img.id === image.id)
  );

  return (
    <div>
      <ul className="gallery">
        {uniqueImages.map(image => (
          <ImageGalleryItem
            key={image.id}
            image={image}
            onClick={() => openModal(image.largeImageURL)}
          />
        ))}
      </ul>

      {isLoading && <Loader />}

      {uniqueImages.length > 0 && !isLoading && (
        <Button onClick={loadMoreImages} />
      )}

      {showModal && <Modal imageURL={modalImage} onClose={closeModal} />}
    </div>
  );
}

export default ImageGallery;
