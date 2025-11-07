import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project, ProjectImage, ProjectPaginationResult } from './project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'https://myportfolio-api.runasp.net/api/Projects';

  constructor(private http: HttpClient) {}

  // Get paginated list of projects (optionally with images)
  getProjects(page: number = 1, pageSize: number = 10): Observable<ProjectPaginationResult> {
    const params = {
      pageNumber: page.toString(),
      pageSize: pageSize.toString()
    };
    return this.http.get<ProjectPaginationResult>(this.apiUrl, { params });
  }

  // Get single project
  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }
// get images by project id
/* getImagesByProjectId(projectId: number): Observable<ProjectImage[]> {
  return this.http.get<ProjectImage[]>(`${this.apiUrlImages}/projects/${projectId}`);
} */
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
  // Delete a project image by projectId and imageId — calls ImagesController endpoint
  deleteProjectImage(projectId: number, imageId: number): Observable<void> {
    const url = `${this.apiUrl}/${projectId}/images/${imageId}`; // وفق مسارك في backend
    return this.http.delete<void>(url);
  }
  // add image to project
  addImageToProject(projectId: number, image: File): Observable<void> {
    const url = `${this.apiUrl}/${projectId}/images`;
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post<void>(url, formData);
  }
}
