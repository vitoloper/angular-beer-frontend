import { Injectable }     from '@angular/core';
import { Headers, Http }  from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';

import 'rxjs/add/operator/toPromise';

/**
 * Dovrebbe essere rinominato 'AuthService'.
 * Dovrebbe chiamare /api/login (o /api/signin) sul backend e mantenere le
 * informazioni sull'utente corrente.
 * TODO: isLoggedIn viene resettato al refresh della pagina!
 *
 * L'unica cosa che avremo sarà il cookie 'connect.sid'. Si potrebbe, al caricamento dell'app,
 * fare una chiamata ad un servizio di backend (es. /api/user) che restituisce le informazioni
 * relative all'utente corrente (o errore se l'utente non è loggato / la sessione è scaduta o
 * il cookie non è valido).
 */
@Injectable()
export class AuthService {
  // IMPORTANTE!!!
  // https://stackoverflow.com/questions/38245450/angular2-components-this-is-undefined-when-executing-callback-function
  // https://basarat.gitbooks.io/typescript/docs/arrow-functions.html

  private apiUrl = 'api/';
  redirectUrl: string;  // store the URL so we can redirect after logging in
  
  // Inter-component communication
  private dataObs$ = new Subject<any>();

  getData() {
    return this.dataObs$;
  }

  updateData(data: any) {
    this.dataObs$.next(data);
  }
  // *****************************
  
  constructor (private http: Http) {
  }

  isLoggedIn(): Promise<boolean> {
    return this.http.get(this.apiUrl+'user').toPromise()
      .then((response) => true)
      .catch((error) => false);
  }

  getUserData(): Promise<any> {
    return this.http.get(this.apiUrl+'user').toPromise()
      .then((response) => this.handleResponse(response))
      .catch((error) => this.handleError(error));
  }

  private handleResponse(response: any): Promise<any> {
    console.log('Logged in (authService)');
    return response.json() as any;
  }

  private handleError(error: any): Promise<any> {
    if (error.status === 401) {
      console.error('Not logged in (authService)');
    } else {
      console.error('An error occurred', error); // for demo purposes only
    }

    return Promise.reject(error.message || error);
  }

  login(email: string, password: string): Promise<any> {
    var body = `email=${email}&password=${password}`;
    var headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

    return this.http.post(this.apiUrl+'local-login', body, {headers: headers}).toPromise()
      .then((response) => { return response.json() as any; })
      .catch((error) => { return Promise.reject(error)});
  }
  
  signup(email: string, password: string): Promise<any> {
    var body = `email=${email}&password=${password}`;
    var headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

    return this.http.post(this.apiUrl+'local-signup', body, {headers: headers}).toPromise()
      .then((response) => { return response.json() as any; })
      .catch((error) => { return Promise.reject(error)});
  }

  logout(): Promise<any> {
    return this.http.get(this.apiUrl+'local-logout').toPromise()
      .then((response) => { return response.json() as any; })
      .catch((error) => { return Promise.reject(error)});
  }
}
