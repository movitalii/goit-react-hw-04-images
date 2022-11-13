import {useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from 'components/Button/Button';
import { ApiFetch } from 'components/API/Api'
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { toast } from 'react-toastify';
import css from './App.module.css';

export function App() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [imageName, setImageName] = useState('')
  const [page, setPage] = useState(1)
  const [largeImageURL, setLargeImageURL] = useState('')  
   
  useEffect(() => {    
    if (!imageName) {
      return;
    }

    setStatus('pending');

      ApiFetch(imageName, page)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return toast.error(`No pictures found with name ${imageName}`);
        })
        .then(data => {
          if (data.hits.length === 0) {
            setStatus('idle')
            return toast.error(`No pictures found with name ${imageName}`);
          }
          setImages(prev => [...prev, ...data.hits]);
          setStatus('idle')
        })
        .catch(error => setError(error));
  }, [imageName, page]);

  const handleSearchSubmit = imageName => {  
      setImageName(imageName);
      setPage(1);
      setImages([]);
  }
  

  const onModalOpen = largeImageURL => {
    toggleModal();
    setLargeImageURL(largeImageURL);  
  };
  
  const toggleModal = () => {
    setShowModal(!showModal);
  };      
      
       return (
        <div className={css.App}>          
          <Searchbar handleSearchSubmit={handleSearchSubmit} />
          {showModal && <Modal onModalClose={toggleModal} largeImageUrl={largeImageURL}/>}   
          {status === 'pending' && <Loader/>}  
          {images.length > 0 && <ImageGallery gallery={images} onModalOpen={onModalOpen} />}
          {status !== 'resolved' && images.length > 11 && <Button onClick={() => setPage(page + 1)} />}
          {error && toast.error(`Oops something went wrong. ${error.message}`)}
          <ToastContainer autoClose={3000} />
        </div> 
        );         
  }