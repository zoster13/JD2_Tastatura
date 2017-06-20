import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {AppUsersService} from '../services/appuser.service';
import {AppUser} from '../models/AppUser';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})

export class AppUsersComponent implements OnInit {

  allUsers : AppUser[] = [];

  constructor(private appUsersService:AppUsersService) {   

  }

  ban(userId) {
        this.appUsersService.ban(userId)
                            .subscribe( x => {this.appUsersService.getAppUsers().then(x => this.allUsers = x);} );    
  }

  unban(userId) {
      this.appUsersService.unban(userId)
                            .subscribe( x => {this.appUsersService.getAppUsers().then(x => this.allUsers = x);} );    
  }

  getAllUsers() : void {
    this.appUsersService.getAppUsers().then(users => this.allUsers = users);
  }

  ngOnInit() : void {
    this.getAllUsers();
  }
}