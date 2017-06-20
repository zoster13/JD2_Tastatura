import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'rooms',
  templateUrl: './rooms-main.component.html',
  styleUrls: ['./rooms-main.component.css'],
})

export class RoomsMainComponent {
  role: string;
  banned: string;

  constructor(private router: Router,
  private authenticationService: AuthenticationService) {
    
  }

  isLoggedIn(): boolean {
        return this.authenticationService.isLoggedIn();
  }

  ngOnInit() : void {
        if(this.isLoggedIn()){
            this.role = JSON.parse(localStorage.getItem('currentUser'))['role'];
            if(this.role == 'Manager'){
                this.banned = JSON.parse(localStorage.getItem('currentUser'))['isBanned'];
            }
        }
    }
}