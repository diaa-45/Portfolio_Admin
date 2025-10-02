import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      /* { path: 'projects', loadComponent: () => import('./modules/projects/projects.component').then(m => m.ProjectsComponent) },
      { path: 'articles', loadComponent: () => import('./modules/articles/articles.component').then(m => m.ArticlesComponent) },
      { path: 'courses', loadComponent: () => import('./modules/courses/courses.component').then(m => m.CoursesComponent) },
      { path: 'links', loadComponent: () => import('./modules/links/links.component').then(m => m.LinksComponent) },
       */{ path: '', redirectTo: 'projects', pathMatch: 'full' }
    ]
  }
];
