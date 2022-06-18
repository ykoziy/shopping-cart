import React, { useEffect, useState } from 'react';
import ItemCard from './ItemCard';
import products from '../../data/products';

const Shop = () => {
  const [shopData, setShopData] = useState([]);

  useEffect(() => {
    setShopData(products);
  }, []);

  const dataToItemCard = (data) => {
    return (
      <ItemCard
        key={data.id}
        name={data.name}
        description={data.description}
        price={data.price}
        image={data.image}
      />
    );
  };

  const renderProducts = () => {
    let listItems = [];
    for (let i = 0; i < shopData.length; i++) {
      listItems.push(dataToItemCard(shopData[i]));
    }
    console.log(listItems);
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
