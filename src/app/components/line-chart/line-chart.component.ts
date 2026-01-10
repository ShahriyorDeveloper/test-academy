import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';

export interface LineChartData {
  labels: string[];
  soatlikKurs: number[];
  masofaviyPortal: number[];
  ananaviyPortal: number[];
}

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './line-chart.component.html',
})
export class LineChartComponent implements OnChanges {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  @Input() title = "O'zgarishlar dinamikasi";
  @Input() chartData: LineChartData = {
    labels: [],
    soatlikKurs: [],
    masofaviyPortal: [],
    ananaviyPortal: [],
  };

  public lineChartType = 'line' as const;

  public lineChartData: ChartData<'line'> = {
    labels: ['2024 IV chorak', '2025 I chorak', '2025 II chorak', '2025 III chorak'],
    datasets: [
      {
        data: [500, 800, 1200, 1800],
        label: '144 soatlik kurs',
        borderColor: '#1565c0',
        backgroundColor: 'rgba(21, 101, 192, 0.1)',
        tension: 0.4,
        fill: false,
        pointRadius: 4,
        pointBackgroundColor: '#1565c0',
      },
      {
        data: [1800, 2200, 2800, 3200],
        label: 'Masofaviy portal',
        borderColor: '#42a5f5',
        backgroundColor: 'rgba(66, 165, 245, 0.1)',
        tension: 0.4,
        fill: false,
        pointRadius: 4,
        pointBackgroundColor: '#42a5f5',
      },
      {
        data: [2200, 2400, 2900, 3400],
        label: "An'anaviy portal",
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        tension: 0.4,
        fill: false,
        pointRadius: 4,
        pointBackgroundColor: '#4caf50',
      },
    ],
  };

  public lineChartOptions: ChartConfiguration<'line'>['options'] = {
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
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chartData'] && this.chartData) {
      this.updateChartData();
    }
  }

  private updateChartData(): void {
    if (!this.chartData.labels || this.chartData.labels.length === 0) return;

    this.lineChartData = {
      labels: this.chartData.labels,
      datasets: [
        {
          data: this.chartData.soatlikKurs,
          label: '144 soatlik kurs',
          borderColor: '#1565c0',
          backgroundColor: 'rgba(21, 101, 192, 0.1)',
          tension: 0.4,
          fill: false,
          pointRadius: 4,
          pointBackgroundColor: '#1565c0',
        },
        {
          data: this.chartData.masofaviyPortal,
          label: 'Masofaviy portal',
          borderColor: '#42a5f5',
          backgroundColor: 'rgba(66, 165, 245, 0.1)',
          tension: 0.4,
          fill: false,
          pointRadius: 4,
          pointBackgroundColor: '#42a5f5',
        },
        {
          data: this.chartData.ananaviyPortal,
          label: "An'anaviy portal",
          borderColor: '#4caf50',
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          tension: 0.4,
          fill: false,
          pointRadius: 4,
          pointBackgroundColor: '#4caf50',
        },
      ],
    };
    this.chart?.update();
  }
}
