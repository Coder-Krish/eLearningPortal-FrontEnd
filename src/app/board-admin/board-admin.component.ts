import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {

  //content: string;
  countRegisteredUsers: any;
  countActiveUsers: any;
  countAllTheInActiveUsers: any;

  countAllThePosts: any;
  countAllTheActivePosts: any;
  countAllTheInActivePosts: any;

  countAllTheDiscussion: any;
  countAllTheActiveDiscussion: any;
  countAllTheInActiveDiscussion: any;


  constructor(private userService: UserService) { }

  ngOnInit(): void {


    this.userService.getAllUsersCount().subscribe(
       registeredUsers => {
        this.countRegisteredUsers = registeredUsers;
      },
      err => {
        this.countRegisteredUsers = JSON.parse(err.error).message;
      }
    );

    this.userService.countAllTheActiveUsers().subscribe(
      activeUsers => {
       this.countActiveUsers = activeUsers;
     },
     err => {
       this.countActiveUsers = JSON.parse(err.error).message;
     }
   );

   this.userService.countAllTheInActiveUsers().subscribe(
    inActiveUsers => {
     this.countAllTheInActiveUsers = inActiveUsers;
   },
   err => {
     this.countAllTheInActiveUsers = JSON.parse(err.error).message;
   }
 );

 this.userService.countAllThePosts().subscribe(
  allPosts => {
   this.countAllThePosts = allPosts;
 },
 err => {
   this.countAllThePosts = JSON.parse(err.error).message;
 }
 );

 this.userService.countAllTheActivePosts().subscribe(
  activePosts => {
   this.countAllTheActivePosts = activePosts;
 },
 err => {
   this.countAllTheActivePosts = JSON.parse(err.error).message;
 }
);

this.userService.countAllTheInActivePosts().subscribe(
  inActivePosts => {
   this.countAllTheInActivePosts = inActivePosts;
 },
 err => {
   this.countAllTheInActivePosts = JSON.parse(err.error).message;
 }
);
  
this.userService.countAllTheDiscussion().subscribe(
  allDiscussion => {
   this.countAllTheDiscussion = allDiscussion;
 },
 err => {
   this.countAllTheDiscussion = JSON.parse(err.error).message;
 }
);

this.userService.countAllTheActiveDiscussion().subscribe(
  allActiveDiscussion => {
   this.countAllTheActiveDiscussion = allActiveDiscussion;
 },
 err => {
   this.countAllTheActiveDiscussion = JSON.parse(err.error).message;
 }
);
  
this.userService.countAllTheInActiveDiscussion().subscribe(
  allInActiveDiscussion => {
   this.countAllTheInActiveDiscussion = allInActiveDiscussion;
 },
 err => {
   this.countAllTheInActiveDiscussion = JSON.parse(err.error).message;
 }
);
  
  }

}
