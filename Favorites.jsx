import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FavoritesContext } from '../store/Favorites/context';
import { removeFromFavorites } from '../store/Favorites/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import '../style.css';

export function Favorites() {
  const { favoritesState, favoritesDispatch } = useContext(FavoritesContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const handleRemoveProduct = (productId) => {
    favoritesDispatch(removeFromFavorites(productId));
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setShowModal(false);
  };

  const handleImageClick = () => {
    setShowImageModal(true);
  };

  const handleCloseImageModal = () => {
    setShowImageModal(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <div>
      {favoritesState.products.length === 0 ? (
        <p>Nu ai produse adăugate la favorite.</p>
      ) : (
        favoritesState.products.map((product) => (
          <div key={product.id} className="my-3">
            <img className="img-fav" src={product.image} alt={product.name} />
            <h4>{product.name}</h4>
            
            <p>Autori: {product.authors && Array.isArray(product.authors) ? product.authors.join(', ') : 'Necunoscut'}</p>

            
            <Button
              variant="outline-primary"
              className="modal-footer-button"
              onClick={() => handleProductClick(product)}
            >
              Vezi detalii
            </Button>
            <Button
              variant="outline-danger"
              className="modal-footer-button"
              onClick={() => handleRemoveProduct(product.id)}
            >
              Șterge de la favorite
            </Button>
          </div>
        ))
      )}

      <Modal show={showModal} onHide={handleCloseModal}  dialogClassName="modal-dialog-centered"
        size="lg" 
      
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedProduct ? selectedProduct.name : ''}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="img-fluid rounded-shadow-image mb-3"
                onClick={handleImageClick}
                style={{ cursor: 'pointer' }}
              />

              <div className="mt-3 my-3 button-bar">
                {selectedProduct.previewLink && (
                  <a
                    href={selectedProduct.previewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="custom-link-button"
                  >
                    Previzualizează cartea
                  </a>
                )}

                {selectedProduct.readOnlineLink && (
                  <a
                    href={selectedProduct.readOnlineLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="custom-link-button"
                  >
                    Citește online
                  </a>
                )}

                {selectedProduct.buyLink && (
                  <a
                    href={selectedProduct.buyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="custom-link-button"
                  >
                    Cumpără cartea
                  </a>
                )}
              </div>

              <p>Autori: {selectedProduct.authors && Array.isArray(selectedProduct.authors) ? selectedProduct.authors.join(', ') : 'Necunoscut'}</p>

              <p>Data publicării: {selectedProduct.publishedDate || 'Necunoscută'}</p>
              <p>{selectedProduct.description || 'Descriere indisponibilă'}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleCloseModal} className="modal-footer-button">
            Închide
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showImageModal} onHide={handleCloseImageModal} centered>
        <Modal.Body>
          <img
            src={selectedProduct?.image}
            alt={selectedProduct?.name}
            className="img-fluid"
            style={{ width: '70%' }}
          />
        </Modal.Body>
      </Modal>

      {showScrollButton && (
        <Button
          variant="light"
          className="scroll-to-top-button"
          onClick={scrollToTop}
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </Button>
      )}

    </div>
  );
}
