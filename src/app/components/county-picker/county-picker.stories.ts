import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect, within } from 'storybook/test';
import { CountyPicker } from './county-picker';

const meta = {
  title: 'Components/County Picker (Combobox)',
  component: CountyPicker,
} satisfies Meta<CountyPicker>;

export default meta;
type Story = StoryObj<CountyPicker>;

export const Default: Story = {};

export const KeyboardOnly: Story = {
  play: async ({ canvas, userEvent, step }) => {
    const input = canvas.getByRole('combobox', { name: 'County' });

    await step('Typing filters the counties', async () => {
      await userEvent.type(input, 'ki');
      const listbox = await canvas.findByRole('listbox', { name: 'Counties' });
      await expect(input).toHaveAttribute('aria-expanded', 'true');
      await expect(within(listbox).getAllByRole('option')).toHaveLength(6);
    });

    await step('Arrow keys move the highlight while focus stays in the input', async () => {
      await userEvent.keyboard('{ArrowDown}');
      await expect(input).toHaveFocus();
      await expect(canvas.getByRole('option', { name: 'Kitui' })).toHaveAttribute(
        'data-active',
        'true',
      );
    });

    await step('Enter picks the county and closes the popup', async () => {
      await userEvent.keyboard('{Enter}');
      await expect(input).toHaveValue('Kitui');
      await expect(input).toHaveAttribute('aria-expanded', 'false');
    });
  },
};
