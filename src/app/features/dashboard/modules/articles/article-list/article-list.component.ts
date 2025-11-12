import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Article } from '../article.model';
import { ArticleService } from '../article.service';
import { NotificationService } from '../../../../../core/services/notification.service';

import { environment } from '../../../../../../environments/environment.prod';
import { environmentDev } from '../../../../../../environments/environment.dev';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterLink, MatTableModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = [];
  displayedColumns = ['title', 'author', 'thumbImage', 'date', 'actions'];
  loading = false;
  currentPage: number = 1;
  pageSize: number = 6;
  totalPages: number = 0;

  //iamgesDev : string = environmentDev.imagesUrl;
  iamgesProd : string = environment.imagesUrl;

  constructor(
    private articleService: ArticleService,
    private notify: NotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadArticles(this.currentPage);
  }

  loadArticles(page: number = 1) {
    this.loading = true;
    this.articleService.getAll(page, this.pageSize).subscribe({
      next: (res) => {
        this.articles = res.data;
        this.currentPage = Number(res.pageNumber) || 1;
        this.pageSize = Number(res.pageSize) || this.pageSize;
        this.totalPages = Number(res.totalPages) || 0;
        console.log("total pages"+res.totalPages);
        
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.notify.error('Failed to load articles');
      }
    });
  }

  deleteArticle(id: number) {
    if (!confirm('Are you sure you want to delete this article?')) return;

    this.articleService.delete(id).subscribe({
      next: () => {
        this.articles = this.articles.filter(a => a.id !== id);
        this.notify.success('Article deleted successfully');
      },
      error: () => this.notify.error('Failed to delete article')
    });
  }

  editArticle(id: number) {
    this.router.navigate(['/dashboard/articles/edit', id]);
  }

  viewDetails(id: number) {
    this.router.navigate(['/dashboard/articles/details', id]);
  }

  createArticle() {
    this.router.navigate(['/dashboard/articles/create']);
  }
}
