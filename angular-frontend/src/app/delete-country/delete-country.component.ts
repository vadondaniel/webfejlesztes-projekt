import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { CountryService } from '../services/country.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-country',
  templateUrl: './delete-country.component.html',
  styleUrl: './delete-country.component.css'
})
export class DeleteCountryComponent {
  @Input() countryId: any;

  constructor(
    public dialog: MatDialog, 
    private countryService: CountryService, 
    private snackBar: MatSnackBar, 
    private router: Router
  ) { }

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        type: 'country',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.countryService.deleteCountry(this.countryId).subscribe({
          next: () => {
            this.router.navigate(['/countries']);
          },
          error: error => {
            this.snackBar.open('Error deleting countryy: ' + error.message, 'Close', {
              duration: 5000,
            });
          }
        });
      }
    });
  }
}
