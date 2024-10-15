import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./areas/areas.component').then((m) => m.AreasComponent),
    data: { breadcrumb: 'Áreas' },
  },
  {
    path: 'areas-register',
    loadComponent: () =>
      import('./areas-register/areas-register.component').then(
        (m) => m.AreasRegisterComponent
      ),
    data: { breadcrumb: 'Registrar Área' },
  },
] as Routes;
