import { Routes } from '@angular/router';
import { ProductList } from './components/product-list/product-list';
import { ProductDetail } from './components/product-detail/product-detail';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', component: ProductList },  
  { path: 'product/:id', component: ProductDetail},
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
  }
];