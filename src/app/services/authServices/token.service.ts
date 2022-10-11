import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  
  private token: string = '';

  constructor() {
    this.getStorageToken()
   }

setToken(token:string) {
    window.sessionStorage.setItem('auth_token', token)
    this.token = token;
}

removeToken(){
    this.setToken('');
    window.sessionStorage.removeItem('auth_token'); 
}

getStorageToken() {
     const storageToken = window.sessionStorage.getItem('auth_token');
     if(storageToken){
         this.token = storageToken || '';
     }
}

getToken() {
    return this.token;
}

isAuth(): boolean {
    return !!this.token
  }

  parseJwt ():any  {
    try {
      return jwt_decode(this.token);
    } catch(error) {
      return null;
    }
  }
}
