import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './bootstrap.min.css';
import Footer from './components/Footer';
import Header from './components/้header/Header';
import HomeScreen from './screen/HomeScreen';
import ProductScreen from './screen/ProductScreen';
import CartScreen from './screen/CartScreen.js';
import LoginScreen from './screen/LoginScreen';
import RegisterScreen from './screen/RegisterScreen';
import ProfileScreen from './screen/ProfileScreen';
import ShippingScreen from './screen/ShippingScreen';
import PaymentScreen from './screen/PaymentScreen';
import PlaceOrderScreen from './screen/PlaceOrderScreen';
import OrderScreen from './screen/OrderScreen';
import UserListScreen from './screen/UserListScreen';
import ProductsListScreen from './screen/ProductsListScreen';
import ProductEditScreen from './screen/ProductEditScreen';

function App() {
  return (
    <>
      <Router>
        <Header />
        <main className="py-3">
          <Container>
            <Route path="/login" component={LoginScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/admin/userList" component={UserListScreen} />
            <Route
              path="/admin/productList"
              component={ProductsListScreen}
              exact
            />
            <Route
              path="/admin/productList/:pageNumber"
              component={ProductsListScreen}
              exact
            />
            <Route
              path="/admin/product/:id/edit"
              component={ProductEditScreen}
            />
            <Route path="/" component={HomeScreen} exact />
            <Route path="/page/:pageNumber" component={HomeScreen} exact />
            <Route
              path="/search/:keyword/page/:pageNumber"
              component={HomeScreen}
              exact
            />
            <Route path="/search/:keyword" component={HomeScreen} exact />
          </Container>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
