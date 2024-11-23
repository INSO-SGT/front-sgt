import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";
import {PatientsService} from "../patients.service";

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css'
})
export class PatientsComponent {
  patients: any[] = [];

  constructor(private patientService: PatientsService) {}

  ngOnInit() {
    this.loadPatients();
  }

  loadPatients() {
    this.patientService.getPatients().subscribe(
      (data) => {
        this.patients = data;
      },
      (error) =>{
        console.log("Error al obtener los pacientes",error);
      }
    )
  }
  createPatient(){

  }
}
