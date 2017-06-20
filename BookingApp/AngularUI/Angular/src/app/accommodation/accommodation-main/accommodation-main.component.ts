import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {AccommodationService} from '../../services/accommodation.service';
import {AuthenticationService} from '../../services/authentication.service';
import {Accommodation} from '../../models/Accommodation';

@Component({
  selector: 'accomm',
  templateUrl: './accommodation-main.component.html',
  styleUrls: ['./accommodation-main.component.css'],
})

export class AccommodationMainComponent implements OnInit {
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