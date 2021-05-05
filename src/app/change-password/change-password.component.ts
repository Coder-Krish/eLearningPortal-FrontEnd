import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  currentUser:any;
  currentUserId:any;
  newPassword:any;
  confirmPassword:any;
  username:any;
  constructor(private token:TokenStorageService, 
    private userService:UserService, 
    private snackBar:MatSnackBar, 
    private router:Router) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.username = this.currentUser.username;
    this.currentUserId = this.currentUser.id;
  }

  changePassword(){
    
    if(this.newPassword==this.confirmPassword){
    this.userService.changePassword(this.currentUserId,this.username,this.newPassword,this.confirmPassword).subscribe(
      res =>{
        this.snackBar.open(res.message,'Dismiss',{
       
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass:['success-snackBar'],
        });

        setTimeout(()=>{
          this.logout();
        },5000);
        

      },
      err =>{
        this.snackBar.open(err.message,'Dismiss',{
       
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass:['red-snackBar'],
        });
      }
    );
    }else{
      this.snackBar.open("New Passord and Confirm Password must be same",'Dismiss',{
       
        duration: 4000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass:['red-snackBar'],
      });
    }

  }

  logout(): void {

    this.token.signOut();
    this.router.navigate(['/login']);
    //window.location.reload();
  }

}
