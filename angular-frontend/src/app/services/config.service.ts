import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  basePath = 'http://localhost:8080/api'; // <-- Change this line
}