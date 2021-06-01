import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { UserService } from '../_services/user.service';


export type UsersChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

export type PostsChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

export type DiscussionsChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public usersChartOptions: Partial<UsersChartOptions>;
  public postsChartOptions:Partial<PostsChartOptions>;
  public discussionsChartOptions:Partial<DiscussionsChartOptions>;
  

  //content: string;
  countRegisteredUsers: any;
  public countActiveUsers: any;
  public countAllTheInActiveUsers: any;

  countAllThePosts: any;
  countAllTheActivePosts: any;
  countAllTheInActivePosts: any;

  countAllTheDiscussion: any;
  countAllTheActiveDiscussion: any;
  countAllTheInActiveDiscussion: any;
  public a: number = 0;
  public i: number = 0;

 


  constructor(private userService: UserService) {

  }

  ngOnInit(): void {


    this.userService.getAllUsersCount().subscribe(
      registeredUsers => {
        this.countRegisteredUsers = registeredUsers;
        //console.log(this.countRegisteredUsers);
      },
      err => {
        this.countRegisteredUsers = JSON.parse(err.error).message;
      }
    );

    this.userService.countAllTheActiveUsers().subscribe(
      activeUsers => {
        this.countActiveUsers = parseInt(activeUsers);
        this.makeDataOfActiveUsers(this.countActiveUsers);
       
      },
      err => {
        this.countActiveUsers = JSON.parse(err.error).message;
      }
    );

    this.userService.countAllTheInActiveUsers().subscribe(
      inActiveUsers => {
        this.countAllTheInActiveUsers = parseInt(inActiveUsers);
      
        this.makeDataOfInActiveUsers(this.countAllTheInActiveUsers);
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
        this.countAllTheActivePosts = parseInt(activePosts);
        this.makeDataOfActivePosts(this.countAllTheActivePosts);
      },
      err => {
        this.countAllTheActivePosts = JSON.parse(err.error).message;
      }
    );

    this.userService.countAllTheInActivePosts().subscribe(
      inActivePosts => {
        this.countAllTheInActivePosts = parseInt(inActivePosts);
        this.makeDataOfInActivePosts(this.countAllTheInActivePosts)
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
        this.countAllTheActiveDiscussion = parseInt(allActiveDiscussion);
        this.makeDataOfActiveDiscussions(this.countAllTheActiveDiscussion);
      },
      err => {
        this.countAllTheActiveDiscussion = JSON.parse(err.error).message;
      }
    );

    this.userService.countAllTheInActiveDiscussion().subscribe(
      allInActiveDiscussion => {
        this.countAllTheInActiveDiscussion = parseInt(allInActiveDiscussion);
        this.makeDataOfInActiveDiscussions(this.countAllTheInActiveDiscussion);
      },
      err => {
        this.countAllTheInActiveDiscussion = JSON.parse(err.error).message;
      }
    );




  }
makeDataOfActiveUsers(a:number){
 // console.log(a);
  this.a = a;
}
makeDataOfInActiveUsers(b){
 // console.log(b);
  this.i = b;
  this.pieChartOfUsers();
}

makeDataOfActivePosts(a:number){
  this.a = a;
}
makeDataOfInActivePosts(b:number){
  this.i = b;
  this.pieChartOfPosts();
}

makeDataOfActiveDiscussions(a:number){
  this.a = a;
}
makeDataOfInActiveDiscussions(b:number){
  this.i = b;
  this.pieChartOfDiscussions();
}

  pieChartOfUsers() {

    this.usersChartOptions = {
      series: [this.a, this.i],
      chart: {
        width: 380,
        type: "pie"
      },
      labels: ["Active Users", "InActive Users"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };


  }

  pieChartOfPosts() {
 
    this.postsChartOptions = {
      series: [this.a, this.i],
      chart: {
        width: 380,
        type: "pie"
      },
      labels: ["Active Posts", "InActive Posts"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };


  }

  pieChartOfDiscussions(){
    this.discussionsChartOptions = {
      series: [this.a, this.i],
      chart: {
        width: 380,
        type: "pie"
      },
      labels: ["Active Discussions", "InActive Discussions"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

}
