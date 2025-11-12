import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ProjectService } from '../project.service';
import { Project } from '../project.model';
import { NotificationService } from '../../../../../core/services/notification.service';
import { environment } from '../../../../../../environments/environment.prod';
import { environmentDev } from '../../../../../../environments/environment.dev';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {
  projects: Project[] = [];
  displayedColumns = ['title', 'description', 'imageCover', 'demoLink', 'actions'];
  loading = false;
  currentPage: number = 1;
  pageSize: number = 6;
  totalPages: number = 0;
  //iamgesDev : string = environmentDev.imagesUrl;
  iamgesProd : string = environment.imagesUrl;

  constructor(private projectService: ProjectService,private notify: NotificationService, private router: Router) {}

  ngOnInit(): void {
    this.loadProjects(this.currentPage);
  }

  loadProjects(page: number = 1): void {
    this.loading = true;
    this.projectService.getProjects(page, this.pageSize).subscribe({
      next: (res) => {
        this.projects = res.data;
        this.currentPage = Number(res.pageNumber) || 1;
        this.pageSize = Number(res.pageSize) || this.pageSize;
        this.totalPages = Number(res.totalPages) || 0;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.notify.error('Failed to load courses');
      }
    });
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
