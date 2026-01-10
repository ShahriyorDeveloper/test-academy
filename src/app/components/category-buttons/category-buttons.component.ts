import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Category {
  id: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-category-buttons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-buttons.component.html',
})
export class CategoryButtonsComponent {
  @Input() categories: Category[] = [];
  @Input() selectedCategory = '';
  @Output() categorySelect = new EventEmitter<string>();

  selectCategory(categoryId: string): void {
    this.categorySelect.emit(categoryId);
  }
}
