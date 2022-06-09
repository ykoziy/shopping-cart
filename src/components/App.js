import '../style/app.scss';
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
      <Home />
    </div>
  );
};

export default App;
