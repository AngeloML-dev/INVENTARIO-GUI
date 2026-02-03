import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { InventarioListComponent } from './components/inventario-list/inventario-list.component';
import { ProductoFormComponent } from './components/producto-form/producto-form.component';
import { AmbienteListComponent } from './components/ambiente-list/ambiente-list.component';
import { AmbienteFormComponent } from './components/ambiente-form/ambiente-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'equipos', component: InventarioListComponent },
  { path: 'equipos/nuevo', component: ProductoFormComponent },
  { path: 'equipos/:id', component: ProductoFormComponent },
  { path: 'ambientes', component: AmbienteListComponent },
  { path: 'ambientes/nuevo', component: AmbienteFormComponent },
  { path: 'ambientes/:id', component: AmbienteFormComponent }
];
