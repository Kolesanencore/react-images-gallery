import { useState, useEffect } from 'react';

import { fetchImages } from 'services/pixabayAPI';

import Searchbar from './Searchbar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showButton, setShowButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!query) return;
    setIsLoading(true);

    fetchImages(query, page)
      .then(({ images: fetchedImages, totalHits }) => {
        setImages(prevImages => [...prevImages, ...fetchedImages]);
        setShowButton(page < Math.ceil(totalHits / 12));
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [query, page]);

  const handleSearchSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
    setShowButton(false);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = (src, alt) => {
    setShowModal({ src, alt });
  };

  const closeModal = () => {
    setShowModal(null);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: 16,
        paddingBottom: 24,
      }}
    >
      <Searchbar onSubmit={handleSearchSubmit} />

      <ImageGallery images={images} onImageClick={openModal} />

      {isLoading && <Loader visible={isLoading} />}

      {images.length > 0 && !isLoading && showButton && (
        <Button onClick={handleLoadMore} />
      )}

      {showModal && (
        <Modal
          src={showModal.src}
          alt={showModal.alt}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default App;
