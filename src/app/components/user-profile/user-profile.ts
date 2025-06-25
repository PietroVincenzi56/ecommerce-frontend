import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { User } from '../../model/user.model';
import { Order } from '../../model/order.model';
import { FormsModule } from '@angular/forms'; 


@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css'
})

export class UserProfile implements OnInit {
  
  user!: User;
  orders: Order[] = [];
  rechargeAmount: number = 0;
  rechargeMessage: string = '';


  constructor(
  private userService: UserService,
  private orderService: OrderService,
  private router: Router
  ) {}

    ngOnInit(): void {
    this.userService.getCurrentUser().subscribe({
      next: (userData) => {
        this.user = userData;
        this.loadUserOrders();
      },
      error: (err) => console.error('Errore utente', err)
    });
  }

   loadUserOrders(): void {
    this.orderService.getOrdersByUser(this.user).subscribe({
      next: (data) => this.orders = data,
      error: (err) => console.error('Errore ordini', err)
    });
  }

  goToProductDetail(productId: number): void {
    this.router.navigate(['/product', productId]);
  }

  rechargeBalance() {
    if (this.rechargeAmount <= 0) {
      this.rechargeMessage = 'Inserisci un importo valido.';
      return;
    }

    this.userService.rechargeBalance(this.user.id, this.rechargeAmount).subscribe({
      next: (updatedUser) => {
        this.user = updatedUser;
        this.rechargeAmount = 0;
        this.rechargeMessage = 'Ricarica completata con successo!';
      },
      error: (err) => {
        console.error(err);
        this.rechargeMessage = 'Errore durante la ricarica.';
      }
  });
  }



}
