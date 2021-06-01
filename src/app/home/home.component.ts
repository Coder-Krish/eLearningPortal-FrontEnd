import { Component, OnInit, ViewChild } from '@angular/core';
import { ApexOptions } from 'apexcharts';
import { ChartComponent } from 'ng-apexcharts';
import { UserService } from '../_services/user.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  content: string;

  // series:ApexAxisChartSeries;
  // chart: ApexChart;
  // title:ApexTitleSubtitle;

  constructor(private userService: UserService) { 
   
  
  }

  ngOnInit(): void {
    // this.userService.getPublicContent().subscribe(
    //   data => {
    //     this.content = data;
    //   },
    //   err => {
    //     this.content = JSON.parse(err.error).message;
    //   }
    // );

    // this.title = {
    //   text: "Popular language"
    // };

    // this.series = [{
     
    //   data: [44, 55, 13, 43, 22]
    // }];

    // this.chart = {
    //   type: 'pie',
    //   width: 450
    // };

    this.chartOptions = {
      series: [44, 55, 13, 43, 22],
      chart: {
       width: 380,
        type: "pie"
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
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
