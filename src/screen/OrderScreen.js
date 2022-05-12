import React, { useEffect } from 'react';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';

import { Link } from 'react-router-dom';
import { getOrderDetails } from '../actions/orderActions.js';

const OrderScreen = ({ match }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  useEffect(() => {
    if (!order || order._id !== orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [order, orderId]);

  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  // Cal price
  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <a
                  href={`mailto${order.user.email}`}
                  style={{ textDecoration: 'none' }}
                >
                  {order.user.email}
                </a>
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="warning">Pending...</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="warning">Pending...</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link
                            to={`/product/${item.product}`}
                            style={{ textDecoration: 'none' }}
                          >
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4} style={{ fontSize: '12px' }}>
                          {item.qty} x {item.price} THB = {item.qty} *{' '}
                          {item.price} THB
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4} style={{ marginTop: '1%' }}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2 style={{ marginTop: '1%', marginLeft: '13%' }}>
                  Order Summary
                </h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col style={{ marginLeft: '10%' }}>Items</Col>
                  <Col>{order.itemsPrice} THB</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col style={{ marginLeft: '10%' }}>Shipping</Col>
                  <Col>{order.shippingPrice} THB</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col style={{ marginLeft: '10%' }}>Tax</Col>
                  <Col>{order.taxPrice} THB</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col
                    style={{
                      marginLeft: '10%',
                      fontWeight: '1000',
                      fontSize: '16px',
                    }}
                  >
                    Total
                  </Col>
                  <Col style={{ fontWeight: '1000', fontSize: '16px' }}>
                    {' '}
                    {order.totalPrice} THB
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
