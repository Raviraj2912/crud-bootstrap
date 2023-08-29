import { Component, OnInit, ViewChild , AfterViewInit, EventEmitter, Output, Input,ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';
import {FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { user } from './charts.model';
import { MatPaginator} from '@angular/material/paginator';
import { ApiService } from 'src/app/shared/api.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ChartsComponent implements OnInit ,AfterViewInit{
  

  ngAfterViewInit() {

   }
 registerform!:FormGroup;
 addressForm!:FormGroup;
  usermodelobj : user=new user();
  userdata:any;
  data: any; 
  showAdd!:boolean;
 showUpdate!:boolean;
  constructor(private fb:FormBuilder , private api:ApiService,private spinner:NgxSpinnerService,private toast:ToastrService){}
  ngOnInit() {
   

  this.registerform = this.fb.group({
    firstname : ['',[Validators.required ]],
    lastname : ['',[Validators.required]],
    email : ['',[Validators.required]],
    age : ['',[Validators.required,Validators.pattern('^[0-9]*$')]],
    profession : ['',[Validators.required]],
    salary : ['',[Validators.required,Validators.pattern('^[0-9]*$')]],
    address:this.fb.array([this.newrange()]),

    
   });

  // this.registerform.patchValue(this.usermodelobj);
   this.getuserDetail();
   this.updateuserDetails()
  }

  get address() {
    return this.registerform.controls["address"] as FormArray;
  }

newrange(){
  this.addressForm = this.fb.group({
    address: ['', [Validators.required]], 
 });

}

  addaddress() {
    this.address.push(this.addressForm);
  }

  deleteaddress(addressIndex: number) {
    this.address.removeAt(addressIndex);
  }

 

  get registerformControl() {
    return this.registerform.controls;
  }

  onsubmit() {
    console.log(this.registerform.value);
    this.registerform.reset();
   // alert("user added succesfully")
    this.toast.success("User Added Succesfully",'Updated')
    this.getuserDetail()
}

onclickAdd(){
  this.registerform.reset();
  this.showAdd=true;
  this.showUpdate=false;
}


postuserdetail(){
  
  this.usermodelobj.firstname=this.registerform.value.firstname;
  this.usermodelobj.lastname=this.registerform.value.lastname;
  this.usermodelobj.email=this.registerform.value.email;
  this.usermodelobj.address=this.registerform.value.address;
  this.usermodelobj.profession=this.registerform.value.age;
  this.usermodelobj.profession=this.registerform.value.profession;
  this.usermodelobj.salary=this.registerform.value.salary;
  
  
  
  this.api.adduser(this.usermodelobj).subscribe(res=>{

    console.log(res);
  //  alert("user added succesfully");
    this.toast.success("User Added Succesfully",'Added')
    this.registerform.reset();
      this.getuserDetail();
     // this.dialogRef.close();
  },
  err => {
    console.log(err); 
     })
    }

    getuserDetail(){
      this.spinner.show()
       this.api.getuser()
        .subscribe(res=>{
          this.userdata=res;
          console.log(res);
        })
      setTimeout(()=>{
        // this.api.getuser()
        // .subscribe(res=>{
        //   this.userdata=res;
        //   console.log(res);
        //})
        this.spinner.hide();
      },2000)
     }

     deleteuserdetail(row:any){
      this.api.deleteuser(row.id)
      .subscribe(res=>{
        //alert("user detail deleted")
        this.toast.success("User deleted Succesfully",'Deleted')
      })
      this.getuserDetail();
     }
    
     onEdit(row:any){
      this.showAdd=false;
      this.showUpdate=true;
      this.usermodelobj.id=row.id
      this.registerform.controls['firstname'].setValue(row.firstname)
      this.registerform.controls['lastname'].setValue(row.lastname)
      this.registerform.controls['email'].setValue(row.email)
      this.registerform.controls['profession'].setValue(row.profession)
      this.registerform.controls['age'].setValue(row.age)
      this.registerform.controls['salary'].setValue(row.salary)
     }

     updateuserDetails(){
      this.usermodelobj.firstname=this.registerform.value.firstname;
      this.usermodelobj.lastname=this.registerform.value.lastname;
      this.usermodelobj.email=this.registerform.value.email;
      this.usermodelobj.salary=this.registerform.value.salary;
      this.usermodelobj.age=this.registerform.value.age;
      this.usermodelobj.profession=this.registerform.value.profession;

      this.api.updateuser(this.usermodelobj.id,this.usermodelobj)
      .subscribe(res=>{
         //alert("user details updated")
         this.toast.success("User updated Succesfully",'Updated')
         this.registerform.reset();
         this.getuserDetail();
        // this.dialogRef.close();

      })
     }
}
