import { Routes } from '@angular/router';
import { ApiRequestComponent } from './pages/api-request/api-request.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: 'api-request', component: ApiRequestComponent },
  { path: '', redirectTo: '/api-request', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];
