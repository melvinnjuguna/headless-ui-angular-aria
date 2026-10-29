import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect } from 'storybook/test';
import { TabGroup } from './tab-group';

const meta = {
  title: 'Components/Tab Group',
  component: TabGroup,
  args: {
    selectedTab: 'account',
    tabs: [
      {
        value: 'account',
        label: 'Account',
        content: 'Update your name, email address and profile photo.',
      },
      {
        value: 'password',
        label: 'Password',
        content: 'Change your password. You will be signed out on all other devices.',
      },
      {
        value: 'notifications',
        label: 'Notifications',
        content: 'Choose which emails and push notifications you want to receive.',
      },
    ],
  },
} satisfies Meta<TabGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const KeyboardNavigation: Story = {
  play: async ({ canvas, canvasElement, userEvent, step }) => {
    const [account, password, notifications] = canvas.getAllByRole('tab');
    const panelFor = (tab: HTMLElement) =>
      canvasElement.querySelector(`#${tab.getAttribute('aria-controls')}`);

    await step('Tab moves focus to the selected tab', async () => {
      await userEvent.tab();
      await expect(account).toHaveFocus();
      await expect(account).toHaveAttribute('aria-selected', 'true');
      await expect(panelFor(account)).toBeVisible();
    });

    await step('Arrow keys move focus and select the tab', async () => {
      await userEvent.keyboard('{ArrowRight}');
      await expect(password).toHaveFocus();
      await expect(password).toHaveAttribute('aria-selected', 'true');
      await expect(account).toHaveAttribute('aria-selected', 'false');
      await expect(panelFor(password)).toBeVisible();
      await expect(panelFor(account)).not.toBeVisible();
    });

    await step('End and Home jump to the last and first tab', async () => {
      await userEvent.keyboard('{End}');
      await expect(notifications).toHaveFocus();
      await userEvent.keyboard('{Home}');
      await expect(account).toHaveFocus();
    });

    await step('Focus wraps around from the first to the last tab', async () => {
      await userEvent.keyboard('{ArrowLeft}');
      await expect(notifications).toHaveFocus();
      await expect(panelFor(notifications)).toBeVisible();
    });
  },
};
