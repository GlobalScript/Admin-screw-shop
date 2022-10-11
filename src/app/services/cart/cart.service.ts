import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { Cart } from 'src/app/interfaces/cartInterfaces';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  carts: Cart[] = [];
  fetchCartSub!: Subscription;

  constructor(private http: HttpClient, private router:Router) { }

  fetchCarts(): Observable<Cart[]> {
      return this.http.get<Cart[]>('/api/all-cart')
          .pipe(tap((data)=> {
            this.carts = data;
          }),
          catchError(() => {  
            throw 'error fetchCarts'
          }));
    }

  customCart(id: string): Observable<Cart> {
      return this.http.get<Cart>(`/api/get-cart/${id}`)
        .pipe(catchError(() => {  
          throw 'error custom Cart'
      }));  
  }

  statusCart(data: any): Observable<Cart>{
    return this.http.put<Cart>('/api/status-cart', data) 
            .pipe(tap(()=> {
                this.fetchCartSub =  this.fetchCarts().subscribe({
            next:(data) => {
                  this.carts = data;
                  this.router.navigate(['admin/customers']);
                  this.fetchCartSub.unsubscribe()
              }});
            }),
            catchError(() => {  
              throw 'error create'
            }));
}

  getCarts() {
    return this.carts;
  }
}
