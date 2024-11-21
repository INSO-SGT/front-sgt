import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./patients/patients.component').then((m) => m.PatientsComponent),
    data: { breadcrumb: 'Patients' },
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./patient-register/patient-register.component').then((m) => m.PatientRegisterComponent),
    data: { breadcrumb: 'Patients' },
  },
] as Routes;
