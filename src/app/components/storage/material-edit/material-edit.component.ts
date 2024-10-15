import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { Material } from '../material';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common'; // Si es necesario
import { RouterModule } from '@angular/router'; // Si es necesario

@Component({
  selector: 'app-material-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule, // Si es necesario
    RouterModule, // Si es necesario
  ],
  templateUrl: './material-edit.component.html',
  styleUrl: './material-edit.component.css',
})
export class MaterialEditComponent implements OnInit {
  material: Material | undefined;
  editForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private storageService: StorageService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      estado: [''],
      stock: [0, [Validators.required, Validators.min(0)]],
      esCompleto: [false],
      esSoporte: [false],
      areaIntervencion: [''],
      ambiente: [''],
    });
  }

  ngOnInit(): void {
    const idMaterial = this.route.snapshot.paramMap.get('idMaterial'); // Captura el idMaterial correctamente
    console.log('ID Material:', idMaterial);  // Asegúrate de que se muestra correctamente
    
    if (idMaterial) {
      this.storageService.getMaterialById(idMaterial).subscribe((material) => {
        this.material = material;
        this.editForm.patchValue(material);  // Rellena el formulario con los datos obtenidos
      },
      (error) => {
        console.error(`Material no encontrado con id: ${idMaterial}`);
      });
    }
  }
  
  onSubmit(): void {
    if (this.editForm.valid) {
      const updatedMaterial = { ...this.material, ...this.editForm.value };
      const idMaterial = this.material?.idMaterial; // Asegúrate de que tienes el idMaterial
      if (idMaterial) {
        this.storageService.updateMaterial(idMaterial, updatedMaterial).subscribe(
          () => {
            this.router.navigate(['/storage']);
          },
          (error) => {
            console.error('Error al actualizar el material:', error);
          }
        );
      }
    }
  }
}
