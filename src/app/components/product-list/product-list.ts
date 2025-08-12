import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';
import { Product } from '../../model/product.model';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { KeycloakService } from 'keycloak-angular';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule , RouterModule, FormsModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {
    products: Product[] = [];
    searchName: string = '';
    searchPrice: number | null = null;
    sortBy: string = 'id';
    isLoggedIn = false;

    constructor(private productService: ProductService, 
                private userService: UserService,
                private keycloakService: KeycloakService)
     {}

    async ngOnInit(){
      this.loadAllProducts();
       this.isLoggedIn = await this.keycloakService.isLoggedIn();
      if (this.isLoggedIn) {
        this.userService.getCurrentUser().subscribe({
          next: (user) => {
        },
      error: (err) => {
        console.error('Errore nel recupero utente:', err);
      }
    });

      }
    }

    loadAllProducts(): void {
      this.productService.getAllProducts().subscribe({
        next: (data) => this.products = data,
        error: (err) => console.error('errore getAllProduct', err)
    });
  }

  searchByName(): void { //se in barra manda solo spazi
  if (!this.searchName.trim()) {
    this.loadAllProducts();
    return;
  }

  this.productService.getProductsByName(this.searchName).subscribe({
    next: (data) => this.products = data,
    error: (err) => {
      console.error('Errore nella ricerca per nome', err);
      this.products = []; // vuoto se errore
    }
  });
}

}
