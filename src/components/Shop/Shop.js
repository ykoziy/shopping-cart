import React, { useEffect, useState } from 'react';
import ItemCard from './ItemCard';
import products from '../../data/products';

const Shop = (props) => {
  const [shopData, setShopData] = useState([]);

  useEffect(() => {
    setShopData(products);
  }, []);

  const handleItemClick = (event) => {
    let targetElement;
    if (event.target.nodeName !== 'DIV') {
      targetElement = event.target.parentNode;
    } else {
      targetElement = event.target;
    }
    let id = targetElement.getAttribute('data-id');
    let item = shopData.find((i) => i.id === id);
    if (item != null) {
      let newItem = {
        id: item.id,
        name: item.name,
        price: item.price,
        count: 1,
      };
      props.onUpdate(newItem);
    }
    event.stopPropagation();
  };

  const dataToItemCard = (data) => {
    return (
      <ItemCard
        key={data.id}
        id={data.id}
        name={data.name}
        description={data.description}
        price={data.price}
        image={data.image}
        onClickHandler={handleItemClick}
      />
    );
  };

  const renderProducts = () => {
    let listItems = [];
    for (const element of shopData) {
      listItems.push(dataToItemCard(element));
    }
    return listItems;
  };

  return (
    <div>
      <h1>Hello from shop.</h1>
      {renderProducts()}
    </div>
  );
};

export default Shop;
