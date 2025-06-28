import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HallService, Hall } from '../../../service/hall.service';

@Component({
  standalone: true,
  selector: 'app-hall-list',
  templateUrl: './hall-list.component.html',
  styleUrl: './hall-list.component.css',
  imports: [CommonModule, FormsModule]
})
export class HallListComponent implements OnInit {
  halls: Hall[] = [];
  currentHall: Hall = this.emptyHall();
  isEditing = false;
  isAdding = false;

  constructor(private hallService: HallService) {}

  ngOnInit(): void {
    this.getHalls();
  }

  getHalls(): void {
    this.hallService.getAllHalls().subscribe((data) => (this.halls = data));
  }

  startAdd(): void {
    this.currentHall = this.emptyHall();
    this.isAdding = true;
    this.isEditing = false;
  }

  startEdit(hall: Hall): void {
    this.currentHall = { ...hall };
    this.isEditing = true;
    this.isAdding = false;
  }

  saveHall(): void {
    if (this.isEditing && this.currentHall.hallId) {
      this.hallService.updateHall(this.currentHall.hallId, this.currentHall).subscribe(() => {
        this.getHalls();
        this.cancel();
      });
    } else {
      this.hallService.createHall(this.currentHall).subscribe(() => {
        this.getHalls();
        this.cancel();
      });
    }
  }

  deleteHall(id: number): void {
    if (confirm('Are you sure you want to delete this hall?')) {
      this.hallService.deleteHall(id).subscribe(() => this.getHalls());
    }
  }

  cancel(): void {
    this.isEditing = false;
    this.isAdding = false;
    this.currentHall = this.emptyHall();
  }

  private emptyHall(): Hall {
    return {
      hallId: 0,
      hallName: '',
      location: '',
      capacity: 0,
      price: 0
    };
  }
}
