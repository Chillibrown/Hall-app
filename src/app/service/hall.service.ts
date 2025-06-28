import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Hall {
  hallId: number; 
  hallName: string;
  location: string;
  capacity: number;
  price: number;
}


@Injectable({
  providedIn: 'root'
})
export class HallService {
  private apiUrl = 'http://localhost:9095/hall';  // URL yako ya backend

  constructor(private http: HttpClient) {}

  // Retrieve all halls
  getAllHalls(): Observable<Hall[]> {
    return this.http.get<Hall[]>(`${this.apiUrl}/all`);
  }

  // Create new hall
  createHall(hall: Hall): Observable<Hall> {
    return this.http.post<Hall>(`${this.apiUrl}/create`, hall);
  }

  // Update hall by id
  updateHall(id: number, hall: Hall): Observable<Hall> {
    return this.http.put<Hall>(`${this.apiUrl}/update/${id}`, hall);
  }

  // Delete hall by id
  deleteHall(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
