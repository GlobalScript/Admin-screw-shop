import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ProductService } from 'src/app/services/products/product.service';
import { Product } from 'src/app/interfaces/productInterface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit {
  imageSrc: string = '';
  image!:File;
  form!: FormGroup;
  createSub!:Subscription;
  closeCard = false;
  dataCard:Product = this.productService.dataCard;
  errorFile = false;

  constructor( private productService: ProductService ) { }
      
  ngOnInit(): void {
      this.form = new FormGroup({
          short: new FormControl('', [Validators.required, Validators.maxLength(40)]),
          file: new FormControl('', [Validators.required]),
          price: new FormControl('', [Validators.required, Validators.max(1000)]),
          category: new FormControl('', [Validators.required]),
          description: new FormControl('', [Validators.required]),
      });
  }

  onFileChange(event:any) {
        if(event.target.files && event.target.files.length) {
              const [file] = event.target.files;
            if(file.size < 102400 && (file.type === "image/jpeg" || file.type === "image/png")){
                this.image = file;
                const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = () => {
                  this.imageSrc = reader.result as string;
                  this.errorFile = false;
                } 
            }
            else this.errorFile = true;    
      }
  }
   
  submit(){
      this.form.disable();
        this.createSub = this.productService.create(this.form.value, this.image).subscribe({
              next: (data) => {
                  this.imageSrc = '';
                  this.form.reset();
                  this.dataCard = data;
                  this.closeCard = true;
              },
              error: (err) => {
                  console.log(err);
                  this.form.enable();
              }
        });
  }
 
  closesCard(){
      this.closeCard = false;
      this.form.enable();
  }

  ngOnDestroy(): void {
      if(this.createSub) this.createSub.unsubscribe();
  }
}
