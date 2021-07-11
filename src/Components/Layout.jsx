import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import { baseURL, ListImage, searchURL } from './../Utils/Constants';
import Card from './Card/Card';
import Search from './SearchBox/Search';
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

const NA = styled.div`
  position: absolute;
  right: 42%;
  top: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
  border-radius: 10px;
  padding: 5px;
  width: 15%;
`;

const Layout = () => {
  //Store All images fetched from the API
  const [images, setImages] = useState([]);
  // Infinte Scrolling states
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  //  Searching Tags states
  const [query, setQuery] = useState('');
  const [searchImage, setSearchImage] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

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

  // Fetching the search results from the API
  useEffect(() => {
    const searchImage = async query => {
      const results = await axios.get(searchURL(query));
      setSearchImage(results.data.photos.photo);
    };
    searchImage();
  }, [query]);

  // If no search is available
  const notAvailable = (
    <NA>
      <p>No Search found</p>
      <p>Search Again</p>
    </NA>
  );

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

  // User searching for the tag
  const searchHandler = query => {
    setQuery(query);
    if (query !== '') {
      const newImageList = searchImage.filter(searchImage => {
        return Object.values(searchImage)
          .join('')
          .toLowerCase()
          .includes(query.toLowerCase());
      });
      setSearchResults(newImageList);
    } else {
      setSearchResults(searchImage);
    }
  };

  // Display Main
  const getListToDisplay = () => {
    let display = [];
    if (query.length === 0) {
      display = images;
    } else {
      display = searchImage.filter(searchImage => {
        return Object.values(searchImage)
          .join('')
          .toLowerCase()
          .includes(query.toLowerCase());
      });
    }
    if (display.length === 0) {
      return notAvailable;
    }
    return (display = dispalyList);
  };

  return (
    <LayoutContainer>
      <Header>
        <h1>Search Images</h1>
        <Search term={query} searchKeyword={searchHandler} />
      </Header>
      {/* <CardSection>{dispalyList}</CardSection> */}
      <CardSection>{getListToDisplay()}</CardSection>
      {loading && <p>Loading...</p>}
    </LayoutContainer>
  );
};

export default Layout;
