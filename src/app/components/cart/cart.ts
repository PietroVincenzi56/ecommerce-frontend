import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { CartService, CartItem } from '../../services/cart.service';
import { Order } from '../../model/order.model';
import { User } from '../../model/user.model'; 
import { UserService } from '../../services/user.service';
import { OrderService } from '../../services/order.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  user!: User;

  constructor(
    private cartService: CartService,
    private userService: UserService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.user = user;
        this.loadCart();
      },
      error: (err) => {
        console.error('Errore nel recupero utente:', err);
      }
    });
  }

  loadCart(): void {
    this.cartService.getCart().subscribe({
      next: (cart) => this.cartItems = cart.items,
      error: (err) => console.error('Errore nel caricamento del carrello', err)
    });
  }

  removeItem(productId: number): void {
    this.cartService.removeItem(productId).subscribe({
      next: (cart) => this.cartItems = cart.items,
      error: (err) => console.error('Errore nella rimozione', err)
    });
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  orderNow(): void {
    console.log('Ordina ora cliccato');
    if (!this.user || this.cartItems.length === 0) return;

    const productOrders = this.cartItems.map(item => ({
      product: item.product,
      quantity: item.quantity,
      priceAtPurchase: item.product.price
    }));

    const order: Order = {
      buyer: this.user,
      productOrders: productOrders,
    };

    this.orderService.addOrder(order).subscribe({
      next: () => {
        this.cartService.clearCart().subscribe({
          next: () => {
            this.cartItems = [];
            alert('Ordine effettuato con successo!');
          },
          error: err => console.error('Errore durante lo svuotamento del carrello', err)
        });
      },
        error: (err) => {
      console.error('Errore durante l\'ordine:', err);
      let message = 'Errore durante l\'ordine.';
      if (err.error && err.error.message) {
        message += ' ' + err.error.message;
      }
      alert(message);
    }
    });
  }
}
