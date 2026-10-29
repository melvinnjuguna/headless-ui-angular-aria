import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect } from 'storybook/test';
import { Listbox } from './listbox';

const meta = {
  title: 'Components/Listbox',
  component: Listbox,
  args: {
    label: 'Favorite fruit',
    multi: false,
    value: [],
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'blueberry', label: 'Blueberry' },
      { value: 'cherry', label: 'Cherry' },
      { value: 'durian', label: 'Durian', disabled: true },
      { value: 'mango', label: 'Mango' },
      { value: 'orange', label: 'Orange' },
    ],
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
      await expect(option('Apple')).toHaveFocus();
    });

    await step('Arrow keys move focus and select', async () => {
      await userEvent.keyboard('{ArrowDown}');
      await expect(option('Banana')).toHaveFocus();
      await expect(option('Banana')).toHaveAttribute('aria-selected', 'true');
      await expect(option('Apple')).toHaveAttribute('aria-selected', 'false');
    });

    await step('Typing a letter jumps to the matching option', async () => {
      await userEvent.keyboard('m');
      await expect(option('Mango')).toHaveFocus();
      await expect(option('Mango')).toHaveAttribute('aria-selected', 'true');
    });

    await step('Home and End jump to the first and last option', async () => {
      await userEvent.keyboard('{End}');
      await expect(option('Orange')).toHaveFocus();
      await userEvent.keyboard('{Home}');
      await expect(option('Apple')).toHaveFocus();
    });
  },
};

export const MultiSelect: Story = {
  args: { label: 'Fruits for the smoothie', multi: true },
  play: async ({ canvas, userEvent, step }) => {
    const option = (name: string) => canvas.getByRole('option', { name });

    await step('The listbox is marked as multi-selectable', async () => {
      await expect(canvas.getByRole('listbox')).toHaveAttribute('aria-multiselectable', 'true');
    });

    await step('Arrow keys move focus without selecting', async () => {
      await userEvent.tab();
      await userEvent.keyboard('{ArrowDown}');
      await expect(option('Banana')).toHaveFocus();
      await expect(option('Banana')).toHaveAttribute('aria-selected', 'false');
    });

    await step('Space toggles the focused option', async () => {
      await userEvent.keyboard(' ');
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard(' ');
      await expect(option('Banana')).toHaveAttribute('aria-selected', 'true');
      await expect(option('Blueberry')).toHaveAttribute('aria-selected', 'true');
    });

    await step('Disabled options cannot be selected', async () => {
      await userEvent.click(option('Durian'));
      await expect(option('Durian')).toHaveAttribute('aria-disabled', 'true');
      await expect(option('Durian')).not.toHaveAttribute('aria-selected', 'true');
    });
  },
};
