import { Link } from 'react-router-dom';
import '../style/header.scss';

const Header = (props) => {
  return (
    <header>
      <div className="Logo">
        <h1>My Store</h1>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/cart">Cart ({props.cartCount})</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
