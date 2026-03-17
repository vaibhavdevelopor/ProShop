import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {

  // ❤️ Wishlist function
  const addToWishlist = (product) => {
    const existing = JSON.parse(localStorage.getItem('wishlist')) || [];

    const alreadyExists = existing.find((item) => item._id === product._id);

    if (!alreadyExists) {
      existing.push(product);
      localStorage.setItem('wishlist', JSON.stringify(existing));
      alert('Added to wishlist ❤️');
    } else {
      alert('Already in wishlist');
    }
  };

  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div' className='product-title'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='h3'>${product.price}</Card.Text>

        {/* ❤️ Wishlist Button */}
        <button
          onClick={() => addToWishlist(product)}
          style={{
            background: 'none',
            border: 'none',
            color: 'red',
            cursor: 'pointer',
            fontSize: '18px',
          }}
        >
          ❤️ Add to Wishlist
        </button>

      </Card.Body>
    </Card>
  );
};

export default Product;