import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from './project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'https://localhost:7023/api/Projects'; 

  constructor(private http: HttpClient) {}

  // Get all projects
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  // Get single project
  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }

  // Create project
  createProject(project: FormData): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, project);
  }

  // Update project
  updateProject(id: number, project: FormData): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, project);
  }

  // Delete project
  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
