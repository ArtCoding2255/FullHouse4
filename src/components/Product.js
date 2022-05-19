import React from 'react';
import { Button, Card } from 'react-bootstrap';
import style from '../style.module.css';
import { Link } from 'react-router-dom';
import { BsBag } from 'react-icons/bs';

export const Product = ({ product }) => {
  return (
    <>
      <Card className={`rounded ${style.img}`}>
        <div className={`${style.overlay}`}>
          <Link to="/cart">
            <BsBag
              className={`${style.overlayButton}`}
              style={{ fontSize: '35px' }}
            />
          </Link>
        </div>
        <Card.Img src={product.image} />
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
