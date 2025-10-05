import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ProjectService } from '../project.service';
import { Project } from '../project.model';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {
  projects: Project[] = [];
  displayedColumns = ['title', 'description', 'imageCover', 'demoLink', 'actions'];

  constructor(private projectService: ProjectService, private router: Router) {}

  ngOnInit(): void {
    this.loadProjects();
    
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe(data =>{ 
      this.projects = data;
    console.log(this.projects.length);
    console.log(this.projects); });
  }

  createProject(): void {
    this.router.navigate(['/dashboard/projects/create']);
  }

  editProject(project: Project): void {
    this.router.navigate(['/dashboard/projects/edit', project.id]);
  }

  viewDetails(project: Project): void {
    this.router.navigate(['/dashboard/projects', project.id]);
  }

  deleteProject(project: Project): void {
    if (confirm(`Are you sure to delete project "${project.title}"?`)) {
      this.projectService.deleteProject(project.id).subscribe(() => this.loadProjects());
    }
  }
}
