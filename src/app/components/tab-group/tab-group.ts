import { Component, input, model } from '@angular/core';

export interface TabItem {
  value: string;
  label: string;
  content: string;
}

@Component({
  selector: 'app-tab-group',
  template: `
    <div>
      <ul>
        @for (tab of tabs(); track tab.value) {
          <li (click)="selectedTab.set(tab.value)">{{ tab.label }}</li>
        }
      </ul>

      @for (tab of tabs(); track tab.value) {
        @if (selectedTab() === tab.value) {
          <div>{{ tab.content }}</div>
        }
      }
    </div>
  `,
})
export class TabGroup {
  readonly tabs = input.required<TabItem[]>();
  readonly selectedTab = model<string>();
}
