import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from '../project.service';
import { Project } from '../project.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  form: FormGroup;
  projectId: number | null = null;
  imageCoverFile: File | null = null;
  imagesTourFiles: File[] = [];

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      demoLink: [''],
      imageCover: [null],
      imagesTour: [null]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.projectId = +params['id'];
        this.loadProject(this.projectId);
      }
    });
  }

  loadProject(id: number) {
    this.projectService.getProjectById(id).subscribe(project => {
      this.form.patchValue({
        title: project.title,
        description: project.description,
        demoLink: project.demoLink
      });
    });
  }

  onImageCoverChange(event: any) {
    const file = event.target.files[0];
    if (file) this.imageCoverFile = file;
  }

  onImagesTourChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.imagesTourFiles = Array.from(event.target.files);
    }
  }

  submit() {
    if (this.form.invalid) return;

    const formData = new FormData();
    formData.append('title', this.form.value.title);
    formData.append('description', this.form.value.description);
    formData.append('demoLink', this.form.value.demoLink || '');
    if (this.imageCoverFile) formData.append('imageCover', this.imageCoverFile);
    this.imagesTourFiles.forEach((file, index) => formData.append('imagesTour', file));

    if (this.projectId) {
      this.projectService.updateProject(this.projectId, formData).subscribe(() => this.router.navigate(['/dashboard/projects']));
    } else {
      this.projectService.createProject(formData).subscribe(() => this.router.navigate(['/dashboard/projects']));
    }
  }

  cancel() {
    this.router.navigate(['/dashboard/projects']);
  }
}
