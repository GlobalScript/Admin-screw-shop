import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap, catchError, Subscription, switchMap} from 'rxjs';
import { Product } from 'src/app/interfaces/productInterface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  fetchListSub!:Subscription;
  dataCard: Product = {
    price: '000',
    category: 'No category',
    short: 'No short',
    description: 'No descriptio',
    id: '',
    image0: '',
  };
  list: Product[] = [];
  productsObj!: {};

  constructor(private http: HttpClient) { }

  create(data: Product, image:File): Observable<Product>{
          const formData = new FormData();
                formData.append('image', image)
                formData.append('short', data.short);
                formData.append('price', data.price);
                formData.append('category', data.category);
                formData.append('description', data.description);
          return this.http.post<Product>('/api/create-product', formData)
                  .pipe(switchMap(()=>{
                    return this.http.get<Product>('/api/last-product')
                  .pipe(tap(()=> {
                      this.fetchListSub =  this.fetchList().subscribe({next:() => {
                      this.fetchListSub.unsubscribe()
                    }});
                  }),
                  catchError(() => {  
                    throw 'error create'
                  }));
            }));
  }

  update(data: Product): Observable<Product>{
        return this.http.put<Product>('/api/update-product/', data)
            .pipe(catchError(() => {  
              throw 'error update'
            }));   
  }

  remove(params: {id: string, image: string}): Observable<any>{
    const image = params.image.split('/');
    const imageName = image[image.length -1 ];
        return this.http.delete<any>(`/api/delete-product/${params.id}`)
            .pipe(switchMap(()=>{
                    return this.http.delete<any>(`/api/delete-image/${imageName}`)
            .pipe(catchError(() => {  
              throw 'error remove'
            })); 
          }));         
  }

  fetchList(): Observable<Product[]> {
      return this.http.get<Product[]>('/api/all-products')
          .pipe(tap((data)=> {
              this.list = data;
          }),
          catchError(() => {  
            throw 'error fetchList'
          }));
  }

  fetchReindexList() {
    return this.http.get<Product[]>('/api/all-products')
          .pipe(tap((data)=> {
            this.productsObj =  data.reduce<any>((acc, item) => {
              acc[item.id] = item;
              return acc;
              },{});
          }),
          catchError(() => {  
            throw 'error fetch Reindex List'
          }));
   
  }

  getDataCard() {
     return this.dataCard;
  }
  getList() {
    return this.list
  }
  
  reindexsProdList() {
    return this.productsObj
  }
}