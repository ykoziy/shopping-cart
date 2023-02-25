import '../../style/cart.scss';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';

const Cart = (props) => {
  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    props.onCartEmpty();
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

  const getTax = (total, taxRate) => {
    return total * (taxRate / 100);
  };

  const cartDataToCard = (data) => {
    return (
      <CartItem
        key={data.id}
        id={data.id}
        name={data.name}
        price={data.price}
        quantity={data.count}
        image={data.image}
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
    let subTotal, tax, total;
    subTotal = getTotal();
    tax = getTax(getTotal(), 5);
    total = subTotal + tax;

    return (
      <>
        <div className="cart-summary-container">
          <div className="column1">
            <p>Item(s):</p>
          </div>
          <div className="column2">
            <p>{props.cartCount}</p>
          </div>
        </div>
        <div className="cart-summary-container">
          <div className="column1">
            <p>Subtotal:</p>
          </div>
          <div className="column2">
            <p>${subTotal.toFixed(2)}</p>
          </div>
        </div>
        <div className="cart-summary-container">
          <div className="column1">
            <p>Shipping:</p>
          </div>
          <div className="column2">
            <p>{'FREE'}</p>
          </div>
        </div>
        <div className="cart-summary-container">
          <div className="column1">
            <p>Sales Tax:</p>
          </div>
          <div className="column2">
            <p>${tax.toFixed(2)}</p>
          </div>
        </div>
        <div className="cart-summary-container top-line">
          <div className="column1">
            <p>Total:</p>
          </div>
          <div className="column2">
            <p>${total.toFixed(2)}</p>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="cart-container">
      <h1>My Cart</h1>
      <div className="cart">
        {props.cartCount !== 0 && renderProducts()}
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
