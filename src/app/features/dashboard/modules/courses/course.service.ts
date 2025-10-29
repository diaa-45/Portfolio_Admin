import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from './course.model';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private apiUrl = 'https://localhost:44383/api/Course'; 

  constructor(private http: HttpClient) {}

  getAll(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
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

