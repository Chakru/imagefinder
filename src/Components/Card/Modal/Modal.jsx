import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';
import './Modal.css';

const Modal = props => {
  const closeModalOnEsc = e => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };
  useEffect(() => {
    document.body.addEventListener('keydown', closeModalOnEsc);
    const cleanUp = () => {
      document.body.addEventListener('keydown', closeModalOnEsc);
    };
    cleanUp();
  }, []);

  const stopCloseInsideModal = e => {
    e.stopPropagation();
  };
  return (
    <div
      className={`modal ${props.show ? 'show' : ''}`}
      onClick={props.onClose}
    >
      <div className="modal-content" onClick={stopCloseInsideModal}>
        <div className="modal__body">
          <img src={props.imageURL} alt="" />
        </div>
        <div className="modal__footer">
          <Button
            variant="outlined"
            color="outlined"
            onClick={props.onClose}
            endIcon={<CancelIcon />}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
