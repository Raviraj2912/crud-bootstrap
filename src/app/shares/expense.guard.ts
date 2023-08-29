
import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthserviceService } from '../shared/authservice.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseGuard implements CanActivate,OnInit {
token:any;
constructor(private auth: AuthserviceService, private router: Router){}
  ngOnInit(): void {
    //this.token=localStorage.getItem("islogged")
  }


  canActivate(){
   this.token=localStorage.getItem("islogged")
     
    //this.token=localStorage.getItem("islogged")
    if(this.token){
      return true;
    }

    else{
   alert("You don't have permission,Redirect to login page");
    this.router.navigate(['/login'])
    localStorage.clear();
    return false;
    }
  }
  
}
