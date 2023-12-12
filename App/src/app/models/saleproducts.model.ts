import { Product } from "./products.model";


export interface SaleProduct {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
}
