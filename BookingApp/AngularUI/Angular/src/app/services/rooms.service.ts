import {Injectable} from '@angular/core';
import {Room} from '../models/Room';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {Rooms} from '../mock-objects/rooms-mock';

@Injectable()
export class RoomsService {
    
    private headers = new Headers({'Content-Type': 'application/json'});
    private roomsUrl = 'http://localhost:54042/api/Rooms';  // URL to web api

    constructor(private http: Http) { }

    getAllRooms() : Promise<Room[]> {
        return this.http.get(this.roomsUrl)
                    .toPromise()
                    .then(response => response.json() as Room[])
                    .catch(this.handleError);
    }

    getRooms(id : number) : Promise<Room[]> {
        const url = `${this.roomsUrl}/${id}`;
        return this.http.get(url)
                    .toPromise()
                    .then(response => response.json() as Room[])
                    .catch(this.handleError);
    }

    getRoom(id: number): Promise<Room> {
        const url = `${this.roomsUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Room)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.roomsUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
    }

    create(name: string): Promise<Room> {
        return this.http
        .post(this.roomsUrl, JSON.stringify({name: name}), {headers: this.headers})
        .toPromise()
        .then(res => res.json() as Room)
        .catch(this.handleError);
    }

    update(hero: Room): Promise<Room> {
        const url = `${this.roomsUrl}/${hero.id}`;
        return this.http
        .put(url, JSON.stringify(hero), {headers: this.headers})
        .toPromise()
        .then(() => hero)
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}