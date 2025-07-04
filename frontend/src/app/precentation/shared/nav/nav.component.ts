import { Component, Input } from '@angular/core';
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
        <span
          class="nav-anim-item text-xs  text-primary mt-4 ml-2 uppercase font-medium self-start"
          >{{ group.title }}</span
        >
        <ng-container *ngFor="let item of group.items">
          <a
            class="nav-anim-item w-full  flex-col hidden justify-center text-balance  text-center items-center gap-2 min-h-24 cursor-pointer transition-all hover:bg-primary/10"
            [routerLink]="item.path"
            routerLinkActive="bg-primary/5 border-l-4 border-primary "
            [routerLinkActiveOptions]="{ exact: true }"
          >
            <app-icon
              [name]="item.icon"
              class="text-2xl"
              routerLinkActive="text-primary  "
            ></app-icon>
            <p class=" text-sm">{{ item.label }}</p>
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
      title: 'graficas',
      items: [
        {
          label: 'Dashboard',
          icon: 'chart',
          path: '/dashboard/presupuestos',
        },
      ],
    },
    {
      title: 'Modulos',
      items: [
        {
          label: 'Presupuesto por unidad',
          icon: 'coins',
          path: '/dashboard/presupuestos/presupestar',
        },
        {
          label: 'Consultas',
          icon: 'proyect',
          path: '/dashboard/presupuestos/consultas',
        },
        {
          label: 'Unidades ejecutoras',
          icon: 'unidades',
          path: '/dashboard/presupuestos/unidades',
        },
        {
          label: 'Usuarios',
          icon: 'users',
          path: '/dashboard/presupuestos/user',
        },
        {
          label: 'Programación finanicera',
          icon: 'calendar',
          path: '/dashboard/presupuestos/programacion',
        },
      ],
    },
  ];
  ngAfterViewInit() {
    gsap.fromTo(
      '.nav-anim-item',
      {
        opacity: 0,
        translateY: 200,
      },
      {
        opacity: 1,
        translateY: 0,
        stagger: 0.25,
        display: 'flex',
        ease: 'slow(0.7,0.7,false)',
        y: -500,
      }
    );
  }
}
