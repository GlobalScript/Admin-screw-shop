import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-message',
  templateUrl: './delete-message.component.html',
  styleUrls: ['./delete-message.component.scss']
})
export class DeleteMessageComponent implements OnInit {

  @Output() onClose = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
  disabled = false;

  constructor() { }

  ngOnInit(): void {
    this.disabled = false;
  }
  close() {
    this.onClose.emit();
  }
  remove(){
    this.onDelete.emit();
    this.disabled = true;
  }

}
