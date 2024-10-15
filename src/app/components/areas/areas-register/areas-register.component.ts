import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {AreasRegisterService} from "./areas-register.service";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-areas-register',
  standalone: true,
  imports: [
    FormsModule, CommonModule
  ],
  templateUrl: './areas-register.component.html',
  styleUrl: './areas-register.component.css'
})
export class AreasRegisterComponent {
  name = '';
  description = '';
  errorMessage = '';
  successMessage = '';

  constructor(
    private areasRegisterService: AreasRegisterService,
    private router: Router // Inyectar el Router aquí
  ) {}

  onSubmit() {
    if (this.name && this.description) {
      this.areasRegisterService.registerArea(this.name, this.description).subscribe(
        (response) => {
          this.successMessage = 'El área de intervención se ha registrado correctamente.';
          setTimeout(() => {
            this.successMessage = '';
            // Redirigir a la página anterior (puedes cambiar la ruta si es necesario)
            this.router.navigate(['/areas']);
          }, 3000); // Puedes ajustar el tiempo de espera si lo deseas
        },
        (error) => {
          this.errorMessage = 'Ocurrió un error al registrar el área.';
        }
      );
    } else {
      this.errorMessage = 'Todos los campos son obligatorios.';
    }
  }

  onCancel() {
    const confirmation = confirm('¿Estás seguro de que deseas cancelar el registro?');
    if (confirmation) {
      // Redirigir de inmediato a la página anterior al cancelar
      this.router.navigate(['/areas']);
    }
  }
}
