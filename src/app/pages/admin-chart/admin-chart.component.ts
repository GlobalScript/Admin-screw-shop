import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-admin-chart',
  templateUrl: './admin-chart.component.html',
  styleUrls: ['./admin-chart.component.scss']
})

export class AdminChartComponent implements OnInit {
  data: number[] = [];

  constructor() { }

  ngOnInit(): void {
      let weekday =  new Date().getDay();
      if(weekday == 0) weekday = 7;
      for(let i = 0; i < weekday; i++){
          this.data.push(this.getRandom(300, 1500))
      }
  }

   getRandom(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  chartOption: EChartsOption = {
        color: 'rgb(75, 221, 172)',
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: this.data,
            type: 'line',
          },
        ],
      };
}
