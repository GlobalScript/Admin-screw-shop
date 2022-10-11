import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable,tap , catchError} from 'rxjs';
import { Auth } from '../../interfaces/authInterfaces';
import { TokenService } from './token.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUser!: string;
  constructor(
    private router: Router,
    private http: HttpClient,
    private tokenService: TokenService
    ) { }

  registration(user: Auth): Observable<Auth> {
        return this.http.post<Auth>("/api/registration", user)
  }
  
  login(user: Auth): Observable<{token: string}> {
        return this.http.post<{token: string}>("/api/login", user)
            .pipe(tap(({token})=>{
                this.tokenService.setToken(token);
                this.authUser = token;
            }),
            catchError(() => {  
              throw 'error login'
            })
          )
  }
  
  logout(){
        this.tokenService.removeToken();
        this.router.navigate(['']);
  }
  
  getAuthUser() {
    return this.authUser;
  }

}

