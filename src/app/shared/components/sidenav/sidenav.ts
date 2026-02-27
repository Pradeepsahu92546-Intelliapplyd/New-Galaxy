import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconService } from 'ng-zorro-antd/icon';
import { SettingOutline } from '@ant-design/icons-angular/icons';
import { RouterModule } from '@angular/router';
import { icons } from './icons-provider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidenav',
  imports: [
    CommonModule,
    RouterModule,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    RouterLink,
  ],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.css',
})
export class Sidenav {
  constructor(private iconService: NzIconService) {
    this.iconService.addIcon(...icons);
  }
  isCollapsed = false;

  menus = [
    {
      title: 'Dashboard',
      icon: 'pie-chart-o',
      open: true,
      items: [
        { label: 'Dashboard', link: '/dashboard' },
        { label: 'Upload Data', link: '/upload-data' },
        { label: 'Create System', link: '/create-system' },
        { label: 'Edit/Config', link: '/edit-config' },
        { label: 'All System', link: '/all-system' },
      ],
    },
    {
      title: 'Organization',
      icon: 'apartment',
      open: false,
      items: [
        { label: 'Team', link: '/team' },
        { label: 'Members', link: '/member' },
        { label: 'Rules', link: '/rules' },
        { label: 'Permissions', link: '/permissions' },
      ],
    },
    {
      title: 'Payments',
      icon: 'credit-card',
      open: false,
      items: [
        { label: 'Payment Method', link: '/payment-method' },
        { label: 'Transaction History', link: '/transaction-history' },
        { label: 'Invoces', link: '/invoices' },
      ],
    },
    {
      title: 'Subscription',
      icon: 'dollar',
      open: false,
      items: [{ label: 'Billing', link: '/billing' },
        { label: 'Subscriptions', link: '/subscriptions' }
      ],
    },
    {
      title: 'Help & Support',
      icon: 'question-circle',
      open: false,
      items: [{ label: 'Ticket', link: '/ticket' }],
    },
    {
      title: 'Setting',
      icon: 'setting',
      open: false,
      items: [
        { label: 'Profile Details', link: '/profile' },
        { label: 'Account', link: '/account' },
        { label : 'Preference Settings', link: '/preferance-settings' },
        { label: 'Security', link: '/security' },
        
      ],
    },
  ];
}
