import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect } from 'storybook/test';
import { PROVINCE_TABS } from '../../demo-data';
import { TabGroup } from './tab-group';

const meta = {
  title: 'Components/Tab Group',
  component: TabGroup,
  args: {
    selectedTab: 'coast',
    tabs: PROVINCE_TABS,
  },
} satisfies Meta<TabGroup>;

export default meta;
type Story = StoryObj<TabGroup>;

export const Default: Story = {};

export const KeyboardNavigation: Story = {
  play: async ({ canvas, canvasElement, userEvent, step }) => {
    const tabs = canvas.getAllByRole('tab');
    const [coast, northEastern] = tabs;
    const nairobi = tabs.at(-1)!;
    const panelFor = (tab: HTMLElement) =>
      canvasElement.querySelector(`#${tab.getAttribute('aria-controls')}`);

    await step('Tab moves focus to the selected tab', async () => {
      await userEvent.tab();
      await expect(coast).toHaveFocus();
      await expect(coast).toHaveAttribute('aria-selected', 'true');
      await expect(panelFor(coast)).toHaveTextContent('Mombasa');
    });

    await step('Arrow keys move focus and select the tab', async () => {
      await userEvent.keyboard('{ArrowRight}');
      await expect(northEastern).toHaveFocus();
      await expect(northEastern).toHaveAttribute('aria-selected', 'true');
      await expect(coast).toHaveAttribute('aria-selected', 'false');
      await expect(panelFor(northEastern)).toBeVisible();
      await expect(panelFor(coast)).not.toBeVisible();
    });

    await step('End and Home jump to the last and first tab', async () => {
      await userEvent.keyboard('{End}');
      await expect(nairobi).toHaveFocus();
      await userEvent.keyboard('{Home}');
      await expect(coast).toHaveFocus();
    });

    await step('Focus wraps around from the first to the last tab', async () => {
      await userEvent.keyboard('{ArrowLeft}');
      await expect(nairobi).toHaveFocus();
      await expect(panelFor(nairobi)).toBeVisible();
    });
  },
};
