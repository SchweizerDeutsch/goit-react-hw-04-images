import React, { useEffect } from 'react';

function Modal({ imageURL, onClose }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    const handleBackdropClick = e => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    const modalRoot = document.querySelector('#modal-root');
    modalRoot.addEventListener('click', handleBackdropClick);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      modalRoot.removeEventListener('click', handleBackdropClick);
    };
  }, [onClose]);

  return (
    <div className="Overlay">
      <div className="Modal">
        <img src={imageURL} alt="Modal" />
      </div>
    </div>
  );
}

export default Modal;
