import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Material[]>(`${this.apiUrl}/all`, {headers});
  }

  // Obtener materiales asignados a una sala específica
  getMaterialsByRoom(roomId: string): Observable<Material[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Material[]>(`http://localhost:8080/api/v1/rooms/${roomId}/materials`, {headers});
  }

  // Desasignar material de una sala
  unassignMaterialFromRoom(materialId: string): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<void>(`${this.apiUrl}/${materialId}/unassign`, {}, {headers});
  }

  // Asignar material a una sala
  assignMaterialToRoom(materialId: string, roomId: number): Observable<void>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<void>(`${this.apiUrl}/${materialId}/assign/${roomId}`, {},{headers});
  }

  // Registrar nuevo material
  registerMaterial(material: Omit<Material, 'idMaterial'>): Observable<Material> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Material>(`${this.apiUrl}/register`, material, {headers});
  }

  // Editar material
  updateMaterial(id: string, material: Material): Observable<Material> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Material>(`${this.apiUrl}/update/${id}`, material, {headers});
  }
  // Obtener un material por su id
  getMaterialById(id: string): Observable<Material> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Material>(`${this.apiUrl}/select/${id}`, {headers});
  }
  // Obtener los materiales que no han sido asignados
  getUnassignedMaterials(): Observable<Material[]>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Material[]>(`${this.apiUrl}/unassigned`, {headers});
  }
  // Eliminar material
  deleteMaterial(materialId: string): Observable<void>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.apiUrl}/${materialId}`, {headers});
  }
}
