'use server';
import { SimplePaginatorResponse } from '../types/paginator-response';

type Product = {
  id: number;
  name: string;
  description?: string;
  unit_price: string;
  category_id: number;
  manufacturer_id: number;
  created_at: string;
}


export async function getProducts(perPage: number = 15): Promise<SimplePaginatorResponse<Product>> {
  const apiUrl = process.env.API_URL;
  const products = await fetch(`${apiUrl}/products?paginate=simple&perPage=${perPage}`);
  const result = await products.json();
  console.log(result);
  return result;
}