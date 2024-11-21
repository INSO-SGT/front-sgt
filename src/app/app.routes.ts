import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'users',
    loadChildren: () =>
      import('./components/users/users.routes').then((m) => m.default),
    data: { breadcrumb: 'Usuarios' },
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
    data: { breadcrumb: 'Iniciar Sesión' },
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'calendar',
    loadComponent: () =>
      import('./components/calendar/calendar/calendar.component').then(
        (m) => m.CalendarComponent
      ),
    data: { breadcrumb: 'Calendario' },
  },
  {
    path: 'areas',
    loadChildren: () =>
      import('./components/areas/areas.routes').then((m) => m.default),
    data: { breadcrumb: 'Áreas' },
  },
  {
    path: 'rooms',
    loadChildren: () =>
      import('./components/rooms/rooms.routes').then((m) => m.default),
    data: { breadcrumb: 'Ambientes' },
  },
  {
    path: 'storage',
    loadChildren: () =>
      import('./components/storage/storage.routes').then((m) => m.default),
    data: { breadcrumb: 'Inventario' },
  },
  {
    path: 'patients',
    loadChildren: () =>
      import('./components/patients/patients.rutes').then((m) => m.default),
    data: { breadcrumb: 'Inventario' },
  },
];
