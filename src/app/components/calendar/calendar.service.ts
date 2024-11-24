import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Session } from './session'; // Define este modelo
import { environment } from '../../enviroment';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private apiUrl = `${environment.apiUrl}/sessions`; // Ajusta la URL base según tu backend

  constructor(private http: HttpClient) {}

  getSessionsByDate(date: Date): Observable<Session[]> {
    const formattedDate = date.toISOString().split('T')[0]; 
    return this.http.get<Session[]>(`${this.apiUrl}/date?date=${formattedDate}`);
  }
  presence(sessionId: number, therapistPresent: boolean, patientPresent: boolean): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/presence/${sessionId}`, { therapistPresent, patientPresent });
  }
  reprogramSession(sesionId: number, reprogrammingData: any): Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/update/${sesionId}`, reprogrammingData);
  }
}