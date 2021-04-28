import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './_services/token-storage.service';
import { UserService } from './_services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;
  userId: any;
  profilePicDir: any;
  profilePic: any;
  isProfileImagePresent = false;

  constructor(private tokenStorageService: TokenStorageService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();

      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      //this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.username;
      this.userId = user.id;

      this.userService.getProfilePictureDir(this.userId).subscribe(
        res => {
          this.profilePicDir = res.uploadDir;

          this.userService.loadProfilePicture(this.profilePicDir).subscribe(
            res => {
              if (res != null) {
                this.createImageFromBlob(res);
              }
              else {
                this.isProfileImagePresent = false;
              }
            },
            err => {
              console.log(err);
            }
          );
        },
        err => {
          console.log(err);
        }
      );


      if (this.roles.includes('ROLE_USER' || 'ROLE_MODERATOR')) {

        this.logout();
      }

    } else {
      this.router.navigate(['/login']);
    }
  }

  logout(): void {

    this.tokenStorageService.signOut();
    this.router.navigate(['/login']);
    //window.location.reload();
  }

  createImageFromBlob(image: Blob) {

    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.profilePic = reader.result;
      this.isProfileImagePresent = true;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
