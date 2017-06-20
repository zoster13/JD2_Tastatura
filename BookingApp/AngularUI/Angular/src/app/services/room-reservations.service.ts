import {Injectable} from '@angular/core';
import {RoomReservations} from '../models/RoomReservations';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RoomReservationsService {
    
    private headers = new Headers({'Content-Type': 'application/json'});
    private roomReservationsUrl = 'http://localhost:54042/api/RoomReservations';  // URL to web api

    constructor(private http: Http) { }

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
        const url = `${this.roomReservationsUrl}/?$filter=Room/Id eq ${id}&$filter=User/Id eq 1`;
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
        const url = `${this.roomReservationsUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
    }

    create(roomReservations: RoomReservations): Promise<RoomReservations> {
        return this.http
        .post(this.roomReservationsUrl, JSON.stringify(roomReservations), {headers: this.headers})
        .toPromise()
        .then(res => res.json() as RoomReservations)
        .catch(this.handleError);
    }

    update(roomReservations: RoomReservations): Promise<RoomReservations> {
        const url = `${this.roomReservationsUrl}/${roomReservations['Id']}`;
        return this.http
        .put(url, JSON.stringify(roomReservations), {headers: this.headers})
        .toPromise()
        .then(() => roomReservations)
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}