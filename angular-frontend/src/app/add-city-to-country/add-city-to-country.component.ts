import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReloadListService } from '../services/reload-list.service';
import { CityService } from '../services/city.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-city-to-country',
  templateUrl: './add-city-to-country.component.html',
  styleUrls: ['./add-city-to-country.component.css']
})
export class AddCityToCountryComponent {
  @Input() countryId: any;

  cityForm: FormGroup;

  loading = false;

  constructor(private fb: FormBuilder, private cityService: CityService, private snackBar: MatSnackBar, private reloadListService: ReloadListService) {
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
      this.cityService.addCity(newCity).subscribe({
        next: () => {
          console.log('City added successfully');
          this.cityForm.reset({
            name: '',
            population: '',
            countryId: ''
          });
          Object.keys(this.cityForm.controls).forEach(key => {
            const control = this.cityForm.get(key);
            if (control) {
              control.markAsPristine();
              control.markAsUntouched();
              control.setErrors(null);
            }
          });
          this.reloadListService.loadCities();
          this.snackBar.open('City added successfully', 'Close', {
            duration: 3000
          });
        },
        error: err => {
          console.error('Error:', err);
          this.snackBar.open('Error adding city', 'Close', {
            duration: 3000
          });
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }
}

function positiveNumberValidator(control: FormControl) {
  const isNotPositive = control.value <= 0;
  return isNotPositive ? { 'notPositive': { value: control.value } } : null;
}