import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDialogModule } from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { CountryListComponent } from './country-list/country-list.component';
import { CityListComponent } from './city-list/city-list.component';
import { CountryDetailsComponent } from './country-details/country-details.component';
import { CityDetailsComponent } from './city-details/city-details.component';
import { AppComponent } from './app.component';
import { AddCountryComponent } from './add-country/add-country.component';
import { AddCityComponent } from './add-city/add-city.component';
import { AddCityToCountryComponent } from './add-city-to-country/add-city-to-country.component';
import { NavigationComponent } from './navigation/navigation.component';
import { UpdateCountryComponent } from './update-country/update-country.component';
import { UpdateCityComponent } from './update-city/update-city.component';
import { DeleteCityComponent } from './delete-city/delete-city.component';
import { DeleteCountryComponent } from './delete-country/delete-country.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';


@NgModule({
    declarations: [
        CountryListComponent,
        CityListComponent,
        CountryDetailsComponent,
        CityDetailsComponent,
        AppComponent,
        AddCountryComponent,
        AddCityComponent,
        NavigationComponent,
        AddCityToCountryComponent,
        UpdateCountryComponent,
        UpdateCityComponent,
        DeleteCityComponent,
        DeleteCountryComponent,
        ConfirmationDialogComponent
    ],
    imports: [
        BrowserModule,
        RouterModule,
        CommonModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatAutocompleteModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }