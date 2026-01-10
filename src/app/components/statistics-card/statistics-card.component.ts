import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';

@Component({
  selector: 'app-statistics-card',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './statistics-card.component.html',
})
export class StatisticsCardComponent implements OnChanges {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  @Input() title = "Respublika bo'yicha statistika";
  @Input() total = 0;
  @Input() malakaOshirgan = 0;
  @Input() malakaOshirmagan = 0;
  @Input() jarayonda = 0;
  @Input() soatlikKurs = 0;
  @Input() masofaviyPortal = 0;
  @Input() ananaviyPortal = 0;
  @Input() ozgarish = 0;
  @Input() date = '2025-yil, 1-oktabr holatiga';

  public doughnutChartType = 'doughnut' as const;

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: ['Jami', 'Malaka oshirgan', 'Malaka oshirmagan', 'Jarayonda'],
    datasets: [
      {
        data: [88, 4, 4, 4],
        backgroundColor: ['#e8f5e9', '#4caf50', '#ff9800', '#f44336'],
        borderWidth: 0,
      },
    ],
  };

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['malakaOshirgan'] ||
      changes['malakaOshirmagan'] ||
      changes['jarayonda'] ||
      changes['total']
    ) {
      this.updateChartData();
    }
  }

  private updateChartData(): void {
    const remaining = this.total - this.malakaOshirgan - this.malakaOshirmagan - this.jarayonda;
    this.doughnutChartData = {
      labels: ['Jami', 'Malaka oshirgan', 'Malaka oshirmagan', 'Jarayonda'],
      datasets: [
        {
          data: [
            remaining > 0 ? remaining : 0,
            this.malakaOshirgan,
            this.malakaOshirmagan,
            this.jarayonda,
          ],
          backgroundColor: ['#e8f5e9', '#4caf50', '#ff9800', '#f44336'],
          borderWidth: 0,
        },
      ],
    };
    this.chart?.update();
  }

  getMalakaPercentage(): number {
    return this.total > 0 ? Math.round((this.malakaOshirgan / this.total) * 100) : 0;
  }

  getOshirmaganPercentage(): number {
    return this.total > 0 ? Math.round((this.malakaOshirmagan / this.total) * 100) : 0;
  }

  getJarayondaPercentage(): number {
    return this.total > 0 ? Math.round((this.jarayonda / this.total) * 100) : 0;
  }
}
