import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AboutSettings } from './about.model';
import { environment } from '../../../../../environments/environment.prod';
import { environmentDev } from '../../../../../environments/environment.dev';

@Injectable({ providedIn: 'root' })
export class AboutService {
  private apiUrl = `${environment.apiUrl}/About` // backend URL
  //private apiUrl = `${environmentDev.apiUrl}/About`; // backend URL

  constructor(private http: HttpClient) {}

  getAbout(): Observable<AboutSettings> {
    return this.http.get<AboutSettings>(this.apiUrl);
  }

  update(about: FormData): Observable<AboutSettings> {
    return this.http.put<AboutSettings>(`${this.apiUrl}`, about);
  }
}


