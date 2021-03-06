import { Injectable } from '@angular/core';
import { RoomReservations } from '../models/RoomReservations';
import { Headers, Http, RequestOptions } from '@angular/http';
import { ConfigurationManager } from './configuration-manager.service';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RoomReservationsService {
    
    private headers = new Headers({'Content-Type': 'application/json'});
    private roomReservationsUrl = `http://${ConfigurationManager.Host}/api/RoomReservations`;  // URL to web api

    constructor(private http: Http) { 
        
    }

    getAllRoomReservations() : Promise<RoomReservations[]> {
        return this.http.get(this.roomReservationsUrl)
                    .toPromise()
                    .then(response => response.json() as RoomReservations[])
                    .catch(this.handleError);
    }

    getRoomReservation(id: number): Promise<RoomReservations> {
        const url = `${this.roomReservationsUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as RoomReservations)
            .catch(this.handleError);
    }

    getRoomReservations(id: number) : Promise<RoomReservations[]> {
        debugger
        const url = `${this.roomReservationsUrl}/?$filter=Room/Id eq ${id} and User/Id eq 1`;
        return this.http.get(url)
                    .toPromise()
                    .then(response => response.json() as RoomReservations[])
                    .catch(this.handleError);
    }

    getRoomReservationsForUser(username: string) : Promise<RoomReservations[]> {
        const url = `${this.roomReservationsUrl}/?$filter=User/Username eq '${username}'`;
        return this.http.get(url)
                    .toPromise()
                    .then(response => response.json() as RoomReservations[])
                    .catch(this.handleError);
    }

    delete(id: number): Promise<void> {

        let token=localStorage.getItem("token");
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer '+ token);
        let options = new RequestOptions();
        options.headers = header;

        const url = `${this.roomReservationsUrl}/${id}`;
        return this.http.delete(url, options)
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
    }

    create(roomReservations: RoomReservations): Promise<RoomReservations> {

        let token=localStorage.getItem("token");
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer '+ token);
        let options = new RequestOptions();
        options.headers = header;

        return this.http
        .post(this.roomReservationsUrl, JSON.stringify(roomReservations), options)
        .toPromise()
        .then(res => res.json() as RoomReservations)
        .catch(this.handleError);
    }

    update(roomReservations: RoomReservations): Promise<RoomReservations> {

        let token=localStorage.getItem("token");
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer '+ token);
        let options = new RequestOptions();
        options.headers = header;

        const url = `${this.roomReservationsUrl}/${roomReservations['Id']}`;
        return this.http
        .put(url, JSON.stringify(roomReservations), options)
        .toPromise()
        .then(() => roomReservations)
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}