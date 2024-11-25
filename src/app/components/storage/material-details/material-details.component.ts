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
import { CommonModule } from '@angular/common';
import { Area } from '../../areas/area-edit/area.model';
import { AreaInterventionResponse } from '../areaIntervention';

@Component({
  selector: 'app-material-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './material-details.component.html',
  styleUrl: './material-details.component.css'
})
export class MaterialDetailsComponent implements OnInit{
  material: Material | null = null;
  interventionAreas: AreaInterventionResponse[] = [];


  constructor(
    private route: ActivatedRoute,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    const idMaterial = this.route.snapshot.paramMap.get('idMaterial');
    if (idMaterial) {
      this.loadMaterialDetails(idMaterial);
      this.loadInterventionAreas(idMaterial);
    }
  }

    // Método para desasignar un material
    unassignInterArea(materialId: string): void {
      
    }

  loadMaterialDetails(idMaterial: string): void {
    this.storageService.getMaterialById(idMaterial).subscribe(
      (data) => {
        this.material = data;
      },
      (error) => {
        console.error('Error al cargar los detalles del ambiente', error);
      }
    );
  }
  loadInterventionAreas(materialId: string): void {
    this.storageService.getInterventionAreas(materialId).subscribe((data) => {
      this.interventionAreas = data;
    });
  }
}
