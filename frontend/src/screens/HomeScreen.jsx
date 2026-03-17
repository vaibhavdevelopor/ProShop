import { Row, Col } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();

  // 🔥 input states
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // 🔥 applied filter state (important)
  const [appliedMin, setAppliedMin] = useState();
  const [appliedMax, setAppliedMax] = useState();

  // 🔥 query uses ONLY applied values
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
    minPrice: appliedMin,
    maxPrice: appliedMax,
  });

  // 🔥 apply filter function
  const applyFilterHandler = () => {
    setAppliedMin(minPrice || undefined);
    setAppliedMax(maxPrice || undefined);
  };

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light mb-4'>
          Go Back
        </Link>
      )}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta />
          <h1>Latest Products</h1>

          {/* 🔥 FILTER UI */}
          <div style={{ marginBottom: '20px' }}>
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              style={{ marginRight: '10px', padding: '5px' }}
            />

            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              style={{ marginRight: '10px', padding: '5px' }}
            />

            <button
              onClick={applyFilterHandler}
              style={{ padding: '5px 10px' }}
            >
              Apply Filter
            </button>
          </div>

          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>

          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;