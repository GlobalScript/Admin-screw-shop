import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  sideBarOpen = true;

  constructor() { }

  ngOnInit(): void { }
    
  sideBarToggler() {
      this.sideBarOpen = !this.sideBarOpen;
  }
}
