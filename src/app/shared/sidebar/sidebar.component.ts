import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  sidebarOpen = false;

  constructor(private auth : AuthService,private router: Router){}
toggleSidebar() {
  this.sidebarOpen = !this.sidebarOpen;
}
logout() {
  this.auth.logout();
  this.router.navigate(['/login']);
}
}
