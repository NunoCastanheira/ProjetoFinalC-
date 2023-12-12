import { Client } from "./clients.model";
import { SaleProduct } from "./saleproducts.model";


export interface Sale {
  id: string;
  clientId: string;
  client: Client;
  saleDate: Date;
  saleProducts: SaleProduct[];
}