import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  content:any;
  value:any;

  isAllPosts=false;
  isActivePosts=false;
  isInActivePosts=false;
  isDeleted=false;
  isretrievedProfileImage=false;


  searchResult:any;

  totalRecords : number;
  page: number = 1;

  thisIsAPost:any;
  postedBy:any;
  postedTime:any;
  postedData:any;
  user:any;

  contentImage:any;
  retrievedFile:any;
  retrievedProfileImage:any;
  profilePictureDir:any;

  popoverTitle:string="Are you sure you want to delete?";
  popoverMessage:string="You can not undo this operation after you confirm to delete.";
  cancelClicked=false;

  thisIsComment:any;
  commentedBy:any;
  commentedAt:any;
  isCommentPresent=false;

  commenterProfileImageDir:any;
  commenterProfileImage:any;
  isCommenterProfileImagePresent=false;


  constructor(private userService:UserService,private snackBar:MatSnackBar,private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.value=this.router.snapshot.params.id;
    //console.log(this.value);
    if(this.value=="all-posts"){
      this.userService.getAllPosts().subscribe(
        data =>{
          this.content=data;
          this.isAllPosts=true;
        },
        err =>{
          console.log(err.error.message);
        }
      );

    }else if(this.value=="active-posts"){
      this.userService.getAllActivePosts().subscribe(
        data =>{
          this.content=data;
          this.isActivePosts=true;
        },
        err =>{
          console.log(err.error.message);
        }
      );

    }else if(this.value=="inactive-posts"){
      this.userService.getAllInActivePosts().subscribe(
        data =>{
          this.content=data;
          this.isInActivePosts=true;
        },
        err =>{
          console.log(err.error.message);
        }
      );

    }else{
      console.log("error occurred");
    }

  }

  public deletePosts(id){

    this.userService.deletePosts(id).subscribe(
      
      data =>{
        this.isDeleted=true;

        this.snackBar.open(data.message,'Dismiss',{
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass:['red-snackBar'],
 
        });

        this.userService.getAllPosts().subscribe(
          data =>{
            this.content=data;

          },
          err =>{
            console.log(err.error.message);
          }
        );

      }

    );

  }

  public deleteActivePosts(id){

    this.userService.deletePosts(id).subscribe(
      
      data =>{
        this.isDeleted=true;

        this.snackBar.open(data.message,'Dismiss',{
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass:['red-snackBar'],
 
        });

        this.userService.getAllActivePosts().subscribe(
          data =>{
           
            this.content=data;

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

  key:string='id';
  reverse:boolean=false;

  sort(key){
    this.key=this.key;
    this.reverse=!this.reverse;
  }

  search(){
    if(this.searchResult==""){
      this.ngOnInit();
    }else{
      this.content=this.content.filter(res =>{
     

        if(res.postedBy.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())){
        return res.postedBy.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase());
        }
        if(res.postedTime.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())){
          return res.postedTime.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())
        } 
      });
    }
  }

  viewPosts(id){

    this.userService.getPostById(id).subscribe(
      res =>{
        this.thisIsAPost=res;
        this.postedBy=res.postedBy;
        this.postedTime=res.postedTime;
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

        this.userService.getCommentsByPostId(id).subscribe(
          comments =>{

            // console.log(comments);
            if(comments.totalElements>0){

              this.isCommentPresent=true;
              console.log(comments);

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
                console.log("i am here");
               

            }
            console.log(this.thisIsComment);


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

  deleteComment(id:any){
    this.userService.deleteComments(id).subscribe(
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
