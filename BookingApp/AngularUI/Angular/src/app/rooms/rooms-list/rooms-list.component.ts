import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {RoomsService} from '../../services/rooms.service';
import {Room} from '../../models/Room';

@Component({
  selector: 'rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.css'],
})

export class RoomsListComponent implements OnInit {

  rooms: Room[];
  room: Room;
  temp: any;

  constructor(private roomsService:RoomsService,
  private router: Router) {
    
  }

  getRooms() : void {
    this.roomsService.getAllRooms()
      .then(rooms => this.rooms = rooms);
  }

  ngOnInit() : void {
    this.getRooms();
  }

  update(roomId: number){
    this.room = new Room();
    for(var i = 0; i < this.rooms.length; i++){
      this.temp = this.rooms[i];
      if(this.temp.Id == roomId){
          break;
      }
    }
  }

}