import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '../services/country.service';
import { ReloadListService } from '../services/reload-list.service';
import { Continent } from '../continent';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.css']
})
export class AddCountryComponent implements OnInit {

  Continent: any = Continent;

  countryForm: FormGroup;
  continentOptions = Object.keys(Continent).filter(key => isNaN(Number(key)));

  loading = false;

  constructor(private fb: FormBuilder, private countryService: CountryService, private snackBar: MatSnackBar, private reloadListService: ReloadListService) {
    this.countryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      population: ['', [Validators.required, positiveNumberValidator]],
      continent: [null, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.loading = true;
    if (this.countryForm.valid) {
      const newCountry = this.countryForm.value;
      this.countryService.addCountry(newCountry).subscribe(() => {
        console.log('Country added successfully');
        this.countryForm.reset({
          name: '',
          population: '',
          continent: null
        });
        Object.keys(this.countryForm.controls).forEach(key => {
          const control = this.countryForm.get(key);
          if (control) {
            control.markAsPristine();
            control.markAsUntouched();
            control.setErrors(null);
          }
        });
        this.reloadListService.loadCountries();
        this.snackBar.open('Country added successfully', 'Close', {
          duration: 3000
        });
        this.loading = false;
      }, error => {
        console.error('Error:', error);
        this.snackBar.open('Error adding country', 'Close', {
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