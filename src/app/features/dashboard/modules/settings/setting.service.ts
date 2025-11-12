import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChangePassword } from './change-password.model';
import { TokenService } from '../../../../core/services/token.service';
import { environment } from '../../../../../environments/environment.prod';
import { environmentDev } from '../../../../../environments/environment.dev';

@Injectable({
    providedIn: 'root'
  })
  export class ChangePasswordService { 
    private apiUrl = `${environment.apiUrl}/Auth` // backend URL
//private apiUrl = `${environmentDev.apiUrl}/Auth`; // backend URL
  
    constructor(private http: HttpClient,private tokenService: TokenService) {}
  
    changePassword(data: any): Observable<boolean> {
      const token = this.tokenService.getToken() // 🔹 or wherever you store it
      //console.log(token);
      
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
      return this.http.post<boolean>(`${this.apiUrl}/change-password`,data,{headers});
    }
  
  }