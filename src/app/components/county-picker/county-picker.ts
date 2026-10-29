import { Component, signal } from '@angular/core';
import { Listbox, Option } from '@angular/aria/listbox';
import { COUNTIES } from '../../counties';

@Component({
  selector: 'app-county-picker',
  imports: [Listbox, Option],
  template: `
    <div class="relative w-72">
      <div class="mb-1.5 text-sm font-medium text-gray-900">County</div>
      <div
        (click)="open.set(!open())"
        class="flex cursor-pointer items-center justify-between rounded-lg border border-gray-300 px-3 py-2.5"
      >
        {{ selected()[0] ?? 'Pick a county' }}
        <span>▾</span>
      </div>

      @if (open()) {
        <ul
          ngListbox
          [(value)]="selected"
          aria-label="Counties"
          (click)="open.set(false)"
          class="absolute inset-x-0 z-10 mt-1 max-h-60 overflow-auto rounded-lg border border-gray-300 bg-white py-1 shadow-lg"
        >
          @for (county of counties; track county) {
            <li
              ngOption
              [value]="county"
              [label]="county"
              class="cursor-pointer px-3 py-2 hover:bg-gray-100 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-600 aria-selected:bg-blue-50 aria-selected:font-medium"
            >
              {{ county }}
            </li>
          }
        </ul>
      }
    </div>
  `,
})
export class CountyPicker {
  protected readonly counties = COUNTIES;
  protected readonly open = signal(false);
  protected readonly selected = signal<string[]>([]);
}
