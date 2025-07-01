import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  userId: number;
  fullName?: string;
  email?: string;
  phone?: string | number;
  password?: string;
  role?: string;
}

export interface Hall {
  hallId: number;
  hallName?: string;
  location?: string;
  capacity?: number;
  price?: number;
}

export interface Booking {
  bookingId?: number;
  user: User;
  hall: Hall;
  bookingDate: string; //(yyyy-MM-dd)
  status: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private apiUrl = 'http://localhost:9095/booking';

  constructor(private http: HttpClient) {}

  // Get all bookings (admin)
  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/all`);
  }

  // Get bookings by User ID (normal user)
  getBookingsByUser(userId: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/user/${userId}`);
  }

  // Get booking by ID
  getBookingById(id: number): Observable<Booking> {
    return this.http.get<Booking>(`${this.apiUrl}/find/${id}`);
  }

  // Add booking
  addBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(`${this.apiUrl}/add`, booking);
  }

  // Update booking
  updateBooking(id: number, booking: Booking): Observable<Booking> {
    return this.http.put<Booking>(`${this.apiUrl}/update/${id}`, booking);
  }

  // Delete booking
  deleteBooking(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, { responseType: 'text' });
  }
}
