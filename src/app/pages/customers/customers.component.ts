
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductService } from 'src/app/services/products/product.service';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/interfaces/cartInterfaces';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  cartsSub!:Subscription;
  reindexProductsSub!:Subscription;
  carts: Cart[] = [];
  inputSearch: string = '';
  constructor( private cartService: CartService, private productService: ProductService) { }

  ngOnInit(): void {
        if(!this.cartService.getCarts().length) {
          this.refresh();  
      }
        else this.carts = this.cartService.getCarts();
          if(!this.productService.reindexsProdList()){
              this.reindexProductsSub = this.productService.fetchReindexList().subscribe({
                next: () => {
                    this.reindexProductsSub.unsubscribe();
                  },
                error: (err) => {
                    console.log(err);
                  }
          });
      }
  }

  refresh(){
        this.cartsSub = this.cartService.fetchCarts()
        .subscribe({
            next: (data) => {
                this.carts = data;
                this.cartsSub.unsubscribe();
              },
            error: (err) => {
                console.log(err);
              }
      });
  }

}
