import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      // Projects
      {path: 'projects',loadComponent: () => import('./modules/projects/projects-list/projects-list.component').then(m => m.ProjectsListComponent)},
      {path: 'projects/create',loadComponent: () => import('./modules/projects/project-form/project-form.component').then(m => m.ProjectFormComponent)},
      {path: 'projects/edit/:id',loadComponent: () => import('./modules/projects/project-form/project-form.component').then(m => m.ProjectFormComponent)},
      {path: 'projects/:id',loadComponent: () => import('./modules/projects/project-details/project-details.component').then(m => m.ProjectDetailsComponent)},
      // articles
      {path: 'articles', loadComponent: () => import('./modules/articles/articles.component').then(m => m.ArticlesComponent) },
      // courses
      {path: 'courses', loadComponent: () => import('./modules/courses/courses.component').then(m => m.CoursesComponent) },
      // links
      {path: 'links', loadComponent: () => import('./modules/links/links.component').then(m => m.LinksComponent) },
      {path: '', redirectTo: 'projects', pathMatch: 'full' }
    ]
  }
];
