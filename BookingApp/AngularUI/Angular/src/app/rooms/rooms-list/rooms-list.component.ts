import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {RoomsService} from '../../services/rooms.service';
import {Room} from '../../models/Room';

@Component({
  selector: 'rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.css'],
})

export class RoomsListComponent implements OnInit {

  rooms: Room[] = [];
  room: Room;
  temp: any;

  uriParts: string[];
  caption: string;

  constructor(private roomsService:RoomsService,
  private router: Router,
  private route: ActivatedRoute) {
    
  }

  getAllRooms() : void {
    this.roomsService.getAllRooms()
      .then(rooms => this.rooms = rooms);
  }

  ngOnInit() : void {

    this.uriParts =  this.router.url.split('/');

    if(this.uriParts[this.uriParts.length - 2] === 'roomlist'){
        

        this.route.params
        .switchMap((params: Params) => this.roomsService.getRooms(+params['id']))
        .subscribe(rooms => this.rooms = rooms);
        this.rooms;

        this.caption = "Rooms of selected accommodation:";
    }
     else{
       this.caption = "";
       this.getAllRooms();
     }
  }
}