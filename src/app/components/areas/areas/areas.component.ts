import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AreasService } from "../areas.service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-areas',
  standalone: true,
  imports: [
    RouterLink, CommonModule, FormsModule
  ],
  templateUrl: './areas.component.html',
  styleUrl: './areas.component.css'
})
export class AreasComponent implements OnInit {
  areas: any[] = []; // Lista completa de áreas
  filteredAreas: any[] = []; // Áreas filtradas según la paginación
  currentPage: number = 1; // Página actual
  itemsPerPage: number = 10; // Número de elementos por página
  searchQuery: string = ''; // Término de búsqueda
  
  constructor(private areasService: AreasService, private router: Router) {}

  ngOnInit(): void {
    this.loadAreas();
  }

  
  loadAreas(): void {
    this.areasService.getAreas().subscribe(
      (data) => {
        this.areas = data;
        this.applyFilters(); // Aplicar filtros y paginación inicial
      },
      (error) => {
        console.error('Error al obtener las áreas de intervención', error);
      }
    );
  }

  // Aplicar filtros y paginación
  applyFilters(): void {
    const filtered = this.areas.filter(area =>
      area.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredAreas = filtered.slice(startIndex, endIndex);
  }

  // Búsqueda de áreas por nombre
  onSearch(): void {
    this.currentPage = 1; // Reiniciar a la primera página
    this.applyFilters(); // Aplicar filtros y actualizar lista
  }

  // Cambiar el número de elementos por página
  paginate(): void {
    this.currentPage = 1; // Reiniciar a la primera página
    this.applyFilters(); // Aplicar filtros y actualizar lista
  }

  // Cambiar de página
  goToPage(page: number): void {
    this.currentPage = page;
    this.applyFilters(); // Actualizar lista basada en la página seleccionada
  }
  deleteArea(id: string):void{
    if (id === undefined) {
      return;
    }
    this.areasService.deleteArea(id).subscribe(
      () =>{
        alert('Area eliminada correctamente');
        this.loadAreas();
      },
      (error) => {
        console.error('Error al eliminar el área', error);
        alert('Hubo un error al eliminar el área');
      }
    )
  }

  protected readonly Math = Math; // Permitir uso de Math en el template
}
