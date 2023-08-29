import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthserviceService } from 'src/app/shared/authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
 
  constructor(private fb:FormBuilder,private auth:AuthserviceService,private router:Router,private toast:ToastrService) {
  }
loginform!:FormGroup;
loginformobj: any={
  email :  "",
  password: ""
}
 

    ngOnInit(){
   
      this.loginform = this.fb.group({
  
        email:['',Validators.required],
        password:['',Validators.required,
        //  Validators.minLength(8),
        //  Validators.maxLength(15),
        //  Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$')
      ]
      })
   }

   get loginFormControl() {
    return this.loginform.controls;
  }

   onsubmit(){
    console.warn(this.loginform.value)
    if(this.loginformobj.email=='ravi@gmail.com' && this.loginformobj.password=='Ravi@123'){
    //  alert('login succcessfull')
      this.toast.success("User login Succesfully",'Updated')
      console.log(this.loginformobj.email);
      localStorage.setItem ('email', this.loginformobj.email);
   // this.auth.isUserLoggedIN=true;
   localStorage.setItem('islogged' , 'true');
      this.router.navigate(['/charts']);
   }
 
    else {
     alert('Invalid username or password. Please try again.');
  }
   // this.router.navigate(['/icons']);
 
   }
    
}
