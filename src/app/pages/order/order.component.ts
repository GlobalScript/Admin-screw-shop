import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductService } from 'src/app/services/products/product.service'; 
import { Subscription } from 'rxjs';
import { ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  cartSub!: Subscription;
  statusSub!: Subscription;
  user = {
    "phone_number": "",
    "first_name": "",
    "last_name": "",
  }
  userCart:any = [];
  inputSearch: string = '';
  totalPrice = 0;
  disabled = false;

  constructor(
     private cartService: CartService,
     private activateRoute: ActivatedRoute,
     private productService: ProductService,
     private router: Router
      ) { }

  ngOnInit(): void {
    this.disabled = false;
    if(this.activateRoute.snapshot.params['id']){
        let productList: any = this.productService.reindexsProdList();
        if(!productList) this.router.navigate(['/admin/customers']);
          this.cartSub = this.cartService.customCart(this.activateRoute.snapshot.params['id'])
            .subscribe({
                next: (data) => {
                    this.user = data;
                    let cart: any;
        if(data?.cart) cart = JSON.parse(`${data?.cart}`);
            if(productList){
                Object.keys(productList).map(item => {
                        if(cart.count[item]) {
                            const {price, short, image0, id } = productList[item];
                            this.totalPrice += price * cart.count[item];
                            this.userCart.push({ price, count: cart.count[item], short, image0, id })
                      }
                  })
              }
              this.cartSub.unsubscribe();
            },
          error: (err) => {
              console.log(err);
            }
        });
    }
  }

  submitOrder(str: string) {
    this.disabled = true;
    const data = {user_buy: str, cart_id: this.activateRoute.snapshot.params['id']};
    this.statusSub = this.cartService.statusCart(data).subscribe({
          next: () => {
              this.statusSub.unsubscribe();
          },
          error: (err) => {
              console.log(err);
          }
    });
  }

}
