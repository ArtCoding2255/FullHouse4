import React, { useState } from 'react';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PersonIcon from '@mui/icons-material/Person';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from 'react-bootstrap';
import { logout } from '../../actions/userActions';
import style from './style.module.css';
import { BsBag } from 'react-icons/bs';
import { AiOutlineUser } from 'react-icons/ai';
import SearchBox from '../SearchBox';
import { Route, useHistory } from 'react-router-dom';

const HeaderTwo = () => {
  const [showNav, setShowNav] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    history.replace('/');
  };

  const toggleNav = () => {
    setShowNav(!showNav);
  };

  const [keyword, setKeyword] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  const renderDropdown = () => <></>;

  return (
    <Navbar
      className="navbar navbar-expand-lg navbar-light bg-f5f5f5"
      expand="md"
      style={{ boxShadow: ' 0 0.5rem 1rem rgba(0, 0, 0, 0.1)' }}
    >
      <Container fluid>
        <Navbar.Brand
          style={{ letterSpacing: '6px', fontSize: '24px' }}
          href="/"
        >
          FullHouse
        </Navbar.Brand>
        <div className="p-2 d-flex gap-2 align-items-center">
          <Link
            to="/cart"
            style={{ textDecoration: 'none', marginLeft: '5px' }}
          >
            <BsBag
              className="d-block d-md-none"
              style={{ fontSize: '28px', color: '#222222' }}
            />
          </Link>
          <Link
            to="/login"
            style={{ textDecoration: 'none', marginLeft: '5px' }}
          >
            <AiOutlineUser
              className="d-block d-md-none"
              style={{ fontSize: '28px', color: '#222222' }}
            />
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
        </div>

        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          ></Nav>
          <div className="d-flex align-items-center"></div>
          <Form className="d-flex" onSubmit={submitHandler}>
            <FormControl
              type="text"
              name="q"
              placeholder="Search product.."
              className="me-2"
              aria-label="Search"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <Button type="submit" style={{ backgroundColor: '1A1A1A1A' }}>
              Search
            </Button>
          </Form>
          <Link
            to="/cart"
            style={{
              textDecoration: 'none',
              marginLeft: '8px',
              marginLeft: '20px',
            }}
          >
            <BsBag
              className="d-md-block d-none"
              style={{ fontSize: '28px', color: '#222222' }}
            />
          </Link>

          {userInfo ? (
            userInfo.user.isAdmin ? (
              <NavDropdown title="Admin" id="adminmenu">
                <LinkContainer to="/admin/userList">
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to="/admin/productlist">
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to="/orderhistory">
                  <NavDropdown.Item>My order history</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <NavDropdown
                  title={userInfo.user.name}
                  id="username"
                  style={{ marginLeft: '1%', marginRight: '0' }}
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>My profile</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/orderhistory">
                    <NavDropdown.Item>My order history</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )
          ) : (
            <Link
              to="/login"
              style={{ textDecoration: 'none', marginLeft: '20px' }}
            >
              <AiOutlineUser
                className="d-md-block d-none"
                style={{ fontSize: '28px', color: '#222222' }}
              />
            </Link>
          )}
        </Navbar.Collapse>
        {renderDropdown()}
      </Container>
    </Navbar>
  );
};
export default HeaderTwo;
