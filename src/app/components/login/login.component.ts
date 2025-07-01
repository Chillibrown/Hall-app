import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const payload = {
      email: this.email,
      password: this.password
    };

    this.http.post<any>('http://localhost:9095/auth/login', payload).subscribe({
      next: (response) => {
        // ✅ Save login info
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.userId?.toString() ?? ''); // convert number to string safely
        localStorage.setItem('role', response.role);     // "ADMIN" or "USER"

        console.log('Login Success:', response);

        // ✅ Redirect based on role
        if (response.role === 'ADMIN') {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/dashboard/hall-booking']);
        }
      },
      error: (err) => {
        console.error('Login Failed:', err);
        alert('Invalid email or password');
      }
    });
  }
}
