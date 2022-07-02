import '../style/app.scss';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Header from './Header';
import Shop from './Shop/Shop';
import About from './About';
import Cart from './Cart';

const App = () => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const onUpdate = (newItem) => {
    let isUpdated = false;
    let totalCount = 0;
    let newCart = cart.map((item) => {
      if (item.id === newItem.id) {
        isUpdated = true;
        let newCount = item.count + newItem.count;
        totalCount += newCount;
        return { ...item, count: newCount };
      }
      totalCount++;
      return item;
    });

    if (isUpdated) {
      console.log('update');
      setCart(newCart);
      setCartCount(totalCount);
    } else {
      console.log('new');
      setCart([...cart, newItem]);
      setCartCount(cartCount + 1);
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Header cartCount={cartCount} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/shop"
            element={<Shop onUpdate={onUpdate} ShoppingCart />}
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/cart"
            element={<Cart onUpdate={onUpdate} cartCount={cartCount} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
