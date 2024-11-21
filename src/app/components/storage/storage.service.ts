import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroment';
import { Material } from './material';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private apiUrl = `${environment.apiUrl}/materials`;

  constructor(private http: HttpClient) {}

  // Obtener todos los materiales
  getMaterials(): Observable<Material[]> {
    return this.http.get<Material[]>(`${this.apiUrl}/all`);
  }

  // Obtener materiales asignados a una sala específica
  getMaterialsByRoom(roomId: string): Observable<Material[]> {
    return this.http.get<Material[]>(`http://localhost:8080/api/v1/rooms/${roomId}/materials`);
  }

  // Desasignar material de una sala
  unassignMaterialFromRoom(materialId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${materialId}/unassign`, {});
  }

  // Asignar material a una sala
  assignMaterialToRoom(materialId: string, roomId: number): Observable<void>{
    return this.http.post<void>(`${this.apiUrl}/${materialId}/assign/${roomId}`, {});
  }

  // Registrar nuevo material
  registerMaterial(material: Omit<Material, 'idMaterial'>): Observable<Material> {
    return this.http.post<Material>(`${this.apiUrl}/register`, material);
  }

  // Editar material
  updateMaterial(id: string, material: Material): Observable<Material> {
    return this.http.put<Material>(`${this.apiUrl}/update/${id}`, material);
  }
  // Obtener un material por su id
  getMaterialById(id: string): Observable<Material> {
    return this.http.get<Material>(`${this.apiUrl}/select/${id}`);
  }
  // Obtener los materiales que no han sido asignados
  getUnassignedMaterials(): Observable<Material[]>{
    return this.http.get<Material[]>(`${this.apiUrl}/unassigned`);
  }
  // Eliminar material
  deleteMaterial(materialId: string): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${materialId}`);
  }
}
