import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import { Button } from 'components/Button/Button';
import { ApiFetch } from 'components/API/Api'
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
import { toast } from 'react-toastify';
import css from './App.module.css';

export class App extends Component {
  state = {
    images: [],
    error: null,
    status: 'idle',
    showModal: false,
    imageName: '',  
    page: 1,
    largeImageURL: '',
  }; 

  fetchImages() {
    this.setState({ status: 'pending' });

            ApiFetch(this.state.imageName, this.state.page)
                .then(response => { 
                    if (response.ok) {
                        return response.json();
                  }                   
                    return toast.error(`No pictures found with name ${this.state.imageName}`);
                })
                .then(data => {
                  const images = data.hits;
                  if (images.length === 0) {
                    this.setState({ images, status: 'idle' })
                    return toast.error(`No pictures found with name ${this.state.imageName}`);
                  }
                  
                  this.setState(prevState => ({ images: [...prevState.images, ...images], status: 'idle' }))
                  })
                .catch(error => this.setState({ error }));
        }
  

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;

    if (prevState.imageName !== this.state.imageName || prevState.page !== page ) {
      this.fetchImages();
    };
  };
  
  nextPageHandler = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };
  
  handleSearchSubmit = imageName => {
    this.setState({ imageName, page: 1, images:[] });
  };  

  // ============Modal methods============

  onModalOpen = largeImageURL => {
    this.toggleModal();
    this.setState({
      largeImageURL: largeImageURL,
    });
  };
  
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  // =========Render=========

    render() {
      const { images, error, status, showModal, largeImageURL } = this.state;
      
       return (
        <div className={css.App}>          
          <Searchbar onSubmit={this.handleSearchSubmit} />
          {showModal && <Modal onClose={this.toggleModal} largeImageUrl={largeImageURL}/>}   
          {status === 'pending' && <Loader/>}  
          {images.length > 0 && <ImageGallery gallery={images} onModalOpen={this.onModalOpen} />}
          {status !== 'resolved' && images.length > 11 && <Button onClick={this.nextPageHandler} />}
          {error && toast.error(`Oops something went wrong. ${error.message}`)}
          <ToastContainer autoClose={3000} />
        </div> 
        );           
  }
}