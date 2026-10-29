import { Component, input, model } from '@angular/core';
import { Tab, TabContent, TabList, TabPanel, Tabs } from '@angular/aria/tabs';

export interface TabItem {
  value: string;
  label: string;
  content: string;
}

@Component({
  selector: 'app-tab-group',
  imports: [Tabs, TabList, Tab, TabPanel, TabContent],
  template: `
    <div ngTabs>
      <ul ngTabList [(selectedTab)]="selectedTab">
        @for (tab of tabs(); track tab.value) {
          <li ngTab [value]="tab.value">{{ tab.label }}</li>
        }
      </ul>

      @for (tab of tabs(); track tab.value) {
        <div ngTabPanel [value]="tab.value">
          <ng-template ngTabContent>{{ tab.content }}</ng-template>
        </div>
      }
    </div>
  `,
})
export class TabGroup {
  readonly tabs = input.required<TabItem[]>();
  readonly selectedTab = model<string>();
}
