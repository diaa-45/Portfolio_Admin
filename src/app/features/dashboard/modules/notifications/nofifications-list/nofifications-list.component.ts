// admin-notifications.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from '../notification.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-nofifications-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './nofifications-list.component.html',
  styleUrls: ['./nofifications-list.component.css']
})
export class NotificationsListComponent implements OnInit, OnDestroy {
  notifications: any[] = [];
  private sub!: Subscription;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.loadNotifications();
    this.notificationService.startConnection();

    this.sub = this.notificationService.notifications$.subscribe(
      data => (this.notifications = data)
    );
  }

  markAsRead(id: number) {
    this.notificationService.markAsRead(id);
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
