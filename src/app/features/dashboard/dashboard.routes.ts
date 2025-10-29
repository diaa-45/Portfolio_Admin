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
      {path: 'articles', loadComponent: () => import('./modules/articles/article-list/article-list.component').then(m => m.ArticleListComponent) },
      {path: 'articles/create',loadComponent: () => import('./modules/articles/article-form/article-form.component').then(m => m.ArticleFormComponent)},
      {path: 'articles/edit/:id',loadComponent: () => import('./modules/articles/article-form/article-form.component').then(m => m.ArticleFormComponent)},
      {path: 'articles/:id',loadComponent: () => import('./modules/articles/article-details/article-details.component').then(m => m.ArticleDetailsComponent)},
      // courses
      {path: 'courses', loadComponent: () => import('./modules/courses/course-list/course-list.component').then(m => m.CourseListComponent) },
      {path: 'courses/create',loadComponent: () => import('./modules/courses/course-form/course-form.component').then(m => m.CourseFormComponent)},
      {path: 'courses/edit/:id',loadComponent: () => import('./modules/courses/course-form/course-form.component').then(m => m.CourseFormComponent)},
      {path: 'courses/:id',loadComponent: () => import('./modules/courses/course-details/course-details.component').then(m => m.CourseDetailsComponent)},
      // links
      {path: 'links', loadComponent: () => import('./modules/links/links.component').then(m => m.LinksComponent) },
      {path: '', redirectTo: 'projects', pathMatch: 'full' }
    ]
  }
];
