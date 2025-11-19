import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../features/dashboard/modules/notifications/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  sidebarOpen = false;
  unreadCount: number = 0; // ✅ Property, not method
  private subscription!: Subscription
  constructor(private auth : AuthService,private notificationService: NotificationService,
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
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebarOnMobile() {
    // Close sidebar on mobile when clicking a link
    if (window.innerWidth <= 992) {
      this.sidebarOpen = false;
    }
  }
logout() {
  this.auth.logout();
  this.router.navigate(['/login']);
}
}
