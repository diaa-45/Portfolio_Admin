import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-image-preview-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <h2 mat-dialog-title>Image Preview</h2>
    <mat-dialog-content>
      <div class="preview-container">
        <img [src]="data.preview" alt="Preview" class="preview-image" />
        <p class="file-name">{{ data.fileName }}</p>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()" [disabled]="data.loading">
        <mat-icon>cancel</mat-icon>
        Cancel
      </button>
      <button mat-raised-button color="primary" (click)="onSave()" [disabled]="data.loading">
        <mat-icon>save</mat-icon>
        {{ data.loading ? 'Saving...' : 'Save' }}
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .preview-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      padding: 16px 0;
    }

    .preview-image {
      max-width: 100%;
      max-height: 400px;
      object-fit: contain;
      border-radius: 8px;
      border: 1px solid #ddd;
    }

    .file-name {
      margin: 0;
      color: #666;
      font-size: 0.9rem;
    }

    mat-dialog-content {
      min-width: 300px;
    }

    mat-dialog-actions {
      padding: 16px 24px;
    }
  `]
})
export class ImagePreviewDialogComponent {
  save = new Subject<void>();

  constructor(
    public dialogRef: MatDialogRef<ImagePreviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { preview: string; fileName: string; loading: boolean }
  ) {}

  onSave(): void {
    this.save.next();
  }

  onCancel(): void {
    this.dialogRef.close('cancel');
  }
}

