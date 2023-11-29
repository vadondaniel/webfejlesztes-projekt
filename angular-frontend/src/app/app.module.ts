import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CountryListComponent } from './country-list/country-list.component';
import { CityListComponent } from './city-list/city-list.component';
import { CountryDetailsComponent } from './country-details/country-details.component';
import { CityDetailsComponent } from './city-details/city-details.component';
import { AppComponent } from './app.component';
import { AddCountryComponent } from './add-country/add-country.component';
import { AddCityComponent } from './add-city/add-city.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        CountryListComponent,
        CityListComponent,
        CountryDetailsComponent,
        CityDetailsComponent,
        AppComponent,
        AddCountryComponent,
        AddCityComponent
    ],
    imports: [
        BrowserModule,
        RouterModule,
        CommonModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatOptionModule,
        BrowserAnimationsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }