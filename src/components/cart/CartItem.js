import '../../style/cartitem.scss';

const CartItem = (props) => {
  return (
    <div className="cart-item-card" data-id={props.id}>
      <p>Name: {props.name}</p>
      <p>Price: ${props.price}</p>
      <p>Quantity: {props.quantity}</p>
      <div className="interaction-container">
        <button onClick={props.onClickHandler}>Remove</button>
      </div>
    </div>
  );
};

export default CartItem;
