import { Injectable } from '@angular/core';
import { AppUser } from '../models/AppUser';
import { Headers, Http, RequestOptions } from '@angular/http';
import { ConfigurationManager } from './configuration-manager.service';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AppUsersService {
    
    private headers = new Headers({'Content-Type': 'application/json'});
    private appUsersUrl = `http://${ConfigurationManager.Host}/api/AppUsers`;  // URL to web api

    constructor(private http: Http) { 
        
    }

    getAppUsers() : Promise<AppUser[]> {
        return this.http.get(this.appUsersUrl)
                    .toPromise()
                    .then(response => response.json() as AppUser[])
                    .catch(this.handleError);
    }

    getAppUser(id: number): Promise<AppUser> {
        const url = `${this.appUsersUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as AppUser)
            .catch(this.handleError);
    }

    create(appUser: AppUser): Promise<AppUser> {

        let token=localStorage.getItem("token");
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer '+ token);
        let options = new RequestOptions();
        options.headers = header;

        return this.http
        .post(this.appUsersUrl, JSON.stringify(appUser), options)
        .toPromise()
        .then(res => res.json() as AppUser)
        .catch(this.handleError);
    }

    ban(id: number) {

        let token=localStorage.getItem("token");
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer '+ token);
        let options = new RequestOptions();
        options.headers = header;
        
        const url = `${this.appUsersUrl}/${id}`;
        return this.http.put(url, "", options);
    }

    unban(id: number) {
        
        let token=localStorage.getItem("token");
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer '+ token);
        let options = new RequestOptions();
        options.headers = header;

        const url = `${this.appUsersUrl}/${id}`;
        return this.http.put(url, "", options);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}