import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  basePath = 'http://localhost:8080/api'; // <-- Change this line https://hb54wkv8-8080.euw.devtunnels.ms/api
}