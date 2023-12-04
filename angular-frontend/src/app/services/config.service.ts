import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  basePath = 'https://hb54wkv8-8080.euw.devtunnels.ms/api'; // http://localhost:8080/api
}