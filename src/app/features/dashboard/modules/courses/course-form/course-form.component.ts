import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CourseService } from '../course.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css'],
})
export class CourseFormComponent implements OnInit {

  ImageCoverFile: any;

  form!: FormGroup;
  isSubmitting = false;
  courseId?: number;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.courseId;

    this.form = this.fb.group({
      title: ['', Validators.required],
      instructorName: ['', Validators.required],
      description: ['', Validators.required],
      contactLink: ['', Validators.required],
      imageCover: [null],
    });

    if (this.isEditMode) {
      this.loadCourseData();
    }
  }

  loadCourseData() {
    this.courseService.getById(this.courseId!).subscribe({
      next: (course) => {
        this.form.patchValue(course);
      },
      error: (err) => console.error('Error loading course:', err),
    });
  }

  submit() {
    if (this.form.invalid) {
      console.log("Form is invalid");
      return;
    }

    this.isSubmitting = true;
    const formData = new FormData();
    formData.append('title', this.form.value.title);
    formData.append('instructorName', this.form.value.instructorName);
    formData.append('description', this.form.value.description);
    formData.append('contactLink', this.form.value.contactLink);
  
    if (this.courseId) {
      formData.append('id', this.courseId.toString());
  
      if (this.ImageCoverFile) {
        formData.append('imageCover', this.ImageCoverFile);
      }
      this.courseService.update(this.courseId!, formData).subscribe({
        next: () => {
          alert('✅ Course updated successfully!');
          this.router.navigate(['/dashboard/courses']);
        },
        error: (err) => {
          console.error(err);
          alert('❌ Error updating course');
          this.isSubmitting = false;
        },
      });
    } else {
      if (this.ImageCoverFile) {
        formData.append('imageCover', this.ImageCoverFile);
      }
      this.courseService.create(formData).subscribe({
        next: (res) => {
          alert('✅ Course created successfully!');
          console.log(res);
          
          this.router.navigate(['/dashboard/courses']);
        },
        error: (err) => {
          console.error(err);
          alert('❌ Error creating course');
          this.isSubmitting = false;
        },
      });
    }
  }

  onImageCoverChange($event: Event) {
    this.ImageCoverFile = ($event.target as HTMLInputElement).files?.[0];
  }
  
  cancel() {
    this.router.navigate(['/dashboard/courses']);
  }
}

