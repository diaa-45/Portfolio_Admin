// services/notification.service.ts
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private hubConnection!: signalR.HubConnection;
  private notificationsSubject = new BehaviorSubject<any[]>([]);
  notifications$ = this.notificationsSubject.asObservable();
  //private apiUrl = 'https://myportfolio-api.runasp.net/api/ContactForm';
  private apiUrl = 'https://localhost:44383/api/ContactForm';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    // ✅ Initialize connection and load data when service is created
    this.loadNotifications();
    this.startConnection();
  }

  unreadCount(): number {
    return this.notificationsSubject.getValue().filter(n => !n.isRead).length;
  }

  // Get all existing notifications from API
  loadNotifications() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => this.notificationsSubject.next(data),
      error: (err) => console.error('Failed to load notifications:', err)
    });
  }

  // Start SignalR connection for real-time updates
  startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      //.withUrl('https://myportfolio-api.runasp.net/notification'
        .withUrl('https://localhost:44383/notification'
        , {
        withCredentials: true
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('✅ SignalR Connected'))
      .catch(err => console.error('❌ SignalR Connection Error:', err));

    // ✅ Listen for new contact form submissions
    this.hubConnection.on('ReceiveNotification', (data) => {
      console.log('🔔 New notification received:', data);
      
      const current = this.notificationsSubject.getValue();
      this.notificationsSubject.next([data, ...current]);

    });
  }

  // Mark a message as read
  markAsRead(id: number) {
    return this.http.put(`${this.apiUrl}/${id}/read`, {}).subscribe({
      next: () => {
        // ✅ Update the local state
        const current = this.notificationsSubject.getValue();
        const updated = current.map(n => 
          n.id === id ? { ...n, isRead: true } : n
        );
        this.notificationsSubject.next(updated);
      },
      error: (err) => console.error('Failed to mark as read:', err)
    });
  }

  // Optional: Method to stop connection when needed
  stopConnection() {
    if (this.hubConnection) {
      this.hubConnection.stop();
    }
  }
}