import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/authServices/token.service';

@Component({
  selector: 'app-start-layout',
  templateUrl: './start-layout.component.html',
  styleUrls: ['./start-layout.component.scss']
})
export class StartLayoutComponent implements OnInit {

  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {
      this.tokenService.getStorageToken();
          if(this.tokenService.isAuth()){
          this.router.navigate(['admin/chart']);
      }
  }
}
