import { Routes } from '@angular/router';
import { ProductList } from './components/product-list/product-list';
import { ProductDetail } from './components/product-detail/product-detail';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/product-list/product-list').then(m => m.ProductList)
  },  
  {
  path: 'product/:id',
  loadComponent: () =>
    import('./components/product-detail/product-detail').then(m => m.ProductDetail)
  },
  {
    path: 'user-info',
    loadComponent: () =>
      import('./components/user-profile/user-profile').then(m => m.UserProfile)
  },
  {
  path: 'admin',
  loadComponent: () =>
    import('./components/admin-dashboard/admin-dashboard').then(m => m.AdminDashboard),
  canActivate: [adminGuard] 
  },
  {
  path: 'cart',
  loadComponent: () =>
    import('./components/cart/cart').then(m => m.CartComponent),
  }

];