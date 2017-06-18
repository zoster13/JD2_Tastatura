import { Component, OnInit, NgZone } from '@angular/core';
import { NotificationService } from '../services/notifications.service';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  providers: [HttpService]
})
export class NotificationsComponent implements OnInit {

  isConnected: Boolean;
  notifications: string[];

  constructor(private notifService: NotificationService, private http: HttpService, private _ngZone: NgZone) {
    this.isConnected = false;
    this.notifications = [];
   }

  ngOnInit() {
    this.checkConnection();
    this.subscribeForNotifications();
  }

  private checkConnection(){
    this.notifService.connectionEstablished.subscribe(e => {this.isConnected = e; this.notifService.sendHello()});
  }

  private subscribeForNotifications () {
    this.notifService.notificationReceived.subscribe(e => this.onNotification(e));
  }

  public onNotification(notif: string) {
     this._ngZone.run(() => {  
                this.notifications.push(notif); 
    });  
   
  }

  public onClick() {
    this.http.click().subscribe(data => console.log(data));
  } 
}
