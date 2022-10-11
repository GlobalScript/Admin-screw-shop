import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Product } from 'src/app/interfaces/productInterface';

@Component({
  selector: 'app-prod-card',
  templateUrl: './prod-card.component.html',
  styleUrls: ['./prod-card.component.scss']
})
export class ProdCardComponent implements OnInit {

  @Output() onClose = new EventEmitter<number>();
  @Input() card!: Product;

  constructor() { }
  
  ngOnInit(): void {}
  
  close() {
    this.onClose.emit();
  }
}
