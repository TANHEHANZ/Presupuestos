import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../../shared/icons/icon.component';
import { CommonModule } from '@angular/common';
import { IconName } from '../../../infraestructure/modules/presupuesto/types';

@Component({
  selector: 'app-sub-nav',
  standalone: true,
  imports: [RouterModule, IconComponent, CommonModule],
  template: `
    <nav class="flex justify-start items-center bg-white ">
      <a
        *ngFor="let link of links"
        class="relative flex gap-2 border-b-4 justify-center items-center py-4 px-6 min-w-[250px]"
        [routerLink]="link.path"
        routerLinkActive="bg-primary/10 border-b-4 border-primary"
        [routerLinkActiveOptions]="{ exact: true }"
      >
        <app-icon [name]="link.icon" routerLinkActive="text-primary"></app-icon>
        <p class="text-sm">{{ link.label }}</p>
      </a>
    </nav>
  `,
})
export class SubNavComponent {
  @Input() links: { path: string; icon: IconName; label: string }[] = [];
}
