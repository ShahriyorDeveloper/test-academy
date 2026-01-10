import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './bar-chart.component.html',
})
export class BarChartComponent implements OnChanges {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  @Input() title = "Respublika bo'yicha statistika";
  @Input() chartData: { [year: string]: number[] } = {};

  public barChartType = 'bar' as const;

  public barChartData: ChartData<'bar'> = {
    labels: ['2023', '2024', '2025'],
    datasets: [
      {
        data: [1200, 1500, 4200],
        label: '144 soatlik kurs',
        backgroundColor: '#1565c0',
        borderRadius: 4,
      },
      {
        data: [3200, 3800, 3600],
        label: 'Masofaviy portal',
        backgroundColor: '#42a5f5',
        borderRadius: 4,
      },
      {
        data: [2800, 1800, 3100],
        label: "An'anaviy portal",
        backgroundColor: '#4caf50',
        borderRadius: 4,
      },
    ],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          callback: (value) => {
            if (typeof value === 'number') {
              return value >= 1000 ? (value / 1000).toFixed(0) + ' 000' : value.toString();
            }
            return value;
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chartData'] && this.chartData) {
      this.updateChartData();
    }
  }

  private updateChartData(): void {
    const years = Object.keys(this.chartData).sort();
    if (years.length === 0) return;

    this.barChartData = {
      labels: years,
      datasets: [
        {
          data: years.map((year) => this.chartData[year]?.[0] || 0),
          label: '144 soatlik kurs',
          backgroundColor: '#1565c0',
          borderRadius: 4,
        },
        {
          data: years.map((year) => this.chartData[year]?.[1] || 0),
          label: 'Masofaviy portal',
          backgroundColor: '#42a5f5',
          borderRadius: 4,
        },
        {
          data: years.map((year) => this.chartData[year]?.[2] || 0),
          label: "An'anaviy portal",
          backgroundColor: '#4caf50',
          borderRadius: 4,
        },
      ],
    };
    this.chart?.update();
  }
}
