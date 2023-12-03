import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '../services/country.service';
import { ReloadListService } from '../services/reload-list.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Continent } from '../continent';

@Component({
  selector: 'app-update-country',
  templateUrl: './update-country.component.html',
  styleUrls: ['./update-country.component.css']
})
export class UpdateCountryComponent implements OnInit {
  @Input() countryId: any;

  countryForm: FormGroup;

  loading = false;

  Continent: any = Continent;
  continentOptions = Object.keys(Continent).filter(key => isNaN(Number(key)));

  constructor(
    private fb: FormBuilder,
    private countryService: CountryService,
    private snackBar: MatSnackBar,
    private reloadListService: ReloadListService) {
    this.countryForm = this.fb.group({
      id: [null, Validators.required],
      name: ['', [Validators.required, Validators.minLength(3)]],
      population: ['', [Validators.required, positiveNumberValidator]],
      continent: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCountry();
  }

  loadCountry(): void {
    this.countryService.getCountryById(this.countryId).subscribe(country => {
      const continentName = country.continent.replace(/\s/g, '') as keyof typeof Continent;
      this.countryForm.setValue({
        id: country.id,
        name: country.name,
        population: country.population,
        continent: continentName,
      });
    });
  }

  onSubmit() {
    this.loading = true;
    if (this.countryForm.valid) {
      const updatedCountry = this.countryForm.value;
      this.countryService.updateCountry(updatedCountry).subscribe({
        next: () => {
          console.log('Country updated successfully');
          this.loadCountry();
          Object.keys(this.countryForm.controls).forEach(key => {
            const control = this.countryForm.get(key);
            if (control) {
              control.markAsPristine();
              control.markAsUntouched();
              control.setErrors(null);
            }
          });
          this.reloadListService.loadCountryDetails();
          this.snackBar.open('Country updated successfully', 'Close', {
            duration: 3000
          });
          this.loading = false;
        },
        error: error => {
          console.error('Error:', error);
          this.snackBar.open('Error updating country', 'Close', {
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