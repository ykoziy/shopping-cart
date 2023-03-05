import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import '../../style/shop.scss';
import ItemCard from './ItemCard';
import products from '../../data/products';
import { add } from '../../app/CartSlice';

const Shop = () => {
  const [shopData, setShopData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setShopData(products);
  }, []);

  const onItemAdd = (event) => {
    const targetElement = event.target.parentNode;
    const quantity = parseInt(
      targetElement.querySelector('.quantity-input #quantity').value,
    );
    let id = targetElement.getAttribute('data-id');
    let item = shopData.find((i) => i.id === id);

    if (item != null) {
      let newItem = {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        count: quantity,
      };
      dispatch(add(newItem));
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
        onAddToCart={onItemAdd}
      />
    );
  };

  const renderProducts = () => {
    let listItems = [];
    if (query === '') {
      for (const element of shopData) {
        listItems.push(dataToItemCard(element));
      }
    } else {
      for (const element of filterData) {
        listItems.push(dataToItemCard(element));
      }
    }

    return listItems;
  };

  const handleChange = (event) => {
    const userInput = event.target.value;
    const products = shopData.filter((item) => {
      if (userInput === '') return shopData;
      return item.name.toLowerCase().includes(userInput.toLowerCase());
    });
    setFilterData(products);
    setQuery(userInput);
  };

  return (
    <div className="container">
      <h1>Roasted Coffee</h1>
      <div className="search-bar">
        <input
          type="search"
          name="searchQuery"
          value={query}
          id="searchQuery"
          placeholder="Search products"
          autoComplete="off"
          onChange={handleChange}
        />
      </div>
      <div className="shopping-area">{renderProducts()}</div>
    </div>
  );
};
export default Shop;
