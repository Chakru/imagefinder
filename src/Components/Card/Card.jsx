import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from './Modal/Modal';

const CardContainer = styled.div`
  margin: 30px;
`;
const CardSection = styled.div`
  justify-content: space-between;
  width: 300px; /* Debate */
  overflow: hidden;
  box-shadow: 0 0 15px 5px #888888;
  cursor: pointer;
`;
const Image = styled.image`
  overflow: hidden;
  object-fit: contain;
`;

const Card = ({ imageURL }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <CardContainer>
      <CardSection>
        <Image src={imageURL} alt="" onClick={openModal} />
      </CardSection>
      <Modal show={showModal} onClose={closeModal} imageURL={imageURL} />
    </CardContainer>
  );
};

export default Card;
