import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '../services/country.service';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.css']
})
export class AddCountryComponent implements OnInit {

  countryForm: FormGroup;

  constructor(private fb: FormBuilder, private countryService: CountryService) {
    this.countryForm = this.fb.group({
      name: ['', Validators.required],
      population: [0, Validators.required],
      continent: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.countryForm.valid) {
      const newCountry = this.countryForm.value;
      this.countryService.addCountry(newCountry).subscribe(() => {
        console.log('Country added successfully');
        // Optionally, you can navigate to the list view or perform other actions
      });
    }
  }
}
