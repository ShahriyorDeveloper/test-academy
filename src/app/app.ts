import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { TabsComponent, Tab } from './components/tabs/tabs.component';
import { MapComponent, RegionData } from './components/map/map.component';
import { StatisticsCardComponent } from './components/statistics-card/statistics-card.component';
import { Category } from './components/category-buttons/category-buttons.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { LineChartComponent, LineChartData } from './components/line-chart/line-chart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    TabsComponent,
    MapComponent,
    StatisticsCardComponent,
    BarChartComponent,
    LineChartComponent,
  ],
  templateUrl: './app.html',
})
export class App implements OnInit {
  private http = inject(HttpClient);

  tabs: Tab[] = [
    {
      id: 'prokuratura',
      label: 'Prokuratura',
      icon: 'assets/icons/shield.svg',
      progress: 75,
      progressColor: '#4caf50',
      completedCount: 100,
    },
    {
      id: 'departament',
      label: 'Departament',
      icon: 'assets/icons/shield.svg',
      progress: 45,
      progressColor: '#f44336',
      completedCount: 200,
    },
    {
      id: 'byuro',
      label: 'Byuro',
      icon: 'assets/icons/shield.svg',
      progress: 85,
      progressColor: '#4caf50',
      completedCount: 300,
    },
    {
      id: 'akademiya',
      label: 'Akademiya',
      icon: 'assets/icons/shield.svg',
      progress: 90,
      progressColor: '#4caf50',
      completedCount: 400,
    },
  ];
  activeTabId = 'prokuratura';

  categories: Category[] = [
    { id: 'bosh-prokuratura', label: 'Bosh prokuratura', icon: 'assets/icons/shield.svg' },
    { id: 'harbiy', label: 'Harbiy', icon: 'assets/icons/shield.svg' },
    { id: 'transport', label: 'Transport', icon: 'assets/icons/shield.svg' },
  ];
  selectedCategory = '';

  regionsData: { [key: string]: RegionData } = {};
  selectedRegion = 'jizzax';

  currentTotal = 4500;
  currentMalakaOshirgan = 307;
  currentMalakaOshirmagan = 307;
  currentJarayonda = 307;
  currentSoatlikKurs = 3506;
  currentMasofaviyPortal = 2049;
  currentAnanaviyPortal = 1509;
  currentOzgarish = 20;

  currentBarChartData: { [year: string]: number[] } = {
    '2023': [1200, 3200, 2800],
    '2024': [1500, 3800, 1800],
    '2025': [4200, 3600, 3100],
  };

  currentLineChartData: LineChartData = {
    labels: ['2024 IV chorak', '2025 I chorak', '2025 II chorak', '2025 III chorak'],
    soatlikKurs: [500, 800, 1200, 1800],
    masofaviyPortal: [1800, 2200, 2800, 3200],
    ananaviyPortal: [2200, 2400, 2900, 3400],
  };

  ngOnInit(): void {
    this.loadRegionsData();
  }

  loadRegionsData(): void {
    this.http.get<{ [key: string]: RegionData }>('assets/data/regions.json').subscribe({
      next: (data) => {
        this.regionsData = data;

        if (!this.regionsData[this.selectedRegion]) {
          const firstKey = Object.keys(this.regionsData)[0];
          if (firstKey) this.selectedRegion = firstKey;
        }

        this.updateRegionData(this.selectedRegion);
      },
      error: (err) => console.error('Error loading regions data:', err),
    });
  }

  onTabChange(tabId: string): void {
    this.activeTabId = tabId;
    this.updateRegionData(this.selectedRegion);
  }

  onRegionSelect(regionId: string): void {
    this.selectedRegion = regionId;
    this.updateRegionData(regionId);
  }

  onCategorySelect(categoryId: string): void {
    this.selectedCategory = categoryId;
  }

  barChartTitle = "Respublika bo'yicha statistika";
  lineChartTitle = "O'zgarishlar dinamikasi";
  statisticsTitle = "Respublika bo'yicha statistika";

  private updateRegionData(regionId: string): void {
    const regionData = this.regionsData[regionId];
    if (!regionData) return;

    let total = regionData.statistics.total;
    let malakaOshirgan = regionData.statistics.malakaOshirgan;
    let malakaOshirmagan = regionData.statistics.malakaOshirmagan;
    let jarayonda = regionData.statistics.jarayonda;

    let soatlikKurs = regionData.details.soatlikKurs;
    let masofaviyPortal = regionData.details.masofaviyPortal;
    let ananaviyPortal = regionData.details.ananaviyPortal;
    let ozgarish = regionData.details.ozgarish;

    let barData = regionData.barChart;
    let lineData = regionData.lineChart;

    if (this.activeTabId && regionData.tabs && regionData.tabs[this.activeTabId]) {
      const tabData = regionData.tabs[this.activeTabId];
      if (tabData.barChart) barData = tabData.barChart;
      if (tabData.lineChart) lineData = tabData.lineChart;

      if (tabData.statistics) {
        total = tabData.statistics.total;
        malakaOshirgan = tabData.statistics.malakaOshirgan;
        malakaOshirmagan = tabData.statistics.malakaOshirmagan;
        jarayonda = tabData.statistics.jarayonda;
      }

      if (tabData.details) {
        soatlikKurs = tabData.details.soatlikKurs;
        masofaviyPortal = tabData.details.masofaviyPortal;
        ananaviyPortal = tabData.details.ananaviyPortal;
        ozgarish = tabData.details.ozgarish;
      }
    }

    this.currentTotal = total;
    this.currentMalakaOshirgan = malakaOshirgan;
    this.currentMalakaOshirmagan = malakaOshirmagan;
    this.currentJarayonda = jarayonda;

    this.currentSoatlikKurs = soatlikKurs;
    this.currentMasofaviyPortal = masofaviyPortal;
    this.currentAnanaviyPortal = ananaviyPortal;
    this.currentOzgarish = ozgarish;

    this.currentBarChartData = { ...barData };
    this.currentLineChartData = { ...lineData };

    this.barChartTitle = `${regionData.name} bo'yicha statistika`;
    this.lineChartTitle = `${regionData.name} bo'yicha o'zgarishlar dinamikasi`;
    this.statisticsTitle = `${regionData.name} bo'yicha statistika`;

    if (regionData.tabs) {
      this.tabs = this.tabs.map((tab) => {
        const tabData = regionData.tabs[tab.id];
        if (tabData) {
          return {
            ...tab,
            progress: tabData.progress,
            completedCount: tabData.completedCount,
          };
        }
        return tab;
      });
    }
  }
}
