import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../project.service';
import { Project } from '../project.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  project: Project | null = null;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) this.loadProject(+id);
  }

  loadProject(id: number) {
    this.projectService.getProjectById(id).subscribe(project => this.project = project);
  }

   // Remove image by index
  removeImage(index: number) {
    if (confirm('Are you sure you want to remove this image?')) {
      // To-Do later ---------------------- REMEMBER
    }
  }

  back() {
    this.router.navigate(['/dashboard/projects']);
  }
}
