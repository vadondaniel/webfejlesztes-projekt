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
  filteredOptions: any[] = [];

  constructor(private fb: FormBuilder, private countryService: CountryService, private cityService: CityService, private snackBar: MatSnackBar, private reloadListService: ReloadListService) {
    this.cityForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      population: ['', [Validators.required, positiveNumberValidator]],
      countryId: [null, Validators.required]
    });
  }

  filter() {
    let filterValue = this.cityForm.get('countryId')?.value;
    if (filterValue && typeof filterValue === 'object') {
      filterValue = filterValue.name;
    }
    if (filterValue) {
      this.filteredOptions = this.countries.filter(option => option.name.toLowerCase().includes(filterValue.toLowerCase()));
    } else {
      this.filteredOptions = this.countries;
    }
  }

  displayCountry(option: any): string {
    return option && typeof option === 'object' ? option.name : '';
  }

  validateCountry() {
    const countryControl = this.cityForm.get('countryId');
    if (countryControl && typeof countryControl.value !== 'object') {
      countryControl.reset();
    }
  }

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(): void {
    this.countryService.getCountries().subscribe(data => {
      this.countries = data.sort((a, b) => a.name.localeCompare(b.name));
      this.filteredOptions = this.countries.map(country => country.name);
    });
  }

  onSubmit() {
    this.loading = true;
    if (this.cityForm.valid) {
      const newCity = { ...this.cityForm.value };
      if (newCity.countryId && typeof newCity.countryId === 'object') {
        newCity.countryId = newCity.countryId.id;
      }
      this.cityService.addCity(newCity).subscribe({
        next: () => {
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
        },
        error: error => {
          console.error('Error:', error);
          this.snackBar.open('Error adding city', 'Close', {
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