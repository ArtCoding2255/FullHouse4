import React from 'react';
import { Card } from 'react-bootstrap';
import style from '../style.module.css';
import { Link } from 'react-router-dom';

export const Product = ({ product }) => {
  return (
    <>
      <Card className={`rounded ${style.img}`}>
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image} className={`${style.img}`}></Card.Img>
        </Link>
      </Card>

      <Card.Body style={{ border: 'none', color: '#5D5D5D', padding: '0' }}>
        <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
          <Card.Title
            as="div"
            style={{
              margin: '1% 0 0 0',
            }}
          >
            <strong>
              <p
                style={{
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  fontWeight: 'bolder',
                  marginTop: '1%',
                  marginBottom: '0',
                }}
              >
                {product.name}
              </p>
            </strong>
          </Card.Title>
        </Link>
        <Card.Text as="p">{product.price} THB</Card.Text>
      </Card.Body>
    </>
  );
};
