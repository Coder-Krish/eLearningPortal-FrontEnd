import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { UserService } from '../_services/user.service';
import {ActivatedRoute} from '@angular/router';



@Component({
  selector: 'app-registered-users',
  templateUrl: './registered-users.component.html',
  styleUrls: ['./registered-users.component.css']
})
export class RegisteredUsersComponent implements OnInit {

  content: any;
  value:any;

  isRegisteredUsers=false;
  isActiveUsers=false;
  isInActiveUsers=false;
  public isDeleted=false;

  searchResult:any;

  totalRecords : number;
  page: number = 1;

  user:any;
  profileDir:any;
  retrievedProfileImage:any;
  isretrievedProfileImage=false;

  username:any;
  fullname:any;
  email:any;
  active:any;
  isEnabled:any;
  gender:any;
  address:any;
  program:any;
  institution:any;
  phone:any;
  userId:any;

  popoverTitle:string="Are you sure you want to delete?";
  popoverMessage:string="You can not undo this operation after you confirm to delete.";
  cancelClicked=false;

  //feild that can be updated for users
  userAddress:any;
  userFullname:any;
  userGender:any;
  userInstitution:any;
  userPhone:any;
  profilePictureId:any;



  constructor(private userService: UserService, private snackBar:MatSnackBar, private router:ActivatedRoute) { }

  ngOnInit(): void {
    //this.value=this.router.snapshot.params.id;
    this.router.paramMap.subscribe(params =>{
      this.value = params.get('id');
    });
   
      if(this.value == "registered-users"){
      this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data;
        this.isRegisteredUsers=true;
        this.isActiveUsers=false;
        this.isInActiveUsers=false;
        this.totalRecords=this.content.length;
     
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );

    }else if(this.value=="active-users"){

      this.userService.getActiveUsers().subscribe(
        data =>{
          this.content=data;
          this.isActiveUsers=true;
          this.isRegisteredUsers=false;
          this.isInActiveUsers=false;
          this.totalRecords=this.content.length;
          
        },
        err =>{
          console.log(err);
        }
      );
    }else if(this.value=="inactive-users"){
      
      this.userService.getInActiveUsers().subscribe(
        data =>{
          this.content=data;
          this.isInActiveUsers=true;
          this.isRegisteredUsers = false;
          this.isActiveUsers = false;
          this.totalRecords=this.content.length;
          
        },
        err =>{
          console.log(err);
        }
      );
    }
    else{
      console.log("error occured");
    }
  }


  public deleteUser(id:Number){
    let resp=this.userService.deleteUserbyId(id);
    resp.subscribe(

      data =>{
        this.isDeleted=true;
        //alert("User deleted successfully");
       this.snackBar.open(data.message,'Dismiss',{
         duration: 4000,
         verticalPosition: 'top',
         horizontalPosition: 'right',
         panelClass:['red-snackBar'],

       });
     

        this.userService.getAdminBoard().subscribe(
          data =>{
            this.content=data;
          }
        )
      },
      err =>{
        console.log(err);
      }
    );
    
     
  }

  public deleteActiveUser(id:Number){
    let resp=this.userService.deleteUserbyId(id);
    resp.subscribe(

      data =>{
        console.log("I am correct response")
     
        this.isDeleted=true;
        //alert("User deleted successfully");
       this.snackBar.open(data.message,'Dismiss',{
         duration: 4000,
         verticalPosition: 'top',
         horizontalPosition: 'right',
         panelClass:['red-snackBar'],

       });
     

        this.userService.getActiveUsers().subscribe(
          data =>{
            this.content=data;
          }
        )
      },
      err =>{
        
        console.log(err);
        
      }
    );
    
     
  }

  key:string='id';
  reverse:boolean=false;

  sort(key){
    this.key=this.key;
    this.reverse=!this.reverse;
  }

  search(){
    if(this.searchResult==""){
      this.ngOnInit();
    }
    else{
      this.content=this.content.filter(res =>{
     

        if(res.username.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())){
        return res.username.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase());
        }
        if(res.fullname.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())){
          return res.fullname.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())
        }
        if(res.email.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())){
          return res.email.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())
        }
        if(res.courseDetail.programName.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())){
          return res.courseDetail.programName.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())
        }
        if(res.gender.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())){
          return res.gender.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())
        }
        if(res.address.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())){
          return res.address.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())
        }
      });
    }
  }

  viewUser(id){

    this.userService.getUserById(id).subscribe(
      res =>{
        //console.log(res);
          this.user=res;
          this.active=res.active;
          this.isEnabled=res.enabled;
          this.program=res.courseDetail.programName;
          this.institution=res.institution;
          this.phone=res.phone;
          this.username=res.username;
          this.userId=res.id;
          this.email=res.email;
          this.fullname=res.fullname;
          this.address=res.address;
          this.gender=res.gender;


          this.userService.getProfilePictureDir(id).subscribe(
            data =>{
              if(data !=null){
                this.isretrievedProfileImage=true;
                this.profileDir=data.uploadDir;

                this.userService.loadProfilePicture(this.profileDir).subscribe(
                  result =>{
                    this.createProfileImageFromBlob(result);
                  }
                );
              }else{
                this.isretrievedProfileImage=false;
              }
            }
          );
      },
      err =>{
        console.log(err);
      }
    );

  }

  updateUserClicked(id:any){

    this.userService.getUserById(id).subscribe(
      res =>{
        //console.log(res);
          this.user=res;
          this.active=res.active;
          this.isEnabled=res.enabled;
          this.program=res.courseDetail.programName;
          this.userInstitution=res.institution;
          this.userPhone=res.phone;
          this.username=res.username;
          this.userId=res.id;
          this.email=res.email;
          this.userFullname=res.fullname;
          this.userAddress=res.address;
          this.userGender=res.gender;


          this.userService.getProfilePictureDir(id).subscribe(
            data =>{
              if(data !=null){
                this.isretrievedProfileImage=true;
                this.profileDir=data.uploadDir;
                this.profilePictureId = data.id;

                this.userService.loadProfilePicture(this.profileDir).subscribe(
                  result =>{
                    this.createProfileImageFromBlob(result);
                  }
                );
              }else{
                this.isretrievedProfileImage=false;
              }
            }
          );
      },
      err =>{
        console.log(err);
      }
    );

  }
  updateUser(id:any){
    this.userService.updateUser(id,this.userFullname,this.userInstitution,this.userPhone,this.userAddress,this.userGender).subscribe(
      res =>{
        this.snackBar.open("User Updated Successfully",'Dismiss',{
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass:['success-snackBar'],
 
        });
        window.location.reload();
      },
      err =>{
        this.snackBar.open("Sorry Something went wrong User can't be Updated",'Dismiss',{
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass:['red-snackBar'],
 
        });
        window.location.reload();
      }
    );
  }

  createProfileImageFromBlob(image: Blob){
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.retrievedProfileImage = reader.result;
      
    },false);
    if(image){
      reader.readAsDataURL(image);
    }
  }

  removeProfilePicture(profilePicId){
    console.log(profilePicId);
    

  }
  changeProfilePicture(profilePicId){
    console.log(profilePicId);

  }
}
