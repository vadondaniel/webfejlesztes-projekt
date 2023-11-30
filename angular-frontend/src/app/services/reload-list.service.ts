import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReloadListService {

  private triggerLoadCountries = new Subject<void>();

  triggerLoadCountries$ = this.triggerLoadCountries.asObservable();

  loadCountries() {
    this.triggerLoadCountries.next();
  }
}
