import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../features/dashboard/modules/notifications/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  unreadCount: number = 0; // ✅ Property, not method
  private subscription!: Subscription;

  constructor(
    private auth: AuthService,
    private notificationService: NotificationService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // ✅ Subscribe to notifications and update count
    this.subscription = this.notificationService.notifications$.subscribe(notifications => {
      this.unreadCount = notifications.filter(n => !n.isRead).length;
      console.log('🔔 Unread count updated:', this.unreadCount);
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    // ✅ Clean up subscription
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}