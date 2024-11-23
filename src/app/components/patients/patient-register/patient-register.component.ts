import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {PatientsService} from "../patients.service";

@Component({
  selector: 'app-patient-register',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './patient-register.component.html',
  styleUrls: ['./patient-register.component.css']
})
export class PatientRegisterComponent implements OnInit{
  plans = [{ id: 1, name: 'Plan A' }, { id: 2, name: 'Plan B' }, { id: 3, name: 'Plan C' }, { id: 4, name: 'Plan D' }];
  patientForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientsService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.patientForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      paternalSurname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      maternalSurname: ['', [Validators.maxLength(30)]],
      birthdate: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(0), Validators.max(18)]],
      allergies: ['', [Validators.maxLength(255)]],
      status: [true],
      idPlan: [null, [Validators.required]],
      tutors: this.fb.array([this.createTutor()])
    });
  }

  get tutors(): FormArray {
    return this.patientForm.get('tutors') as FormArray;
  }

  createTutor(): FormGroup {
    return this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      dni: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
    });
  }

  addTutor(): void {
    this.tutors.push(this.createTutor());
  }
  removeTutor(index: number): void {
    if (this.tutors.length > 1) {
      this.tutors.removeAt(index);
    }
  }
  onSubmit(): void {
    if (this.patientForm.valid) {
      const formValue = this.patientForm.value;
      this.patientService.createPatient(formValue).subscribe(
        (response) => {
          this.router.navigate(['/patients']);
        },
        (error)=>{
          console.log('Error al registrar', error);
        }
      )
    } else {
      console.log('Formulario no válido');
    }
  }

  onCancel(): void {
    const confirmed = window.confirm('¿Estás seguro de que deseas cancelar el registro?');
    if (confirmed) {
      this.router.navigate(['/patients']);
    }
  }
}
