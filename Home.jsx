import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SearchComponent from '../components/SearchComponent';
import { FavoritesContext } from '../store/Favorites/context';
import { addToFavorites } from '../store/Favorites/actions';
import '../style.css'; 

export function Home() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const { favoritesDispatch } = useContext(FavoritesContext);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const handleSearch = (searchTerm) => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.items || []);
      })
      .catch((error) => {
        console.error('Eroare la căutare:', error);
      });
  };

  const handleAddToFavorites = (product) => {
    const actionResult = addToFavorites(product);
    favoritesDispatch(actionResult);
  };

  const handleCardClick = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
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

  const addToFavoritesHandler = () => {
    if (selectedBook) {
      const favoriteProduct = {
        id: selectedBook.id,
        name: selectedBook.volumeInfo.title,
        authors: selectedBook.volumeInfo.authors ? selectedBook.volumeInfo.authors.join(', ') : 'Necunoscut',
        image: selectedBook.volumeInfo.imageLinks?.thumbnail,
        previewLink: selectedBook.volumeInfo.previewLink || '',
        readOnlineLink: selectedBook.accessInfo?.webReaderLink || '',
        buyLink: selectedBook.saleInfo?.buyLink || '',
        publishedDate: selectedBook.volumeInfo.publishedDate || 'Necunoscută',
        description : selectedBook.volumeInfo.description || 'Descriere indisponibilă',
      };
      handleAddToFavorites(favoriteProduct);
      console.log('Adaugă la favorite:', favoriteProduct);
    }
  };

  return (
    <div>
      <SearchComponent onSearch={handleSearch} />

      <div className="my-5">
      <h2>📚🌟 Bine ați venit în Lumea Lecturii!</h2>
        <p>📖 Aici ai șansa să cauți cartea preferată, să descoperi autori noi și să te pierzi printre paginile lor. 📚✨</p>
        <p>🌟 Explorează, citește și lasă-te inspirat de magia cuvintelor. Fiecare carte este o nouă aventură ce așteaptă să fie descoperită. 🚀❤️</p>
      
      </div>

      {searchResults.length > 0 && (
        <Container>
          <Row>
            {searchResults.map((book) => {
              const volumeInfo = book.volumeInfo;
              const imageLinks = volumeInfo.imageLinks;
              return (
                <Col key={book.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                  <Card className="card-item h-100" onClick={() => handleCardClick(book)}>
                    <Card.Img
                      variant="top"
                      src={imageLinks?.thumbnail || 'https://via.placeholder.com/150'}
                      alt="Imagine carte"
                      className="card-img-top"
                    />
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="card-title">{volumeInfo.title}</Card.Title>
                      <Card.Text className="card-text">
                        Autori: {volumeInfo.authors?.join(', ') || 'Necunoscut'}
                      </Card.Text>
                      <Button
                        variant="outline-success"
                        className="modal-footer-button mt-3"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToFavorites({
                            id: book.id,
                            name: volumeInfo.title,
                            authors: volumeInfo.authors,
                            image: imageLinks?.thumbnail,
                            previewLink: volumeInfo.previewLink || '',
                            readOnlineLink: book.accessInfo?.webReaderLink || '',
                            buyLink: book.saleInfo?.buyLink || '',
                            publishedDate: volumeInfo.publishedDate || 'Necunoscută',
                            description : volumeInfo.description || 'Descriere indisponibilă',
                          });
                        }}
                      >
                        Adaugă la favorite
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      )}

      {selectedBook && (
        <Modal
          show={showModal}
          onHide={handleCloseModal}
          dialogClassName="modal-dialog-centered"
          size="lg" 
                  >
          <Modal.Header closeButton>
            <Modal.Title>{selectedBook.volumeInfo.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={selectedBook.volumeInfo.imageLinks?.thumbnail}
              alt={selectedBook.volumeInfo.title}
              className="img-fluid rounded-shadow-image mb-3"
              onClick={handleImageClick}
              style={{ cursor: 'pointer' }}
            />

            <div className="mt-3 my-3 button-bar">
              {selectedBook.volumeInfo.previewLink && (
                <a
                  href={selectedBook.volumeInfo.previewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="custom-link-button"
                >
                  Previzualizează cartea
                </a>
              )}

              {selectedBook.accessInfo && selectedBook.accessInfo.webReaderLink && (
                <a
                  href={selectedBook.accessInfo.webReaderLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="custom-link-button"
                >
                  Citește online
                </a>
              )}

              {selectedBook.saleInfo && selectedBook.saleInfo.buyLink && (
                <a
                  href={selectedBook.saleInfo.buyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="custom-link-button"
                >
                  Cumpără cartea
                </a>
              )}
            </div>

            <p>Autor: {selectedBook.volumeInfo.authors ? selectedBook.volumeInfo.authors.join(', ') : 'Necunoscut'}</p>
            <p>Data publicării: {selectedBook.volumeInfo.publishedDate || 'Necunoscută'}</p>
            <p>{selectedBook.volumeInfo.description || 'Descriere indisponibilă'}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-success"
              onClick={addToFavoritesHandler}
              className="modal-footer-button"
              style={{ cursor: 'pointer' }}
            >
              Adaugă la favorite
            </Button>
            <Button
              variant="outline-secondary"
              onClick={handleCloseModal}
              className="modal-footer-button"
            >
              Închide
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      <Modal show={showImageModal} onHide={handleCloseImageModal} centered>
        <Modal.Body>
          <img
            src={selectedBook?.volumeInfo.imageLinks?.thumbnail}
            alt={selectedBook?.volumeInfo.title}
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