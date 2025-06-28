import { Component, OnInit } from '@angular/core';
import { User } from '../../../service/user.service';
import { UserService } from '../../../service/user.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'] // ✅ corrected spelling
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  newUser: User = {
    fullName: '',
    email: '',
    phone: 0,
    password: '',
    role: 'USER'
  };

  editingUserId: number | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        console.error('Failed to load users:', error);
      }
    });
  }

  addUser() {
    if (
      !this.newUser.fullName.trim() ||
      !this.newUser.email.trim() ||
      !this.newUser.phone ||
      !this.newUser.password.trim()
    ) {
      alert('Please fill out all required fields.');
      return;
    }

    if (this.editingUserId === null) {
      // Add new user
      this.userService.createUser(this.newUser).subscribe({
        next: () => {
          alert('User added successfully.');
          this.getAllUsers();
          this.resetForm();
        },
        error: (error) => {
          alert('Failed to add user: ' + error.message);
        }
      });
    } else {
      // Update existing user
      this.userService.updateUser(this.editingUserId, this.newUser).subscribe({
        next: () => {
          alert('User updated successfully.');
          this.getAllUsers();
          this.resetForm();
        },
        error: (error) => {
          alert('Failed to update user: ' + error.message);
        }
      });
    }
  }

  editUser(user: User) {
    this.newUser = { ...user, password: '' }; // Copy user data but clear password
    this.editingUserId = user.userId!;
  }

  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          alert('User deleted successfully.');
          this.getAllUsers();
        },
        error: (error) => {
          alert('Failed to delete user: ' + error.message);
        }
      });
    }
  }

  resetForm() {
    this.newUser = {
      fullName: '',
      email: '',
      phone: 0,
      password: '',
      role: 'USER'
    };
    this.editingUserId = null;
  }
}
