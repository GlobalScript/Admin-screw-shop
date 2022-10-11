import { Component, OnInit, DoCheck} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit, DoCheck {

  link: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void { }
      
  ngDoCheck(){
     if(this.router.url === "/authorization/login") this.link = true;
     else this.link = false;
  }
}
