import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryListComponent } from './country-list/country-list.component';
import { CountryDetailsComponent } from './country-details/country-details.component';
import { CityListComponent } from './city-list/city-list.component';
import { CityDetailsComponent } from './city-details/city-details.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { LoginGuard } from './login.guard';

export const routes: Routes = [
    { path: 'countries', component: CountryListComponent, canActivate: [AuthGuard] },
    { path: 'countries/:id', component: CountryDetailsComponent, canActivate: [AuthGuard] },
    { path: 'cities', component: CityListComponent, canActivate: [AuthGuard] },
    { path: 'cities/:id', component: CityDetailsComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/countries', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
