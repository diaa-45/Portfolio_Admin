import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../article.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-article-details',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, MatIcon],
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css'],
})
export class ArticleDetailsComponent implements OnInit {
  
  article: any;
  isLoading = true;

  constructor(private route: ActivatedRoute, private articleService: ArticleService, private router: Router) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadArticle(id);
  }

  loadArticle(id: number) {
    this.articleService.getById(id).subscribe({
      next: (res) => {
        this.article = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading article details:', err);
        this.isLoading = false;
      },
    });
  }
  back() {
    this.router.navigate(['/dashboard/articles']);
  }
}
