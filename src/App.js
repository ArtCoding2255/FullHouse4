import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './bootstrap.min.css';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screen/HomeScreen';
import ProductScreen from './screen/ProductScreen';

function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Router>
            <Switch>
              <Route path="/" component={HomeScreen} exact />
              <Route path="/product/:id?" component={ProductScreen} exact />
            </Switch>
          </Router>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
