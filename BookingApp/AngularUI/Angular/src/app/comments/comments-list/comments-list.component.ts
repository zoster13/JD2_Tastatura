import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CommentsService} from '../../services/comments.service';
import {RoomReservationsService} from '../../services/room-reservations.service';
import {AccommodationService} from '../../services/accommodation.service';
import {RoomsService} from '../../services/rooms.service';
import {Comment} from '../../models/Comment';
import {RoomReservations} from '../../models/RoomReservations';
import {AuthenticationService} from '../../services/authentication.service';
import {Room} from '../../models/Room';
import {AppUser} from '../../models/AppUser';
import {Accommodation} from '../../models/Accommodation';

@Component({
  selector: 'comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css'],
})

export class CommentsListComponent implements OnInit {
  role: string;

  comments: Comment[] = [];
  comment: Comment;
  temp: any;

  reservations: RoomReservations[] = [];
  rooms: Room[] = [];
  uriParts: string[];
  caption: string;
  accomid: number = 0;
  i: number;
  j: number;
  currentDate: Date;

  isAdd: boolean = false;
  isAllowed: boolean = false;

  constructor(private commentsService:CommentsService,
  private accommService:AccommodationService,
  private roomsService:RoomsService,
  private reservationService:RoomReservationsService,
  private authenticationService: AuthenticationService,
  private router: Router,
  private route: ActivatedRoute) {
    this.comment = new Comment();
  }

  getAllComments() : void {
    this.commentsService.getAllComments()
      .then(comments => {this.comments = comments;});
  }

  ngOnInit() : void {
    if(this.isLoggedIn()){
            this.role = JSON.parse(localStorage.getItem('currentUser'))['role'];
   }

    this.uriParts =  this.router.url.split('/');

    if(this.uriParts[this.uriParts.length - 2] === 'commentlist'){
        this.route.params
        .switchMap((params: Params) => this.commentsService.getComments(+params['id']))
        .subscribe(comments => {this.comments = comments;});

        this.accomid = +(this.uriParts[this.uriParts.length - 1]);

        this.caption = "Comments of selected accommodation:";
        this.isAdd = true;

        if(this.isLoggedIn()){
          // this.route.params
          // .switchMap((params: Params) => this.roomsService.getAllRoomsByAccomm(+params['id']))
          // .subscribe(rooms => this.rooms = rooms);

        this.route.params
        .switchMap((params: Params) => this.reservationService.getRoomReservationsForUser(JSON.parse(localStorage.getItem('currentUser'))['username']))
        .subscribe((res) => 
        {
          this.reservations = res;
          this.route.params
          .switchMap((params: Params) => this.roomsService.getAllRoomsByAccomm(+params['id']))
          .subscribe((rooms) => 
          {
              this.rooms = rooms;
              if(this.reservations.length > 0){
                  for(this.i = 0; this.i < this.reservations.length; this.i++){
                      for(this.j = 0; this.j < this.rooms.length; this.j++){
                          if(this.rooms[this.j]['Id'] == this.reservations[this.i]['Room']['Id']){
                            if( new Date(this.reservations[this.i]['EndDate']) < new Date){
                                this.isAllowed = true;
                            }
                          }
                      }
                  }
                }
           });
        }
      );
    }
    }
     else{
       this.caption = "";
       this.isAdd = false;
       this.getAllComments();
     }
}

isLoggedIn(): boolean {
        return this.authenticationService.isLoggedIn();
  }

 onSubmit(comment: any, form: NgForm):void{
      this.comment = new Comment();
      this.comment.text = comment.Text;
      this.comment.grade = comment.Grade;
      this.comment.accommodation = new Accommodation();
      this.comment.accommodation.id = this.accomid;
      this.comment.user = new AppUser();
      this.comment.user.username = JSON.parse(localStorage.getItem('currentUser'))['username'];
      debugger
      this.commentsService.create(this.comment);
      
      form.resetForm();
}

  delete(id: number){ 
    this.commentsService.delete(id);
    window.location.reload();
  }
}