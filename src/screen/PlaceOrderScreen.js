import React, { useEffect } from 'react';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions.js';

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  // Cal price
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  //Cal Shipping price
  cart.shippingPrice = addDecimals(cart.itemsPrice > 800 ? 0 : 100);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
    // eslint-disable-next-line
  }, [history, success]);

  const placeOrderHandler = () => {
    console.log(cart.paymentMethod);
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      {' '}
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>Shipping</h3>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
                {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h3>Payment Method</h3>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h3>Order Items</h3>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid />
                        </Col>
                        <Col>
                          <Link
                            to={`/product/${item.product}`}
                            style={{ textDecoration: 'none' }}
                          >
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          <p style={{ fontSize: '12px' }}>
                            {item.qty} x {item.price} THB ={' '}
                            {item.qty * item.price}THB
                          </p>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4} style={{ marginTop: '2%' }}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3 style={{ marginTop: '1%', marginLeft: '16%' }}>
                  Order Summary
                </h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col style={{ marginLeft: '10%' }}>Items</Col>
                  <Col>{cart.itemsPrice} THB</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col style={{ marginLeft: '10%' }}>Shipping</Col>
                  <Col>{cart.shippingPrice} THB</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col style={{ marginLeft: '10%' }}>Tax</Col>
                  <Col>{cart.taxPrice} THB</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col style={{ marginLeft: '10%' }}>Total</Col>
                  <Col>{cart.totalPrice} THB</Col>
                </Row>
              </ListGroup.Item>

              {/*     <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item> */}
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                  style={{ width: '280px', marginLeft: '12%', marginTop: '3%' }}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
