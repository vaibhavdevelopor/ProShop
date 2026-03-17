import { Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Product from '../components/Product';

const WishlistScreen = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(items);
  }, []);

  return (
    <>
      <h1>Your Wishlist ❤️</h1>

      {wishlist.length === 0 ? (
        <h4>No items in wishlist</h4>
      ) : (
        <Row>
          {wishlist.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default WishlistScreen;