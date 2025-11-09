import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AboutSettings } from './about.model';

@Injectable({ providedIn: 'root' })
export class AboutService {
  //private apiUrl = 'https://myportfolio-api.runasp.net/api/About';
  private apiUrl = 'https://localhost:44383/api/About';

  constructor(private http: HttpClient) {}

  getAbout(): Observable<AboutSettings> {
    return this.http.get<AboutSettings>(this.apiUrl);
  }

  update(about: FormData): Observable<AboutSettings> {
    return this.http.put<AboutSettings>(`${this.apiUrl}`, about);
  }
}


