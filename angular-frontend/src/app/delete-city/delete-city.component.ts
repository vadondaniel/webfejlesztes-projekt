import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { CityService } from '../services/city.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-city',
  templateUrl: './delete-city.component.html',
  styleUrls: ['./delete-city.component.css']
})
export class DeleteCityComponent {
  @Input() cityId: any;
  @Input() countryId: any;

  constructor(
    public dialog: MatDialog, 
    private cityService: CityService, 
    private snackBar: MatSnackBar, 
    private router: Router
  ) { }

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        type: 'city',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cityService.deleteCity(this.cityId).subscribe({
          next: () => {
            this.router.navigate(['/countries', this.countryId]);
          },
          error: error => {
            this.snackBar.open('Error deleting city: ' + error.message, 'Close', {
              duration: 5000,
            });
          }
        });
      }
    });
  }
}