import {
  Component,
  ElementRef,
  Input,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconComponent, IconName } from '../icons/icon.component';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
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
            class="nav-anim-item w-full flex flex-col justify-center text-center items-center opacity-0 translate-y-[90px] gap-2 min-h-24 cursor-pointer transition-all hover:bg-primary/10"
            [routerLink]="item.path"
            routerLinkActive="bg-primary/5 border-l-4 border-primary "
            [routerLinkActiveOptions]="{ exact: true }"
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
  ngAfterViewInit() {
    gsap.from('.nav-anim-item', {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.5,
      delay: 3,
      ease: 'back.out',
    });
  }
}
