import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../project.service';
import { Project, ProjectImage } from '../project.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../../../../../core/services/notification.service';
import { ImagePreviewDialogComponent } from './image-preview-dialog.component';

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
  selectedFile: File | null = null;
  selectedImagePreview: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private notify: NotificationService,
    private router: Router,
    private dialog: MatDialog
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
        this.project!.images = p.images;
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

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.selectedFile = file;
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImagePreview = e.target.result;
        // Open dialog with preview
        this.openImagePreviewDialog();
      };
      reader.readAsDataURL(file);
    }
  }

  openImagePreviewDialog(): void {
    if (!this.selectedFile || !this.selectedImagePreview || !this.project) return;

    const dialogRef = this.dialog.open(ImagePreviewDialogComponent, {
      width: '500px',
      disableClose: true,
      data: {
        preview: this.selectedImagePreview,
        fileName: this.selectedFile.name,
        loading: false
      }
    });

    // Handle save action
    const dialogInstance = dialogRef.componentInstance as ImagePreviewDialogComponent;
    dialogInstance.save.subscribe(() => {
      dialogInstance.data.loading = true;
      this.saveImage(dialogRef);
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'saved') {
        this.clearSelection();
      }
    });
  }

  saveImage(dialogRef: any): void {
    if (!this.project || !this.selectedFile) return;
    
    this.loading = true;
    const dialogInstance = dialogRef.componentInstance as ImagePreviewDialogComponent;

    this.projectService.addImageToProject(this.project.id, this.selectedFile).subscribe({
      next: () => {
        this.notify.success('Image saved successfully');
        this.selectedFile = null;
        this.selectedImagePreview = null;
        this.loading = false;
        dialogRef.close('saved');
        this.loadProject(this.project!.id); // Reload to show new image
      },
      error: (err) => {
        this.loading = false;
        dialogInstance.data.loading = false;
        this.notify.error('Failed to save image');
      }
    });
  }

  clearSelection(): void {
    this.selectedFile = null;
    this.selectedImagePreview = null;
  }
  back() {
    this.router.navigate(['/dashboard/projects']);
  }
}
