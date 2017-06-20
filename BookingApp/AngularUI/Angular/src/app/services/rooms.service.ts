import {Injectable} from '@angular/core';
import {Room} from '../models/Room';
import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';

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
        const url = `${this.roomsUrl}/?$top=3&$skip=${id}`;
        return this.http.get(url)
                    .toPromise()
                    .then(response => response.json() as Room[])
                    .catch(this.handleError);
    }

    getRoomsByAccomm(id : number, acc: number) : Promise<Room[]> {
        const url = `${this.roomsUrl}/?$filter=Accommodation/Id eq ${acc}&$top=3&$skip=${id}`;
        return this.http.get(url)
                    .toPromise()
                    .then(response => response.json() as Room[])
                    .catch(this.handleError);
    }

    getAllRoomsByAccomm(id : number) : Promise<Room[]> {
        const url = `${this.roomsUrl}/?$filter=Accommodation/Id eq ${id}`;
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

        let token=localStorage.getItem("token");
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer '+ token);
        let options = new RequestOptions();
        options.headers = header;

        const url = `${this.roomsUrl}/${id}`;
        return this.http.delete(url, options)
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
    }

    create(room: Room): Promise<Room> {

        let token=localStorage.getItem("token");
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer '+ token);
        let options = new RequestOptions();
        options.headers = header;

        return this.http
        .post(this.roomsUrl, JSON.stringify(room), options)
        .toPromise()
        .then(res => res.json() as Room)
        .catch(this.handleError);
    }

    update(room: Room): Promise<Room> {

        let token=localStorage.getItem("token");
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer '+ token);
        let options = new RequestOptions();
        options.headers = header;

        const url = `${this.roomsUrl}/${room["Id"]}`;
        return this.http
        .put(url, JSON.stringify(room), options)
        .toPromise()
        .then(() => room)
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}