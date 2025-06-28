import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-main-dashboard',
  imports: [RouterModule, CommonModule, SidebarComponent],
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css'],
})
export class MainDashboardComponent {
  isSidebarExpanded = false;

  toggleSidebar() {
    this.isSidebarExpanded = !this.isSidebarExpanded;
  }
}
