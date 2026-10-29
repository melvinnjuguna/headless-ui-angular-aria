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
      <ul ngTabList [(selectedTab)]="selectedTab" class="flex gap-2 border-b border-gray-200">
        @for (tab of tabs(); track tab.value) {
          <li
            ngTab
            [value]="tab.value"
            class="-mb-px cursor-pointer border-b-2 border-transparent px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-blue-600 aria-selected:border-blue-600 aria-selected:text-blue-600"
          >
            {{ tab.label }}
          </li>
        }
      </ul>

      @for (tab of tabs(); track tab.value) {
        <div
          ngTabPanel
          [value]="tab.value"
          class="py-4 text-gray-700 focus-visible:outline-2 focus-visible:outline-blue-600 inert:hidden"
        >
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
