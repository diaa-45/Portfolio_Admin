import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article, ArticlePaginationResult } from './article.model';

@Injectable({ providedIn: 'root' })
export class ArticleService {
  private apiUrl = 'https://myportfolio-api.runasp.net/api/Articles'; 

  constructor(private http: HttpClient) {}

  getAll(page: number = 1, pageSize: number = 10): Observable<ArticlePaginationResult> {
    const params = {
      pageNumber: page.toString(),
      pageSize: pageSize.toString()
    };
    return this.http.get<ArticlePaginationResult>(this.apiUrl, { params });
  }

  getById(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/${id}`);
  }

  create(article: FormData): Observable<Article> {
    return this.http.post<Article>(this.apiUrl, article);
  }

  update(id: number, article: FormData): Observable<Article> {
    return this.http.put<Article>(`${this.apiUrl}/${id}`, article);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
