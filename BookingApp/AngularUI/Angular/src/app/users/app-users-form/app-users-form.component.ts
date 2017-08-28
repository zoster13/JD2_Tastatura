import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params} from '@angular/router';
import { AppUser } from '../../models/AppUser';
import { NgForm} from '@angular/forms';

import { AppUsersService} from '../../services/appuser.service';

@Component({
  selector: 'app-users-form',
  templateUrl: './app-users-form.component.html',
  styleUrls: ['./app-users-form.component.css'],
})

export class AppUsersFormComponent implements OnInit {

   appUser: AppUser;

  constructor(private appUsersService: AppUsersService,
              private routeActive: ActivatedRoute,
              private router: Router) {
                  
      this.appUser = new AppUser();
  }

   ngOnInit(): void {

   }

  onSubmit(appUser: any, form: NgForm) {
      if(appUser.FullName == "" || appUser.FullName == undefined || 
        appUser.Email == "" || appUser.Email == undefined ||
        appUser.Password == "" || appUser.Password == undefined ||
        appUser.Username == "" || appUser.Username == undefined) {

        alert("All fields must be filled!");
      }
      else {
        this.appUser.FullName = appUser.FullName;
        this.appUser.Email = appUser.Email;
        this.appUser.Password = appUser.Password;
        this.appUser.Username = appUser.Username;
        this.appUser.IsBanned = false; 

        this.appUsersService.create(this.appUser);
        form.resetForm();
      }
   }
}