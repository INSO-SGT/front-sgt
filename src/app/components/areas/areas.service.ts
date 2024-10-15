import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../enviroment";

@Injectable({
  providedIn: 'root'
})
export class AreasService {
  private apiUrl: string = `${environment.apiUrl}/intervention-areas`;

  constructor(private http: HttpClient) {}

  getAreas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }
}
