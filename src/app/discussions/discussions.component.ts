import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-discussions',
  templateUrl: './discussions.component.html',
  styleUrls: ['./discussions.component.css']
})
export class DiscussionsComponent implements OnInit {


  content:any;
  value:any;

  searchResult:any;

  totalRecords : number;
  page: number = 1;

  isAllDiscussions= false;
  isActiveDiscussions = false;
  isInActiveDiscussions = false;
  isDeleted = false;

  thisIsDiscussion:any;
  postedBy:any;
  postedTime:any;
  postedData:any;
  user:any;

  contentImage:any;
  retrievedFile:any;
  retrievedProfileImage:any;
  profilePictureDir:any;
  isretrievedProfileImage=false;

  thisIsComment:any;
  commentedBy:any;
  commentedAt:any;
  isCommentPresent=false;

  commenterProfileImageDir:any;
  commenterProfileImage:any;
  isCommenterProfileImagePresent=false;

  key:string='id';
  reverse:boolean=false;

  popoverTitle:string="Are you sure you want to delete?";
  popoverMessage:string="You can not undo this operation after you confirm to delete.";
  cancelClicked=false;

  constructor(private userService:UserService,private router:ActivatedRoute, private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.value=this.router.snapshot.params.id;
    if(this.value=="all-discussions"){
    this.userService.getAllDiscussions().subscribe(
      data =>{

      
        this.content=data;
        this.isAllDiscussions = true;
      },
      err =>{
        console.log(err.error.message);
      }
    );
    }
    else if(this.value=="active-discussions"){
      this.userService.getActiveDiscussions().subscribe(
        res =>{
          this.content = res;
          this.isActiveDiscussions = true;
        },
        err =>{
          console.log(err);
        }
      );
    }
    else if(this.value =="inactive-discussions"){
      this.userService.getInActiveDiscussions().subscribe(
        res =>{
          this.content = res;
          this.isInActiveDiscussions = true;
        },
        err =>{
          console.log(err);
        }
      );
    }

  }
  updatediscussions(id:any){

  }

  viewDiscussions(id:any){


    this.userService.getDiscussionById(id).subscribe(
      res =>{
        this.thisIsDiscussion=res;
        this.postedBy=res.postedBy;
        this.postedTime=res.postedAt;
        this.postedData=res.content;
        this.user=res.user;

        this.profilePictureHandler(this.user.id);

       
        this.contentImage=res.uploadDir;


        this.userService.getFile(this.contentImage).subscribe(
          res =>{
            this.createImageFromBlob(res);
          },
          err =>{
            console.log(err);
            
          }
    
        );

        this.userService.getRepliesByDiscussionId(id).subscribe(
          comments =>{

            // console.log(comments);
            if(comments.totalElements>0){

              this.isCommentPresent=true;
              //console.log(comments);

              this.thisIsComment= comments.content;
             
            for(let i=0; i< comments.content.length; i++){

                this.userService.getUserById(comments.content[i].user_id).subscribe(
                  user =>{
                    this.thisIsComment[i].username=user.username;
                  },
                  err =>{
                    console.log(err);
                  }
                  
                );

                this.userService.getProfilePictureDir(comments.content[i].user_id).subscribe(
                  profileDir =>{
                    this.commenterProfileImageDir=profileDir.uploadDir;
                  
                    //console.log(this.commenterProfileImageDir);


                    this.userService.loadProfilePicture(this.commenterProfileImageDir).subscribe(
                      (res:Blob) =>{
    
                        this.commenterProfileImageDir=null;
                        let reader =new FileReader();
                        reader.addEventListener("load", ()=>{
                        this.commenterProfileImage=reader.result;
                        this.thisIsComment[i].commenterImage=this.commenterProfileImage;
                        this.isCommenterProfileImagePresent=true;
                        },false);
    
                        if(res){
                         reader.readAsDataURL(res);
                        }
                      }
                    );


                  },
                  err =>{
                    console.log(err);
                  }
                );
                //console.log("i am here");
               

            }
            //console.log(this.thisIsComment);


            }else{
              this.isCommentPresent=false;
              
            }
          },
          err =>{
            console.log(err);
          }
          
        );

        

      },
      err =>{
        console.log(err);
      }
    );


  }
  deleteDiscussions(id:any){

    this.userService.deleteDiscussion(id).subscribe(
      res =>{
        
        this.isDeleted=true;
        this.snackBar.open(res.message,'Dismiss',{
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass:['red-snackBar'],
 
        });

        this.userService.getActiveDiscussions().subscribe(
          res =>{
            this.content = res;
          },
          err =>{
            console.log(err);
          }
        );

      },
      err =>{
        console.log(err);
        this.snackBar.open(err.message,'Dismiss',{
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass:['red-snackBar'],
 
        });
      }
    );
    
    

  }

  search(){

    if(this.searchResult==""){
      this.ngOnInit();
    }else{
      this.content=this.content.filter(res =>{
     

        if(res.postedBy.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())){
        return res.postedBy.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase());
        }
        if(res.postedAt.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())){
          return res.postedAt.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())
        } 
      });
    }

  }

  sort(key){
    this.key=this.key;
    this.reverse=!this.reverse;
  }

  createImageFromBlob(file: Blob){

    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.retrievedFile = reader.result;
    },false);
    if(file){
      reader.readAsDataURL(file);
    }

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




  profilePictureHandler(id){
    this.userService.getProfilePictureDir(id).subscribe(
      res =>{
        if(res !=null){
        this.isretrievedProfileImage=true;
        
        this.profilePictureDir=res.uploadDir;
        

        this.userService.loadProfilePicture(this.profilePictureDir).subscribe(
          data =>{
            this.createProfileImageFromBlob(data);
          }
        );
        }else{
          this.isretrievedProfileImage=false;
        }
        
      },
      err =>{
        console.log(err);
      }
    );

  }

  deleteReply(id:any){

   this.userService.deleteReply(id).subscribe(
    res =>{

      this.isDeleted=true;
    this.snackBar.open(res.message,'Dismiss',{
      duration: 4000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass:['red-snackBar'],

    });
    window.location.reload();

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
  }
  
}



