import React from 'react';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PersonIcon from '@mui/icons-material/Person';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import { logout } from '../../actions/userActions';
import style from './style.module.css';
import { BsBag } from 'react-icons/bs';
import { AiOutlineUser } from 'react-icons/ai';
import SearchBox from '../SearchBox';
import { Route, useHistory } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    history.replace('/');
  };

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light bg-light ${style.header}`}
    >
      <div className={`container-fluid `}>
        <LinkContainer to="/">
          <h5 className={style.logo}>FullHouse</h5>
        </LinkContainer>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor03"
          aria-controls="navbarColor03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
            {userInfo ? (
              userInfo.user.isAdmin ? (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userList">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <Link
                    to="/cart"
                    style={{ textDecoration: 'none', marginLeft: '3%' }}
                  >
                    <BsBag style={{ fontSize: '20px' }} />
                  </Link>

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
                style={{ textDecoration: 'none', marginLeft: '4%' }}
              >
                <AiOutlineUser style={{ fontSize: '23px' }} />
              </Link>
            )}
          </span>
        </button>

        <Route render={({ history }) => <SearchBox history={history} />} />
        <Link to="/cart" style={{ textDecoration: 'none', marginLeft: '3%' }}>
          <BsBag style={{ fontSize: '20px', color: '#222222' }} />
        </Link>
        <div className="collapse navbar-collapse ">
          {userInfo ? (
            userInfo.user.isAdmin ? (
              <NavDropdown title="Admin" id="adminmenu">
                <LinkContainer to="/admin/userList">
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to="/admin/productlist">
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>

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
            ) : (
              <>
                <NavDropdown
                  title={userInfo.user.name}
                  id="username"
                  style={{ marginLeft: '1%', marginRight: '0' }}
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/orderhistory">
                    <NavDropdown.Item>Order history</NavDropdown.Item>
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
              style={{ textDecoration: 'none', marginLeft: '4%' }}
            >
              <AiOutlineUser style={{ fontSize: '23px' }} />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
