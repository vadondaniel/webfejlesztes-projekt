import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '../services/country.service';
import { ReloadListService } from '../services/reload-list.service';
import { CityService } from '../services/city.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent implements OnInit {

  cityForm: FormGroup;
  countries: any[] = [];

  loading = false;

  constructor(private fb: FormBuilder, private countryService: CountryService, private cityService: CityService, private snackBar: MatSnackBar, private reloadListService: ReloadListService) {
    this.cityForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      population: ['', [Validators.required, positiveNumberValidator]],
      countryId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(): void {
    this.countryService.getCountries().subscribe(data => {
      this.countries = data.sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  onSubmit() {
    this.loading = true;
    if (this.cityForm.valid) {
      const newCity = this.cityForm.value;
      this.cityService.addCity(newCity).subscribe(() => {
        console.log('City added successfully');
        this.cityForm.reset({
          name: '',
          population: '',
          countryId: null
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
        this.loading = false;
      }, error => {
        console.error('Error:', error);
        this.snackBar.open('Error adding city', 'Close', {
          duration: 3000
        });
        this.loading = false;
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