import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Accordion } from './components/accordion/accordion';
import { Listbox } from './components/listbox/listbox';
import { TabGroup } from './components/tab-group/tab-group';
import { COUNTY_OPTIONS, PROVINCE_SECTIONS, PROVINCE_TABS } from './demo-data';

@Component({
  imports: [RouterOutlet, TabGroup, Accordion, Listbox],
  selector: 'app-root',
  styles: [],
  template: `
    <main class="mx-auto max-w-4xl space-y-12 p-8">
      <header>
        <h1 class="text-2xl font-bold">Kenya's 47 counties</h1>
        <p class="mt-1 text-gray-600">Headless UI with Angular Aria and Tailwind CSS</p>
      </header>

      <section>
        <h2 class="mb-4 text-lg font-semibold">Tabs: counties by former province</h2>
        <app-tab-group [tabs]="provinceTabs" selectedTab="coast" />
      </section>

      <section>
        <h2 class="mb-4 text-lg font-semibold">Accordion: counties by former province</h2>
        <app-accordion [items]="provinceSections" />
      </section>

      <section>
        <h2 class="mb-4 text-lg font-semibold">Listbox: pick counties</h2>
        <app-listbox label="Counties you deliver to" [options]="countyOptions" multi />
      </section>
    </main>

    <router-outlet />
  `,
})
export class App {
  protected readonly provinceTabs = PROVINCE_TABS;
  protected readonly provinceSections = PROVINCE_SECTIONS;
  protected readonly countyOptions = COUNTY_OPTIONS;
}
