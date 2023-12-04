import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteCityComponent } from './delete-city.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { CityService } from '../services/city.service';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';

describe('DeleteCityComponent', () => {
  let component: DeleteCityComponent;
  let fixture: ComponentFixture<DeleteCityComponent>;
  let cityService: CityService;
  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatSnackBarModule,
        RouterTestingModule.withRoutes([
          { path: 'countries/:id', component: DeleteCityComponent }
        ]),
        HttpClientTestingModule,
        MatIconModule
      ],
      declarations: [DeleteCityComponent],
      providers: [CityService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCityComponent);
    component = fixture.componentInstance;
    cityService = TestBed.inject(CityService);
    dialog = TestBed.inject(MatDialog);

    const route = TestBed.inject(ActivatedRoute);
    (route as any).params = of({ id: 1 });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteCity when dialog is confirmed', () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpy.afterClosed.and.returnValue(of(true));
    spyOn(dialog, 'open').and.returnValue(dialogRefSpy);
    spyOn(cityService, 'deleteCity').and.returnValue(of({
      id: 1,
      name: 'Test City',
      population: 1000000,
      countryId: 1
    }));

    component.countryId = 1;
    component.openDialog();

    expect(cityService.deleteCity).toHaveBeenCalledWith(component.cityId);
  });

  it('should not call deleteCity when dialog is cancelled', () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpy.afterClosed.and.returnValue(of(false));
    spyOn(dialog, 'open').and.returnValue(dialogRefSpy);
    spyOn(cityService, 'deleteCity').and.returnValue(of({
      id: 1,
      name: 'Test City',
      population: 1000000,
      countryId: 1
    }));

    component.openDialog();

    expect(cityService.deleteCity).not.toHaveBeenCalled();
  });
});