import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from './room';
import { environment } from '../../enviroment';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  private apiUrl = `${environment.apiUrl}/rooms`;

  constructor(private http: HttpClient) {}

  // Método para registrar una sala
  registerRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(`${this.apiUrl}/register`, room);
  }

  // Método para obtener la lista de ambientes
  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.apiUrl}/all`);
  }

  // Método para obtener ambientes según si son terapéuticos o no
  getRoomsByTherapeutic(isTherapeutic: boolean): Observable<Room[]> {
    return this.http.get<Room[]>(
      `${this.apiUrl}/therapeutic?isTherapeutic=${isTherapeutic}`
    );
  }
}
