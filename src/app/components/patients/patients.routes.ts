import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./patients/patients.component').then((m) => m.PatientsComponent),
    data: { breadcrumb: 'Pacientes' },
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./patient-register/patient-register.component').then((m) => m.PatientRegisterComponent),
    data: { breadcrumb: 'Registrar Paciente' },
  },
] as Routes;
