import CartItem from './CartItem';

const Cart = (props) => {
  const handleEmptyCartClick = () => {
    props.onCartEmpty();
  };

  const handleRemoveItemClick = (event) => {
    const parentElement = event.target.parentNode.parentNode;
    const itemId = parentElement.getAttribute('data-id');
    props.onItemRemove(itemId);
  };

  const handleAddQuantity = (event) => {
    const parentElement = event.target.parentNode.parentNode;
    const itemId = parentElement.getAttribute('data-id');
    props.onQuantityChange(itemId, 1);
  };

  const handleRemoveQuantity = (event) => {
    const parentElement = event.target.parentNode.parentNode;
    const itemId = parentElement.getAttribute('data-id');
    props.onQuantityChange(itemId, -1);
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

  return (
    <div>
      <h1>Hello from cart.</h1>
      {renderProducts()}
      <button onClick={handleEmptyCartClick} disabled={props.cart.length === 0}>
        Empty Cart
      </button>
    </div>
  );
};

export default Cart;
