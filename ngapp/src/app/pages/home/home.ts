
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product';
import { ProductCard } from '../../components/product-card/product-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCard],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  products: Product[] = [];
  favorites: Product[] = [];
  loading = true;
  error = '';
  currentPage = 1;
  limit = 12;
  totalProducts = 0;

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.error = '';

    const skip = (this.currentPage - 1) * this.limit;

    this.productService.getProducts(this.limit, skip).subscribe({
      next: (response) => {
        this.products = response.products;
        this.totalProducts = response.total;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur lors du chargement des produits :', err);
        this.error =
          'Impossible de charger les produits. Vérifie ta connexion Internet.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  get totalPages(): number {
    return Math.ceil(this.totalProducts / this.limit);
  }

  get pages(): number[] {
    return Array.from(
      { length: this.totalPages },
      (_, index) => index + 1
    );
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages || this.loading) {
      return;
    }

    this.currentPage = page;
    this.loadProducts();
  }
  addFavorite(product: Product): void {
  const alreadyAdded = this.favorites.some(
    (favorite) => favorite.id === product.id
  );

  if (alreadyAdded) {
    return;
  }

  this.favorites = [...this.favorites, product];
}
}
