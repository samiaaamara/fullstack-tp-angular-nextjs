
import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { AppareilList } from './pages/appareil-list/appareil-list';
import { AppareilDetail } from './pages/appareil-detail/appareil-detail';
import { AppareilForm } from './pages/appareil-form/appareil-form';

export const routes: Routes = [
  { path: '', component: Home, title: 'Accueil' },
  { path: 'appareils', component: AppareilList, title: 'Liste des appareils' },
  { path: 'appareils/nouveau', component: AppareilForm, title: 'Ajouter un appareil' },
  { path: 'appareils/:id', component: AppareilDetail, title: 'Détail de l’appareil' },
  { path: 'appareils/:id/modifier', component: AppareilForm, title: 'Modifier un appareil' },
  { path: '**', redirectTo: '' }
];
