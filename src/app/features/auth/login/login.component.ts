import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form!:FormGroup; 

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private notify: NotificationService,
    private router: Router
  ) {}
  
ngOnInit(){
this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
}
  submit() {
    if (this.form.invalid) return;

    this.auth.login(this.form.value).subscribe({
      next: () => {
        this.notify.success('Login successful!');
        this.router.navigate(['/dashboard']);
      },
      error: () => this.notify.error('Invalid credentials'),
    });
  }
}
