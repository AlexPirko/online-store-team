import './style.css';
import App from './pages/app';
import loader from './loader';

const app = new App();
app.run();

const PRODUCTS_EDPOINT = `https://dummyjson.com/products?limit=100`;

loader(PRODUCTS_EDPOINT).then((data) => console.log(data));
