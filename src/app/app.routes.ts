import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryListComponent } from './country-list/country-list.component';
import { CountryDetailsComponent } from './country-details/country-details.component';
import { CityListComponent } from './city-list/city-list.component';
import { CityDetailsComponent } from './city-details/city-details.component';

export const routes: Routes = [
  { path: 'countries', component: CountryListComponent },
  { path: 'countries/:id', component: CountryDetailsComponent },
  { path: 'cities', component: CityListComponent },
  { path: 'cities/:id', component: CityDetailsComponent },
  { path: '', redirectTo: '/countries', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
