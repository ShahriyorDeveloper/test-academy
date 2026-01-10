import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export interface RegionData {
  name: string;
  statistics: {
    total: number;
    malakaOshirgan: number;
    malakaOshirmagan: number;
    jarayonda: number;
  };
  details: {
    soatlikKurs: number;
    masofaviyPortal: number;
    ananaviyPortal: number;
    ozgarish: number;
  };
  barChart: { [year: string]: number[] };
  lineChart: {
    labels: string[];
    soatlikKurs: number[];
    masofaviyPortal: number[];
    ananaviyPortal: number[];
  };
  tabs: {
    [id: string]: {
      progress: number;
      completedCount: number;
      barChart?: { [year: string]: number[] };
      lineChart?: {
        labels: string[];
        soatlikKurs: number[];
        masofaviyPortal: number[];
        ananaviyPortal: number[];
      };
      statistics?: {
        total: number;
        malakaOshirgan: number;
        malakaOshirmagan: number;
        jarayonda: number;
      };
      details?: {
        soatlikKurs: number;
        masofaviyPortal: number;
        ananaviyPortal: number;
        ozgarish: number;
      };
    };
  };
}

const REGION_NAME_MAP: { [key: string]: string } = {
  andijan: 'andijon',
  bukhara: 'buxoro',
  fergana: 'fargona',
  jizzakh: 'jizzax',
  namangan: 'namangan',
  navoiy: 'navoiy',
  qashqadaryo: 'qashqadaryo',
  karakalpakstan: 'qoraqalpogiston',
  samarqand: 'samarqand',
  sirdaryo: 'sirdaryo',
  surxondaryo: 'surxondaryo',
  tashkent: 'toshkent',
  tashkent_region: 'toshkent_viloyati',
  xorazm: 'xorazm',
};

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
})
export class MapComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('mapContainer') mapContainer!: ElementRef;

  @Input() regionsData: { [key: string]: RegionData } = {};
  @Input() selectedRegion = '';
  @Output() regionSelect = new EventEmitter<string>();

  svgContent: SafeHtml = '';

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.loadSvgMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedRegion'] && !changes['selectedRegion'].firstChange) {
      this.highlightSelectedRegion();
    }
  }

  ngAfterViewInit(): void {
    if (this.svgContent) {
      setTimeout(() => this.setupMapEvents(), 100);
    }
  }

  private loadSvgMap(): void {
    this.http.get('assets/uzbekistan.svg', { responseType: 'text' }).subscribe({
      next: (svg) => {
        this.svgContent = this.sanitizer.bypassSecurityTrustHtml(svg);
        setTimeout(() => this.setupMapEvents(), 100);
      },
      error: (err) => console.error('SVG load error:', err),
    });
  }

  hoveredRegionName: string | null = null;
  tooltipPosition = { x: 0, y: 0 };

  private setupMapEvents(): void {
    const container = this.mapContainer?.nativeElement;
    if (!container) return;

    const paths = container.querySelectorAll('path');

    paths.forEach((path: SVGPathElement) => {
      const regionId = path.id;
      if (regionId && regionId !== 'aral-sea') {
        path.style.cursor = 'pointer';

        path.onclick = () => this.onRegionClick(regionId);

        path.onmouseenter = () => {
          const dataKey = REGION_NAME_MAP[regionId];
          if (dataKey && this.regionsData[dataKey]) {
            this.hoveredRegionName = this.regionsData[dataKey].name;
          }
          if (!path.classList.contains('selected')) {
            path.style.fill = '#90caf9';
          }
        };

        path.onmousemove = (e: MouseEvent) => {
          this.tooltipPosition = { x: e.clientX, y: e.clientY };
        };

        path.onmouseleave = () => {
          this.hoveredRegionName = null;
          if (!path.classList.contains('selected')) {
            path.style.fill = '#3b5998';
          }
        };
      }
    });

    this.highlightSelectedRegion();
  }

  onRegionClick(svgRegionId: string): void {
    let normalizedId = svgRegionId;
    const dataKey = REGION_NAME_MAP[normalizedId];

    if (!dataKey) return;
    if (!this.regionsData[dataKey]) return;

    this.selectedRegion = dataKey;
    this.regionSelect.emit(dataKey);
    this.highlightSelectedRegion();
  }

  private highlightSelectedRegion(): void {
    const container = this.mapContainer?.nativeElement;
    if (!container) return;

    const paths = container.querySelectorAll('path');
    paths.forEach((path: SVGPathElement) => {
      if (path.id !== 'aral-sea') {
        path.classList.remove('selected');
        path.style.fill = '#3b5998';
      } else {
        path.style.fill = '#a8d4f0';
      }
    });

    const targetSvgIds = Object.keys(REGION_NAME_MAP).filter(
      (key) => REGION_NAME_MAP[key] === this.selectedRegion
    );

    targetSvgIds.forEach((svgId) => {
      paths.forEach((path: SVGPathElement) => {
        if (path.id === svgId) {
          path.classList.add('selected');
          path.style.fill = '#90caf9';
        }
      });
    });
  }

  getSelectedRegionName(): string {
    return this.regionsData[this.selectedRegion]?.name || '';
  }
}
