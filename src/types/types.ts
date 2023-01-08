export interface Product {
  [index: string]: string | number | string[] | number[];
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  cnt?: number;
}

export type ProductsOpts = {
  sort?: string;
  search?: string;
  [key: string]: string;
};

export enum PageIds {
  HomePage = 'home-page',
  ProductListPage = 'product-list-page',
  CartPage = 'cart-page',
  ProductDetails = 'product-details',
}

export enum ErrorTypes {
  Error_404 = '404',
}

export type LoaderCallBack = (data: { products?: Product[] }) => void;
