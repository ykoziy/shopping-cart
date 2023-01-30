import '../../style/cartitem.scss';

const CartItem = (props) => {
  return (
    <div className="cart-item-card" data-id={props.id}>
      <div className="cart-item-top">
        <div className="cart-detail-left">
          <p>{props.name}</p>
          <p>Other data...</p>
        </div>
        <div className="cart-detail-center">
          <div className="left">
            <p>Each</p>
            <p>${props.price}</p>
          </div>
          <div className="right">
            <p>Quantity: {props.quantity}</p>
            <div className="buttons">
              <button onClick={props.onRemoveQuantity}>-</button>
              <button onClick={props.onAddQuantity}>+</button>
            </div>
          </div>
        </div>
        <div className="cart-detail-right">
          <p>Total</p>
          <p>${(props.quantity * props.price).toFixed(2)}</p>
        </div>
      </div>
      <div className="cart-item-bottom">
        <div className="interaction-container">
          <button onClick={props.onClickHandler}>Remove</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
