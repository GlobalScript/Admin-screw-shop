import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/products/product.service';
import { Product } from 'src/app/interfaces/productInterface';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.scss']
})

export class GoodsComponent implements OnInit  {

  closesEdit = false;
  closesMessage = false;
  goodsSub!:Subscription;
  list!: Product[];
  editForm: Product = this.productService.getDataCard();
  params = {id: '', image: ''};
  id: string = '';
  inputSearch: string = ''

  constructor(private productService: ProductService) { }
    
  ngOnInit(): void {
      if(!this.productService.getList().length) {
          this.goodsSub = this.productService.fetchList()
            .subscribe({
                next: (data) => {
                    this.list = data;
                    this.goodsSub.unsubscribe();
                  },
                error: (err) => {
                    console.log(err);
                  }
          });
      }
          else this.list = this.productService.getList();
  }
  
  editHandler() {
      this.goodsSub = this.productService.fetchList()
            .subscribe({
                next: (data) => {
                    this.list = data;
                    this.closesEdit = false;
                    this.goodsSub.unsubscribe();
                  },
                error: (err) => {
                    console.log(err);
                  }
          });
  }

  deleteHandler() {
      this.goodsSub = this.productService.fetchList()
            .subscribe({
                next: (data) => {
                    this.list = data;
                    this.closesMessage = false;
                    this.goodsSub.unsubscribe();
                  },
                error: (err) => {
                    console.log(err);
                  }
          });
  }

  openEdit(prod:Product) {
        this.editForm = prod;
        this.id = prod.id;
        this.closesEdit = true;
  }

  openMessage(id:string, image:string) {
        this.id = id;
        this.params.id = id;
        this.params.image = image;
        this.closesMessage = true;
  }

  closeEdit() {
    this.closesEdit = false;
  }
  
  closeMessage() {
        this.closesMessage = false;
  }
  
}
