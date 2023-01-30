import '../style/app.scss';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Header from './Header';
import Shop from './Shop/Shop';
import About from './About';
import Cart from './Cart/Cart';
import Checkout from './Checkout';

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
      setCart(newCart);
      setCartCount(totalCount);
    } else {
      setCart([...cart, newItem]);
      setCartCount(cartCount + newItem.count);
    }
  };

  const onItemRemove = (itemId) => {
    let countRemoved = 0;
    let newCart = cart.filter((item) => {
      if (item.id === itemId) {
        countRemoved = item.count;
      }
      return item.id !== itemId;
    });
    setCart(newCart);
    setCartCount(cartCount - countRemoved);
  };

  const onQuantityChange = (itemId, count) => {
    let itemCount = 0;
    let newCart = cart.map((item) => {
      if (item.id === itemId) {
        let newCount = item.count + count;
        itemCount += newCount;
        return { ...item, count: newCount };
      }
      return item;
    });

    if (itemCount === 0) {
      onItemRemove(itemId);
    } else {
      setCart(newCart);
      setCartCount(cartCount + count);
    }
  };

  const onCartEmpty = () => {
    setCart([]);
    setCartCount(0);
  };

  return (
    <div className="app">
      <BrowserRouter>
        <Header cartCount={cartCount} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop onUpdate={onUpdate} />} />
          <Route
            path="/checkout"
            element={<Checkout cartCount={cartCount} cart={cart} />}
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/cart"
            element={
              <Cart
                onUpdate={onUpdate}
                onItemRemove={onItemRemove}
                onCartEmpty={onCartEmpty}
                onQuantityChange={onQuantityChange}
                cartCount={cartCount}
                cart={cart}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
