import React from 'react';
import { Card } from 'react-bootstrap';
import style from '../style.module.css';
import { Link } from 'react-router-dom';

export const Product = ({ product }) => {
  return (
    <>
      <Card className={`my-3 p-3 rounded ${style.img}`}>
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image} className={`${style.img}`}></Card.Img>
        </Link>
      </Card>

      <Card.Body style={{ border: 'none', color: '#5D5D5D' }}>
        <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
          <Card.Title
            as="div"
            style={{
              marginTop: '1%',
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
