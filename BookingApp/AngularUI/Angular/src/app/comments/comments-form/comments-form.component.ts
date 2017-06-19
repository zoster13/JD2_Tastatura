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
        this.comment.text = '';
        this.comment.grade = 0;
        this.comment.accommodation = new Accommodation();
        this.comment.user = new AppUser();
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
        this.comment.text = '';
        this.comment.grade = 0;
        this.comment.accommodation = new Accommodation();
        this.comment.user = new AppUser();
    }
  }

  getAccommodation() : void {
    this.accommService.getAllAccommodations().then(accomm => this.accommodation = accomm);
  }

  getUsers() : void {
    this.userService.getAppUsers().then(users => this.users = users);
  }

  onSubmit(comment: any, form: NgForm):void{
      this.comment.text = comment.Text;
        this.comment.grade = comment.Grade;
        this.comment.accommodation = new Accommodation();
        this.comment.accommodation.id = comment.Accommodation;
        this.comment.user = new AppUser();
        this.comment.user.id = comment.User;

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