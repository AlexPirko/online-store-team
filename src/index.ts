import './style.css';
import loader from './loader';

const PRODUCTS_EDPOINT = `https://dummyjson.com/products?limit=100`;

loader(PRODUCTS_EDPOINT, (data) => {
  console.log(data.products);
});
