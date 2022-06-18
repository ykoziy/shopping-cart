import React, { useEffect, useState } from 'react';
import products from '../data/products';

const Shop = () => {
  const [shopData, setShopData] = useState([]);

  useEffect(() => {
    setShopData(products);
  }, []);

  const dataToListItem = (data) => {
    return (
      <li key={data.id}>
        Name: {data.name}
        <br />
        Description: {data.description}
        <br />
        Price: {data.price}
        <br />
        Image: {data.image}
      </li>
    );
  };

  const renderProducts = () => {
    let listItems = [];
    for (let i = 0; i < shopData.length; i++) {
      listItems.push(dataToListItem(shopData[i]));
    }
    console.log(listItems);
    return listItems;
  };

  return (
    <div>
      <h1>Hello from shop.</h1>
      <ul>{renderProducts()}</ul>
    </div>
  );
};

export default Shop;
