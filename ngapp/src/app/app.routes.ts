
import { Routes } from '@angular/router';
import { ContactDetail } from './pages/contact-detail/contact-detail';
import { NotFound } from './pages/not-found/not-found';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Contact } from './pages/contact/contact';
import { About } from './pages/about/about';
import { ProductDetail } from './pages/product-detail/product-detail';

export const routes: Routes = [
  
  {
    path: '',
    component: Home,
    title: 'Accueil',
  },
  {
    path: 'login',
    component: Login,
    title: 'Connexion',
  },
  {
    path: 'contact',
    component: Contact,
    title: 'Contact',
  },
  {
    path: 'about',
    component: About,
    title: 'À propos',
  },
  {
    path: 'products',
    component: Home,
    title: 'Catalogue des produits',
  },
  {
    path: 'products/:id',
    component: ProductDetail,
    title: 'Détail du produit',
  },
  {
  path: 'contact/:id',
  component: ContactDetail,
  title: 'Détail du contact',
},
  {
    path: '**',
    component: NotFound,
    title: 'Page introuvable',
  },
];
