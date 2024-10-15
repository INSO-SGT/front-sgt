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

  registerMaterial(material: Material): Observable<Material> {
    return this.http.post<Material>(`${this.apiUrl}/register`, material);
  }

  getMaterials(): Observable<Material[]> {
    return this.http.get<Material[]>(`${this.apiUrl}/all`);
  }
  getMaterialById(id: string) {
    return this.http.get<Material>(
      `${this.apiUrl}/select/${id}`
    );
  }
  updateMaterial(id: string, material: Material): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/update/${id}`, material);
  }
}
