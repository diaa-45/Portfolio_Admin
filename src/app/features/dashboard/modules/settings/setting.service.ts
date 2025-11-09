import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChangePassword } from './change-password.model';
import { TokenService } from '../../../../core/services/token.service';

@Injectable({
    providedIn: 'root'
  })
  export class ChangePasswordService { 
    //private apiUrl = 'https://myportfolio-api.runasp.net/api/Auth';
    private apiUrl = 'https://localhost:44383/api/Auth';
  
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