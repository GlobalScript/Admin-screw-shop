import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from 'src/app/interfaces/userInterfaces';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
    users: User[] = [];
    fetchUsersSub!: Subscription;

  constructor(private http: HttpClient) { }

  fetchUsers(): Observable<User[]> {
      return this.http.get<User[]>('/api/users')
          .pipe(tap((data)=> {
            this.users = data;
          }),
          catchError(() => {  
            throw 'error fetchCarts'
          }));
    }

    userRole(data: any): Observable<User>{
        return this.http.put<User>('/api/user-role', data) 
                .pipe(catchError(() => {  
                  throw 'error user roles'
                  }));
            }

    removeUser(id:string): Observable <any> {
                return this.http.delete<any>(`/api/user-remove/${id}`)
                    .pipe(catchError(() => {  
                    throw 'error remove'
                    }));       
        }

    getUsers() {
        return this.users;
    }
}
