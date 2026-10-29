import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect } from 'storybook/test';
import { COUNTY_OPTIONS } from '../../demo-data';
import { Listbox } from './listbox';

const meta = {
  title: 'Components/Listbox',
  component: Listbox,
  args: {
    label: 'County',
    multi: false,
    value: [],
    options: COUNTY_OPTIONS,
  },
} satisfies Meta<Listbox>;

export default meta;
type Story = StoryObj<Listbox>;

export const Default: Story = {};

export const KeyboardNavigation: Story = {
  play: async ({ canvas, userEvent, step }) => {
    const option = (name: string) => canvas.getByRole('option', { name });

    await step('Tab focuses the first option', async () => {
      await userEvent.tab();
      await expect(option('Baringo')).toHaveFocus();
    });

    await step('Arrow keys move focus and select', async () => {
      await userEvent.keyboard('{ArrowDown}');
      await expect(option('Bomet')).toHaveFocus();
      await expect(option('Bomet')).toHaveAttribute('aria-selected', 'true');
      await expect(option('Baringo')).toHaveAttribute('aria-selected', 'false');
    });

    await step('Typing a letter jumps to the matching county', async () => {
      await userEvent.keyboard('n');
      await expect(option('Nairobi')).toHaveFocus();
      await expect(option('Nairobi')).toHaveAttribute('aria-selected', 'true');
    });

    await step('Home and End jump to the first and last county', async () => {
      await userEvent.keyboard('{End}');
      await expect(option('West Pokot')).toHaveFocus();
      await userEvent.keyboard('{Home}');
      await expect(option('Baringo')).toHaveFocus();
    });
  },
};

export const MultiSelect: Story = {
  args: { label: 'Counties you deliver to', multi: true },
  play: async ({ canvas, userEvent, step }) => {
    const option = (name: string) => canvas.getByRole('option', { name });

    await step('The listbox is marked as multi-selectable', async () => {
      await expect(canvas.getByRole('listbox')).toHaveAttribute('aria-multiselectable', 'true');
    });

    await step('Arrow keys move focus without selecting', async () => {
      await userEvent.tab();
      await userEvent.keyboard('{ArrowDown}');
      await expect(option('Bomet')).toHaveFocus();
      await expect(option('Bomet')).toHaveAttribute('aria-selected', 'false');
    });

    await step('Space toggles the focused county', async () => {
      await userEvent.keyboard(' ');
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard(' ');
      await expect(option('Bomet')).toHaveAttribute('aria-selected', 'true');
      await expect(option('Bungoma')).toHaveAttribute('aria-selected', 'true');
    });
  },
};
