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
  filteredOptions: any[] = [];

  constructor(
    private fb: FormBuilder,
    private cityService: CityService,
    private countryService: CountryService,
    private snackBar: MatSnackBar,
    private reloadListService: ReloadListService) {
    this.cityForm = this.fb.group({
      id: [null, Validators.required],
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
    if (typeof filterValue === 'string') {
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
      this.loadCity();
    });
  }

  loadCity(): void {
    this.cityService.getCityById(this.cityId).subscribe(city => {
      const country = this.countries.find(c => c.id === city.countryId);
      this.cityForm.setValue({
        id: city.id,
        name: city.name,
        population: city.population,
        countryId: country,
      });
    });
  }

  onSubmit() {
    this.loading = true;
    if (this.cityForm.valid) {
      const updatedCity = { ...this.cityForm.value };
      if (updatedCity.countryId && typeof updatedCity.countryId === 'object') {
        updatedCity.countryId = updatedCity.countryId.id;
      }
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