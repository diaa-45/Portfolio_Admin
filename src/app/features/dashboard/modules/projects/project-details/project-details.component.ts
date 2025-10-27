import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../project.service';
import { Project, ProjectImage } from '../project.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NotificationService } from '../../../../../core/services/notification.service';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  project: Project | null = null;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private notify: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) this.loadProject(+id);
  }

  loadProject(id: number) {
    this.loading = true;
    this.projectService.getProjectById(id).subscribe({
      next: (p) => {
        this.project = p;
        this.loading = false;
        this.projectService.getImagesByProjectId(id).subscribe({
          next: (images) => {
            this.project!.images = images;
          },
          error: (err) => {
            this.notify.error('Failed to load images');
          }
        });
      },
      error: (err) => {
        this.loading = false;
        this.notify.error('Failed to load project');
      }
    });
  }

   // حذف صورة واحدة
  deleteImage(image: ProjectImage) {
    if (!this.project) return;

    const confirmed = confirm('Are you sure you want to delete this image?');
    if (!confirmed) return;

    // optimistic / or wait response then remove: we'll wait and then remove from local array
    this.projectService.deleteProjectImage(this.project.id, image.id).subscribe({
      next: () => {
        // remove image from local array so UI updates immediately
        this.project!.images = this.project!.images.filter(i => i.id !== image.id);
        this.notify.success('Image deleted');
      },
      error: () => {
        this.notify.error('Failed to delete image');
      }
    });
  }

  back() {
    this.router.navigate(['/dashboard/projects']);
  }
}
