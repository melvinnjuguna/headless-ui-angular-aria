import { Component, booleanAttribute, input, model } from '@angular/core';
import { Listbox as NgListbox, Option as NgOption } from '@angular/aria/listbox';

export interface ListboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

let nextId = 0;

@Component({
  selector: 'app-listbox',
  imports: [NgListbox, NgOption],
  template: `
    <span [id]="labelId" class="mb-2 block text-sm font-medium text-gray-900">{{ label() }}</span>

    <ul
      ngListbox
      [(value)]="value"
      [multi]="multi()"
      [selectionMode]="multi() ? 'explicit' : 'follow'"
      [attr.aria-labelledby]="labelId"
      class="max-h-72 w-64 space-y-1 overflow-y-auto rounded-md border border-gray-300 p-1"
    >
      @for (option of options(); track option.value) {
        <li
          ngOption
          [value]="option.value"
          [label]="option.label"
          [disabled]="option.disabled"
          class="group flex cursor-pointer items-center justify-between rounded px-3 py-2 text-sm text-gray-900 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-blue-600 aria-selected:bg-blue-50 aria-selected:font-medium aria-selected:text-blue-700 aria-disabled:cursor-not-allowed aria-disabled:text-gray-400 aria-disabled:hover:bg-transparent"
        >
          {{ option.label }}
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="invisible size-4 group-aria-selected:visible"
          >
            <path
              fill-rule="evenodd"
              d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
              clip-rule="evenodd"
            />
          </svg>
        </li>
      }
    </ul>
  `,
})
export class Listbox {
  readonly label = input.required<string>();
  readonly options = input.required<ListboxOption[]>();
  readonly multi = input(false, { transform: booleanAttribute });
  readonly value = model<string[]>([]);

  protected readonly labelId = `app-listbox-label-${nextId++}`;
}
