import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/interfaces/userInterfaces';
import { AuthService } from 'src/app/services/authServices/auth.service';
import { TokenService } from 'src/app/services/authServices/token.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  user!:any;

  constructor(private authService: AuthService, private tokenService: TokenService) { }

  ngOnInit(): void {
      this.user = this.tokenService.parseJwt(); 
  }

  @Output() onToggle = new EventEmitter<boolean>();

  toggler(){
      this.onToggle.emit();
  }
  logout(){
      this.authService.logout();
  }


}
