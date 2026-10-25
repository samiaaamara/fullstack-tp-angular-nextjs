
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product, ProductsResponse } from '../models/product';

interface ApiProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  rating: number;
  categoryId: number;
  category: {
    id: number;
    name: string;
  };
}

interface ApiProductsResponse {
  data: ApiProduct[];
  total?: number;
  skip?: number;
  limit?: number;
}

interface ApiProductDetailResponse {
  data: ApiProduct;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:4000/api/products';

  constructor(private http: HttpClient) {}

  getProducts(
    limit: number = 12,
    skip: number = 0
  ): Observable<ProductsResponse> {
    return this.http
      .get<ApiProductsResponse>(
        `${this.apiUrl}?limit=${limit}&skip=${skip}`
      )
      .pipe(
        map((response) => {
          const allProducts = response.data ?? [];

          // Si l'API renvoie tous les produits, pagination côté client.
          const products = allProducts.length > limit
            ? allProducts.slice(skip, skip + limit)
            : allProducts;

          return {
            products: products.map((product): Product => ({
              id: product.id,
              title: product.title,
              description: product.description,
              price: product.price,
              category: product.category?.name ?? '',
              thumbnail: product.thumbnail,
              rating: product.rating
            })),
            total: response.total ?? allProducts.length,
            skip,
            limit
          };
        })
      );
  }

  getProductById(id: number): Observable<Product> {
    return this.http
      .get<ApiProductDetailResponse>(`${this.apiUrl}/${id}`)
      .pipe(
        map((response) => {
          const product = response.data;

          return {
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price,
            category: product.category?.name ?? '',
            thumbnail: product.thumbnail,
            rating: product.rating
          };
        })
      );
  }
}
