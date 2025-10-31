import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AboutSettings } from '../about.model';
import { AboutService } from '../about.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  about: AboutSettings | null = null;
  isLoading = false;
  error: string | null = null;
  isSaving = false;
  saveMessage: string | null = null;
  openingImage: any;
  openingImageFile: File | null = null;

  constructor(private aboutService: AboutService) {}

  ngOnInit(): void {
    this.loadAbout();
  }

  private loadAbout(): void {
    this.isLoading = true;
    this.error = null;
    this.aboutService.getAbout().subscribe({
      next: (data) => {
        this.about = data;
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Failed to load About settings.';
        this.isLoading = false;
      }
    });
  }

  /**
   * Save the whole about row (used for editing the only row)
   */
  saveAbout(): void {
    if (!this.about) return;
    this.isSaving = true;
    this.error = null;
    this.saveMessage = null;

    const formData = new FormData();
    formData.append('title', this.about.title ?? '');
    formData.append('openingText', this.about.openingText ?? '');
    formData.append('description', this.about.description ?? '');
    formData.append('mission', this.about.mission ?? '');
    formData.append('vision', this.about.vision ?? '');
    formData.append('values', this.about.values ?? '');

    // Correctly upload the actual File, not the preview DataURL
    if (this.openingImageFile) {
      formData.append('openingImage', this.openingImageFile);
    }

    this.aboutService.update(formData).subscribe({
      next: () => {
        this.isSaving = false;
        this.saveMessage = 'About updated successfully!';
        setTimeout(() => (this.saveMessage = null), 1500);
        // Optionally reload to show new image
        this.loadAbout();
        // Clear the image file after upload
        this.openingImageFile = null;
      },
      error: () => {
        this.isSaving = false;
        this.error = 'Error updating About row.';
      }
    });
  }
  onOpeningImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Create a URL for preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.openingImage = e.target.result;
      };
      reader.readAsDataURL(file);
      
      // Store the actual file for upload (if needed)
      this.openingImageFile = file;
    }
  }
}
