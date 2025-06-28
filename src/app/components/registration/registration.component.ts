import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-registration',
  imports: [FormsModule, NgIf],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  model = {
    fullName: '',
    email: '',
    phone: '',
    password: '',
  };

  constructor(private http: HttpClient, private router: Router) {}

  onRegister() {
    if (
      this.model.fullName &&
      this.model.email &&
      this.model.phone &&
      this.model.password
    ) {
      this.http.post('http://localhost:9095/auth/register', this.model).subscribe({
        next: (response) => {
          alert('Registration successful!');
          this.router.navigate(['/login']); // 👈 redirect to login
        },
        error: (error) => {
          alert('Registration failed: ' + error.message);
        }
      });
    } else {
      alert('Please fill in all required fields.');
    }
  }
}