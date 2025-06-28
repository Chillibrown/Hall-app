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

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const user = localStorage.getItem('username');
      this.username = user ? user : 'Guest';
    }
  }
}