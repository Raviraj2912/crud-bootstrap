import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { ToastrService } from 'ngx-toastr';
import { AuthserviceService } from 'src/app/shared/authservice.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {
user:any;
  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(private classToggler: ClassToggleService,private auth:AuthserviceService,private router:Router,private toast:ToastrService) {
    super();
  }

  ngOnInit() {
    this.user = localStorage.getItem('email');
    }

  onclick(){
    this.auth.isUserLoggedIN=false;
   // alert("You logged out")
    this.toast.error("You Logged Out","Logout")
    localStorage.clear();
    this.router.navigate(['/login']); 
  
  }
}
