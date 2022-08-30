import CartItem from './CartItem';

const Cart = (props) => {
  const handleItemClick = (event) => {
    const parentElement = event.target.parentNode.parentNode;
    const itemId = parentElement.getAttribute('data-id');
    props.onItemRemove(itemId);
    event.stopPropagation();
  };

  const cartDataToCard = (data) => {
    return (
      <CartItem
        key={data.id}
        id={data.id}
        name={data.name}
        price={data.price}
        quantity={data.count}
        onClickHandler={handleItemClick}
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
    </div>
  );
};

export default Cart;
