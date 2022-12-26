import { Product } from '../types/types';

export default function sort(method: string, items: Product[]) {
  const arr = [...items];
  switch (method) {
    case 'Price-ASC':
      return arr.sort((a, b) => a.price - b.price);
    case 'Price-DESC':
      return arr.sort((a, b) => b.price - a.price);
    case 'Rating-ASC':
      return arr.sort((a, b) => a.rating - b.rating);
    case 'Rating-DESC':
      return arr.sort((a, b) => b.rating - a.rating);
    default:
      return items;
  }
}
