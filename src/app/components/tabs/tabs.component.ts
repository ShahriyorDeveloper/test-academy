import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Tab {
  id: string;
  label: string;
  icon: string;
  progress: number;
  progressColor: string;
  completedCount: number;
}

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabs.component.html',
})
export class TabsComponent {
  @Input() tabs: Tab[] = [];
  @Input() activeTabId = '';
  @Input() completedCount = 930;
  @Output() tabChange = new EventEmitter<string>();

  selectTab(tabId: string): void {
    this.tabChange.emit(tabId);
  }
}
