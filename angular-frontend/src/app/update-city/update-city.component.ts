import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CityService } from '../services/city.service';
import { CountryService } from '../services/country.service';
import { ReloadListService } from '../services/reload-list.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-city',
  templateUrl: './update-city.component.html',
  styleUrls: ['./update-city.component.css']
})
export class UpdateCityComponent implements OnInit {
  @Input() cityId: any;

  cityForm: FormGroup;
  countries: any[] = [];

  loading = false;

  constructor(private fb: FormBuilder, private cityService: CityService, private countryService: CountryService, private snackBar: MatSnackBar, private reloadListService: ReloadListService) {
    this.cityForm = this.fb.group({
      id: [null, Validators.required],
      name: ['', [Validators.required, Validators.minLength(3)]],
      population: ['', [Validators.required, positiveNumberValidator]],
      countryId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCity();
    this.loadCountries();
  }

  loadCountries(): void {
    this.countryService.getCountries().subscribe(data => {
      this.countries = data.sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  loadCity(): void {
    this.cityService.getCityById(this.cityId).subscribe(city => {
      this.cityForm.setValue({
        id: city.id,
        name: city.name,
        population: city.population,
        countryId: city.countryId,
      });
    });
  }

  onSubmit() {
    this.loading = true;
    if (this.cityForm.valid) {
      const updatedCity = this.cityForm.value;
      this.cityService.updateCity(updatedCity).subscribe({
        next: () => {
          console.log('City updated successfully');
          this.loadCity();
          Object.keys(this.cityForm.controls).forEach(key => {
            const control = this.cityForm.get(key);
            if (control) {
              control.markAsPristine();
              control.markAsUntouched();
              control.setErrors(null);
            }
          });
          this.reloadListService.loadCityDetails();
          this.snackBar.open('City updated successfully', 'Close', {
            duration: 3000
          });
          this.loading = false;
        },
        error: error => {
          console.error('There was an error!', error);
          this.snackBar.open('Error updating city', 'Close', {
            duration: 3000
          });
          this.loading = false;
        }
      });
    } else {
      this.loading = false;
    }
  }
}

function positiveNumberValidator(control: FormControl) {
  const isNotPositive = control.value < 0;
  return isNotPositive ? { 'notPositive': { value: control.value } } : null;
}