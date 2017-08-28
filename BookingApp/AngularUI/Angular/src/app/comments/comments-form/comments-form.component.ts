import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AppUsersService } from '../../services/appuser.service';
import { AccommodationService } from '../../services/accommodation.service';
import { CommentsService } from '../../services/comments.service';
import 'rxjs/add/operator/switchMap';
import {Comment} from '../../models/Comment';
import {Accommodation} from '../../models/Accommodation';
import {AppUser} from '../../models/AppUser';

@Component({
  selector: 'comments-form',
  templateUrl: './comments-form.component.html',
  styleUrls: ['./comments-form.component.css'],
})

export class CommentsFormComponent {

    accommodation: Accommodation[];
    users: AppUser[];
    comment: Comment;

    uriParts: string [];
    isUpdate: boolean;
    temp: any;

    constructor(
      private accommService: AccommodationService,
      private userService: AppUsersService,
      private commentService: CommentsService,
      private router: Router,
      private routeActive: ActivatedRoute,
      private location: Location) {

        this.comment = new Comment();
        this.comment.Text = '';
        this.comment.Grade = 0;
        this.comment.Accommodation = new Accommodation();
        this.comment.User = new AppUser();
      }

  ngOnInit(): void {
    this.getAccommodation();
    this.getUsers();

    this.uriParts =  this.router.url.split('/');
      
      if(this.uriParts[this.uriParts.length - 2] === 'update'){
        this.routeActive.params
        .switchMap((params: Params) => this.commentService.getComment(+params['id']))
        .subscribe(comment => this.comment = comment);

        this.isUpdate = true;
    }
    else{
      this.isUpdate = false;

      this.comment = new Comment();
        this.comment.Text = '';
        this.comment.Grade = 0;
        this.comment.Accommodation = new Accommodation();
        this.comment.User = new AppUser();
    }
  }

  getAccommodation() : void {
    this.accommService.getAllAccommodations().then(accomm => this.accommodation = accomm);
  }

  getUsers() : void {
    this.userService.getAppUsers().then(users => this.users = users);
  }

  onSubmit(comment: any, form: NgForm):void{
      this.comment.Text = comment.Text;
        this.comment.Grade = comment.Grade;
        this.comment.Accommodation = new Accommodation();
        this.comment.Accommodation.Id = comment.Accommodation;
        this.comment.User = new AppUser();
        this.comment.User.Id = comment.User;

      if(!this.isUpdate){
          this.commentService.create(this.comment);
      }
      else{
          this.commentService.update(this.comment);
      }

      form.resetForm();

      this.router.navigate(["mainpage/rooms/roomlist"]);
  }

}