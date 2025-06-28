import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isCollapsed = true;

  constructor(private router: Router) {}

  toggleNavbar() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout() {
    localStorage.removeItem('token'); // futa token
    this.router.navigate(['/login']); // rudi login
  }
}
