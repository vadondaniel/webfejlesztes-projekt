import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CityService } from '../services/city.service';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent implements OnInit {

  cityForm: FormGroup;

  constructor(private fb: FormBuilder, private cityService: CityService) {
    this.cityForm = this.fb.group({
      name: ['', Validators.required],
      population: [0, Validators.required],
      countryId: [0, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.cityForm.valid) {
      const newCity = this.cityForm.value;
      this.cityService.addCity(newCity).subscribe(() => {
        console.log('City added successfully');
        // Optionally, you can navigate to the list view or perform other actions
      });
    }
  }
}
