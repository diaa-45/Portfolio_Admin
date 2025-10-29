import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../course.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIcon } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, MatIcon, MatButtonModule],
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
})
export class CourseDetailsComponent implements OnInit {
  
  course: any;
  isLoading = true;

  constructor(private route: ActivatedRoute, private courseService: CourseService, private router: Router) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCourse(id);
  }

  loadCourse(id: number) {
    this.courseService.getById(id).subscribe({
      next: (res) => {
        this.course = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading course details:', err);
        this.isLoading = false;
      },
    });
  }
  
  back() {
    this.router.navigate(['/dashboard/courses']);
  }
}

