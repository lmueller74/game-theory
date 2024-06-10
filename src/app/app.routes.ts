import { Routes } from '@angular/router';
import { SandboxComponent } from './views/sandbox/sandbox.component';

export const routes: Routes = [
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: SandboxComponent },
];
