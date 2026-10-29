import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect } from 'storybook/test';
import { Accordion } from './accordion';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  args: {
    multiExpandable: false,
    items: [
      {
        title: 'What is a headless component?',
        content:
          'A component that provides behavior and accessibility but no styles, so it fits any design system.',
      },
      {
        title: 'Does @angular/aria handle keyboard navigation?',
        content:
          'Yes. Arrow keys move between headers, Home and End jump to the first and last, and Enter or Space toggle a section.',
      },
      {
        title: 'Can I use Tailwind CSS with it?',
        content:
          'Yes. The directives set ARIA attributes such as aria-expanded, which Tailwind variants can target directly.',
      },
    ],
  },
} satisfies Meta<Accordion>;

export default meta;
type Story = StoryObj<Accordion>;

export const Default: Story = {};

export const KeyboardNavigation: Story = {
  play: async ({ canvas, canvasElement, userEvent, step }) => {
    const [first, second, third] = canvas.getAllByRole('button');
    const panelFor = (trigger: HTMLElement) =>
      canvasElement.querySelector(`#${trigger.getAttribute('aria-controls')}`);

    await step('All sections start collapsed', async () => {
      for (const trigger of [first, second, third]) {
        await expect(trigger).toHaveAttribute('aria-expanded', 'false');
        await expect(panelFor(trigger)).not.toBeVisible();
      }
    });

    await step('Enter expands the focused section', async () => {
      await userEvent.tab();
      await expect(first).toHaveFocus();
      await userEvent.keyboard('{Enter}');
      await expect(first).toHaveAttribute('aria-expanded', 'true');
      await expect(panelFor(first)).toBeVisible();
    });

    await step('Opening another section closes the first one', async () => {
      await userEvent.keyboard('{ArrowDown}');
      await expect(second).toHaveFocus();
      await userEvent.keyboard(' ');
      await expect(second).toHaveAttribute('aria-expanded', 'true');
      await expect(first).toHaveAttribute('aria-expanded', 'false');
      await expect(panelFor(first)).not.toBeVisible();
    });

    await step('End and Home jump to the last and first header', async () => {
      await userEvent.keyboard('{End}');
      await expect(third).toHaveFocus();
      await userEvent.keyboard('{Home}');
      await expect(first).toHaveFocus();
    });
  },
};

export const MultipleExpanded: Story = {
  args: { multiExpandable: true },
  play: async ({ canvas, userEvent }) => {
    const [first, second] = canvas.getAllByRole('button');

    await userEvent.click(first);
    await userEvent.click(second);
    await expect(first).toHaveAttribute('aria-expanded', 'true');
    await expect(second).toHaveAttribute('aria-expanded', 'true');
  },
};
