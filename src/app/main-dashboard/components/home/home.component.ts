import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  username: string = 'Guest';
  role: string = 'USER';

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || 'Guest';
    this.role = localStorage.getItem('role') || 'USER';
  }
}