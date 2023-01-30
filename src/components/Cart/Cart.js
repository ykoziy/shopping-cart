import '../../style/cart.scss';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';

const Cart = (props) => {
  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    navigate('/checkout');
  };

  const handleEmptyCartClick = () => {
    props.onCartEmpty();
  };

  const handleRemoveItemClick = (event) => {
    const parentElement = event.target.parentElement.closest('.cart-item-card');
    const itemId = parentElement.getAttribute('data-id');
    props.onItemRemove(itemId);
  };

  const handleAddQuantity = (event) => {
    const parentElement = event.target.parentElement.closest('.cart-item-card');
    const itemId = parentElement.getAttribute('data-id');
    props.onQuantityChange(itemId, 1);
  };

  const handleRemoveQuantity = (event) => {
    const parentElement = event.target.parentElement.closest('.cart-item-card');
    const itemId = parentElement.getAttribute('data-id');
    props.onQuantityChange(itemId, -1);
  };

  const getTotal = () => {
    let total = 0;
    props.cart.forEach((item) => {
      total += item.price * item.count;
    });
    return total;
  };

  const cartDataToCard = (data) => {
    return (
      <CartItem
        key={data.id}
        id={data.id}
        name={data.name}
        price={data.price}
        quantity={data.count}
        onClickHandler={handleRemoveItemClick}
        onAddQuantity={handleAddQuantity}
        onRemoveQuantity={handleRemoveQuantity}
      />
    );
  };

  const renderProducts = () => {
    let listItems = [];
    for (const element of props.cart) {
      listItems.push(cartDataToCard(element));
    }
    return listItems;
  };

  const renderTotals = () => {
    return (
      <>
        <h3>Cart Totals</h3>
        <div className="container">
          <div className="column1">
            <p>Count:</p>
            <p>Total:</p>
          </div>
          <div className="column2">
            <p>{props.cartCount}</p>
            <p>${getTotal().toFixed(2)}</p>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="cart-container">
      <h1>My Cart</h1>
      <div className="cart">
        {props.cartCount !== 0 && (
          <div className="cart-list">{renderProducts()}</div>
        )}
        {props.cartCount !== 0 && (
          <div className="cart-info">
            {renderTotals()}
            <div className="btn-container">
              <button
                onClick={handleEmptyCartClick}
                disabled={props.cart.length === 0}
              >
                Empty Cart
              </button>
              <button onClick={handleCheckoutClick}>Checkout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
