import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Course } from '../course.model';
import { CourseService } from '../course.service';
import { NotificationService } from '../../../../../core/services/notification.service';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatTableModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  displayedColumns = ['title', 'instructorName', 'imageCover', 'actions'];
  loading = false;
  currentPage: number = 1;
  pageSize: number = 6;
  totalPages: number = 0;

  constructor(
    private courseService: CourseService,
    private notify: NotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCourses(this.currentPage);
  }

  loadCourses(page: number = 1) {
    this.loading = true;
    this.courseService.getAll(page, this.pageSize).subscribe({
      next: (res) => {
        this.courses = res.data;
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

  deleteCourse(id: number) {
    if (!confirm('Are you sure you want to delete this course?')) return;

    this.courseService.delete(id).subscribe({
      next: () => {
        this.courses = this.courses.filter(c => c.id !== id);
        this.notify.success('Course deleted successfully');
      },
      error: () => this.notify.error('Failed to delete course')
    });
  }

  editCourse(id: number) {
    this.router.navigate(['/dashboard/courses/edit', id]);
  }

  createCourse() {
    this.router.navigate(['/dashboard/courses/create']);
  }
}

