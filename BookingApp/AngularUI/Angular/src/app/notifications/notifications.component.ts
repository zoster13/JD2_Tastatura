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
    //this.notifService.notificationReceived.subscribe(e => this.onNotification(e));
    this.notifService.newAccommodationReceived.subscribe(e => this.onNewAccommodationRecived(e));
  }

  // public onNotification(notif: string) {
  //    this._ngZone.run(() => {  
  //               this.notifications.push(notif); 
  //   });  
  //}

  public onNewAccommodationRecived(accommodationId: any) {
     this._ngZone.run(() => {  
                alert('You have one new accommodation that need to be approved.');
                debugger
                this.getUnapprovedAccommodations(); 
    });
  }

  private getUnapprovedAccommodations() : void {
    this.accommodationService.getAllAccommodations()
      .then(accommodations =>{ 
        this.unapprovedAccommodations = accommodations;
    });
  }
}
