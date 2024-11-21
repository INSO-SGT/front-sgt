import { Injectable } from '@angular/core';
import {environment} from "../../enviroment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Room} from "../rooms/room";
import {RegisterPatient} from "./register-patient";

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  private apiUrl: string = `${environment.apiUrl}/patients`;

  constructor(private http: HttpClient) {}

  getPatients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }
  createPatient(data: RegisterPatient): Observable<any> {
    return this.http.post<RegisterPatient>(`${this.apiUrl}/register`, data);
  }
}
