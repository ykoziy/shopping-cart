import '../../style/itemcard.scss';
import { useState } from 'react';

const ItemCard = (props) => {
  const [quantity, setQuantity] = useState(1);

  const onAddQuantity = () => {
    setQuantity((prevQuantity) => parseInt(prevQuantity + 1));
  };

  const onRemoveQuantity = (event) => {
    setQuantity((prevQuantity) => {
      let newCount = parseInt(prevQuantity - 1);
      if (newCount >= 1) {
        return newCount;
      }
      return 1;
    });
  };

  const handleChange = (event) => {
    const regex = /^[0-9\b]+$/;
    const value = event.target.value;
    if (value === '' || regex.test(value)) {
      setQuantity(parseInt(value) || '');
    }
  };

  return (
    <div className="product-card" data-id={props.id}>
      <h4>{props.name}</h4>
      <img src={props.image} alt={props.name.toLowerCase()} />
      <p>{props.description}</p>
      <p>${props.price}</p>
      <div className="quantity-input">
        <button onClick={onRemoveQuantity}>-</button>
        <input
          type="number"
          name="quantity"
          id="quantity"
          min="0"
          value={quantity}
          onChange={handleChange}
        />
        <button onClick={onAddQuantity}>+</button>
      </div>
      <button onClick={props.onAddToCart}>Add To Cart</button>
    </div>
  );
};

/* 
> image size 240x240, https://via.placeholder.com/240
> input field for quantity
> + and - buttons for fine tuning
> add to cart button (using input from the box, default one?)
*/

export default ItemCard;
