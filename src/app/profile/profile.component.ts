import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  postedBy:any;
  postedTime:any;
  postedData:any;

  contentImage:any;
  retrievedFile:any;
  retrievedUploadDir:[];
  retrievedDiscussionUploadDir:[];

  postInModal:any;
  postedByInModal:any;
  postedTimeInModal:any;
  contentImageInModal:any;
  user:any;

  isretrievedProfileImage=false;
  profilePictureDir:any;
  retrievedProfileImage:any;
  postedDataInModal:any;
  isContentImagePresent=false;

  thisIsComment:any;
  commentedBy:any;
  commentedAt:any;
  isCommentPresent=false;

  commenterProfileImageDir:any;
  commenterProfileImage:any;
  isCommenterProfileImagePresent=false;
  
  


  

  constructor(private token: TokenStorageService,private userService: UserService) { }

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
    console.log("I am here with id= "+id);
    this.userService.getPostById(id).subscribe(

      post =>{
          this.postInModal=post;
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

}
