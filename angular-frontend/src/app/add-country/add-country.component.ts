import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { CountryService } from '../services/country.service';
import { ReloadListService } from '../services/reload-list.service';
import { Continent } from '../continent';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.css']
})
export class AddCountryComponent implements OnInit {
  @ViewChild('formDirective') private formDirective!: NgForm;
  Continent: any = Continent;
  countryForm: FormGroup;
  continentOptions = Object.keys(Continent).filter(key => isNaN(Number(key)));
  loading = false;

  constructor(
    private fb: FormBuilder,
    private countryService: CountryService,
    private snackBar: MatSnackBar,
    private reloadListService: ReloadListService) {
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
      this.countryService.addCountry(newCountry).pipe(
        finalize(() => this.loading = false)
      ).subscribe({
        next: () => {
          console.log('Country added successfully');
          this.formDirective.resetForm();
          this.reloadListService.loadCountries();
          this.snackBar.open('Country added successfully', 'Close', {
            duration: 3000
          });
        },
        error: error => {
          console.error('Error:', error);
          this.snackBar.open('Error adding country', 'Close', {
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