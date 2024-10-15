import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./storage/storage.component').then((m) => m.StorageComponent),
  },
  {
    path: 'material-register',
    loadComponent: () =>
      import('./material-register/material-register.component').then(
        (m) => m.MaterialRegisterComponent
      ),
  },
  {
    path: 'material-edit/:idMaterial',
    loadComponent: () =>
      import('./material-edit/material-edit.component').then(
        (m) => m.MaterialEditComponent
      ),
  },
] as Routes;
