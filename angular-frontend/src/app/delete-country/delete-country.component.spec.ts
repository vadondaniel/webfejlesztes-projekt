import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteCountryComponent } from './delete-country.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { CountryService } from '../services/country.service';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { Continent } from '../continent';

describe('DeleteCountryComponent', () => {
  let component: DeleteCountryComponent;
  let fixture: ComponentFixture<DeleteCountryComponent>;
  let countryService: CountryService;
  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatSnackBarModule,
        RouterTestingModule.withRoutes([
          { path: 'countries/:id', component: DeleteCountryComponent }
        ]),
        HttpClientTestingModule,
        MatIconModule
      ],
      declarations: [DeleteCountryComponent],
      providers: [CountryService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCountryComponent);
    component = fixture.componentInstance;
    countryService = TestBed.inject(CountryService);
    dialog = TestBed.inject(MatDialog);

    const route = TestBed.inject(ActivatedRoute);
    (route as any).params = of({ id: 1 });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteCountry when dialog is confirmed', () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpy.afterClosed.and.returnValue(of(true));
    spyOn(dialog, 'open').and.returnValue(dialogRefSpy);
    spyOn(countryService, 'deleteCountry').and.returnValue(of({
      id: 1,
      name: 'Test Country',
      continent: Continent.Africa,
      population: 1000000,
      cities: []
    }));

    component.countryId = 1;
    component.openDialog();

    expect(countryService.deleteCountry).toHaveBeenCalledWith(component.countryId);
  });

  it('should not call deleteCountry when dialog is cancelled', () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpy.afterClosed.and.returnValue(of(false));
    spyOn(dialog, 'open').and.returnValue(dialogRefSpy);
    spyOn(countryService, 'deleteCountry').and.returnValue(of({
      id: 1,
      name: 'Test Country',
      continent: Continent.Africa,
      population: 1000000,
      cities: []
    }));

    component.openDialog();

    expect(countryService.deleteCountry).not.toHaveBeenCalled();
  });
});