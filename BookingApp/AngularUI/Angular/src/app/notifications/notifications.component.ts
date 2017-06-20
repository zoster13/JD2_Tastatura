import { Component, OnInit, NgZone } from '@angular/core';
import { NotificationService } from '../services/notifications.service';
import { HttpService } from '../services/http.service';
import {Accommodation} from '../models/Accommodation';
import {AccommodationService} from '../services/accommodation.service';

@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  providers: [HttpService]
})
export class NotificationsComponent implements OnInit {

  isConnected: Boolean;
  //notifications: string[];

  unapprovedAccommodations: Accommodation[];

  constructor(private notifService: NotificationService, 
              private http: HttpService, 
              private _ngZone: NgZone,
              private accommodationService : AccommodationService) {
    
    this.isConnected = false;
    
      this.unapprovedAccommodations = [];
  }

  ngOnInit() {
    this.getUnapprovedAccommodations();
    this.checkConnection();
    this.subscribeForNotifications();
  }

  private checkConnection(){
    this.notifService.connectionEstablished.subscribe(e => {this.isConnected = e; this.notifService.sendHello()});
  }

  private subscribeForNotifications () {
    this.notifService.newAccommodationReceived.subscribe(e => this.onNewAccommodationRecived(e));
  }

  public onNewAccommodationRecived(accommodationId: any) {
     this._ngZone.run(() => {  
                alert('You have one new accommodation that needs to be approved.');
                this.getUnapprovedAccommodations(); 
    });
  }

  private getUnapprovedAccommodations() : void {
    this.accommodationService.getAllUnapprovedAccommodations()
      .then(accommodations =>{ 
        this.unapprovedAccommodations = accommodations;debugger
    });
  }

  private approveAccommodation(accommodation: Accommodation): void{
    let accom: Accommodation = this.unapprovedAccommodations.find(a => a['Id'] === accommodation['Id']);
    accom.approved = true;
    this.accommodationService.update(accom).then( x => {this.accommodationService.getAllUnapprovedAccommodations().then(x => this.unapprovedAccommodations = x);});
  }
}
