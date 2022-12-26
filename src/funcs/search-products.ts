import { Product } from "../types/types";

export default function search(products: Product[], filterValue: string): Product[] {
  let result = [...products];
  if (typeof +filterValue === 'number' && !isNaN(+filterValue)) {
    console.log('SEARCH NUMBER');
    result = result.filter(({ price, stock }) => {
      const value = +filterValue;
      return (value === price) || (value === stock);
    });
  } else {
    console.log('SEARCH STRING');
    result = result.filter(({ title, description, brand, category }) => {
      const searchString = `${title} ${description} ${brand} ${category}`;
      return searchString.indexOf(filterValue) !== -1;
    });
  }
  console.log(result);
  return result;
}