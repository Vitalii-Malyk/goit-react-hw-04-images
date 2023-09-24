import React, { useState, useEffect } from 'react';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import Searchbar from 'components/Searchbar/Searchbar';
import Modal from 'components/Modal/Modal';
import IconButtonLoadMore from 'components/ButtonLoadMore/ButtonLoadMore';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import getImages from 'services/getImages';
import Loader from 'components/Loader/Loader';

import { ReactComponent as SearchIcon } from 'Icons/searchIcon.svg';

import { AppEl } from 'components/App.styled';

const App = () => {
  const [searchRequest, setSearchRequest] = useState(null);
  const [images, setImages] = useState([]);
  const [modalImg, setModalImg] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [totalImg, setTotalImg] = useState(null);

  useEffect(() => {
    if (searchRequest) {
      const serverRequest = async () => {
        try {
          const data = await getImages(searchRequest, page);
          setTotalImg(data.totalHits);
          setImages(prev => [...prev, ...data.hits]);
          setStatus('resolve');
          if (data.totalHits > 0 && page === 1) {
            Notify.info(`Found ${data.totalHits} images`);
          } else if (searchRequest === '')
            return Notify.info('Make your search request!', {
              position: 'center-center',
              timeout: 1500,
              clickToClose: true,
            });
        } catch (error) {
          setStatus('rejected');
        }
      };
      serverRequest();
    }
  }, [page, searchRequest]);

  useEffect(() => {
    setPage(1);
    clearGalleryContainer();
  }, [searchRequest]);

  const formSubmitHandler = searchRequest => {
    setSearchRequest(searchRequest);
  };

  const loadNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const clearGalleryContainer = () => {
    setImages([]);
  };

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

  const getLargeImg = url => {
    toggleModal();
    setModalImg(url);
  };

  const howManyPictures = totalImg <= page * 12;
  const paramsNotifyFailure = {
    position: 'center-center',
    timeout: 1500,
    clickToClose: true,
  };

  return (
    <AppEl>
      <Searchbar onSubmit={formSubmitHandler} />
      {totalImg === 0 &&
        Notify.failure(
          'There were no images found for your request. Try another request',
          { paramsNotifyFailure }
        )}
      {status === 'pending' && <Loader />}
      {status === 'resolve' && (
        <ImageGallery className="Gallery">
          <ImageGalleryItem images={images} onClick={getLargeImg} />
        </ImageGallery>
      )}
      {!howManyPictures && (
        <IconButtonLoadMore onClick={loadNextPage}>
          <SearchIcon width="32px" height="32px" />
          Load more...
        </IconButtonLoadMore>
      )}
      {status === 'rejected' &&
        Notify.failure('Error, try reloading the page!', {
          paramsNotifyFailure,
        })}
      {showModal && <Modal url={modalImg} onClose={toggleModal} />}
    </AppEl>
  );
};

export default App;
