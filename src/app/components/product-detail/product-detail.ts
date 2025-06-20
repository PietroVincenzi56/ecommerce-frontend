import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/product.model';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail implements OnInit {
  product: Product | null = null;
  quantity: number = 1; 
  maxQuantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
  if (id) { //controllo che sia giusto l'id
    this.productService.getProductById(+id).subscribe({
      next: (data) => {
        this.product = data;
        this.maxQuantity = this.product?.quantity; 
      },
      error: (err) => console.error('Errore nel prodotto passato:', err)
    }); 
  }
}
  addToCart(quantity: number) {
    console.log(`Aggiunti ${quantity} prodotti al carrello`);
  }

  increase() {
  if (this.quantity < this.maxQuantity) {
    this.quantity++;
  }
}
decrease() {
  if (this.quantity > 1) {
    this.quantity--;
  }
}

}
