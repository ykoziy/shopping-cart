import '../style/app.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Header from './Header';
import Shop from './Shop/Shop';
import About from './About';
import Cart from './Cart/Cart';
import Checkout from './Checkout';

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/shopping-cart" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
