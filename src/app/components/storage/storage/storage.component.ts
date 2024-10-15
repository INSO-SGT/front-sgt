import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Material } from '../material';
import { StorageService } from '../storage.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-storage',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './storage.component.html',
  styleUrl: './storage.component.css',
})
export class StorageComponent implements OnInit {
  materials: Material[] = [];
  filteredMaterials: Material[] = [];
  searchTerm: string = '';
  itemsPerPage: number = 10; // Elementos por página
  currentPage: number = 1; // Página actual
  paginatedMaterials: Material[] = [];

  constructor(private storageService: StorageService, private router: Router) {}

  ngOnInit() {
    this.loadMaterials();
  }

  loadMaterials(): void {
    this.storageService.getMaterials().subscribe((materials: Material[]) => {
      this.materials = materials;
      this.filteredMaterials = [...this.materials];
      this.paginate();
    });
  }

  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredMaterials = [...this.materials];
    } else {
      this.filteredMaterials = this.materials.filter(
        (material) =>
          material.nombre
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          material.idMaterial
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          material.estado?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.paginate();
  }

  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedMaterials = this.filteredMaterials.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.paginate();
  }

  navigateToEdit(id: string): void {
    this.router.navigate([`/storage/material-edit`, id]);
  }

  protected readonly Math = Math;
}
