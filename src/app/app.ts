import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabGroup, TabItem } from './components/tab-group/tab-group';

@Component({
  imports: [RouterOutlet, TabGroup],
  selector: 'app-root',
  styles: [],
  template: `
    <main class="mx-auto max-w-2xl p-8">
      <h1 class="mb-6 text-2xl font-bold">Account settings</h1>

      <app-tab-group [tabs]="tabs" selectedTab="account" />
    </main>

    <router-outlet />
  `,
})
export class App {
  protected readonly tabs: TabItem[] = [
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
  ];
}
