import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect } from 'storybook/test';
import { PROVINCE_SECTIONS } from '../../demo-data';
import { Accordion } from './accordion';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  args: {
    multiExpandable: false,
    items: PROVINCE_SECTIONS,
  },
} satisfies Meta<Accordion>;

export default meta;
type Story = StoryObj<Accordion>;

export const Default: Story = {};

export const KeyboardNavigation: Story = {
  play: async ({ canvas, canvasElement, userEvent, step }) => {
    const triggers = canvas.getAllByRole('button');
    const [coast, northEastern] = triggers;
    const nairobi = triggers.at(-1)!;
    const panelFor = (trigger: HTMLElement) =>
      canvasElement.querySelector(`#${trigger.getAttribute('aria-controls')}`);

    await step('All sections start collapsed', async () => {
      for (const trigger of triggers) {
        await expect(trigger).toHaveAttribute('aria-expanded', 'false');
        await expect(panelFor(trigger)).not.toBeVisible();
      }
    });

    await step('Enter expands the focused section', async () => {
      await userEvent.tab();
      await expect(coast).toHaveFocus();
      await userEvent.keyboard('{Enter}');
      await expect(coast).toHaveAttribute('aria-expanded', 'true');
      await expect(panelFor(coast)).toHaveTextContent('Mombasa');
    });

    await step('Opening another section closes the first one', async () => {
      await userEvent.keyboard('{ArrowDown}');
      await expect(northEastern).toHaveFocus();
      await userEvent.keyboard(' ');
      await expect(northEastern).toHaveAttribute('aria-expanded', 'true');
      await expect(coast).toHaveAttribute('aria-expanded', 'false');
      await expect(panelFor(coast)).not.toBeVisible();
    });

    await step('End and Home jump to the last and first header', async () => {
      await userEvent.keyboard('{End}');
      await expect(nairobi).toHaveFocus();
      await userEvent.keyboard('{Home}');
      await expect(coast).toHaveFocus();
    });
  },
};

export const MultipleExpanded: Story = {
  args: { multiExpandable: true },
  play: async ({ canvas, userEvent }) => {
    const [coast, northEastern] = canvas.getAllByRole('button');

    await userEvent.click(coast);
    await userEvent.click(northEastern);
    await expect(coast).toHaveAttribute('aria-expanded', 'true');
    await expect(northEastern).toHaveAttribute('aria-expanded', 'true');
  },
};
