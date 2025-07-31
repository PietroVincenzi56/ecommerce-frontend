import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/product.model';
import { FormsModule } from '@angular/forms';
import { KeycloakService } from 'keycloak-angular';
import { CartService } from '../../services/cart.service';
import { UserService } from '../../services/user.service';


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
    private keycloakService: KeycloakService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private userService: UserService,
  ) {}

  async ngOnInit() {
  const isLoggedIn = await this.keycloakService.isLoggedIn();

  if (isLoggedIn) {
    this.userService.getCurrentUser();
  }

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
  async addToCart(quantity: number) {
    const loggedIn = await this.keycloakService.isLoggedIn();
    if (!loggedIn) {
      await this.keycloakService.login({ redirectUri: window.location.href });
      return; // dopo il login, l’utente sarà riportato qui di nuovo loggato
  }
  // chiamata backend per sincronizzare i dati utente
    const user = await this.userService.getCurrentUser(); // fa una chiamata a /users/me
    
    if (!this.product?.id) {
      console.error('Prodotto non valido');
      return;
    }

    //  Utente loggato: aggiungi al carrello
    this.cartService.addToCart(this.product.id, quantity).subscribe({
      next: () => {
        alert(`Aggiunti ${quantity} prodotti al carrello`);
      },
      error: (err) => console.error('Errore nell\'aggiunta al carrello:', err),
    });
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
