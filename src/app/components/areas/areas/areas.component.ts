import { Component, OnInit } from '@angular/core';
import {RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";
import {AreasService} from "../areas.service";

@Component({
  selector: 'app-areas',
  standalone: true,
  imports: [
    RouterLink, CommonModule
  ],
  templateUrl: './areas.component.html',
  styleUrl: './areas.component.css'
})
export class AreasComponent implements OnInit {
  areas: any[] = [];
  filteredAreas: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(private areasService: AreasService) {}

  ngOnInit(): void {
    this.loadAreas();
  }

  loadAreas(): void {
    this.areasService.getAreas().subscribe(
      (data) => {
        this.areas = data;
        this.filteredAreas = this.areas.slice(0, this.itemsPerPage); // Muestra las primeras 10
      },
      (error) => {
        console.error('Error al obtener las áreas de intervención', error);
      }
    );
  }

  // Paginación
  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredAreas = this.areas.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.paginate();
  }

  protected readonly Math = Math;
}
