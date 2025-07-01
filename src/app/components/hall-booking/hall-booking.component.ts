import { Component, OnInit } from '@angular/core';
import { HallService, Hall } from '../../service/hall.service';
import { BookingService, Booking } from '../../service/booking.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-hall-booking',
  imports: [CommonModule, FormsModule],
  templateUrl: './hall-booking.component.html',
  styleUrl: './hall-booking.component.css'
})
export class HallBookingComponent implements OnInit {
  halls: Hall[] = [];
  selectedHallId: number | null = null;
  bookingDate: string = '';
  bookingStatus: boolean = false;
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  expandedHallId: number | null = null;

  constructor(
    private hallService: HallService,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.loadHalls();
  }

  // Load all halls
  loadHalls(): void {
    this.loading = true;
    this.hallService.getAllHalls().subscribe({
      next: (data) => {
        this.halls = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load halls: ' + (err.message || err.statusText);
        this.loading = false;
      }
    });
  }

  // Select a hall for booking
  selectHallForBooking(hallId: number): void {
    this.expandedHallId = this.expandedHallId === hallId ? null : hallId;
    this.selectedHallId = hallId;
    this.bookingDate = '';
    this.successMessage = '';
    this.errorMessage = '';
  }

  // Create booking
  createBooking(): void {
    if (!this.selectedHallId || !this.bookingDate) {
      this.errorMessage = 'Please select a hall and booking date.';
      this.successMessage = '';
      return;
    }

    const newBooking: Booking = {
      hall: {
        hallId: this.selectedHallId,
        hallName: '',
        location: '',
        capacity: 0,
        price: 0
      },
      bookingDate: this.bookingDate,
      status: this.bookingStatus,
      user: {
        userId: Number(localStorage.getItem('userId')), 
        fullName: '',
        email: '',
        phone: 0
      }
    };

    this.bookingService.addBooking(newBooking).subscribe({
      next: () => {
        this.successMessage = 'Booking created successfully!';
        this.errorMessage = '';
        this.selectedHallId = null;
        this.bookingDate = '';
        this.bookingStatus = false;
      },
      error: (err) => {
        if (err.status === 409) {
          this.errorMessage = 'Hall is already booked for the selected date.';
        } else {
          this.errorMessage = 'Failed to create booking: ' + (err.message || err.statusText);
        }
        this.successMessage = '';
      }
    });
  }
}
