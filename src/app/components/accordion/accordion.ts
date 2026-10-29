import { Component, booleanAttribute, input } from '@angular/core';
import {
  AccordionContent,
  AccordionGroup,
  AccordionPanel,
  AccordionTrigger,
} from '@angular/aria/accordion';

export interface AccordionItem {
  title: string;
  content: string;
}

@Component({
  selector: 'app-accordion',
  imports: [AccordionGroup, AccordionTrigger, AccordionPanel, AccordionContent],
  template: `
    <div
      ngAccordionGroup
      [multiExpandable]="multiExpandable()"
      class="divide-y divide-gray-200 border-y border-gray-200"
    >
      @for (item of items(); track item.title) {
        <div>
          <h3>
            <button
              ngAccordionTrigger
              [panel]="panel"
              class="group flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left font-medium text-gray-900 hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-blue-600"
            >
              {{ item.title }}
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="size-5 shrink-0 text-gray-500 transition-transform group-aria-expanded:rotate-180"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </h3>

          <div ngAccordionPanel #panel="ngAccordionPanel" class="pb-4 text-gray-700 inert:hidden">
            <ng-template ngAccordionContent>{{ item.content }}</ng-template>
          </div>
        </div>
      }
    </div>
  `,
})
export class Accordion {
  readonly items = input.required<AccordionItem[]>();
  readonly multiExpandable = input(false, { transform: booleanAttribute });
}
