import { Component, computed, signal, viewChild } from '@angular/core';
import { Combobox, ComboboxPopup, ComboboxWidget } from '@angular/aria/combobox';
import { Listbox, Option } from '@angular/aria/listbox';
import { COUNTIES } from '../../counties';

@Component({
  selector: 'app-county-picker',
  imports: [Combobox, ComboboxPopup, ComboboxWidget, Listbox, Option],
  template: `
    <div class="relative w-72">
      <label for="county" class="mb-1.5 block text-sm font-medium text-gray-900">County</label>
      <input
        id="county"
        ngCombobox
        #combobox="ngCombobox"
        [(value)]="query"
        [(expanded)]="expanded"
        placeholder="Pick a county"
        class="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus-visible:outline-2 focus-visible:outline-blue-600"
      />

      <ng-template ngComboboxPopup [combobox]="combobox">
        <ul
          ngListbox
          ngComboboxWidget
          #listbox="ngListbox"
          aria-label="Counties"
          focusMode="activedescendant"
          [tabindex]="-1"
          [activeDescendant]="listbox.activeDescendant()"
          [(value)]="selected"
          (click)="commit()"
          (keydown.enter)="commit()"
          class="absolute inset-x-0 z-10 mt-1 max-h-60 overflow-auto rounded-lg border border-gray-300 bg-white py-1 shadow-lg"
        >
          @for (county of matches(); track county) {
            <li
              ngOption
              [value]="county"
              [label]="county"
              class="cursor-pointer px-3 py-2 hover:bg-gray-100 data-[active=true]:outline-2 data-[active=true]:-outline-offset-2 data-[active=true]:outline-blue-600 aria-selected:bg-blue-50 aria-selected:font-medium"
            >
              {{ county }}
            </li>
          }
        </ul>
      </ng-template>
    </div>
  `,
})
export class CountyPicker {
  private readonly combobox = viewChild.required(Combobox);

  protected readonly query = signal('');
  protected readonly expanded = signal(false);
  protected readonly selected = signal<string[]>([]);
  protected readonly matches = computed(() =>
    COUNTIES.filter((c) => c.toLowerCase().startsWith(this.query().toLowerCase())),
  );

  protected commit() {
    const [county] = this.selected();
    if (county) this.query.set(county);
    this.expanded.set(false);
    this.combobox().element.focus();
  }
}
