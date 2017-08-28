// import the packages  
import { Injectable, EventEmitter } from '@angular/core';
import { ConfigurationManager } from './configuration-manager.service';

// declare the global variables  
declare var $: any;  

@Injectable()  
export class NotificationService {  
    // Declare the variables  
    private proxy: any;  
    private proxyName: string = 'Notifications';  
    private connection: any;  

    // create the Event Emitter  
    public notificationReceived: EventEmitter < string >;
    public newAccommodationReceived: EventEmitter < string >;
    public accommodationApproved: EventEmitter < string >;
    public connectionEstablished: EventEmitter < Boolean >;  
    public connectionExists: Boolean;  
   
    constructor() {  
        // Constructor initialization  
        this.connectionEstablished = new EventEmitter < Boolean > ();  
        this.newAccommodationReceived = new EventEmitter < any > ();  
        this.notificationReceived = new EventEmitter < string > ();  
        this.accommodationApproved = new EventEmitter <string>();
        this.connectionExists = false;  
        // create hub connection  
        this.connection = $.hubConnection(`http://${ConfigurationManager.Host}/`);  
        // create new proxy as name already given in top  
        this.proxy = this.connection.createHubProxy(this.proxyName);  
        // register on server events  
        this.registerOnServerEvents();  
        // call the connecion start method to start the connection to send and receive events. 
        this.startConnection(); 
        
    }  
    // method to hit from client  
    public sendHello() {  
        // server side hub method using proxy.invoke with method name pass as param  
        this.proxy.invoke('Hello');  
    }  
    // check in the browser console for either signalr connected or not  
    private startConnection(): void {  
        this.connection.start().done((data: any) => {  
            console.log('Now connected ' + data.transport.name + ', connection ID= ' + data.id);

            let currentUser = JSON.parse(localStorage.getItem('currentUser'));
            this.proxy.invoke('AddUserToGroup', currentUser.userId, currentUser.role);

            this.connectionEstablished.emit(true);  
            this.connectionExists = true;  
        }).fail((error: any) => {  
            console.log('Could not connect ' + error);  
            this.connectionEstablished.emit(false);  
        });  
    }  
    private registerOnServerEvents(): void {  

        //New accommodation notification
        this.proxy.on('newAccommodationNotification', (accommodationId: any) => {  
            this.newAccommodationReceived.emit(accommodationId);  
        });

        //On accomm approved
        this.proxy.on('accommodationApproved', (accommodationId: any) => {  
            this.accommodationApproved.emit(accommodationId);  
        });
    }  
}  