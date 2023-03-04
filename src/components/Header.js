import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../style/header.scss';

const Header = () => {
  const cartCount = useSelector((state) => state.cart.cartCount);

  const setCartCount = () => {
    if (cartCount > 0) {
      return (
        <div className="cart-count" data-testid="cart-count">
          {cartCount}
        </div>
      );
    }
  };

  return (
    <header>
      <div className="logo">
        <h1>Bean</h1>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink
              end
              to="/shopping-cart"
              className={({ isActive }) =>
                isActive ? 'active nav-link' : 'nav-link'
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              end
              to="/shop"
              className={({ isActive }) =>
                isActive ? 'active nav-link' : 'nav-link'
              }
            >
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink
              end
              to="/about"
              className={({ isActive }) =>
                isActive ? 'active nav-link' : 'nav-link'
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <Link to="/cart" className="cart" data-testid="cart-link">
              <div className="cart-icon-container">
                <svg
                  style={{ color: 'red' }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="3rem"
                  height="3rem"
                  fill="currentColor"
                  className="bi bi-cart4"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"
                    fill="#000000"
                  ></path>
                </svg>
              </div>
              {setCartCount()}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
