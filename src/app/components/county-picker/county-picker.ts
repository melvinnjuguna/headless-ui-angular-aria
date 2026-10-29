import { Component, signal } from '@angular/core';
import { COUNTIES } from '../../counties';

@Component({
  selector: 'app-county-picker',
  template: `
    <div class="relative w-72">
      <div class="mb-1.5 text-sm font-medium text-gray-900">County</div>
      <div
        (click)="open.set(!open())"
        class="flex cursor-pointer items-center justify-between rounded-lg border border-gray-300 px-3 py-2.5"
      >
        {{ selected() ?? 'Pick a county' }}
        <span>▾</span>
      </div>

      @if (open()) {
        <div
          class="absolute inset-x-0 z-10 mt-1 max-h-60 overflow-auto rounded-lg border border-gray-300 bg-white py-1 shadow-lg"
        >
          @for (county of counties; track county) {
            <div
              (click)="choose(county)"
              class="cursor-pointer px-3 py-2 hover:bg-gray-100"
              [class.bg-blue-50]="county === selected()"
              [class.font-medium]="county === selected()"
            >
              {{ county }}
            </div>
          }
        </div>
      }
    </div>
  `,
})
export class CountyPicker {
  protected readonly counties = COUNTIES;
  protected readonly open = signal(false);
  protected readonly selected = signal<string | undefined>(undefined);

  protected choose(county: string) {
    this.selected.set(county);
    this.open.set(false);
  }
}
