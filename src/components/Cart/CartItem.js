import '../../style/cart.scss';

const CartItem = (props) => {
  return (
    <div className="cart-item-card" data-id={props.id}>
      <div className="item">
        <div className="cart-detail-left">
          <h4>{props.name}</h4>
          <img src={props.image} alt={props.name.toLowerCase()} />
        </div>
        <div className="cart-detail-right">
          <div className="edit-product">
            <div className="top">
              <p>Each</p>
              <p>${props.price}</p>
            </div>
            <div className="middle">
              <button onClick={props.onRemoveQuantity}>-</button>
              <div className="quantity">{props.quantity}</div>
              <button onClick={props.onAddQuantity}>+</button>
            </div>
            <div className="bottom">
              <p>Total</p>
              <p>${(props.quantity * props.price).toFixed(2)}</p>
            </div>
          </div>
          <div className="interaction-container">
            <button onClick={props.onClickHandler}>Remove</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
