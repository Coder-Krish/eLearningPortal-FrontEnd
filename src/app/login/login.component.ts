import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router:Router) { }

  ngOnInit(): void {

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      data => {
        //console.log(data.accessToken);
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);

       
        this.roles = this.tokenStorage.getUser().roles;
        if(this.roles.includes('ROLE_ADMIN')){
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          window.location.replace('/admin');
        }
        else{
          this.isLoginFailed = true;
        }

        
        //this.reloadPage();
        
        
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
       
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

}
