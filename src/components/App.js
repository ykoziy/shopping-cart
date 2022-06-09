import '../style/app.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';

const App = () => {
  return (
    <div className="App">
      <header>
        <div className="Logo">
          <h1>Shopping Cart!</h1>
        </div>
        <nav>
          <ul>
            <li>Home</li>
            <li>Shop</li>
            <li>About</li>
            <li>Cart</li>
          </ul>
        </nav>
      </header>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
