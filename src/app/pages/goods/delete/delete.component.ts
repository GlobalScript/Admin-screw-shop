import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/products/product.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  @Output() onDelete = new EventEmitter<any>();
  @Output() onClose = new EventEmitter<number>();
  @Input() params!: {id:string, image: string};
  deleteSub!: Subscription;
  disabled: boolean = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  submitDelete(){
      this.disabled = true;
      this.deleteSub = this.productService.remove(this.params).subscribe({
          next: () => {
              this.onDelete.emit();
              this.deleteSub.unsubscribe()
          },
          error: (err) => {
              console.log(err);
          }
      });
  } 

close() {
    this.onClose.emit();
  }
}
