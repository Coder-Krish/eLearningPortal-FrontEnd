import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  
  currentUser: any;
  profilePicture:any;
  currentUserId:any;
  retrievedImage:any;
  base64Data:any;
  retirevedResponse:any;
  popup=false;

  followerCount:any;
  followingCount:any;
  postsCount:any;
  discussionsCount:any;
  myPosts=[];
  myDiscussions:any;

  isAboutClicked=false;
  isPostsClicked=false;
  isDiscussionsClicked=false;
  isContentImageAvailable=false;
  isDiscussionImageAvailable=false;

  isDiscussionImage = false;

  postedBy:any;
  postedTime:any;
  postedData:any;
  postId:any;
  postContent:any;

  contentImage:any;
  retrievedFile:any;
  retrievedUploadDir:[];
  retrievedDiscussionUploadDir:[];
  retrievedDiscussionFile:any;

  postInModal:any;
  postedByInModal:any;
  postedTimeInModal:any;
  contentImageInModal:any;
  user:any;

  discussionInModal:any;
  discussionCreateddBy:any;
  discussionCreateddTime:any;
  discussionData:any;
  discussionId:any;
  discussionContent:any;


  isretrievedProfileImage=false;
  profilePictureDir:any;
  retrievedProfileImage:any;
  postedDataInModal:any;
  isContentImagePresent=false;

  thisIsComment:any;
  commentedBy:any;
  commentedAt:any;
  isCommentPresent=false;
  commentsContent:any;
  commentId:any;

  replyContent:any;
  replyId:any;

  commenterProfileImageDir:any;
  commenterProfileImage:any;
  isCommenterProfileImagePresent=false;
  selectedFile:any;
  isSelectedFile:boolean= false;
  isLoading:boolean = false;
  progress = 0;
  
  


  

  constructor(private token: TokenStorageService,private userService: UserService, private snackBar:MatSnackBar) { }

  ngOnInit(): void {
   
   
    this.currentUser = this.token.getUser();

    this.currentUserId=this.currentUser.id;

    this.postsClicked();
    

    this.userService.getFollowerCount(this.currentUserId).subscribe(
      follower=>{
        this.followerCount=follower.message;
        //console.log(follower);
      },
      err =>{
        console.log(err);
      }
    );

    this.userService.getFollowingCount(this.currentUserId).subscribe(
      following =>{
        this.followingCount=following.message;
       // console.log(following);

      },
      err =>{
        console.log(err);
      }
    );

    this.userService.getPostsCount(this.currentUserId).subscribe(
      posts =>{
        this.postsCount=posts.message;
        //console.log(posts);
      },
      err =>{
        console.log(err);
      }
    );

    this.userService.getDiscussionsCount(this.currentUserId).subscribe(
      discussions =>{
        this.discussionsCount=discussions.message;
        //console.log(discussions);
      },
      err =>{
        console.log(err);
      }
    );

    this.userService.getProfilePictureDir(this.currentUserId).subscribe(
      data =>{
        this.profilePicture=data.uploadDir;

        this.userService.loadProfilePicture(this.profilePicture).subscribe(
          res =>{
             // this.retirevedResponse=res;
              this.createImageFromBlob(res);
       
              //console.log(this.retirevedResponse);
          }
        )

       // console.log(this.profilePicture);
      },
      err =>{
        console.log(err.error.message);
      }
    )

   // this.userService.get

    
  }

  createImageFromBlob(image: Blob){

    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.retrievedImage = reader.result;
    },false);
    if(image){
      reader.readAsDataURL(image);
    }
  }

  letsPopup(){
      this.popup=true;
  }

  popupImage(){
    this.popup=true;
    document.getElementById('imgModal').style.display = "block";
  }

  closeImage(){
    document.getElementById('imgModal').style.display = "none";
  }

  aboutClicked(){
    this.isAboutClicked=true;
    this.isPostsClicked=false;
    this.isDiscussionsClicked=false;
  }

  postsClicked(){
    this.userService.getPostsByUserId(this.currentUserId).subscribe(
      posts =>{
        this.myPosts=posts;
       

        for(let i=0; i<this.myPosts.length;i++){

          
           if(posts[i].uploadDir!=null){
           
          this.retrievedUploadDir=posts[i].uploadDir;
            
          this.userService.getFile(this.retrievedUploadDir).subscribe(
          (res:Blob) =>{
            this.retrievedUploadDir=null;
            let reader = new FileReader();
            reader.addEventListener("load", () => {
              
               this.retrievedFile= reader.result;
               this.myPosts[i].contentImage=this.retrievedFile;
               this.isContentImageAvailable=true;
               //console.log(this.myPosts);
               
            },false);
            if(res){
              reader.readAsDataURL(res);
            }
          },
          err =>{
            console.log(err);
            
          }
    
        );
        }else{
          console.log("no content image");
          this.isContentImageAvailable=false;
        }

        }

        this.isPostsClicked=true;
        this.isDiscussionsClicked=false;
        this.isAboutClicked=false;
      
    },
      err =>{
        console.log(err);
      }
    );

  
  }

  discussionsClicked(){

    this.userService.getdiscussionById(this.currentUserId).subscribe(
      discussions =>{
        this.myDiscussions=discussions;


        for(let i=0; i<this.myDiscussions.length;i++){

          
          if(discussions[i].uploadDir!=null){
          
         this.retrievedDiscussionUploadDir=discussions[i].uploadDir;
           
         this.userService.getFile(this.retrievedDiscussionUploadDir).subscribe(
         (res:Blob) =>{
           this.retrievedDiscussionUploadDir=null;
           let reader = new FileReader();
           reader.addEventListener("load", () => {
             
             // this.retrievedFile= reader.result;
              this.myDiscussions[i].discussionImage=reader.result;
              this.isDiscussionImageAvailable=true;
              //console.log(this.myPosts);
              
           },false);
           if(res){
             reader.readAsDataURL(res);
           }
         },
         err =>{
           console.log(err);
           
         }
   
       );
       }else{
         console.log("no discussion image");
         this.isDiscussionImageAvailable=false;
       }

       }

        //console.log(discussions);
        this.isDiscussionsClicked=true;
        this.isAboutClicked=false;
        this.isPostsClicked=false;
      },
      err =>{
        console.log(err);
      }
    );
 

  }

  viewPostInModal(id){
    //console.log("I am here with id= "+id);
    this.userService.getPostById(id).subscribe(

      post =>{
          this.postInModal=post;
          this.postId = post.id;
          this.postedByInModal=post.postedBy;
          this.postedTimeInModal=post.postedTime;
          this.postedDataInModal=post.content;
          this.user=post.user;

          this.profilePictureHandler(this.currentUserId);

          this.contentImage=post.uploadDir;
          if(this.contentImage!=null){
          this.userService.getFile(this.contentImage).subscribe(
            res =>{
              
              this.isContentImagePresent=true;
              this.createContentImageFromBlob(res); 
            },
            err =>{
              console.log(err);
              
            }
      
          );
          }else{
            this.isContentImagePresent=false;
          }

        
            //for comments

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
    



      }
    );
  }

  viewDiscussionInModal(id:number){
    this.userService.getDiscussionByDiscussionId(id).subscribe(
      (res:any) =>{

          this.discussionInModal=res;
          this.discussionId = res.id;
          this.discussionCreateddBy=res.postedBy;
          this.discussionCreateddTime=res.postedAt;
          this.discussionData=res.content;
          this.user=res.user;

          this.profilePictureHandler(this.currentUserId);

          this.contentImage=res.uploadDir;
          if(this.contentImage!=null){
          this.userService.getFile(this.contentImage).subscribe(
            res =>{
              
              this.isDiscussionImage=true;
              this.createDiscussionImageFromBlob(res); 
            },
            err =>{
              console.log(err);
              
            }
      
          );
          }else{
            this.isDiscussionImage=false;
          }

        
            //for comments

            this.userService.getRepliesByDiscussionId(id).subscribe(
              replies =>{
    
                // console.log(replies);
                if(replies.totalElements>0){
    
                  this.isCommentPresent=true;
                  //console.log(replies);
    
                  this.thisIsComment= replies.content;
                 
                for(let i=0; i< replies.content.length; i++){
    
                    this.userService.getUserById(replies.content[i].user_id).subscribe(
                      user =>{
                        this.thisIsComment[i].username=user.username;
                      },
                      err =>{
                        console.log(err);
                      }
                      
                    );
    
                    this.userService.getProfilePictureDir(replies.content[i].user_id).subscribe(
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
                   // console.log("i am here");
                   
    
                }
               // console.log(this.thisIsComment);
    
    
                }else{
                  this.isCommentPresent=false;
                  
                }
              },
              err =>{
                console.log(err);
              }
              
            );
  
      }
    );
  }

  createDiscussionImageFromBlob(file:Blob){
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.retrievedDiscussionFile = reader.result;
       
    },false);
    if(file){
      reader.readAsDataURL(file);
    }
  }
  createContentImageFromBlob(file: Blob){

    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.retrievedFile = reader.result;
       
    },false);
    if(file){
      reader.readAsDataURL(file);
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

  createProfileImageFromBlob(image: Blob){

    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.retrievedProfileImage = reader.result;
      
    },false);
    if(image){
      reader.readAsDataURL(image);
    }
  }

  newPostLoaded(event:any){

    console.log("hello");
    console.log(event.data);
  }


  uploadProfilePicture(userId){

    this.isLoading = true;
    const uploadProfileImage:FormData = new FormData();
    uploadProfileImage.append('profile',this.selectedFile, this.selectedFile.name);
    this.userService.addProfile(userId,uploadProfileImage).subscribe(
      (res: HttpEvent<any>) =>{
        // console.log("I am inside the caller method");
            this.isLoading = false;
           switch(res.type){
             case HttpEventType.Sent:
               console.log('Request has been made!');
               break;
             case HttpEventType.ResponseHeader:
               console.log('Response header has been received!');
               break;
             case HttpEventType.UploadProgress:
               this.progress = Math.round(res.loaded / res.total * 100);
               console.log(`Uploaded! ${this.progress}%`);
               break;
             case HttpEventType.Response:
               console.log('Profile Image Added Successfully!', res.body);
               //this.uploadSuccessfulMessage=res.body;
               if(this.progress ==100){
               this.snackBar.open(res.body.message,'Dismiss',{
                 duration: 4000,
                 verticalPosition: 'top',
                 horizontalPosition: 'right',
                 panelClass:['success-snackBar'],
        
               });

               setTimeout(()=>{
                  window.location.reload();
               },5000)
               break;
             }
               default:
               console.log(res.type);
           }
       },
       err =>{
         this.progress = 0;
         this.snackBar.open(err.body.message,'Dismiss',{
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass:['red-snackBar'],
 
        });

        setTimeout(()=>{
           window.location.reload();
        },5000)
       }
     );

  }

  updateProfilePicture(userId){
    const updateProfileImage:FormData = new FormData();
    updateProfileImage.append('profile',this.selectedFile, this.selectedFile.name);

    this.userService.updateProfile(userId,updateProfileImage).subscribe(
      (res: HttpEvent<any>) =>{
        // console.log("I am inside the caller method");
          
           switch(res.type){
             case HttpEventType.Sent:
               console.log('Request has been made!');
               break;
             case HttpEventType.ResponseHeader:
               console.log('Response header has been received!');
               break;
             case HttpEventType.UploadProgress:
               this.progress = Math.round(res.loaded / res.total * 100);
               console.log(`Updated! ${this.progress}%`);
               break;
             case HttpEventType.Response:
              // console.log('Profile Image updated Successfully!', res.body);
               //this.uploadSuccessfulMessage=res.body;
               if(this.progress ==100){
               this.snackBar.open(res.body.message,'Dismiss',{
                 duration: 4000,
                 verticalPosition: 'top',
                 horizontalPosition: 'right',
                 panelClass:['success-snackBar'],
        
               });

               setTimeout(()=>{
                 this.isLoading = true;
                  window.location.reload();
               },4000)
               break;
             }
               default:
               console.log(res.type);
           }
       },
       err =>{
         this.progress = 0;
         this.snackBar.open(err.body.message,'Dismiss',{
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass:['red-snackBar'],
 
        });

        setTimeout(()=>{
           window.location.reload();
        },5000)
       }
     );
    

  }

  removeProfilePicture(userId){
    this.userService.deleteProfilePictureByUserId(userId).subscribe(
      res =>{
        this.snackBar.open(res.message,'Dismiss',{
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass:['red-snackBar'],
 
        });

        setTimeout(() =>{
          window.location.reload();
        }, 5000);
      },
      err =>{
        this.snackBar.open(err.message,'Dismiss',{
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass:['red-snackBar'],
 
        });

        setTimeout(() =>{
          window.location.reload();
        }, 5000);
      }
    );
  }

  selectFileHandler(event:any){
    this.selectedFile=event.target.files[0];
    this.isSelectedFile=true;
    // console.log(this.selectedFile);
    

  }

  deletePostById(id:number){
    this.userService.deletePosts(id).subscribe(
      res =>{
        this.snackBar.open(res.message,'Dismiss',{
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass:['success-snackBar'],
 
        });

        this.ngOnInit();
      },
      err =>{
        console.log(err);
      }
    );
  }
  
  deleteDiscussionById(id:number){
    this.userService.deleteDiscussion(id).subscribe(
      res =>{
        this.snackBar.open(res.message,'Dismiss',{
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass:['success-snackBar'],
 
        });

        setTimeout(()=>{
          window.location.reload();
        }, 4000)
      },
      err =>{
        console.log(err);
      }
    );
  }

  deleteCommentsById(id:number){
      this.userService.deleteComments(id).subscribe(
        res =>{
          this.snackBar.open(res.message,'Dismiss',{
            duration: 4000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass:['success-snackBar'],
   
          });
        },
        err =>{
          console.log(err);
        }
      );
  }

  deleteRepliesById(id:number){
      this.userService.deleteReply(id).subscribe(
        res =>{
          this.snackBar.open(res.message,'Dismiss',{
            duration: 4000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass:['success-snackBar'],
   
          });
        },
        err =>{
          console.log(err);
        }
      );
  }

  editPostClicked(id:number){
    this.userService.getPostById(id).subscribe(
      res =>{
        this.postContent = res.content;
        this.postId = res.id;
      },
      err =>{
        console.log(err);
      }
    );
  }

  updatePost(id:number){
    this.userService.updatePost(id, this.postContent).subscribe(
      res =>{
        this.snackBar.open(res.message,'Dismiss',{
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass:['success-snackBar'],
 
        });
        this.ngOnInit();
      },
      err =>{
        this.snackBar.open(err.message,'Dismiss',{
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass:['red-snackBar'],
 
        });
        this.ngOnInit();
      }
    );
  }

  editDiscussionClicked(id:number){
    this.userService.getDiscussionById(id).subscribe(
      res =>{
          this.discussionId = res.id;
          this.discussionContent = res.content;
      },
      err =>{
        console.log(err);
      }
    );
  }
  updateDiscussion(id:number){
    this.userService.updateDiscussion(id, this.discussionContent).subscribe(
      res =>{
        //console.log(res);
        this.snackBar.open(res.message,'Dismiss',{
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass:['success-snackBar'],
 
        });
        this.ngOnInit();
      },
      err =>{
        //console.log(err);
        this.snackBar.open(err.message,'Dismiss',{
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass:['red-snackBar'],
 
        });
        this.ngOnInit();
      }
    );
  }

  editCommentClicked(id:number){
  this.userService.getCommentById(id).subscribe(
    res =>{
      this.commentsContent = res.comment;
      this.commentId = res.id;
      this.postId = res.post_id
    },
    err =>{
      console.log(err);
    }
  );
  }

  updateComment(id:number,postId:number){
    this.userService.updateComment(id,postId, this.commentsContent).subscribe(
      res =>{
        this.snackBar.open(res.message,'Dismiss',{
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass:['success-snackBar'],
 
        });
        this.ngOnInit();
      },
      err =>{
        this.snackBar.open(err.message,'Dismiss',{
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass:['red-snackBar'],
 
        });
        this.ngOnInit();
      }
    );

  }

  editReplyClicked(id:number){
    this.userService.getReplayById(id).subscribe(
      res =>{
        this.replyContent = res.reply;
        this.replyId = res.id;
        this.discussionId = res.discussion_id;
      },
      err =>{
        console.log(err);
      }
    );
  }

  updateReply(id:number, discussionId:number){
    this.userService.updateReply(id, discussionId, this.replyContent).subscribe(
      res =>{
        this.snackBar.open(res.message,'Dismiss',{
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass:['success-snackBar'],
 
        });
       
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
