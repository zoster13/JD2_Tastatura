import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {RoomReservationsService} from '../../services/room-reservations.service';
import {AuthenticationService} from '../../services/authentication.service';
import {RoomReservations} from '../../models/RoomReservations';
import {AppUser} from '../../models/AppUser';

@Component({
  selector: 'reservations-list',
  templateUrl: './room-reservations-list.component.html',
  styleUrls: ['./room-reservations-list.component.css'],
})

export class RoomReservationsListComponent implements OnInit {

  role: string;
  roomReservations: RoomReservations[] = [];

  uriParts: string[];
  caption: string;
  jsonParts: string;

  constructor(private roomreservationsService:RoomReservationsService,
  private router: Router,
  private route: ActivatedRoute,
  private authenticationService: AuthenticationService) {
    
  }

  getAllRoomReservations() : void {
    this.roomreservationsService.getAllRoomReservations()
      .then(roomsres => this.roomReservations = roomsres);
  }

   isLoggedIn(): boolean {
        return this.authenticationService.isLoggedIn();
  }

  ngOnInit() : void {

    if(this.isLoggedIn()){
            this.role = JSON.parse(localStorage.getItem('currentUser'))['role'];
        }

    this.uriParts =  this.router.url.split('/');

    if(this.uriParts[this.uriParts.length - 2] === 'reservationlist'){

        this.route.params
        .switchMap((params: Params) => this.roomreservationsService.getRoomReservations(+params['id']))
        .subscribe(roomsres => {this.roomReservations = roomsres;});

        this.caption = "Rooms reservations of selected room:";
    }
     else{
       this.caption = "";
       this.getAllRoomReservations();
     }
  }

  finishBooking(roomres: RoomReservations){
    roomres.User = new AppUser();
    roomres.User.Username = JSON.parse(localStorage.getItem('currentUser'))['username'];
    this.roomreservationsService.delete(roomres['Id']);
    this.roomreservationsService.create(roomres);

  }

  delete(id: number){ 
    this.roomreservationsService.delete(id);
    window.location.reload();
  }
}