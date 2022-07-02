import '../../style/itemcard.scss';

const ItemCard = (props) => {
  return (
    <div
      className="product-card"
      onClick={props.onClickHandler}
      data-id={props.id}
    >
      <p>Name: {props.image}</p>
      <p>{props.image}</p>
      <p>Description: {props.description}</p>
      <p>Price: ${props.price}</p>
    </div>
  );
};

export default ItemCard;
