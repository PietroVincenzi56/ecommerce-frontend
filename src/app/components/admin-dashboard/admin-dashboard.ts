import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
import { User } from '../../model/user.model';
import { Product } from '../../model/product.model';
import { Order } from '../../model/order.model';
import { KeycloakService } from 'keycloak-angular';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})

export class AdminDashboard implements OnInit {

  users: User[] = [];
  products: Product[] = [];
  orders: Order[] = [];
  newProduct: Partial<Product> = {
    name: '',
    description: '',
    price: 0,
    quantity: 1
  };

  editingProduct: Product | null = null;


  constructor(
    private keycloakService: KeycloakService,
    private userService: UserService,
    private productService: ProductService,
    private orderService: OrderService
  ) {}

    ngOnInit(): void {
    this.loadUsers();
    this.loadProducts();
    this.loadOrders();
  }

  loadUsers() {
      this.userService.getAllUsers().subscribe({
      next: users => this.users = users,
      error: err => console.error('Errore caricamento utenti:', err)
    });
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe({
      next: products => this.products = products,
      error: err => console.error('Errore caricamento prodotti:', err)
    });
  }

  loadOrders(){
    this.orderService.getAllOrders().subscribe({
      next: orders => this.orders = orders,
      error: err => console.error('Errore caricamento prodotti:', err)  
    })
  }


  addProduct() {
    this.productService.createProduct(this.newProduct as Product).subscribe({
      next: () => {
        this.loadProducts();
        this.newProduct = { name: '', description: '', price: 0, quantity: 1 };
        alert('Prodotto aggiunto!');
      },
      error: err => alert('Errore aggiunta prodotto: ' + err.message)
    });
  }

 startEditing(product: Product) {
    this.editingProduct = { ...product }; 
  }

  cancelEdit() {
    this.editingProduct = null;
  }

  saveProduct() {
    if (!this.editingProduct) return;

    this.productService.updateProduct(this.editingProduct.id, this.editingProduct).subscribe({
      next: () => {
        this.loadProducts();
        this.editingProduct = null;
        alert('Prodotto aggiornato con successo!');
      },
      error: err => alert('Errore aggiornamento: ' + err.message)
    });
  }

  deleteProduct(productId: number) {
    if (confirm('Sei sicuro di voler eliminare questo prodotto?')) {
      this.productService.deleteProduct(productId).subscribe({
        next: () => {
          this.loadProducts();
          alert('Prodotto eliminato.');
        },
        error: err => alert('Errore eliminazione: ' + err.message)
      });
    }
  }
}

