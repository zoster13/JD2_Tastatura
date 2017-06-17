import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'room-reservations',
  templateUrl: './room-reservations-main.component.html',
  styleUrls: ['./room-reservations-main.component.css'],
})

export class RoomReservationsMainComponent {

  constructor(private router: Router) {
    
  }
}