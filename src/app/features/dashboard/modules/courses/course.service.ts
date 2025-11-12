import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course, CoursePaginationResult } from './course.model';
import { environment } from '../../../../../environments/environment.prod';
import { environmentDev } from '../../../../../environments/environment.dev';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private apiUrl = `${environment.apiUrl}/Course` // backend URL
//private apiUrl = `${environmentDev.apiUrl}/Course`; // backend URL

  constructor(private http: HttpClient) {}

  getAll(page: number = 1, pageSize: number = 10): Observable<CoursePaginationResult> {
    const params = {
      pageNumber: page.toString(),
      pageSize: pageSize.toString()
    };
    return this.http.get<CoursePaginationResult>(this.apiUrl, { params });
  }

  getById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  create(course: FormData): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }

  update(id: number, course: FormData): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}`, course);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

