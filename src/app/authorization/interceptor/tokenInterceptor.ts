import { Injectable } from "@angular/core"
import {
     HttpRequest,
     HttpResponse,
     HttpErrorResponse,
     HttpInterceptor,
     HttpHandler,
     HttpEvent
        } from "@angular/common/http";
import { Observable,tap } from 'rxjs';
import { TokenService } from "src/app/services/authServices/token.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  
  constructor(private tokenService: TokenService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this.tokenService.isAuth()){
            const authReq = req.clone({
              setHeaders: {
              Authorization: "Bearer " + this.tokenService.getToken() 
            }
          });
          return next.handle(authReq)
        }
    return next.handle(req)
  }
}