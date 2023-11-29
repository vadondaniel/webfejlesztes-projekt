import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CountryListComponent } from './country-list/country-list.component';
import { CityListComponent } from './city-list/city-list.component';
import { CountryDetailsComponent } from './country-details/country-details.component';
import { CityDetailsComponent } from './city-details/city-details.component';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        CountryListComponent,
        CityListComponent,
        CountryDetailsComponent,
        CityDetailsComponent,
        AppComponent
    ],
    imports: [
        BrowserModule,
        RouterModule,
        CommonModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent] // AppComponent is the root component
})
export class AppModule { }