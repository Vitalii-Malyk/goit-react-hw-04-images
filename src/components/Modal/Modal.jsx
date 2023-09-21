import { useEffect } from 'react';

import { OverlayEl, ModalEl, ImgEl } from 'components/Modal/Modal.styled';

const Modal = ({ url, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', clickEsc);
  });

  useEffect(() => {
    return () => {
      window.removeEventListener('keydown', clickEsc);
    };
  });

  const clickBackdrop = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const clickEsc = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  return (
    <OverlayEl className="overlay" onClick={clickBackdrop}>
      <ModalEl className="modal">
        <ImgEl src={url} alt="" />
      </ModalEl>
    </OverlayEl>
  );
};

export default Modal;
