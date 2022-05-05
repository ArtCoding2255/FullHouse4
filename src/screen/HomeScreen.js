import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Product } from '../components/Product.js';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log('Hello');
  });

  return (
    <>
      <h1>Latest Product</h1>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
