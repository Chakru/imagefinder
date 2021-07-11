import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import { baseURL, ListImage } from './../Utils/Constants';
import Card from './Card/Card';

import './../App.css';

const LayoutContainer = styled.div`
  padding-bottom: 200px;
  p {
    text-align: center;
    font-size: 14px;
    font-weight: bolder;
  }
`;

const Header = styled.div`
  position: sticky;
  top: 0;
  background-color: #161625;
  display: flex;
  justify-content: space-evenly;
  border-bottom: 0.1px solid lightgray;
  padding: 10px 0;
  width: 100%;
  z-index: 999;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Layout = () => {
  //Store All images fetched from the API
  const [images, setImages] = useState([]);
  // Infinte Scrolling states
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  //Fecthcing all the images from the API and re-redering based on page state
  useEffect(() => {
    const allImages = async () => {
      setLoading(true);
      const imageResources = await axios.get(baseURL(page));
      setImages(prev => [...prev, ...imageResources.data.photos.photo]);
      setLoading(false);
    };
    allImages();
  }, [page]);

  // Displaying the list and implementing infinite scroll
  const dispalyList = (
    <CardSection>
      <InfiniteScroll
        dataLength={images.length}
        next={() => setPage(page + 1)}
        hasMore={true}
        className="card__section"
      >
        {images.length > 0 &&
          images.map((image, key) => {
            return (
              <Card
                key={key}
                imageURL={ListImage(image.server, image.id, image.secret)}
              />
            );
          })}
      </InfiniteScroll>
    </CardSection>
  );

  return (
    <LayoutContainer>
      <Header>
        <h1>Search Images</h1>
      </Header>
      <CardSection>{dispalyList}</CardSection>
      {loading && <p>Loading...</p>}
    </LayoutContainer>
  );
};

export default Layout;
