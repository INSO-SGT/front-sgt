import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { AreasRegisterService } from "./areas-register.service";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-areas-register',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule
  ],
  templateUrl: './areas-register.component.html',
  styleUrls: ['./areas-register.component.css']
})
export class AreasRegisterComponent implements OnInit {
  areaForm!: FormGroup; // Formulario para el registro del área
  errorMessage = ''; // Mensaje de error
  successMessage = ''; // Mensaje de éxito

  constructor(
    private formBuilder: FormBuilder,
    private areasRegisterService: AreasRegisterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.areaForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmit(): void {
    if (this.areaForm.valid) {
      const { name, description } = this.areaForm.value;
      this.areasRegisterService.registerArea(name, description).subscribe(
        (response) => {
          // Mensaje de éxito
          this.successMessage = 'El área de intervención se ha registrado correctamente.';
          setTimeout(() => {
            this.successMessage = '';
            this.router.navigate(['/areas']); // Redirigir al listado de áreas
          }, 3000); // Mostrar el mensaje durante 3 segundos
        },
        (error) => {
          this.errorMessage = 'Ocurrió un error al registrar el área.';
        }
      );
    } else {
      this.errorMessage = 'Todos los campos son obligatorios.';
    }
  }

  onCancel(): void {
    const confirmation = confirm('¿Estás seguro de que deseas cancelar el registro?');
    if (confirmation) {
      this.router.navigate(['/areas']); // Redirigir al listado de áreas
    }
  }
}
