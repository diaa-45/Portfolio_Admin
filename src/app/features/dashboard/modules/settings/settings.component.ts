import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChangePasswordService } from './setting.service';

@Component({
  selector: 'app-settings',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {
  changePasswordForm!: FormGroup;
  successMessage = '';
  errorMessage = '';
  isSubmitting = false;

  constructor(private fb: FormBuilder, private passwordService: ChangePasswordService) {}

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.changePasswordForm.invalid) {
      this.errorMessage = 'Please fill in all required fields correctly.';
      return;
    }

    const { currentPassword, newPassword } = this.changePasswordForm.value;


    const data = {currentPassword,newPassword};

    this.isSubmitting = true;

    this.passwordService.changePassword(data).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.successMessage = 'Password changed successfully!';
        this.changePasswordForm.reset();
      },
      error: (error) => {
        this.isSubmitting = false;
        this.errorMessage = 'Failed to change password. Please try again.';
        console.error(error);
      }
    });
  }
}

