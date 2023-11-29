import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '../services/country.service';
import { Continent } from '../continent';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.css']
})
export class AddCountryComponent implements OnInit {

  Continent: any = Continent;

  countryForm: FormGroup;
  continentOptions = Object.keys(Continent).filter(key => isNaN(Number(key)));

  constructor(private fb: FormBuilder, private countryService: CountryService) {
    this.countryForm = this.fb.group({
      name: ['', Validators.required],
      population: [0, Validators.required],
      continent: [null, Validators.required] // Initialize with null or default value
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
