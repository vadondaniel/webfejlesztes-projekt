import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ReloadListService } from '../services/reload-list.service';
import { CityService } from '../services/city.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-add-city-to-country',
  templateUrl: './add-city-to-country.component.html',
  styleUrls: ['./add-city-to-country.component.css']
})
export class AddCityToCountryComponent {
  @ViewChild('formDirective') private formDirective!: NgForm;
  @Input() countryId: any;
  cityForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private cityService: CityService,
    private snackBar: MatSnackBar,
    private reloadListService: ReloadListService) {
    this.cityForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      population: ['', [Validators.required, positiveNumberValidator]],
      countryId: ['']
    });
  }

  onSubmit() {
    this.loading = true;
    if (this.cityForm.valid) {
      const newCity = {
        ...this.cityForm.value,
        countryId: this.countryId
      };
      this.cityService.addCity(newCity).pipe(
        finalize(() => this.loading = false)
      ).subscribe({
        next: () => {
          console.log('City added successfully');
          this.formDirective.resetForm();
          this.reloadListService.loadCountryDetails();
          this.snackBar.open('City added successfully', 'Close', {
            duration: 3000
          });
        },
        error: error => {
          console.error('Error:', error);
          this.snackBar.open('Error adding city', 'Close', {
            duration: 3000
          });
        }
      });
    }
  }
}

function positiveNumberValidator(control: FormControl) {
  const isNotPositive = control.value < 0;
  return isNotPositive ? { 'notPositive': { value: control.value } } : null;
}