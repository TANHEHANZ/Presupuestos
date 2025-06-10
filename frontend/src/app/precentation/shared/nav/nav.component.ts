import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconComponent, IconName } from '../icons/icon.component';
import { CommonModule } from '@angular/common';

interface NavItem {
  label: string;
  icon: IconName;
  path: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

@Component({
  selector: 'app-nav',
  template: `
    <aside class="border-r w-full h-full flex flex-col  items-center">
      <div class="my-4">
        <img src="/logo2.png" alt="Logo" class="h-20 mx-auto aspect-square" />
      </div>
      <ng-container *ngFor="let group of navGroups">
        <span class="text-xs text-gray-500 mt-4 self-start ml-2">{{
          group.title
        }}</span>
        <ng-container *ngFor="let item of group.items">
          <a
            [routerLink]="item.path"
            routerLinkActive="bg-primary/5 border-l-4 border-primary "
            [routerLinkActiveOptions]="{ exact: true }"
            class="w-full flex flex-col justify-center  text-center items-center gap-2 min-h-24 cursor-pointer transition-all hover:bg-primary/10 "
          >
            <app-icon
              [name]="item.icon"
              class="text-2xl"
              routerLinkActive="text-primary  "
            ></app-icon>
            <p>{{ item.label }}</p>
          </a>
        </ng-container>
      </ng-container>
    </aside>
  `,
  standalone: true,
  imports: [IconComponent, RouterModule, CommonModule],
})
export class NavComponent {
  // @Input() navGroups: NavGroup[] = [
  //   {
  //     title: 'MODULOS',
  //     items: [
  //       {
  //         label: 'Inicio',
  //         icon: 'home',
  //         path: '/dashboard/unidad_ejecutora/dashboard',
  //       },
  //       {
  //         label: 'Proyectos',
  //         icon: 'proyect',
  //         path: '/dashboard/unidad_ejecutora/registros',
  //       },
  //     ],
  //   },
  // ];
  @Input() navGroups: NavGroup[] = [
    {
      title: 'MODULOS',
      items: [
        {
          label: 'Dashboard',
          icon: 'chart',
          path: '/dashboard/presupuestos',
        },
        {
          label: 'Unidades ejecutoras',
          icon: 'unidades',
          path: '/dashboard/presupuestos/unidades',
        },
        {
          label: 'Consultas',
          icon: 'proyect',
          path: '/dashboard/presupuestos/consultas',
        },
        {
          label: 'Usuarios',
          icon: 'users',
          path: '/dashboard/presupuestos/user',
        },
      ],
    },
  ];
}
