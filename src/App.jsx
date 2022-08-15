import React from 'react';

import { Button, Modal, Searchbar, Loader, ImageGallery } from './components';
import { usePrevious } from 'hooks/usePrevious';
import fetchData from './helpers/index';

export const App = () => {
  const totalCountRef = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [images, setImages] = React.useState([]);
  const [largeImage, setLargeImage] = React.useState({
    url: '',
    alt: '',
  });
  const [queryData, setQueryData] = React.useState({
    query: '',
    page: 1,
  });
  const previousData = usePrevious(queryData);
  const imagesOnPage = images.length;

  React.useEffect(() => {
    const fetchImages = async () => {
      try {
        const { query, page } = queryData;
        if (query !== previousData?.query && query !== '') {
          setIsLoading(isLoading => !isLoading);
          setQueryData(queryData => ({ ...queryData, page: 1 }));
          const { imagesArray, totalImages } = await fetchData({
            ...queryData,
          });
          totalCountRef.current = totalImages;
          setImages(imagesArray);
          setIsLoading(isLoading => !isLoading);
        }
        if (page !== previousData?.page && page !== 1) {
          setIsLoading(isLoading => !isLoading);
          const { imagesArray } = await fetchData({ ...queryData });
          setImages([...images, ...imagesArray]);
          setIsLoading(isLoading => !isLoading);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(isLoading => !isLoading);
        return alert('failed to fetch pictures');
      }
    };
    fetchImages();
    //eslint-disable-next-line
  }, [queryData]);

  const handeleSubmit = query =>
    setQueryData(queryData => ({ ...queryData, query }));

  const onLoadMore = () =>
    setQueryData(queryData => ({ ...queryData, page: queryData.page + 1 }));

  const onCloseModal = () => setShowModal(!showModal);

  const onOpenModal = e => {
    const currentImage = e.target.dataset.modal_version;
    const currentAlt = e.target.alt;
    setShowModal(({ showModal }) => !showModal);
    setLargeImage({ url: currentImage, alt: currentAlt });
  };

  return (
    <div className="App">
      {showModal && <Modal onClose={onCloseModal} largeImage={largeImage} />}
      <Searchbar onSubmit={handeleSubmit} />
      {isLoading && <Loader />}
      {images && <ImageGallery images={images} onOpenModal={onOpenModal} />}
      {totalCountRef.current > imagesOnPage && imagesOnPage >= 12 && (
        <Button onLoad={onLoadMore} />
      )}
    </div>
  );
};
