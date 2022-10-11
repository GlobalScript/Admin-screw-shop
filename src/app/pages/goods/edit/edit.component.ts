import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/interfaces/productInterface';
import { ProductService } from 'src/app/services/products/product.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  @Output() onClose = new EventEmitter<any>();
  @Output() onSubmit = new EventEmitter<any>();
  @Input() editForm!: Product;

  editSub!: Subscription;
  form!: FormGroup;

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
          short: new FormControl(this.editForm.short, [Validators.required, Validators.maxLength(40)]),
          price: new FormControl(this.editForm.price, [Validators.required, Validators.max(1000)]),
          category: new FormControl(this.editForm.category, [Validators.required]),
          description: new FormControl(this.editForm.description, [Validators.required]),
          id: new FormControl(this.editForm.id) 
      });
  }

  submit(){
    this.form.disable();
    this.editSub = this.productService.update(this.form.value).subscribe({
        next: () => {
            this.form.reset();
            this.onSubmit.emit();
            this.editSub.unsubscribe()
        },
        error: (err) => {
            console.log(err);
            this.form.enable();
        }
      });
  }

  close(event: any) {
      event.preventDefault() 
      this.onClose.emit();
  }
}
