import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Booking, BookingService } from '../../service/booking.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {
  bookings: Booking[] = [];
  loading: boolean = false;
  errorMessage: string = '';

  selectedBooking: Booking | null = null;
  isAdding: boolean = false;
  newBooking: Booking = this.emptyBooking();

  role: string | null = '';
  userId: number = 0;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    this.userId = Number(localStorage.getItem('userId'));
    this.loadBookings();
  }

  loadBookings(): void {
    this.loading = true;
    this.errorMessage = '';

    const fetch$ =
      this.role === 'ADMIN'
        ? this.bookingService.getAllBookings()
        : this.bookingService.getBookingsByUser(this.userId);

    fetch$.subscribe({
      next: (data) => {
        this.bookings = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load bookings: ' + (err.message || err.statusText);
        this.loading = false;
      }
    });
  }

  emptyBooking(): Booking {
    return {
      user: { userId: this.userId },
      hall: { hallId: 0 },
      bookingDate: '',
      status: false,
    };
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  }

  getStatusLabel(status: boolean): string {
    return status ? 'Confirmed' : 'Pending';
  }

  // Edit Booking
  editBooking(booking: Booking): void {
    this.selectedBooking = { ...booking };
    this.isAdding = false;
  }

  saveEdit(): void {
    if (!this.selectedBooking || !this.selectedBooking.bookingId) return;

    this.bookingService.updateBooking(this.selectedBooking.bookingId, this.selectedBooking).subscribe({
      next: () => {
        alert('Booking updated successfully');
        this.selectedBooking = null;
        this.loadBookings();
      },
      error: (err) => {
        this.errorMessage = 'Failed to update booking: ' + (err.message || err.statusText);
      }
    });
  }

  cancelEdit(): void {
    this.selectedBooking = null;
  }

  // Delete Booking
  deleteBooking(id: number | undefined): void {
    if (!id) return;
    if (confirm('Are you sure you want to delete this booking?')) {
      this.bookingService.deleteBooking(id).subscribe({
        next: () => {
          alert('Booking deleted successfully.');
          this.loadBookings();
        },
        error: (err) => {
          this.errorMessage = 'Failed to delete booking: ' + (err.message || err.statusText);
        }
      });
    }
  }

  // Add Booking
  startAdd(): void {
    this.isAdding = true;
    this.selectedBooking = null;
    this.newBooking = this.emptyBooking();
  }

  cancelAdd(): void {
    this.isAdding = false;
    this.newBooking = this.emptyBooking();
  }

  saveNewBooking(): void {
    if (
      !this.newBooking.user.userId ||
      !this.newBooking.hall.hallId ||
      !this.newBooking.bookingDate
    ) {
      alert('Please fill all required fields');
      return;
    }

    this.bookingService.addBooking(this.newBooking).subscribe({
      next: () => {
        alert('Booking added successfully');
        this.isAdding = false;
        this.newBooking = this.emptyBooking();
        this.loadBookings();
      },
      error: (err) => {
        this.errorMessage = 'Failed to add booking: ' + (err.message || err.statusText);
      },
    });
  }

  // ✅ Getter & Setter for ngModel-safe access

  get bookingDate(): string {
    return this.isAdding ? this.newBooking.bookingDate : this.selectedBooking?.bookingDate ?? '';
  }

  set bookingDate(value: string) {
    if (this.isAdding) {
      this.newBooking.bookingDate = value;
    } else if (this.selectedBooking) {
      this.selectedBooking.bookingDate = value;
    }
  }

  get hallId(): number {
    return this.isAdding ? this.newBooking.hall.hallId : this.selectedBooking?.hall.hallId ?? 0;
  }

  set hallId(value: number) {
    if (this.isAdding) {
      this.newBooking.hall.hallId = value;
    } else if (this.selectedBooking) {
      this.selectedBooking.hall.hallId = value;
    }
  }

  get status(): boolean {
    return this.isAdding ? this.newBooking.status : this.selectedBooking?.status ?? false;
  }

  set status(value: boolean) {
    if (this.isAdding) {
      this.newBooking.status = value;
    } else if (this.selectedBooking) {
      this.selectedBooking.status = value;
    }
  }
}
