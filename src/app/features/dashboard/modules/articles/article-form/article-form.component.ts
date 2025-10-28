import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ArticleService } from '../article.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css'],
})
export class ArticleFormComponent implements OnInit {

mainImageFile: any;
thumbImageFile: any;

  form!: FormGroup;
  isSubmitting = false;
  articleId?: number;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.articleId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.articleId;

    this.form = this.fb.group({
      title: [''],
      content: [''],
      author: [''],
      mainImage: [null],
      thumbImage: [null],
      date: [new Date(), Validators.required],
    });

    if (this.isEditMode) {
      this.loadArticleData();
    }
  }

  loadArticleData() {
    this.articleService.getById(this.articleId!).subscribe({
      next: (article) => {
        this.form.patchValue(article);
      },
      error: (err) => console.error('Error loading article:', err),
    });
  }

  submit() {
    console.log('Submit clicked'); // 👈 Add this
    if (this.form.invalid) console.log("error");

    this.isSubmitting = true;
    const formData = new FormData();
    formData.append('title', this.form.value.title);
    formData.append('content', this.form.value.content);
    formData.append('author', this.form.value.author || '');
  
    if (this.articleId) {
      // Update: match UpdateProjectDto
      formData.append('id', this.articleId.toString());
  
      if (this.mainImageFile) {
        formData.append('mainImage', this.mainImageFile); // match DTO
      }
      if (this.thumbImageFile) {
        formData.append('thumbImage', this.thumbImageFile); // match DTO
      }
      this.articleService.update(this.articleId!, formData).subscribe({
        next: () => {
          alert('✅ Article updated successfully!');
          this.router.navigate(['/dashboard/articles']);
        },
        error: (err) => {
          console.error(err);
          alert('❌ Error updating article');
          this.isSubmitting = false;
        },
      });
    } else {
      // Create: match CreateArticletDto
      if (this.mainImageFile) {
        formData.append('mainImage', this.mainImageFile);
      }
      if (this.thumbImageFile) {
        formData.append('thumbImage', this.thumbImageFile);
      }
      this.articleService.create(formData).subscribe({
        next: () => {
          alert('✅ Article created successfully!');
          this.router.navigate(['/dashboard/articles']);
        },
        error: (err) => {
          console.error(err);
          alert('❌ Error creating article');
          this.isSubmitting = false;
        },
      });
    }
  }

  onMainImageChange($event: Event) {
    this.mainImageFile = ($event.target as HTMLInputElement).files?.[0];
    }
  onThumbImageChange($event: Event) {
    this.thumbImageFile = ($event.target as HTMLInputElement).files?.[0];
  }
  cancel() {
    this.router.navigate(['/dashboard/articles']);
  }
}
