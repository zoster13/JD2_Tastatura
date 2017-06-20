import {Injectable} from '@angular/core';
import {AppUser} from '../models/AppUser';
import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AppUsersService {
    
    private headers = new Headers({'Content-Type': 'application/json'});
    private appUsersUrl = 'http://localhost:54042/api/AppUsers';  // URL to web api

    constructor(private http: Http) { }

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

    delete(id: number): Promise<void> {
        const url = `${this.appUsersUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
    }

    create(appUser: AppUser): Promise<AppUser> {
        return this.http
        .post(this.appUsersUrl, JSON.stringify(appUser), {headers: this.headers})
        .toPromise()
        .then(res => res.json() as AppUser)
        .catch(this.handleError);
    }

    update(appUser: AppUser): Promise<AppUser> {
        const url = `${this.appUsersUrl}/${appUser.id}`;
        return this.http
        .put(url, JSON.stringify(appUser), {headers: this.headers})
        .toPromise()
        .then(() => appUser)
        .catch(this.handleError);
    }

    ban(id: number) {
        let token=localStorage.getItem("token");
        this.headers.append('Authorization', 'Bearer '+ token);

        let options = new RequestOptions();
        options.headers = this.headers;
        
        return this.http.put(`http://localhost:54042/api/UserBan/${id}`, "", options);
    }

    unban(id: number) {
        let token=localStorage.getItem("token");
        this.headers.append('Authorization', 'Bearer '+ token);

        let options = new RequestOptions();
        options.headers = this.headers;
        
        return this.http.put(`http://localhost:54042/api/UserUnban/${id}`, "", options);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}