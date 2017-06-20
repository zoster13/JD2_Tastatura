import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {RoomsService} from '../../services/rooms.service';
import {Room} from '../../models/Room';
import {AuthenticationService} from '../../services/authentication.service';
import {RoomsFilterPipe} from '../../search/rooms-search.component';

@Component({
  selector: 'rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.css'],
})

export class RoomsListComponent implements OnInit {

  role: string;
  
  rooms: Room[] = [];
  room: Room;
  temp: any;

  uriParts: string[];
  caption: string;

  roomscount: number = 0;
  roomsaccomcount: number = 0;
  i: number = 0;
  numeration: number[] = [];
  numerationacc: number[] = [];
  accomlist: boolean = false;

  constructor(private roomsService:RoomsService,
  private router: Router,
  private route: ActivatedRoute,
  private authenticationService: AuthenticationService) {
    
  }

  getAllRooms() : void {
    this.roomsService.getAllRooms()
      .then(rooms => this.rooms = rooms);
  }

  ngOnInit() : void { 
    if(this.isLoggedIn()){
     this.role = JSON.parse(localStorage.getItem('currentUser'))['role'];
    }

    this.roomsService.getAllRooms()
      .then(rooms =>{ 
        this.roomscount = rooms.length;
      if(this.roomscount%3 == 0){
          for(this.i = 0;this.i < Math.floor(this.roomscount/3); this.i++){
            this.numeration[this.i] = this.i + 1;
          }
      }
      else{
          for(this.i = 0; this.i <  Math.floor(this.roomscount/3) + 1; this.i++){
            this.numeration[this.i] = this.i + 1;
          }
      }
    });
    this.route.params
        .switchMap((params: Params) => this.roomsService.getAllRoomsByAccomm(+params['acc']))
        .subscribe(rooms =>{  
        this.roomscount = rooms.length;
        if(this.roomscount%3 == 0){
          for(this.i = 0;this.i < Math.floor(this.roomscount/3); this.i++){
            this.numerationacc[this.i] = this.i + 1;
          }
      }
      else{
          for(this.i = 0; this.i <  Math.floor(this.roomscount/3) + 1; this.i++){
            this.numerationacc[this.i] = this.i + 1;
          }
      }
    });

    this.uriParts =  this.router.url.split('/');

    if(this.uriParts[this.uriParts.length - 3] === 'roomlist'){ 
        this.route.params
        .switchMap((params: Params) => this.roomsService.getRoomsByAccomm((+params['id'] - 1)*3, +params['acc']))
        .subscribe(rooms => this.rooms = rooms);

        this.caption = "Rooms of selected accommodation:";
        this.accomlist = true;
    }
    else{
        this.route.params
        .switchMap((params: Params) => this.roomsService.getRooms((+params['id'] - 1)*3))
        .subscribe(rooms => {this.rooms = rooms;});

        this.accomlist = false;
    }
  }

  delete(id: number){
    this.roomsService.delete(id);
    window.location.reload();
  }

  isLoggedIn(): boolean {
        return this.authenticationService.isLoggedIn();
  }
}