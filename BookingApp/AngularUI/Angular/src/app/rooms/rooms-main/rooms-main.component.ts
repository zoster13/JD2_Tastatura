import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'rooms',
  templateUrl: './rooms-main.component.html',
  styleUrls: ['./rooms-main.component.css'],
})

export class RoomsMainComponent {

  constructor(private router: Router) {
    
  }
}