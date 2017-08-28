import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { ConfigurationManager } from './configuration-manager.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthenticationService {
    
    public token: string;
    private headers = new Headers();
    public loggedInEvent: EventEmitter < any >;  
        
    constructor(private http: Http, public router:Router) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if(currentUser != null)
        {
            this.token = currentUser.token;
        }
        this.loggedInEvent = new EventEmitter <any>();
    }

    login(username: string, password: string): Observable<boolean> {
        
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new RequestOptions();
        options.headers = this.headers;

        return this.http.post(`http://${ConfigurationManager.Host}/oauth/token`, `username=${username}&password=${password}&grant_type=password`, options)
            .map((response: Response) => {

                    let token = response.json().access_token;
                    if (token) {
                        // set token property
                        this.token = token;

                        //set user role
                        var role = response.headers.get('role');
                        var isBanned = response.headers.get('isBanned');
                        var userId = response.headers.get('userId');
                        
                        // store username and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token, role : role, isBanned: isBanned, userId:userId }));
                        localStorage.setItem('token', token);
                        // return true to indicate successful login
                        
                        this.loggedInEvent.emit(); 
                        return true;
                    } else {
                        // return false to indicate failed login
                        return false;
                    }
                })
            .catch((error) => {
                return Observable.of(false);
            });
        }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
    }

    isLoggedIn(): boolean{
        if (localStorage.getItem('currentUser') === null){
            return false;
        }
        else{
            return true;
        }
    }
}