import '../../style/itemcard.scss';

const ItemCard = (props) => {
  return (
    <div className="product-card">
      <p>Name: {props.image}</p>
      <p>{props.image}</p>
      <p>Description: {props.description}</p>
      <p>Price: ${props.price}</p>
    </div>
  );
};

export default ItemCard;
